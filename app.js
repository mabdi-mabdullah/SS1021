/**
 * Quranic Arabic Dictionary & Ayahs Companion — Application Logic
 * High-performance, diacritic-tolerant search across 407 words & 115 Quranic verses
 * Prioritizes Arabic and transliteration over meanings
 * Separate tabs for Words (الفاظ) and Ayahs (آیات)
 * Pure Unit & Lesson hierarchy (no rule/tag clutter in Ayahs, non-searchable Ayahs)
 */

(function () {
  'use strict';

  // -------------------------------------------------------------
  // State
  // -------------------------------------------------------------
  let activeTab = 'words'; // 'words' | 'ayahs'
  let activeLetter = 'ALL';
  let activeCategory = 'ALL';
  let activeAyahUnit = '2'; // Unit 2 default
  let activeAyahLesson = '1'; // Default to Lesson 1 of selected Unit
  let activeLangMode = 'ALL'; // 'ALL' (both shown by default), 'UR' (Urdu only), 'EN' (English only)
  let searchQuery = '';

  // -------------------------------------------------------------
  // DOM Elements
  // -------------------------------------------------------------
  // Tab Navigation Elements
  const tabWordsBtn = document.getElementById('tabWordsBtn');
  const tabAyahsBtn = document.getElementById('tabAyahsBtn');
  const viewWords = document.getElementById('viewWords');
  const viewAyahs = document.getElementById('viewAyahs');

  // Words View Elements
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const alphabetBar = document.getElementById('alphabetBar');
  const dictionaryList = document.getElementById('dictionaryList');
  const wordCountDisplay = document.getElementById('wordCount');
  const catFilterBtns = document.querySelectorAll('.cat-filter-btn');

  // Ayahs View Elements (Simple Unit & Lesson, no search)
  const ayahUnitSelect = document.getElementById('ayahUnitSelect');
  const ayahLessonSelect = document.getElementById('ayahLessonSelect');
  const ayahsList = document.getElementById('ayahsList');
  const ayahCountDisplay = document.getElementById('ayahCount');

  // Header & Global Controls
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const toggleUrduBtn = document.getElementById('toggleUrduBtn');
  const toggleEnglishBtn = document.getElementById('toggleEnglishBtn');

  // Modal Elements
  const outlineToggleBtn = document.getElementById('outlineToggleBtn');
  const outlineModal = document.getElementById('outlineModal');
  const outlineCloseBtn = document.getElementById('outlineCloseBtn');

  // Arabic Alphabet list for the Words filter bar
  const ARABIC_ALPHABET = [
    'أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 
    'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 
    'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي'
  ];

  // -------------------------------------------------------------
  // 1. Text Normalization Helpers & Scroll Utility
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
      .replace(/[\s\-\–\—\.\,\;\:\•]/g, '')
      .trim();
  }

  // Smooth scroll back to top of list/page when searching or changing filters
  function scrollToTopIfScrolled() {
    if (window.scrollY > 40) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  // -------------------------------------------------------------
  // 2. Main Tabs Navigation (Words vs. Ayahs)
  // -------------------------------------------------------------
  function initTabs() {
    tabWordsBtn.addEventListener('click', () => switchTab('words'));
    tabAyahsBtn.addEventListener('click', () => switchTab('ayahs'));
  }

  function switchTab(tab) {
    activeTab = tab;
    const isWords = tab === 'words';

    tabWordsBtn.classList.toggle('active', isWords);
    tabWordsBtn.setAttribute('aria-selected', isWords ? 'true' : 'false');
    tabAyahsBtn.classList.toggle('active', !isWords);
    tabAyahsBtn.setAttribute('aria-selected', !isWords ? 'true' : 'false');

    viewWords.style.display = isWords ? 'block' : 'none';
    viewAyahs.style.display = !isWords ? 'block' : 'none';

    scrollToTopIfScrolled();

    if (!isWords) {
      renderAyahs();
    } else {
      renderWords();
    }
  }

  // -------------------------------------------------------------
  // 3. Alphabet Bar (Words View)
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
    if (typeof DICTIONARY_WORDS !== 'undefined') {
      DICTIONARY_WORDS.forEach(w => {
        letterCounts[w.letter] = (letterCounts[w.letter] || 0) + 1;
      });
    }

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
    scrollToTopIfScrolled();
    renderWords();
  }

  // -------------------------------------------------------------
  // 4. Unit & Lesson Dual Filter Boxes (Ayahs View)
  // -------------------------------------------------------------
  function populateLessonsForUnit(unitVal) {
    ayahLessonSelect.innerHTML = '';

    if (unitVal === '2') {
      for (let i = 1; i <= 13; i++) {
        const opt = document.createElement('option');
        opt.value = i.toString();
        opt.textContent = `Lesson ${i}`;
        ayahLessonSelect.appendChild(opt);
      }
      ayahLessonSelect.value = '1';
      activeAyahLesson = '1';
    } else {
      const opt = document.createElement('option');
      opt.value = '1';
      opt.textContent = 'Lesson 1';
      ayahLessonSelect.appendChild(opt);
      activeAyahLesson = '1';
    }
  }

  function initAyahFilters() {
    // Populate Unit 2 lessons by default
    populateLessonsForUnit('2');

    // Unit change listener (defaults to Lesson 1 of selected unit)
    ayahUnitSelect.addEventListener('change', () => {
      activeAyahUnit = ayahUnitSelect.value;
      populateLessonsForUnit(activeAyahUnit);
      scrollToTopIfScrolled();
      renderAyahs();
    });

    // Lesson change listener
    ayahLessonSelect.addEventListener('change', () => {
      activeAyahLesson = ayahLessonSelect.value;
      scrollToTopIfScrolled();
      renderAyahs();
    });
  }

  // -------------------------------------------------------------
  // 5. Category & Language Filter Toggles
  // -------------------------------------------------------------
  function initCategoryFilters() {
    catFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        catFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-cat') || 'ALL';
        scrollToTopIfScrolled();
        renderWords();
      });
    });
  }

  function initLanguageToggles() {
    const savedMode = localStorage.getItem('mq_lang_mode') || 'ALL';
    activeLangMode = savedMode;
    updateToggleButtonsUI();

    toggleUrduBtn.addEventListener('click', () => {
      activeLangMode = (activeLangMode === 'UR') ? 'ALL' : 'UR';
      saveAndRender();
    });

    toggleEnglishBtn.addEventListener('click', () => {
      activeLangMode = (activeLangMode === 'EN') ? 'ALL' : 'EN';
      saveAndRender();
    });
  }

  function updateToggleButtonsUI() {
    toggleUrduBtn.classList.toggle('active', activeLangMode === 'UR');
    toggleEnglishBtn.classList.toggle('active', activeLangMode === 'EN');
  }

  function saveAndRender() {
    localStorage.setItem('mq_lang_mode', activeLangMode);
    updateToggleButtonsUI();
    renderWords();
    renderAyahs();
  }

  // -------------------------------------------------------------
  // 6. Filtering Engine (Words: Prioritizes Arabic & Transliteration)
  // -------------------------------------------------------------
  function getFilteredWords() {
    if (typeof DICTIONARY_WORDS === 'undefined') return [];
    const rawQuery = searchQuery.trim();
    const normEnQuery = normalizeEnglish(rawQuery);
    const normArQuery = normalizeArabic(rawQuery);

    // If no search query, filter by letter and category preserving alphabetical order
    if (rawQuery.length === 0) {
      return DICTIONARY_WORDS.filter(w => {
        if (activeLetter !== 'ALL' && w.letter !== activeLetter) return false;
        if (activeCategory !== 'ALL' && !w.cat.includes(activeCategory)) return false;
        return true;
      });
    }

    // When searching: Strictly prioritize Arabic and Transliteration
    const scoredMatches = [];

    DICTIONARY_WORDS.forEach(w => {
      if (activeCategory !== 'ALL' && !w.cat.includes(activeCategory)) return;

      let score = 0;

      // 1. Exact match on Arabic or Transliteration (Highest priority: 1000)
      const exactAr = normArQuery.length > 0 && w.cleanAr === normArQuery;
      const exactTr = normEnQuery.length > 0 && w.cleanTr === normEnQuery;

      // 2. Starts-with prefix match on Arabic or Transliteration (Priority: 500)
      const startsAr = normArQuery.length > 0 && w.cleanAr.startsWith(normArQuery);
      const startsTr = normEnQuery.length > 0 && w.cleanTr.startsWith(normEnQuery);

      // 3. Substring match on Arabic or Transliteration (Priority: 250)
      const containsAr = normArQuery.length > 0 && w.cleanAr.includes(normArQuery);
      const containsTr = normEnQuery.length > 0 && w.cleanTr.includes(normEnQuery);

      if (exactAr || exactTr) {
        score = 1000;
      } else if (startsAr || startsTr) {
        score = 500;
      } else if (containsAr || containsTr) {
        score = 250;
      } else {
        // 4. Meaning matches (strictly secondary, requiring at least 3 chars)
        // Token-level check so random partial collisions do not displace real words
        const containsEnMeaning = normEnQuery.length >= 3 && w.cleanEn && 
          w.cleanEn.split(/\s+/).some(token => token === normEnQuery || token.startsWith(normEnQuery));
        const normUr = normalizeArabic(w.ur);
        const containsUrMeaning = normArQuery.length >= 3 && 
          normUr.split(/\s+/).some(token => token === normArQuery || token.startsWith(normArQuery));

        if (containsEnMeaning || containsUrMeaning) {
          score = 10;
        }
      }

      if (score > 0) {
        scoredMatches.push({ word: w, score });
      }
    });

    // Sort: Highest match score first, then fallback to original alphabetical order
    scoredMatches.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.word.idx - b.word.idx;
    });

    return scoredMatches.map(item => item.word);
  }

  // -------------------------------------------------------------
  // 7. Render Words List
  // -------------------------------------------------------------
  function renderWords() {
    const filtered = getFilteredWords();
    if (wordCountDisplay) {
      wordCountDisplay.textContent = `${filtered.length} words`;
    }

    if (filtered.length === 0) {
      dictionaryList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <div class="empty-state-text">No words found</div>
          <div class="empty-state-hint">Try searching by Arabic (مُتَّقُونَ) or transliteration (taqwa, allah).</div>
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();

    filtered.forEach((w) => {
      const card = document.createElement('article');
      card.className = 'dict-card';

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
  // 8. Filtering Engine (Ayahs: Unit > Lesson only, no search)
  // -------------------------------------------------------------
  function getFilteredAyahs() {
    if (typeof QURANIC_AYAHS === 'undefined') return [];

    return QURANIC_AYAHS.filter(a => {
      // 1. Unit Filter (Unit 2 default)
      if (a.unit.toString() !== activeAyahUnit) {
        return false;
      }

      // 2. Lesson Filter (Lesson 1 default)
      if (a.lesson.toString() !== activeAyahLesson) {
        return false;
      }

      return true;
    });
  }

  // -------------------------------------------------------------
  // 9. Render Ayahs List (Word-to-Translation Color Coded)
  // -------------------------------------------------------------
  function renderAyahs() {
    const filtered = getFilteredAyahs();
    if (ayahCountDisplay) {
      ayahCountDisplay.textContent = `${filtered.length} verses`;
    }

    if (filtered.length === 0) {
      ayahsList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📜</div>
          <div class="empty-state-text">No verses found</div>
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();

    filtered.forEach((a, idx) => {
      const card = document.createElement('article');
      card.className = 'ayah-card';

      // Check for color-coded chunks
      let arabicHtml = '';
      let urduHtml = '';
      let enHtml = '';

      if (a.chunks && a.chunks.length > 0) {
        arabicHtml = a.chunks.map((c, cIdx) => 
          `<span class="chunk-seg chunk-${cIdx % 6}" data-chunk="${cIdx}">${c.ar}</span>`
        ).join(' ');

        urduHtml = a.chunks.map((c, cIdx) => 
          `<span class="chunk-seg chunk-${cIdx % 6}" data-chunk="${cIdx}">${c.ur}</span>`
        ).join(' ');

        enHtml = a.chunks.map((c, cIdx) => 
          `<span class="chunk-seg chunk-${cIdx % 6}" data-chunk="${cIdx}">${c.en}</span>`
        ).join(' ');
      } else {
        arabicHtml = a.arabic;
        urduHtml = a.urdu;
        enHtml = a.en;
      }

      let meaningsHtml = '';
      let meaningsBoxClass = 'ayah-meanings';

      if (activeLangMode === 'ALL') {
        meaningsHtml = `
          <div class="meaning-urdu" dir="rtl">${urduHtml}</div>
          <div class="meaning-en">${enHtml}</div>
        `;
      } else if (activeLangMode === 'UR') {
        meaningsHtml = `
          <div class="meaning-urdu" dir="rtl">${urduHtml}</div>
        `;
      } else if (activeLangMode === 'EN') {
        meaningsBoxClass += ' single-en';
        meaningsHtml = `
          <div class="meaning-en">${enHtml}</div>
        `;
      }

      // Clean Ayah Card: subtle verse numeral, prominent color-coded Arabic, and synchronized color translations
      card.innerHTML = `
        <span class="ayah-num">#${idx + 1}</span>
        <div class="ayah-arabic" dir="rtl">
          ${arabicHtml}
        </div>
        <div class="${meaningsBoxClass}">
          ${meaningsHtml}
        </div>
      `;

      // Synchronized hover & mobile tap highlighting across Arabic, Urdu, and English
      function setChunkHighlight(chunkId) {
        card.querySelectorAll('.chunk-seg').forEach(el => {
          if (el.getAttribute('data-chunk') === chunkId) {
            el.classList.add('chunk-hover');
          } else {
            el.classList.remove('chunk-hover');
          }
        });
      }

      function clearChunkHighlight() {
        card.querySelectorAll('.chunk-seg').forEach(el => el.classList.remove('chunk-hover'));
      }

      card.addEventListener('mouseover', (e) => {
        const seg = e.target.closest('.chunk-seg');
        if (!seg) return;
        setChunkHighlight(seg.getAttribute('data-chunk'));
      });

      card.addEventListener('mouseout', (e) => {
        const seg = e.target.closest('.chunk-seg');
        if (!seg) return;
        clearChunkHighlight();
      });

      card.addEventListener('click', (e) => {
        const seg = e.target.closest('.chunk-seg');
        if (!seg) {
          clearChunkHighlight();
          return;
        }
        const cId = seg.getAttribute('data-chunk');
        if (seg.classList.contains('chunk-hover')) {
          clearChunkHighlight();
        } else {
          setChunkHighlight(cId);
        }
      });

      fragment.appendChild(card);
    });

    ayahsList.innerHTML = '';
    ayahsList.appendChild(fragment);
  }

  // -------------------------------------------------------------
  // 10. Search Event Handling (Words View only)
  // -------------------------------------------------------------
  function initSearchEvents() {
    let debounceTimer;

    searchInput.addEventListener('input', e => {
      clearTimeout(debounceTimer);
      const val = e.target.value;
      clearSearchBtn.style.display = val.length > 0 ? 'block' : 'none';

      // When starting a search query, reset letter filter to ALL so entire lexicon is searched
      if (val.length > 0 && activeLetter !== 'ALL') {
        activeLetter = 'ALL';
        document.querySelectorAll('.letter-btn').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-letter') === 'ALL');
        });
      }

      scrollToTopIfScrolled();

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
      scrollToTopIfScrolled();
      renderWords();
    });

    // Keyboard Shortcuts
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
          scrollToTopIfScrolled();
          renderWords();
        }
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) && !outlineModal.classList.contains('open')) {
        e.preventDefault();
        if (activeTab === 'words') {
          searchInput.focus();
          searchInput.select();
        }
      }
    });
  }

  // -------------------------------------------------------------
  // 11. Course Outline Modal Handlers
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
  // 12. Theme Toggle (Dark / Light)
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
  // 13. Bootstrap Application
  // -------------------------------------------------------------
  function init() {
    initTheme();
    initLanguageToggles();
    initTabs();
    initAlphabetBar();
    initCategoryFilters();
    initAyahFilters();
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
