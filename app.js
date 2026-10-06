/**
 * Quranic Arabic Dictionary — Application Logic
 * High-performance, diacritic-tolerant search across 407 words
 * Independent toggles (off by default = both shown, on = only that language shown)
 */

(function () {
  'use strict';

  // State
  let activeLetter = 'ALL';
  let activeCategory = 'ALL';
  let activeLangMode = 'ALL'; // 'ALL' (both shown by default), 'UR' (Urdu only), 'EN' (English only)
  let searchQuery = '';

  // DOM Elements
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const alphabetBar = document.getElementById('alphabetBar');
  const dictionaryList = document.getElementById('dictionaryList');
  const wordCountDisplay = document.getElementById('wordCount');
  const catFilterBtns = document.querySelectorAll('.cat-filter-btn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const toggleUrduBtn = document.getElementById('toggleUrduBtn');
  const toggleEnglishBtn = document.getElementById('toggleEnglishBtn');

  // Modal Elements
  const outlineToggleBtn = document.getElementById('outlineToggleBtn');
  const outlineModal = document.getElementById('outlineModal');
  const outlineCloseBtn = document.getElementById('outlineCloseBtn');

  // Arabic Alphabet list for the filter bar
  const ARABIC_ALPHABET = [
    'أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 
    'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 
    'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي'
  ];

  // -------------------------------------------------------------
  // 1. Text Normalization Helpers
  // -------------------------------------------------------------

  function normalizeEnglish(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[āâä]/g, 'a')
      .replace(/[īîï]/g, 'i')
      .replace(/[ūûü]/g, 'u')
      .replace(/[ṣŝ]/g, 's')
      .replace(/[ḍ]/g, 'd')
      .replace(/[ṭ]/g, 't')
      .replace(/[ẓ]/g, 'z')
      .replace(/[ḥ]/g, 'h')
      .replace(/[^a-z0-9]/g, '')
      .trim();
  }

  function normalizeArabic(str) {
    if (!str) return '';
    return str
      .replace(/[\u064B-\u065F\u0670\u0653\u06D6-\u06ED]/g, '')
      .replace(/[\u0625\u0623\u0622\u0671\u0621]/g, 'ا')
      .replace(/\u06A9/g, '\u0643')
      .replace(/[\u06CC\u0649]/g, '\u064A')
      .replace(/[\u06C1\u0629]/g, '\u0647')
      .replace(/[\s\-\–\—\.\,\;\:]/g, '')
      .trim();
  }

  // -------------------------------------------------------------
  // 2. Alphabet Bar Initialization
  // -------------------------------------------------------------
  function initAlphabetBar() {
    alphabetBar.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = 'letter-btn all-btn active';
    allBtn.textContent = 'All';
    allBtn.setAttribute('data-letter', 'ALL');
    allBtn.addEventListener('click', () => setLetterFilter('ALL'));
    alphabetBar.appendChild(allBtn);

    const letterCounts = {};
    DICTIONARY_WORDS.forEach(w => {
      letterCounts[w.letter] = (letterCounts[w.letter] || 0) + 1;
    });

    ARABIC_ALPHABET.forEach(letter => {
      const btn = document.createElement('button');
      btn.className = 'letter-btn';
      btn.textContent = letter;
      btn.setAttribute('data-letter', letter);
      const count = letterCounts[letter] || 0;
      btn.title = `${letter} (${count} words)`;
      
      if (count === 0) {
        btn.style.opacity = '0.35';
        btn.style.cursor = 'default';
      } else {
        btn.addEventListener('click', () => setLetterFilter(letter));
      }

      alphabetBar.appendChild(btn);
    });
  }

  function setLetterFilter(letter) {
    activeLetter = letter;
    document.querySelectorAll('.letter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-letter') === letter);
    });
    renderWords();
  }

  // -------------------------------------------------------------
  // 3. Category & Language Filter Toggles
  // -------------------------------------------------------------
  function initCategoryFilters() {
    catFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        catFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-cat') || 'ALL';
        renderWords();
      });
    });
  }

  function initLanguageToggles() {
    const savedMode = localStorage.getItem('mq_lang_mode') || 'ALL';
    activeLangMode = savedMode;

    updateToggleButtonsUI();

    // Clicking Urdu toggle
    toggleUrduBtn.addEventListener('click', () => {
      if (activeLangMode === 'UR') {
        // Untoggle -> returns to default both languages
        activeLangMode = 'ALL';
      } else {
        // Toggled -> only Urdu is showed
        activeLangMode = 'UR';
      }
      saveAndRender();
    });

    // Clicking English toggle
    toggleEnglishBtn.addEventListener('click', () => {
      if (activeLangMode === 'EN') {
        // Untoggle -> returns to default both languages
        activeLangMode = 'ALL';
      } else {
        // Toggled -> only English is showed
        activeLangMode = 'EN';
      }
      saveAndRender();
    });
  }

  function updateToggleButtonsUI() {
    // Buttons are active only when explicitly filtering to that language
    toggleUrduBtn.classList.toggle('active', activeLangMode === 'UR');
    toggleEnglishBtn.classList.toggle('active', activeLangMode === 'EN');
  }

  function saveAndRender() {
    localStorage.setItem('mq_lang_mode', activeLangMode);
    updateToggleButtonsUI();
    renderWords();
  }

  // -------------------------------------------------------------
  // 4. Filtering Engine
  // -------------------------------------------------------------
  function getFilteredWords() {
    const rawQuery = searchQuery.trim();
    const normEnQuery = normalizeEnglish(rawQuery);
    const normArQuery = normalizeArabic(rawQuery);

    return DICTIONARY_WORDS.filter(w => {
      // 1. Alphabet Letter Match
      if (activeLetter !== 'ALL' && w.letter !== activeLetter) {
        return false;
      }

      // 2. Category Match
      if (activeCategory !== 'ALL') {
        if (!w.cat.includes(activeCategory)) {
          return false;
        }
      }

      // 3. Search Query Match
      if (rawQuery.length > 0) {
        // Match 1: Transliteration (plain English: "kitab", "ibrahim", "taqwa")
        if (normEnQuery.length > 0 && w.cleanTr.includes(normEnQuery)) {
          return true;
        }

        // Match 2: English Meaning (e.g. "righteous", "covenant", "punishment")
        if (normEnQuery.length > 0 && w.cleanEn && w.cleanEn.includes(normEnQuery)) {
          return true;
        }

        // Match 3: Arabic text (diacritic-tolerant: "متقون", "عاقبه", "ظلمات")
        if (normArQuery.length > 0 && w.cleanAr.includes(normArQuery)) {
          return true;
        }

        // Match 4: Urdu Meaning (e.g. "بخشش", "نافرمانی", "سرکش")
        const normUrduMeaning = normalizeArabic(w.ur);
        if (normArQuery.length > 0 && normUrduMeaning.includes(normArQuery)) {
          return true;
        }

        return false;
      }

      return true;
    });
  }

  // -------------------------------------------------------------
  // 5. Render Words List
  // -------------------------------------------------------------
  function renderWords() {
    const filtered = getFilteredWords();
    wordCountDisplay.textContent = `${filtered.length} words`;

    if (filtered.length === 0) {
      dictionaryList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <div class="empty-state-text">No words found</div>
          <div class="empty-state-hint">Try searching in English (righteous), transliteration (taqwa), Arabic (مُتَّقُونَ), or Urdu (بخشش).</div>
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();

    filtered.forEach((w) => {
      const card = document.createElement('article');
      card.className = 'dict-card';

      // Bilingual Category Badge with consistent Urdu font
      let badgeClass = 'badge-default';
      let badgeText = w.cat;
      if (w.cat.includes('اسْم')) {
        badgeClass = 'badge-noun';
        badgeText = 'Noun • <span class="font-urdu">اسم</span>';
      } else if (w.cat.includes('حَرْف')) {
        badgeClass = 'badge-part';
        badgeText = 'Particle • <span class="font-urdu">حرف</span>';
      } else if (w.cat.includes('عَلَم')) {
        badgeClass = 'badge-prop';
        badgeText = 'Proper Name • <span class="font-urdu">اسمِ علم</span>';
      } else if (w.cat.includes('فِعْل')) {
        badgeClass = 'badge-verb';
        badgeText = 'Verb • <span class="font-urdu">فعل</span>';
      } else if (w.cat.includes('صِفَة')) {
        badgeClass = 'badge-adj';
        badgeText = 'Adjective • <span class="font-urdu">صفت</span>';
      }

      // Meanings section based on activeLangMode:
      // When both are off (activeLangMode === 'ALL'): Both languages are available!
      // When UR is toggled: Only Urdu is showed.
      // When EN is toggled: Only English is showed.
      let meaningsHtml = '';
      let meaningsBoxClass = 'card-meanings';

      if (activeLangMode === 'ALL') {
        meaningsHtml = `
          <div class="meaning-urdu" dir="rtl">${w.ur}</div>
          <div class="meaning-en">${w.en || ''}</div>
        `;
      } else if (activeLangMode === 'UR') {
        meaningsHtml = `
          <div class="meaning-urdu" dir="rtl">${w.ur}</div>
        `;
      } else if (activeLangMode === 'EN') {
        meaningsBoxClass += ' single-en';
        meaningsHtml = `
          <div class="meaning-en">${w.en || ''}</div>
        `;
      }

      card.innerHTML = `
        <div class="card-header">
          <div class="card-meta">
            <span class="card-idx">#${w.idx}</span>
            <span class="card-tr">${w.tr}</span>
            <span class="card-badge ${badgeClass}">${badgeText}</span>
          </div>
          <div class="card-arabic" dir="rtl" title="${w.ar}">${w.ar}</div>
        </div>
        <div class="${meaningsBoxClass}">
          ${meaningsHtml}
        </div>
      `;

      fragment.appendChild(card);
    });

    dictionaryList.innerHTML = '';
    dictionaryList.appendChild(fragment);
  }

  // -------------------------------------------------------------
  // 6. Search Event Handling
  // -------------------------------------------------------------
  function initSearchEvents() {
    let debounceTimer;

    searchInput.addEventListener('input', e => {
      clearTimeout(debounceTimer);
      const val = e.target.value;
      clearSearchBtn.style.display = val.length > 0 ? 'block' : 'none';

      debounceTimer = setTimeout(() => {
        searchQuery = val;
        renderWords();
      }, 100);
    });

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.style.display = 'none';
      searchInput.focus();
      renderWords();
    });

    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (outlineModal.classList.contains('open')) {
          closeOutlineModal();
          return;
        }
        if (document.activeElement === searchInput) {
          searchInput.value = '';
          searchQuery = '';
          clearSearchBtn.style.display = 'none';
          searchInput.blur();
          renderWords();
        }
      } else if (e.key === '/' && document.activeElement !== searchInput && !outlineModal.classList.contains('open')) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
    });
  }

  // -------------------------------------------------------------
  // 7. Course Outline Modal Handlers
  // -------------------------------------------------------------
  function openOutlineModal() {
    outlineModal.classList.add('open');
    outlineModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeOutlineModal() {
    outlineModal.classList.remove('open');
    outlineModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initOutlineModal() {
    outlineToggleBtn.addEventListener('click', openOutlineModal);
    outlineCloseBtn.addEventListener('click', closeOutlineModal);

    outlineModal.addEventListener('click', e => {
      if (e.target === outlineModal) {
        closeOutlineModal();
      }
    });
  }

  // -------------------------------------------------------------
  // 8. Theme Toggle (Dark / Light)
  // -------------------------------------------------------------
  function initTheme() {
    const savedTheme = localStorage.getItem('mq_theme') || 'light';
    applyTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('mq_theme', next);
    });
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggleBtn.innerHTML = '☀️ Light';
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggleBtn.innerHTML = '🌙 Dark';
    }
  }

  // -------------------------------------------------------------
  // 9. Bootstrap Application
  // -------------------------------------------------------------
  function init() {
    initTheme();
    initLanguageToggles();
    initAlphabetBar();
    initCategoryFilters();
    initSearchEvents();
    initOutlineModal();
    renderWords();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
