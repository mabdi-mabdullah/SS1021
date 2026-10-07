/**
 * Quranic Arabic Study Companion — Application Logic
 * High-performance, diacritic-tolerant search across 407 words, 115 Quranic verses/slices & 13 grammar rules
 * Universal search matching both base vocabulary and lesson occurrences
 * Distinct visual presentation for Verse cards vs. Sliced Phrase cards
 * Unified, lesson-agnostic Grammar Rules reference
 * Strict English-only category taxonomy (no emojis)
 */

(function () {
  'use strict';

  // -------------------------------------------------------------
  // State
  // -------------------------------------------------------------
  let activeTab = 'words'; // 'words' | 'ayahs' | 'rules'
  let activeLetter = 'ALL';
  const activeCategory = 'ALL'; // Archived POS filter
  let activeAyahUnit = '2'; // Unit 2 default
  let activeAyahLesson = '1'; // Default to Lesson 1 of selected Unit
  let wordLangMode = 'ALL'; // Words tab mode: 'ALL' (both shown by default) | 'UR' | 'EN'
  let singleLangMode = 'UR'; // Ayahs & Rules mode: 'UR' (default) | 'EN' (strictly one language)
  let searchQuery = '';

  // -------------------------------------------------------------
  // DOM Elements
  // -------------------------------------------------------------
  // Tab Navigation Elements
  const tabWordsBtn = document.getElementById('tabWordsBtn');
  const tabAyahsBtn = document.getElementById('tabAyahsBtn');
  const tabRulesBtn = document.getElementById('tabRulesBtn');
  const viewWords = document.getElementById('viewWords');
  const viewAyahs = document.getElementById('viewAyahs');
  const viewRules = document.getElementById('viewRules');

  // Words View Elements
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const alphabetBar = document.getElementById('alphabetBar');
  const dictionaryList = document.getElementById('dictionaryList');
  const wordCountDisplay = document.getElementById('wordCount');

  // Ayahs View Elements
  const ayahUnitSelect = document.getElementById('ayahUnitSelect');
  const ayahLessonSelect = document.getElementById('ayahLessonSelect');
  const ayahsList = document.getElementById('ayahsList');
  const ayahCountDisplay = document.getElementById('ayahCount');

  // Rules View Elements
  const rulesList = document.getElementById('rulesList');

  // Header & Global Controls
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const toggleBothBtn = document.getElementById('toggleBothBtn');
  const toggleUrduBtn = document.getElementById('toggleUrduBtn');
  const toggleEnglishBtn = document.getElementById('toggleEnglishBtn');
  const backToTopBtn = document.getElementById('backToTopBtn');

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
      .replace(/[\s\-\–\—\.\,\;\:\•\/\(\)\[\]\{\}]/g, '')
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
  // 2. Main Tabs Navigation (Words vs. Ayahs vs. Rules)
  // -------------------------------------------------------------
  function initTabs() {
    tabWordsBtn.addEventListener('click', () => switchTab('words'));
    tabAyahsBtn.addEventListener('click', () => switchTab('ayahs'));
    if (tabRulesBtn) {
      tabRulesBtn.addEventListener('click', () => switchTab('rules'));
    }
  }

  function switchTab(tab) {
    activeTab = tab;
    const isWords = tab === 'words';
    const isAyahs = tab === 'ayahs';
    const isRules = tab === 'rules';

    tabWordsBtn.classList.toggle('active', isWords);
    tabWordsBtn.setAttribute('aria-selected', isWords ? 'true' : 'false');
    tabAyahsBtn.classList.toggle('active', isAyahs);
    tabAyahsBtn.setAttribute('aria-selected', isAyahs ? 'true' : 'false');
    if (tabRulesBtn) {
      tabRulesBtn.classList.toggle('active', isRules);
      tabRulesBtn.setAttribute('aria-selected', isRules ? 'true' : 'false');
    }

    viewWords.style.display = isWords ? 'block' : 'none';
    viewAyahs.style.display = isAyahs ? 'block' : 'none';
    if (viewRules) {
      viewRules.style.display = isRules ? 'block' : 'none';
    }

    updateToggleButtonsUI();
    scrollToTopIfScrolled();

    if (isWords) {
      renderWords();
    } else if (isAyahs) {
      renderAyahs();
    } else if (isRules) {
      renderRules();
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
    populateLessonsForUnit('2');

    ayahUnitSelect.addEventListener('change', () => {
      activeAyahUnit = ayahUnitSelect.value;
      populateLessonsForUnit(activeAyahUnit);
      scrollToTopIfScrolled();
      renderAyahs();
    });

    ayahLessonSelect.addEventListener('change', () => {
      activeAyahLesson = ayahLessonSelect.value;
      scrollToTopIfScrolled();
      renderAyahs();
    });
  }

  // -------------------------------------------------------------
  // 5. Tab-Contextual Language Toggles
  // -------------------------------------------------------------
  function updateToggleButtonsUI() {
    if (activeTab === 'words') {
      if (toggleBothBtn) {
        toggleBothBtn.style.display = '';
        toggleBothBtn.classList.toggle('active', wordLangMode === 'ALL');
      }
      if (toggleUrduBtn) toggleUrduBtn.classList.toggle('active', wordLangMode === 'UR');
      if (toggleEnglishBtn) toggleEnglishBtn.classList.toggle('active', wordLangMode === 'EN');
    } else {
      if (toggleBothBtn) {
        toggleBothBtn.style.display = 'none';
      }
      if (toggleUrduBtn) toggleUrduBtn.classList.toggle('active', singleLangMode === 'UR');
      if (toggleEnglishBtn) toggleEnglishBtn.classList.toggle('active', singleLangMode === 'EN');
    }
  }

  function initLanguageToggles() {
    const savedWordMode = localStorage.getItem('mq_word_lang_mode') || 'ALL';
    const savedSingleMode = localStorage.getItem('mq_single_lang_mode') || 'UR';
    wordLangMode = savedWordMode;
    singleLangMode = savedSingleMode;
    updateToggleButtonsUI();

    if (toggleBothBtn) {
      toggleBothBtn.addEventListener('click', () => {
        if (activeTab === 'words') {
          wordLangMode = 'ALL';
          localStorage.setItem('mq_word_lang_mode', wordLangMode);
          updateToggleButtonsUI();
          renderWords();
        }
      });
    }

    if (toggleUrduBtn) {
      toggleUrduBtn.addEventListener('click', () => {
        if (activeTab === 'words') {
          wordLangMode = 'UR';
          singleLangMode = 'UR';
          localStorage.setItem('mq_word_lang_mode', wordLangMode);
          localStorage.setItem('mq_single_lang_mode', singleLangMode);
          updateToggleButtonsUI();
          renderWords();
        } else {
          singleLangMode = 'UR';
          localStorage.setItem('mq_single_lang_mode', singleLangMode);
          updateToggleButtonsUI();
          if (activeTab === 'ayahs') {
            renderAyahs();
          } else if (activeTab === 'rules') {
            renderRules();
          }
        }
      });
    }

    if (toggleEnglishBtn) {
      toggleEnglishBtn.addEventListener('click', () => {
        if (activeTab === 'words') {
          wordLangMode = 'EN';
          singleLangMode = 'EN';
          localStorage.setItem('mq_word_lang_mode', wordLangMode);
          localStorage.setItem('mq_single_lang_mode', singleLangMode);
          updateToggleButtonsUI();
          renderWords();
        } else {
          singleLangMode = 'EN';
          localStorage.setItem('mq_single_lang_mode', singleLangMode);
          updateToggleButtonsUI();
          if (activeTab === 'ayahs') {
            renderAyahs();
          } else if (activeTab === 'rules') {
            renderRules();
          }
        }
      });
    }
  }

  // -------------------------------------------------------------
  // 6. Universal Filtering Engine (Words & Lessons)
  // -------------------------------------------------------------
  function getFilteredWords() {
    if (typeof DICTIONARY_WORDS === 'undefined') return [];
    const rawQuery = searchQuery.trim();
    const normEnQuery = normalizeEnglish(rawQuery);
    const normArQuery = normalizeArabic(rawQuery);

    if (rawQuery.length === 0) {
      return DICTIONARY_WORDS.filter(w => {
        if (activeLetter !== 'ALL' && w.letter !== activeLetter) return false;
        return true;
      });
    }

    const scoredMatches = [];

    DICTIONARY_WORDS.forEach(w => {

      let score = 0;

      // Decompose Arabic word variants (handling parentheticals like "أَذْقَانٌ (ذَقَنٌ)")
      const normWordFull = normalizeArabic(w.ar);
      const parts = w.ar.split(/[(\/]/);
      const normWordPrimary = normalizeArabic(parts[0]);
      const normWordParen = parts.length > 1 ? normalizeArabic(parts[1]) : '';

      // Decompose Transliteration variants
      const normTrFull = normalizeEnglish(w.tr);
      const trParts = w.tr.split(/[(\/]/);
      const normTrPrimary = normalizeEnglish(trParts[0]);
      const normTrParen = trParts.length > 1 ? normalizeEnglish(trParts[1]) : '';

      // Exact match on Arabic or Transliteration (Score: 1000)
      const exactAr = normArQuery.length > 0 && (
        normWordPrimary === normArQuery ||
        (normWordParen && normWordParen === normArQuery) ||
        normWordFull === normArQuery
      );
      const exactTr = normEnQuery.length > 0 && (
        normTrPrimary === normEnQuery ||
        (normTrParen && normTrParen === normEnQuery) ||
        normTrFull === normEnQuery
      );

      // Prefix match on Arabic or Transliteration (Score: 500)
      const startsAr = normArQuery.length > 0 && (
        normWordPrimary.startsWith(normArQuery) ||
        (normWordParen && normWordParen.startsWith(normArQuery)) ||
        normWordFull.startsWith(normArQuery)
      );
      const startsTr = normEnQuery.length > 0 && (
        normTrPrimary.startsWith(normEnQuery) ||
        (normTrParen && normTrParen.startsWith(normEnQuery)) ||
        normTrFull.startsWith(normEnQuery)
      );

      // Substring match on Arabic or Transliteration (Score: 250)
      const containsAr = normArQuery.length > 0 && (
        normWordFull.includes(normArQuery) ||
        normWordPrimary.includes(normArQuery) ||
        (normWordParen && normWordParen.includes(normArQuery))
      );
      const containsTr = normEnQuery.length > 0 && (
        normTrFull.includes(normEnQuery) ||
        normTrPrimary.includes(normEnQuery) ||
        (normTrParen && normTrParen.includes(normEnQuery))
      );

      if (exactAr || exactTr) {
        score = 1000;
      } else if (startsAr || startsTr) {
        score = 500;
      } else if (containsAr || containsTr) {
        score = 250;
      } else {
        // Meaning matches (Score: 10)
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

    scoredMatches.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.word.idx - b.word.idx;
    });

    return scoredMatches.map(item => item.word);
  }

  // Universal search matches across Quranic Ayahs and Slices
  function getMatchedAyahsForQuery(rawQuery) {
    if (!rawQuery || typeof QURANIC_AYAHS === 'undefined') return [];
    const query = rawQuery.trim();
    if (query.length < 2) return [];

    const normEnQuery = normalizeEnglish(query);
    const normArQuery = normalizeArabic(query);

    return QURANIC_AYAHS.filter(a => {
      const cleanAr = normalizeArabic(a.arabic);
      if (normArQuery.length > 0 && cleanAr.includes(normArQuery)) return true;

      const cleanEn = normalizeEnglish(a.en);
      if (normEnQuery.length >= 3 && cleanEn.includes(normEnQuery)) return true;

      const cleanUr = normalizeArabic(a.urdu);
      if (normArQuery.length >= 3 && cleanUr.includes(normArQuery)) return true;

      return false;
    });
  }

  // -------------------------------------------------------------
  // 7. Universal Render Words & Occurrences List
  // -------------------------------------------------------------
  function renderWords() {
    const rawQuery = searchQuery.trim();
    const isSearching = rawQuery.length > 0;
    const filteredWords = getFilteredWords();
    const matchedAyahs = isSearching ? getMatchedAyahsForQuery(rawQuery) : [];

    if (wordCountDisplay) {
      wordCountDisplay.textContent = `${filteredWords.length} words`;
    }

    if (filteredWords.length === 0 && matchedAyahs.length === 0) {
      dictionaryList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-text">No words or lesson phrases found</div>
          <div class="empty-state-hint">Try searching without diacritics / اعراب (e.g. متقون, الله) or transliteration (taqwa, lillah).</div>
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();

    // Render Base Vocabulary Cards
    filteredWords.forEach((w) => {
      const card = document.createElement('article');
      card.className = 'dict-card';

      let badgeClass = 'badge-default';
      let badgeText = 'Noun';
      if (w.cat.includes('اسْم')) {
        badgeClass = 'badge-noun';
        badgeText = 'Noun';
      } else if (w.cat.includes('حَرْف')) {
        badgeClass = 'badge-part';
        badgeText = 'Particle';
      } else if (w.cat.includes('عَلَم')) {
        badgeClass = 'badge-prop';
        badgeText = 'Proper Name';
      } else if (w.cat.includes('فِعْل')) {
        badgeClass = 'badge-verb';
        badgeText = 'Verb';
      } else if (w.cat.includes('صِفَة')) {
        badgeClass = 'badge-adj';
        badgeText = 'Adjective';
      }

      let meaningsHtml = '';
      let meaningsBoxClass = 'card-meanings';

      if (wordLangMode === 'ALL') {
        meaningsHtml = `
          <div class="meaning-urdu" dir="rtl">${w.ur}</div>
          <div class="meaning-en">${w.en || ''}</div>
        `;
      } else if (wordLangMode === 'UR') {
        meaningsHtml = `
          <div class="meaning-urdu" dir="rtl">${w.ur}</div>
        `;
      } else if (wordLangMode === 'EN') {
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

    // Render Lesson Occurrences & Phrases if searching
    if (isSearching && matchedAyahs.length > 0) {
      const sectionHeader = document.createElement('div');
      sectionHeader.className = 'search-section-header';
      sectionHeader.innerHTML = `
        <span class="search-section-title">Lesson Occurrences & Phrases</span>
        <span class="search-section-count">${matchedAyahs.length} matches</span>
      `;
      fragment.appendChild(sectionHeader);

      matchedAyahs.forEach((a, idx) => {
        fragment.appendChild(createAyahCard(a, idx));
      });
    }

    dictionaryList.innerHTML = '';
    dictionaryList.appendChild(fragment);
  }

  // -------------------------------------------------------------
  // 8. Filtering Engine (Ayahs: Unit > Lesson only)
  // -------------------------------------------------------------
  function getFilteredAyahs() {
    if (typeof QURANIC_AYAHS === 'undefined') return [];

    return QURANIC_AYAHS.filter(a => {
      if (a.unit.toString() !== activeAyahUnit) return false;
      if (a.lesson.toString() !== activeAyahLesson) return false;
      return true;
    });
  }

  // -------------------------------------------------------------
  // 9. Reusable Ayah & Slice Card Factory
  // -------------------------------------------------------------
  function createAyahCard(a, idx) {
    const card = document.createElement('article');
    const isSlice = a.isSlice === true;
    card.className = isSlice ? 'ayah-card slice-card' : 'ayah-card';

    const sliceDividerHtml = ' <span class="slice-divider">/</span> ';
    let arabicHtml = '';
    let meaningText = '';

    if (isSlice) {
      if (a.arabic && a.arabic.includes('/')) {
        arabicHtml = a.arabic.split(/\s*\/\s*/).join(sliceDividerHtml);
      } else if (a.chunks && a.chunks.length > 0) {
        arabicHtml = a.chunks.map(c => c.ar).join(sliceDividerHtml);
      } else {
        arabicHtml = a.arabic;
      }

      if (singleLangMode === 'UR') {
        const rawUrdu = a.urdu || '';
        if (rawUrdu.includes('/')) {
          meaningText = rawUrdu.split(/\s*\/\s*/).join(sliceDividerHtml);
        } else if (a.chunks && a.chunks.length > 0) {
          meaningText = a.chunks.map(c => c.ur).join(sliceDividerHtml);
        } else {
          meaningText = rawUrdu;
        }
      } else {
        const rawEn = a.en || '';
        if (rawEn.includes('/')) {
          meaningText = rawEn.split(/\s*\/\s*/).join(sliceDividerHtml);
        } else if (a.chunks && a.chunks.length > 0) {
          meaningText = a.chunks.map(c => c.en).join(sliceDividerHtml);
        } else {
          meaningText = rawEn;
        }
      }
    } else {
      arabicHtml = a.arabic;
      meaningText = (singleLangMode === 'UR') ? (a.urdu || '') : (a.en || '');
    }

    let meaningsHtml = '';
    let meaningsBoxClass = 'ayah-meanings';

    if (singleLangMode === 'UR') {
      meaningsHtml = `<div class="meaning-urdu" dir="rtl">${meaningText}</div>`;
    } else {
      meaningsBoxClass += ' single-en';
      meaningsHtml = `<div class="meaning-en">${meaningText}</div>`;
    }

    let headerHtml = '';
    if (isSlice) {
      headerHtml = `
        <div class="slice-header">
          <span class="slice-badge">Phrase Slices</span>
          <span class="slice-num">#${idx + 1}</span>
        </div>
      `;
    } else {
      headerHtml = `<span class="ayah-num">#${idx + 1}</span>`;
    }

    card.innerHTML = `
      ${headerHtml}
      <div class="ayah-arabic" dir="rtl">
        ${arabicHtml}
      </div>
      <div class="${meaningsBoxClass}">
        ${meaningsHtml}
      </div>
    `;

    return card;
  }

  // -------------------------------------------------------------
  // 10. Render Ayahs & Slices List
  // -------------------------------------------------------------
  function renderAyahs() {
    const filtered = getFilteredAyahs();
    if (ayahCountDisplay) {
      ayahCountDisplay.textContent = `${filtered.length} verses`;
    }

    if (filtered.length === 0) {
      ayahsList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-text">No verses found</div>
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();

    filtered.forEach((a, idx) => {
      fragment.appendChild(createAyahCard(a, idx));
    });

    ayahsList.innerHTML = '';
    ayahsList.appendChild(fragment);
  }

  // -------------------------------------------------------------
  // 11. Render Grammar Rules List (All in one place, no lesson labels)
  // -------------------------------------------------------------
  function renderRules() {
    if (!rulesList || typeof GRAMMAR_RULES === 'undefined') return;

    const rulesTitleEl = document.querySelector('.rules-title');
    const rulesDescEl = document.querySelector('.rules-desc');
    if (rulesTitleEl && rulesDescEl) {
      if (singleLangMode === 'UR') {
        rulesTitleEl.textContent = 'قرآنی قواعد و نحوی عوامل';
        rulesDescEl.textContent = 'نحوی عوامل، اعرابی اثرات اور قواعد کا جامع نصابی خلاصہ۔';
      } else {
        rulesTitleEl.textContent = 'Quranic Grammar Rules & Syntactic Operators';
        rulesDescEl.textContent = 'A unified reference of grammatical operators, syntactic formulas, and case effects (I\'rab) across the curriculum.';
      }
    }

    const fragment = document.createDocumentFragment();

    GRAMMAR_RULES.forEach(r => {
      const card = document.createElement('article');
      card.className = 'rule-card';

      const isUr = singleLangMode === 'UR';
      const titleBadge = isUr ? r.titleUr : r.titleEn;
      const effectBadge = isUr ? r.caseEffectUr : r.caseEffectEn;
      const formulaLabel = isUr ? 'قاعدہ / کلیہ:' : 'Formula / Pattern:';

      const meaningHtml = isUr
        ? `<div class="rule-meaning-ur" dir="rtl"><strong>مفہوم:</strong> ${r.primaryMeaningUr}</div>`
        : `<div class="rule-meaning-en"><strong>Meaning:</strong> ${r.primaryMeaningEn}</div>`;

      const expHtml = isUr
        ? `<div class="rule-exp-ur" dir="rtl">${r.explanationUr}</div>`
        : `<div class="rule-exp-en">${r.explanationEn}</div>`;

      // Sub-rules Section & Cards (Strictly Single Language)
      let subRulesHtml = '';
      if (r.subRules && r.subRules.length > 0) {
        const subRuleItems = r.subRules.map(sr => {
          const inner = isUr
            ? `<div class="subrule-title-ur" dir="rtl">${sr.titleUr}</div>
               <div class="subrule-text-ur" dir="rtl">${sr.textUr}</div>`
            : `<div class="subrule-title-en">${sr.titleEn}</div>
               <div class="subrule-text-en">${sr.textEn}</div>`;
          return `<div class="rule-subrule-card">${inner}</div>`;
        }).join('');

        const subRulesTitle = isUr 
          ? 'اہم ذیلی قواعد و مشقی نکات' 
          : 'Key Sub-rules & Practice Patterns';

        subRulesHtml = `
          <div class="rule-subrules-section">
            <span class="rule-section-title">${subRulesTitle}</span>
            <div class="rule-subrules-grid">
              ${subRuleItems}
            </div>
          </div>
        `;
      }

      // Quranic Examples (Strictly Single Language)
      let examplesHtml = '';
      if (r.examples && r.examples.length > 0) {
        const examplesTitle = isUr 
          ? 'قرآنی تطبیقات و امثلہ' 
          : 'Quranic Applications & Examples';

        examplesHtml = `
          <div class="rule-examples-box">
            <span class="rule-examples-title">${examplesTitle}</span>
            ${r.examples.map(ex => `
              <div class="rule-example-item">
                <div class="rule-ex-ar" dir="rtl">${ex.ar}</div>
                ${isUr ? `<div class="rule-ex-ur" dir="rtl">${ex.ur}</div>` : `<div class="rule-ex-en">${ex.en}</div>`}
              </div>
            `).join('')}
          </div>
        `;
      }

      card.innerHTML = `
        <div class="rule-header">
          <div class="rule-operator-box">
            <span class="rule-operator" dir="rtl">${r.operator}</span>
            <span class="rule-operator-tr">${r.operatorTr}</span>
          </div>
          <div class="rule-meta-badges">
            <span class="rule-title-badge">${titleBadge}</span>
            <span class="rule-effect-badge">${effectBadge}</span>
          </div>
        </div>

        <div class="rule-formula-box">
          <span class="rule-formula-label">${formulaLabel}</span>
          <span class="rule-formula-text">${r.formula}</span>
        </div>

        <div class="rule-meaning-box">
          ${meaningHtml}
        </div>

        <div class="rule-explanation-box">
          ${expHtml}
        </div>

        ${subRulesHtml}
        ${examplesHtml}
      `;

      fragment.appendChild(card);
    });

    rulesList.innerHTML = '';
    rulesList.appendChild(fragment);
  }

  // -------------------------------------------------------------
  // 12. Search Event Handling (Words View only)
  // -------------------------------------------------------------
  function initSearchEvents() {
    let debounceTimer;

    searchInput.addEventListener('input', e => {
      clearTimeout(debounceTimer);
      const val = e.target.value;
      clearSearchBtn.style.display = val.length > 0 ? 'block' : 'none';

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
      }, 80);
    });

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.style.display = 'none';
      searchInput.focus();
      scrollToTopIfScrolled();
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
  // 13. Course Outline Modal Handlers
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
  // 14. Theme Toggle (Dark / Light - No emojis)
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
      themeToggleBtn.textContent = 'Light';
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggleBtn.textContent = 'Dark';
    }
  }

  // -------------------------------------------------------------
  // 15. Floating Back to Top Button
  // -------------------------------------------------------------
  function initBackToTop() {
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------
  // 16. Bootstrap Application
  // -------------------------------------------------------------
  function init() {
    initTheme();
    initLanguageToggles();
    initTabs();
    initAlphabetBar();
    initAyahFilters();
    initSearchEvents();
    initOutlineModal();
    initBackToTop();
    renderWords();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
