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
  let activeTab = 'words'; // 'words' | 'ayahs' | 'rules' | 'tajweed'
  let activeLetter = 'ALL';
  const activeCategory = 'ALL'; // Archived POS filter
  let activeAyahUnit = '2'; // Unit 2 default
  let activeAyahLesson = '1'; // Default to Lesson 1 of selected Unit
  let wordLangMode = 'ALL'; // Words tab mode: 'ALL' (both shown by default) | 'UR' | 'EN'
  let singleLangMode = 'UR'; // Ayahs & Rules mode: 'UR' (default) | 'EN' (strictly one language)
  let searchQuery = '';
  let activeRuleIndex = 0; // Active rule for Island navigation
  let rulesDisplayMode = 'island'; // 'island' (one rule at a time) | 'all' (continuous)

  // -------------------------------------------------------------
  // DOM Elements
  // -------------------------------------------------------------
  // Tab Navigation Elements
  const tabTajweedBtn = document.getElementById('tabTajweedBtn');
  const tabRulesBtn = document.getElementById('tabRulesBtn');
  const tabWordsBtn = document.getElementById('tabWordsBtn');
  const tabAyahsBtn = document.getElementById('tabAyahsBtn');
  const viewTajweed = document.getElementById('viewTajweed');
  const viewRules = document.getElementById('viewRules');
  const viewWords = document.getElementById('viewWords');
  const viewAyahs = document.getElementById('viewAyahs');
  const tajweedList = document.getElementById('tajweedList');

  // Words View Elements
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const alphabetBar = document.getElementById('alphabetBar');
  const dictionaryList = document.getElementById('dictionaryList');
  const wordCountDisplay = document.getElementById('wordCount');

  // Ayahs View Elements
  const ayahFilterRow = document.getElementById('ayahFilterRow');
  const ayahUnitLabel = document.getElementById('ayahUnitLabel');
  const ayahUnitSelect = document.getElementById('ayahUnitSelect');
  const ayahLessonLabel = document.getElementById('ayahLessonLabel');
  const ayahLessonSelect = document.getElementById('ayahLessonSelect');
  const ayahsList = document.getElementById('ayahsList');
  const ayahCountDisplay = document.getElementById('ayahCount');

  // Rules View Elements
  const ruleFilterRow = document.getElementById('ruleFilterRow');
  const ruleUnitLabel = document.getElementById('ruleUnitLabel');
  const ruleUnitSelect = document.getElementById('ruleUnitSelect');
  const ruleSelectLabel = document.getElementById('ruleSelectLabel');
  const ruleSelect = document.getElementById('ruleSelect');
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
  // 2. Main Tabs Navigation (Tajweed vs. Rules vs. Words vs. Ayahs)
  // -------------------------------------------------------------
  function initTabs() {
    if (tabTajweedBtn) {
      tabTajweedBtn.addEventListener('click', () => switchTab('tajweed'));
    }
    if (tabRulesBtn) {
      tabRulesBtn.addEventListener('click', () => switchTab('rules'));
    }
    tabWordsBtn.addEventListener('click', () => switchTab('words'));
    tabAyahsBtn.addEventListener('click', () => switchTab('ayahs'));
  }

  function switchTab(tab) {
    activeTab = tab;
    const isTajweed = tab === 'tajweed';
    const isRules = tab === 'rules';
    const isWords = tab === 'words';
    const isAyahs = tab === 'ayahs';

    if (tabTajweedBtn) {
      tabTajweedBtn.classList.toggle('active', isTajweed);
      tabTajweedBtn.setAttribute('aria-selected', isTajweed ? 'true' : 'false');
    }
    if (tabRulesBtn) {
      tabRulesBtn.classList.toggle('active', isRules);
      tabRulesBtn.setAttribute('aria-selected', isRules ? 'true' : 'false');
    }
    tabWordsBtn.classList.toggle('active', isWords);
    tabWordsBtn.setAttribute('aria-selected', isWords ? 'true' : 'false');
    tabAyahsBtn.classList.toggle('active', isAyahs);
    tabAyahsBtn.setAttribute('aria-selected', isAyahs ? 'true' : 'false');

    if (viewTajweed) {
      viewTajweed.style.display = isTajweed ? 'block' : 'none';
    }
    if (viewRules) {
      viewRules.style.display = isRules ? 'block' : 'none';
    }
    viewWords.style.display = isWords ? 'block' : 'none';
    viewAyahs.style.display = isAyahs ? 'block' : 'none';

    updateToggleButtonsUI();
    scrollToTopIfScrolled();

    if (isTajweed) {
      renderTajweed();
    } else if (isRules) {
      renderRules();
    } else if (isWords) {
      renderWords();
    } else if (isAyahs) {
      renderAyahs();
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
    if (!ayahLessonSelect) return;
    const isUr = singleLangMode === 'UR';
    const previousVal = activeAyahLesson;
    ayahLessonSelect.innerHTML = '';

    if (unitVal === '2') {
      for (let i = 1; i <= 13; i++) {
        const opt = document.createElement('option');
        opt.value = i.toString();
        opt.textContent = isUr ? `سبق ${i}` : `Lesson ${i}`;
        ayahLessonSelect.appendChild(opt);
      }
      ayahLessonSelect.value = previousVal && parseInt(previousVal, 10) <= 13 ? previousVal : '1';
      activeAyahLesson = ayahLessonSelect.value;
    } else {
      const opt = document.createElement('option');
      opt.value = '1';
      opt.textContent = isUr ? 'سبق 1' : 'Lesson 1';
      ayahLessonSelect.appendChild(opt);
      activeAyahLesson = '1';
    }
  }

  function initAyahFilters() {
    if (!ayahUnitSelect || !ayahLessonSelect) return;
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
  // 4b. Unit & Rule Dual Filter Boxes (Rules View - Mirrors Translations Tab)
  // -------------------------------------------------------------
  function populateRuleSelect() {
    if (!ruleSelect || typeof GRAMMAR_RULES === 'undefined') return;
    const isUr = singleLangMode === 'UR';
    ruleSelect.innerHTML = '';

    // "All Rules" option
    const allOpt = document.createElement('option');
    allOpt.value = 'ALL';
    allOpt.textContent = isUr ? 'تمام قواعد (ایک ساتھ مطالعہ)' : 'All Rules (Continuous Study)';
    ruleSelect.appendChild(allOpt);

    // Individual Rule Options
    GRAMMAR_RULES.forEach((r, idx) => {
      const opt = document.createElement('option');
      opt.value = idx.toString();
      if (isUr) {
        opt.textContent = `قاعدہ ${idx + 1}: ${r.operator} — ${r.titleUr}`;
      } else {
        opt.textContent = `Rule ${idx + 1}: ${r.operatorTr} — ${r.titleEn}`;
      }
      ruleSelect.appendChild(opt);
    });

    if (rulesDisplayMode === 'all') {
      ruleSelect.value = 'ALL';
    } else {
      ruleSelect.value = activeRuleIndex.toString();
    }
  }

  function initRuleFilters() {
    if (!ruleSelect) return;
    populateRuleSelect();

    if (ruleUnitSelect) {
      ruleUnitSelect.addEventListener('change', () => {
        scrollToTopIfScrolled();
        renderRules();
      });
    }

    ruleSelect.addEventListener('change', () => {
      const val = ruleSelect.value;
      if (val === 'ALL') {
        rulesDisplayMode = 'all';
      } else {
        rulesDisplayMode = 'island';
        activeRuleIndex = parseInt(val, 10);
      }
      scrollToTopIfScrolled();
      renderRules();
    });
  }

  // -------------------------------------------------------------
  // 5. Tab-Contextual Language Toggles
  // -------------------------------------------------------------
  function updateToggleButtonsUI() {
    const isUr = singleLangMode === 'UR';

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
      if (toggleUrduBtn) toggleUrduBtn.classList.toggle('active', isUr);
      if (toggleEnglishBtn) toggleEnglishBtn.classList.toggle('active', !isUr);
    }

    // Localize Filter Row Labels
    if (ayahUnitLabel) ayahUnitLabel.textContent = isUr ? 'یونٹ' : 'Unit';
    if (ayahLessonLabel) ayahLessonLabel.textContent = isUr ? 'سبق' : 'Lesson';
    if (ruleUnitLabel) ruleUnitLabel.textContent = isUr ? 'یونٹ' : 'Unit';
    if (ruleSelectLabel) ruleSelectLabel.textContent = isUr ? 'قاعدہ' : 'Rule';

    // Localize Direction for Filter Rows
    if (ayahFilterRow) ayahFilterRow.setAttribute('dir', isUr ? 'rtl' : 'ltr');
    if (ruleFilterRow) ruleFilterRow.setAttribute('dir', isUr ? 'rtl' : 'ltr');

    // Localize Unit dropdown options
    [ayahUnitSelect, ruleUnitSelect].forEach(select => {
      if (!select) return;
      Array.from(select.options).forEach(opt => {
        if (opt.value === '1') opt.textContent = isUr ? 'یونٹ 1 (جلد دستیاب ہوگا)' : 'Unit 1 (Coming Soon)';
        else if (opt.value === '2') opt.textContent = isUr ? 'یونٹ 2' : 'Unit 2';
        else if (opt.value === '3') opt.textContent = isUr ? 'یونٹ 3 (جلد دستیاب ہوگا)' : 'Unit 3 (Coming Soon)';
      });
    });

    // Re-populate dropdown items with active language
    populateLessonsForUnit(activeAyahUnit);
    populateRuleSelect();
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
          } else if (activeTab === 'tajweed') {
            renderTajweed();
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
          } else if (activeTab === 'tajweed') {
            renderTajweed();
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

      let posClass = 'is-noun';
      let badgeClass = 'badge-noun';
      let badgeText = 'Noun';

      if (w.cat.includes('حَرْف')) {
        posClass = 'is-part';
        badgeClass = 'badge-part';
        badgeText = 'Particle';
      } else if (w.cat.includes('عَلَم')) {
        posClass = 'is-prop';
        badgeClass = 'badge-prop';
        badgeText = 'Proper Noun';
      } else if (w.cat.includes('فِعْل')) {
        posClass = 'is-verb';
        badgeClass = 'badge-verb';
        badgeText = 'Verb';
      } else if (w.cat.includes('صِفَة')) {
        posClass = 'is-adj';
        badgeClass = 'badge-adj';
        badgeText = 'Adjective';
      } else if (w.cat.includes('اسْم')) {
        posClass = 'is-noun';
        badgeClass = 'badge-noun';
        badgeText = 'Noun';
      }

      card.className = `dict-card ${posClass}`;

      let meaningsHtml = '';
      let meaningsClass = 'card-meanings-row';

      if (wordLangMode === 'ALL') {
        meaningsHtml = `
          <div class="meaning-urdu" dir="rtl">${w.ur}</div>
          <div class="meaning-en">${w.en || ''}</div>
        `;
      } else if (wordLangMode === 'UR') {
        meaningsClass += ' single-lang';
        meaningsHtml = `
          <div class="meaning-urdu" dir="rtl">${w.ur}</div>
        `;
      } else if (wordLangMode === 'EN') {
        meaningsClass += ' single-lang';
        meaningsHtml = `
          <div class="meaning-en">${w.en || ''}</div>
        `;
      }

      const formattedIdx = `#${String(w.idx).padStart(3, '0')}`;

      card.innerHTML = `
        <div class="card-blend-top">
          <div class="card-blend-right">
            <span class="card-idx">${formattedIdx}</span>
            <div class="card-arabic" dir="rtl" title="${w.ar}">${w.ar}</div>
          </div>
          <div class="card-blend-left">
            <span class="card-tr">${w.tr}</span>
            <span class="card-badge ${badgeClass}">${badgeText}</span>
          </div>
        </div>
        <div class="${meaningsClass}">
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

    if (a.chunks && a.chunks.length > 0) {
      const arSegments = a.chunks.map((c, cIdx) => 
        `<span class="chunk-seg chunk-${cIdx % 6}">${c.ar}</span>`
      );
      arabicHtml = arSegments.join(isSlice ? sliceDividerHtml : ' ');

      if (singleLangMode === 'UR') {
        const urSegments = a.chunks.map((c, cIdx) => 
          `<span class="chunk-seg chunk-${cIdx % 6}">${c.ur}</span>`
        );
        meaningText = urSegments.join(isSlice ? sliceDividerHtml : ' ');
      } else {
        const enSegments = a.chunks.map((c, cIdx) => 
          `<span class="chunk-seg chunk-${cIdx % 6}">${c.en}</span>`
        );
        meaningText = enSegments.join(isSlice ? sliceDividerHtml : ' ');
      }
    } else {
      arabicHtml = isSlice && a.arabic && a.arabic.includes('/')
        ? a.arabic.split(/\s*\/\s*/).join(sliceDividerHtml)
        : a.arabic;

      if (singleLangMode === 'UR') {
        meaningText = isSlice && a.urdu && a.urdu.includes('/')
          ? a.urdu.split(/\s*\/\s*/).join(sliceDividerHtml)
          : (a.urdu || '');
      } else {
        meaningText = isSlice && a.en && a.en.includes('/')
          ? a.en.split(/\s*\/\s*/).join(sliceDividerHtml)
          : (a.en || '');
      }
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
    if (!isSlice) {
      const isUr = singleLangMode === 'UR';
      const tagText = isUr ? 'آیت' : 'Ayah';
      const tagClass = isUr ? 'ayah-tag tag-ur' : 'ayah-tag tag-en';
      headerHtml = `<div class="ayah-header"><span class="${tagClass}" dir="${isUr ? 'rtl' : 'ltr'}">${tagText}</span></div>`;
    }

    card.innerHTML = `
      ${headerHtml}
      <div class="ayah-arabic font-ar" dir="rtl" lang="ar">
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
      ayahCountDisplay.textContent = `${filtered.length} items`;
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
  // 11. Render Grammar Rules (Island Stepper & Continuous Flow)
  // -------------------------------------------------------------
  function renderRules() {
    if (!rulesList || typeof GRAMMAR_RULES === 'undefined') return;
    const isUr = singleLangMode === 'UR';
    const totalRules = GRAMMAR_RULES.length;

    if (activeRuleIndex < 0) activeRuleIndex = 0;
    if (activeRuleIndex >= totalRules) activeRuleIndex = totalRules - 1;

    // Synchronize top rule dropdown with current rule index
    if (ruleSelect) {
      ruleSelect.value = rulesDisplayMode === 'all' ? 'ALL' : activeRuleIndex.toString();
    }

    const docTitle = isUr ? 'قرآنی قواعد و نحوی عوامل' : 'Quranic Grammar Rules';

    function buildRuleSection(r, idx, isSingleView) {
      const secNum = idx + 1;
      const titleBadge = isUr ? r.titleUr : r.titleEn;
      const effectBadge = isUr ? r.caseEffectUr : r.caseEffectEn;
      const formulaLabel = isUr ? 'قاعدہ / کلیہ:' : 'Formula / Pattern:';
      const meaningText = isUr ? r.primaryMeaningUr : r.primaryMeaningEn;
      const expText = isUr ? r.explanationUr : r.explanationEn;
      const ruleNumBadge = isUr ? `قاعدہ ${secNum}` : `Rule ${secNum}`;

      // Sub-rules
      let subRulesHtml = '';
      if (r.subRules && r.subRules.length > 0) {
        const subTitle = isUr ? 'اہم ذیلی قواعد و مشقی نکات:' : 'Key Sub-rules & Drill Patterns:';
        subRulesHtml = `
          <div class="doc-subrules-block">
            <span class="doc-subrules-label">${subTitle}</span>
            <ul class="doc-subrules-list">
              ${r.subRules.map(sr => `
                <li class="doc-subrule-item">
                  <strong class="doc-subrule-title">${isUr ? sr.titleUr : sr.titleEn}:</strong>
                  <span class="doc-subrule-text">${isUr ? sr.textUr : sr.textEn}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        `;
      }

      // Quranic Examples
      let examplesHtml = '';
      if (r.examples && r.examples.length > 0) {
        const exTitle = isUr ? 'قرآنی تطبیقات و شواہد:' : 'Quranic Applications & Evidence:';
        examplesHtml = `
          <div class="doc-examples-block">
            <span class="doc-examples-label">${exTitle}</span>
            <div class="doc-examples-flow">
              ${r.examples.map(ex => `
                <div class="doc-example-row">
                  <span class="doc-ex-ar font-ar" dir="rtl" lang="ar">${ex.ar}</span>
                  <span class="doc-ex-sep">—</span>
                  <span class="doc-ex-note">${isUr ? ex.ur : ex.en}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      let footerHtml = '';
      if (isSingleView) {
        const prevDisabled = idx === 0 ? 'disabled' : '';
        const nextDisabled = idx === totalRules - 1 ? 'disabled' : '';
        const prevText = isUr ? '← پچھلا قاعدہ' : '← Previous Rule';
        const nextText = isUr ? 'اگلا قاعدہ →' : 'Next Rule →';
        const counterText = isUr ? `قاعدہ ${secNum} از ${totalRules}` : `Rule ${secNum} of ${totalRules}`;

        footerHtml = `
          <footer class="rule-island-footer">
            <button id="rulePrevBtn" class="rule-nav-action-btn" ${prevDisabled}>
              ${prevText}
            </button>
            <span class="rule-counter-badge">${counterText}</span>
            <button id="ruleNextBtn" class="rule-nav-action-btn" ${nextDisabled}>
              ${nextText}
            </button>
          </footer>
        `;
      }

      return `
        <section class="doc-section rule-card-island" id="rule-sec-${secNum}">
          <header class="doc-section-header">
            <div class="doc-sec-title-wrap">
              <span class="rule-island-num-badge">${ruleNumBadge}</span>
              <span class="doc-rule-operator font-ar" dir="rtl" lang="ar">${r.operator}</span>
              <span class="doc-rule-op-tr" dir="ltr">(${r.operatorTr})</span>
              <h2 class="doc-rule-title-text">${titleBadge}</h2>
            </div>
          </header>

          <div class="doc-section-body">
            <div class="doc-formula-banner">
              <span class="doc-formula-label"><strong>${formulaLabel}</strong></span>
              <span class="doc-formula-code font-ar" dir="rtl" lang="ar">${r.formula}</span>
            </div>

            <div class="doc-rule-meta-prose">
              <div class="doc-meta-line"><strong>${isUr ? 'اعرابی اثر:' : 'Grammatical Effect (I\'rab):'}</strong> <span class="doc-effect-val">${effectBadge}</span></div>
              <div class="doc-meta-line"><strong>${isUr ? 'بنیادی مفہوم:' : 'Primary Meaning:'}</strong> <span>${meaningText}</span></div>
            </div>

            <div class="doc-explanation-prose">
              ${expText}
            </div>

            ${subRulesHtml}
            ${examplesHtml}
            ${footerHtml}
          </div>
        </section>
      `;
    }

    let contentHtml = '';
    if (rulesDisplayMode === 'island') {
      contentHtml = buildRuleSection(GRAMMAR_RULES[activeRuleIndex], activeRuleIndex, true);
    } else {
      contentHtml = GRAMMAR_RULES.map((r, idx) => buildRuleSection(r, idx, false)).join('<hr class="doc-divider">');
    }

    rulesList.innerHTML = `
      <article class="doc-sheet ${isUr ? 'doc-rtl' : 'doc-ltr'}" dir="${isUr ? 'rtl' : 'ltr'}">
        <header class="doc-header simple-doc-header">
          <h1 class="doc-title">${docTitle}</h1>
        </header>
        <div class="doc-content-flow">
          ${contentHtml}
        </div>
      </article>
    `;

    attachRuleNavListeners();
  }

  function attachRuleNavListeners() {
    if (!rulesList) return;

    const prevBtn = document.getElementById('rulePrevBtn');
    const nextBtn = document.getElementById('ruleNextBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (activeRuleIndex > 0) {
          activeRuleIndex--;
          rulesDisplayMode = 'island';
          if (ruleSelect) ruleSelect.value = activeRuleIndex.toString();
          renderRules();
          const targetCard = document.getElementById(`rule-sec-${activeRuleIndex + 1}`);
          if (targetCard) targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (activeRuleIndex < GRAMMAR_RULES.length - 1) {
          activeRuleIndex++;
          rulesDisplayMode = 'island';
          if (ruleSelect) ruleSelect.value = activeRuleIndex.toString();
          renderRules();
          const targetCard = document.getElementById(`rule-sec-${activeRuleIndex + 1}`);
          if (targetCard) targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }
  }

  // -------------------------------------------------------------
  // 12. Render Tajweed Lecture 1 (Single Continuous Document Flow)
  // -------------------------------------------------------------
  function renderTajweed() {
    if (!tajweedList || typeof TAJWEED_DATA === 'undefined') return;
    const isUr = singleLangMode === 'UR';
    const docTitle = isUr ? 'علمِ تجوید: بنیادی قواعد و مخارج' : 'Tajweed: Core Rules & Articulation Points';

    const sectionsHtml = TAJWEED_DATA.map((item, idx) => {
      const secNum = idx + 1;
      const title = isUr ? item.titleUr : item.titleEn;
      const topic = isUr ? item.topicUr : item.topicEn;
      const points = isUr ? item.pointsUr : item.pointsEn;
      
      let topicHtml = topic ? `<div class="doc-topic"><p>${topic}</p></div>` : '';

      let pointsHtml = '';
      if (points && points.length > 0) {
        if (item.isOrdered) {
          pointsHtml = `
            <ol class="doc-ordered-list">
              ${points.map(pt => `<li class="doc-ordered-item">${pt}</li>`).join('')}
            </ol>
          `;
        } else {
          pointsHtml = `
            <ul class="doc-points-list">
              ${points.map(pt => `<li class="doc-point-item">${pt}</li>`).join('')}
            </ul>
          `;
        }
      }

      let examplesHtml = '';
      if (item.examples && item.examples.length > 0) {
        const exTitle = isUr ? 'قرآنی امثلہ و تطبیق:' : 'Quranic Examples & Practice:';
        examplesHtml = `
          <div class="doc-examples-block">
            <span class="doc-examples-label">${exTitle}</span>
            <div class="doc-examples-flow">
              ${item.examples.map(ex => {
                const note = isUr ? (ex.noteUr || ex.noteEn || '') : (ex.noteEn || ex.noteUr || '');
                return `
                  <div class="doc-example-row">
                    <span class="doc-ex-ar font-ar" dir="rtl" lang="ar">${ex.ar}</span>
                    <span class="doc-ex-sep">—</span>
                    <span class="doc-ex-note">${note}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }

      return `
        <section class="doc-section" id="tajweed-sec-${secNum}">
          <header class="doc-section-header">
            <h2 class="doc-sec-title">${title}</h2>
          </header>
          <div class="doc-section-body">
            ${topicHtml}
            ${pointsHtml}
            ${examplesHtml}
          </div>
        </section>
      `;
    }).join('<hr class="doc-divider">');

    tajweedList.innerHTML = `
      <article class="doc-sheet ${isUr ? 'doc-rtl' : 'doc-ltr'}" dir="${isUr ? 'rtl' : 'ltr'}">
        <header class="doc-header simple-doc-header">
          <h1 class="doc-title">${docTitle}</h1>
        </header>
        <div class="doc-content-flow">
          ${sectionsHtml}
        </div>
      </article>
    `;
  }

  // -------------------------------------------------------------
  // 13. Search Event Handling (Words View only)
  // -------------------------------------------------------------
  function initSearchEvents() {
    let debounceTimer;

    searchInput.addEventListener('input', e => {
      clearTimeout(debounceTimer);
      const val = e.target.value;
      clearSearchBtn.style.display = val.length > 0 ? 'inline-flex' : 'none';

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
  // 16. Swipe Gestures for Mobile Tab Navigation
  // -------------------------------------------------------------
  const TAB_ORDER = ['tajweed', 'rules', 'words', 'ayahs'];
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  function initSwipeGestures() {
    const mainContainer = document.querySelector('.container') || document.body;

    mainContainer.addEventListener('touchstart', (e) => {
      if (e.target.closest('#alphabetBar') || e.target.closest('.rule-island-stepper') || e.target.closest('.modal-backdrop') || e.target.closest('.filter-select')) {
        return;
      }
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    mainContainer.addEventListener('touchend', (e) => {
      if (e.target.closest('#alphabetBar') || e.target.closest('.rule-island-stepper') || e.target.closest('.modal-backdrop') || e.target.closest('.filter-select')) {
        return;
      }
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      const currentIndex = TAB_ORDER.indexOf(activeTab);
      if (currentIndex === -1) return;

      if (deltaX < 0) {
        if (currentIndex < TAB_ORDER.length - 1) {
          switchTab(TAB_ORDER[currentIndex + 1]);
        }
      } else {
        if (currentIndex > 0) {
          switchTab(TAB_ORDER[currentIndex - 1]);
        }
      }
    }
  }

  // -------------------------------------------------------------
  // 17. Bootstrap Application
  // -------------------------------------------------------------
  function init() {
    initTheme();
    initLanguageToggles();
    initTabs();
    initSwipeGestures();
    initAlphabetBar();
    initAyahFilters();
    initRuleFilters();
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
