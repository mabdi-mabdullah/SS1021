// ==========================================================================
// Quranic Arabic Study Companion — Tajweed Lecture 1 Dataset
// Bilingual Dataset (Urdu & English) derived from Lecture 1 Slides
// ==========================================================================

const TAJWEED_DATA = [
  {
    slideNum: 1,
    titleUr: "تجوید کی تعریف",
    titleEn: "Definition of Tajweed",
    badgeUr: "تعریف",
    badgeEn: "Definition",
    topicUr: "تجوید کا مفہوم و اصطلاحی تعریف",
    topicEn: "Linguistic and terminological meaning of Tajweed",
    pointsUr: [
      "لغوی معنی: تجوید عربی مادے 'جَوَّدَ' سے ماخوذ ہے، جس کے معنی 'بہتر، خوبصورت یا عمدہ بنانا' کے ہیں۔",
      "اصطلاحی تعریف: تجوید وہ علم ہے جس کے ذریعے قرآن مجید کے ہر حرف کو اس کے اصل مخرج سے ادا کیا جائے اور اس کی تمام صفات (لازمہ و عارضہ) کا مکمل حق ادا کیا جائے۔",
      "آسان الفاظ میں: تلاوت کے مستند قواعد کے مطابق قرآن پاک کو درست، واضح اور خوبصورت انداز میں پڑھنا۔"
    ],
    pointsEn: [
      "Linguistic meaning: Derived from the Arabic root 'jawwada' (جَوَّدَ), meaning to improve, beautify, or make excellent.",
      "Terminological definition: The science of articulating every Quranic letter from its correct origin (Makhraj) while fulfilling all its inherent and incidental characteristics (Sifat).",
      "In simple terms: Reciting the Holy Quran correctly, clearly, and melodiously in accordance with established rules."
    ],
    examples: []
  },
  {
    slideNum: 4,
    titleUr: "تجوید کی اہمیت و ضرورت",
    titleEn: "Importance & Necessity of Tajweed",
    badgeUr: "اہمیت",
    badgeEn: "Necessity",
    topicUr: "تجوید سیکھنا کیوں ضروری ہے؟",
    topicEn: "Why is learning Tajweed essential?",
    pointsUr: [
      "قرآنی کلمات اور حروف کے درست تلفظ کو یقینی بناتی ہے۔",
      "قرآن مجید کے الفاظ اور اس کی الہامی اصوات کی حفاظت کرتی ہے۔",
      "تلاوت کے سنت و نبوی طریقے کی پیروی ہے۔",
      "نماز میں قرآن مجید کی درست اور باطل سے پاک تلاوت میں معاون ہے۔",
      "معانی و مفاہیم میں تحریف اور غلطی (لحن) سے بچاتی ہے۔",
      "تلاوت کو بااثر، واضح اور قلبی طور پر مؤثر بناتی ہے۔"
    ],
    pointsEn: [
      "Ensures the correct pronunciation of Quranic letters and words.",
      "Safeguards the integrity of the divine text and its revelation.",
      "Follows the Sunnah and prophetic tradition of recitation.",
      "Ensures valid, error-free recitation during daily prayers (Salah).",
      "Prevents recitation errors (Lahn) that corrupt grammatical and lexical meanings.",
      "Makes recitation impactful, melodious, and spiritually uplifting."
    ],
    examples: []
  },
  {
    slideNum: 5,
    titleUr: "مخارج الحروف",
    titleEn: "Makharij al-Huroof (Articulation Points)",
    badgeUr: "مخارج",
    badgeEn: "Makharij",
    topicUr: "مخرج وہ مقامِ ادائیگی ہے جہاں سے حرف کی آواز نکلتی ہے۔ عربی کے 5 بڑے مخارج:",
    topicEn: "A Makhraj is the specific vocal tract point from which a letter sound originates. The 5 major articulation zones are:",
    isOrdered: true,
    pointsUr: [
      "الجوف (منہ اور گلے کا خلا): حروفِ مدہ (ا، و، ی) ادا ہوتے ہیں۔",
      "الحلق (گلا): چھ حروف ادا ہوتے ہیں (ء، ہ، ع، ح، غ، خ)۔",
      "اللسان (زبان): زبان کے مختلف حصوں سے 18 حروف ادا ہوتے ہیں (ت، د، ط، س، ص، ز وغیرہ)۔",
      "الشفتان (دونوں ہونٹ): چار حروف ادا ہوتے ہیں (ب، م، و، ف)۔",
      "الخیشوم (ناک کا بانسہ): یہاں سے غنہ کی آواز پیدا ہوتی ہے۔"
    ],
    pointsEn: [
      "Al-Jawf (The Oral Cavity): The open space of mouth and throat producing the three prolonged vowels (ا، و، ي).",
      "Al-Halq (The Throat): Six throat letters (ء، هـ، ع، ح، غ، خ).",
      "Al-Lisan (The Tongue): 18 letters produced across the tongue's tip, edges, and base (ت، د، ط، س، ص، ز, etc.).",
      "Ash-Shafatan (The Lips): Four lip letters (ب، م، و، ف).",
      "Al-Khayshoom (The Nasal Cavity): The origin of resonant nasalization (Ghunnah)."
    ],
    examples: [
      {
        ar: "قُلْ",
        noteUr: "کلمہ 'قُلْ' میں 'ق' کا مخرج زبان کی جڑ ہے جبکہ 'ل' زبان کے کنارے سے ادا ہوتا ہے۔",
        noteEn: "In 'Qul', Qaf originates from the base of the tongue, and Lam originates from the edge of the tongue."
      }
    ]
  },
  {
    slideNum: 6,
    titleUr: "نون ساکن اور تنوین کے احکام",
    titleEn: "Rules of Noon Sakin and Tanween",
    badgeUr: "نون ساکن و تنوین",
    badgeEn: "Noon Sakin",
    topicUr: "نون ساکن (نْ) اور تنوین (ـً ـٍ ـٌ) کے چار بنیادی قواعد:",
    topicEn: "Four fundamental rules apply when Noon Sakin (نْ) or Tanween (ـً ـٍ ـٌ) is encountered:",
    isOrdered: true,
    pointsUr: [
      "اظہار: حروفِ حلق (ء، ہ، ع، ح، غ، خ) سے پہلے نون کو بغیر غنہ کے بالکل صاف ظاہر کر کے پڑھنا۔",
      "ادغام: حروفِ یرملون (ی، ر، م، ل، و، ن) آنے پر نون کو اگلے حرف میں ملا کر پڑھنا۔",
      "اقلاب: حرفِ با (ب) آنے پر نون ساکن یا تنوین کو میم سے بدل کر غنہ کے ساتھ ادا کرنا۔",
      "اخفاء: باقی 15 حروف آنے پر نون کی آواز کو ناک میں چھپا کر معتدل غنہ کے ساتھ پڑھنا۔"
    ],
    pointsEn: [
      "Izhar (Clear Pronunciation): Pronouncing Noon clearly without Ghunnah before throat letters (ء، هـ، ع، ح، غ، خ).",
      "Idgham (Merging): Merging Noon into the subsequent letter when followed by Yarmaloon letters (ي، ر، م، ل، و، ن).",
      "Iqlab (Conversion): Converting Noon into a silent Meem with Ghunnah when followed by Ba (ب).",
      "Ikhfa (Concealment): Concealing the sound of Noon in the nasal cavity with light Ghunnah before the remaining 15 letters."
    ],
    examples: [
      {
        ar: "مِنْهَا ، أَنْعَمْتَ",
        noteUr: "اظہار کی مثالیں (حرفِ حلق سے پہلے نون بالکل صاف ہے)",
        noteEn: "Izhar examples (clear Noon before throat letters)"
      },
      {
        ar: "مَنْ يَقُولُ ، مِنْ رَبِّهِمْ",
        noteUr: "ادغام کی مثالیں (یرملون میں ادغام مع الغنہ اور بغیر غنہ)",
        noteEn: "Idgham examples (merging into Yarmaloon letters with/without Ghunnah)"
      },
      {
        ar: "أَنْبِئْهُمْ",
        noteUr: "اقلاب کی مثال (نون میم سے بدل گیا)",
        noteEn: "Iqlab example (Noon converted to Meem before Ba)"
      },
      {
        ar: "مِنْ شَرِّ ، أَنْفُسَكُمْ",
        noteUr: "اخفاء کی مثالیں (ناک میں نون کو چھپا کر پڑھنا)",
        noteEn: "Ikhfa examples (concealing Noon sound with light nasalization)"
      }
    ]
  },
  {
    slideNum: 7,
    titleUr: "میم ساکن کے احکام",
    titleEn: "Rules of Meem Sakin",
    badgeUr: "میم ساکن",
    badgeEn: "Meem Sakin",
    topicUr: "میم ساکن (مْ) کے تین بنیادی قواعد:",
    topicEn: "Three fundamental rules apply when Meem Sakin (مْ) is encountered:",
    isOrdered: true,
    pointsUr: [
      "اظہارِ شفوی: حرفِ با (ب) اور میم (م) کے علاوہ تمام حروف کے سامنے میم کو بغیر غنہ کے ظاہر کر کے پڑھنا۔",
      "ادغامِ شفوی: میم ساکن کے بعد دوسری متحرک میم آنے پر دونوں کو ملا کر غنہ کے ساتھ پڑھنا۔",
      "اخفاءِ شفوی: میم ساکن کے بعد حرفِ با (ب) آنے پر میم کو ہونٹوں پر چھپا کر غنہ کے ساتھ ادا کرنا۔"
    ],
    pointsEn: [
      "Izhar Shafawi (Oral Manifestation): Pronouncing Meem clearly without Ghunnah before all letters except Ba and Meem.",
      "Idgham Shafawi (Oral Merging): Merging Meem Sakin into a following vowelled Meem with Ghunnah.",
      "Ikhfa Shafawi (Oral Concealment): Concealing Meem lightly between the lips with Ghunnah before the letter Ba (ب)."
    ],
    examples: [
      {
        ar: "هُمْ فِيهَا",
        noteUr: "اظہارِ شفوی کی مثال (فا کے سامنے میم ظاہر ہے)",
        noteEn: "Izhar Shafawi example (Meem pronounced clearly before Fa)"
      },
      {
        ar: "لَهُمْ مَا",
        noteUr: "ادغامِ شفوی کی مثال (میم کا میم میں ادغام مع الغنہ)",
        noteEn: "Idgham Shafawi example (Meem merged into Meem with Ghunnah)"
      },
      {
        ar: "تَرْمِيهِمْ بِحِجَارَةٍ",
        noteUr: "اخفاءِ شفوی کی مثال (با سے پہلے میم کا اخفاء)",
        noteEn: "Ikhfa Shafawi example (Meem concealed lightly on lips before Ba)"
      }
    ]
  },
  {
    slideNum: 8,
    titleUr: "مد کے احکام",
    titleEn: "Rules of Madd (Elongation)",
    badgeUr: "مد و طوالت",
    badgeEn: "Madd",
    topicUr: "مد کا لغوی معنی آواز کو کھینچنا یا دراز کرنا ہے۔ بنیادی احکام:",
    topicEn: "Madd linguistically means prolonging or stretching the vowel sound. Primary principles:",
    pointsUr: [
      "بنیادی حروفِ مدہ تین ہیں: الف (ا) ماقبل زبر، واؤ (و) ماقبل پیش، اور یاء (ي) ماقبل زیر۔",
      "مدِ طبعی (اصلی مد): کسی ظاہری سبب (ہمزہ یا سكون) کے بغیر حرفِ مد کو ٹھیک دو حرکات (ایک الف) کے برابر کھینچا جاتا ہے۔",
      "مدِ فرعی (ثانوی مد): جب حرفِ مد کے بعد ہمزہ یا سکون واقع ہو تو اس کو 4 تا 6 حرکات تک دراز کیا جاتا ہے۔"
    ],
    pointsEn: [
      "Three primary Madd letters: Alif preceded by Fathah, Waw preceded by Dammah, and Ya preceded by Kasrah.",
      "Madd Tabee'ee (Natural Madd): Prolonged for exactly 2 vowel counts (one Alif) without external cause (no Hamzah or Sukoon).",
      "Madd Far'ee (Secondary Madd): Prolonged for 4 to 6 vowel counts when followed by an external cause (Hamzah or Sukoon)."
    ],
    examples: [
      {
        ar: "قَالَ ، يَقُولُ ، قِيلَ",
        noteUr: "مدِ طبعی کی مثالیں (دو حرکات کی طوالت)",
        noteEn: "Natural Madd examples (prolonged for exactly 2 counts)"
      },
      {
        ar: "جَاءَ ، السَّمَاءِ",
        noteUr: "مدِ متصل کی مثالیں (ہمزہ کی وجہ سے زائد طوالت)",
        noteEn: "Connected Madd examples (longer elongation due to Hamzah in same word)"
      }
    ]
  },
  {
    slideNum: 9,
    titleUr: "غنہ کے احکام",
    titleEn: "Rules of Ghunnah (Nasalization)",
    badgeUr: "غنہ",
    badgeEn: "Ghunnah",
    topicUr: "غنہ ناک کے بانسے (خیشوم) سے نکلنے والی خوبصورت مترنم آواز ہے۔ بنیادی ضوابط:",
    topicEn: "Ghunnah is a resonant nasal sound originating from the nasal cavity (Khayshoom). Core rules:",
    pointsUr: [
      "غنہ نون اور میم کی ذات میں پائی جانے والی مستقل صفت ہے۔",
      "نون مشدد (نّ) اور میم مشدد (مّ): جب بھی نون یا میم پر تشدید آئے تو اس پر دو حرکات کے برابر واجب غنہ کیا جاتا ہے۔",
      "غنہ کی معتدل مقدار دو حرکات (ایک الف کے برابر) کھینچنا ہے۔"
    ],
    pointsEn: [
      "Ghunnah is an intrinsic characteristic found inherently within the letters Noon and Meem.",
      "Noon & Meem Mushaddad (نّ and مّ): Whenever Noon or Meem carries a Shaddah, an obligatory 2-count Ghunnah must be held.",
      "The measured duration of Ghunnah is standard 2 vowel counts (equivalent to one Alif)."
    ],
    examples: [
      {
        ar: "إِنَّ ، عَمَّ",
        noteUr: "نون مشدد اور میم مشدد پر واجب غنہ کی مثالیں",
        noteEn: "Compulsory Ghunnah examples on Noon and Meem with Shaddah"
      },
      {
        ar: "مِنَ الْجِنَّةِ وَالنَّاسِ",
        noteUr: "قرآنی تلاوت میں واجب غنہ کی تطبیق",
        noteEn: "Quranic application showing obligatory 2-count nasalization"
      }
    ]
  },
  {
    slideNum: 10,
    titleUr: "قلقلہ کے احکام",
    titleEn: "Rules of Qalqalah (Echoing / Bouncing)",
    badgeUr: "قلقلہ",
    badgeEn: "Qalqalah",
    topicUr: "قلقلہ ساکن حرف کی ادائیگی کے وقت مخرج میں پیدا ہونے والی جنبش، گونج یا جھٹکا ہے۔ بنیادی احکام:",
    topicEn: "Qalqalah is an echoing vibration in the vocal articulation point when pronouncing a sakin letter:",
    pointsUr: [
      "حروفِ قلقلہ کی کل تعداد پانچ ہے: (ق ، ط ، ب ، ج ، د)۔",
      "یاد دہانی کا مجموعہ: 'قُطْبُ جَدٍّ'۔",
      "شرط: یہ حروف اس وقت قلقلہ ہوں گے جب ان پر جزم (سکون) ہو، یا وقف کی وجہ سے ساکن ہو جائیں۔"
    ],
    pointsEn: [
      "The letters of Qalqalah are five: (ق ، ط ، ب ، ج ، د).",
      "Memorized mnemonic collection: 'Qutb Jad' (قُطْبُ جَدٍّ).",
      "Condition: Qalqalah only occurs when these letters carry a Sukoon (sakin), or become sakin when stopping (Waqf)."
    ],
    examples: [
      {
        ar: "أَحَدْ",
        noteUr: "دال پر قلقلہ (عند الوقف سکون کی حالت میں)",
        noteEn: "Qalqalah on Dal when stopping upon the word"
      },
      {
        ar: "يَجْعَلْ",
        noteUr: "جیم ساکنہ پر قلقلہ وسطِ کلمہ میں",
        noteEn: "Qalqalah on Jeem sakin in the middle of a word"
      },
      {
        ar: "يَقْطَعُونَ",
        noteUr: "قاف اور طا پر قلقلہ کی تطبیق",
        noteEn: "Qalqalah application on Qaf and Ta"
      }
    ]
  },
  {
    slideNum: 11,
    titleUr: "اسمِ جلالت کے لام کے احکام",
    titleEn: "Rules of Lam in Ism al-Jalalah (Allāh)",
    badgeUr: "لامِ جلالت",
    badgeEn: "Lam of Jalalah",
    topicUr: "لفظِ مبارک 'اللَّه' کے لام کو موٹا یا باریک پڑھنے کے قواعد:",
    topicEn: "Rules for pronouncing the Lam in the Divine Name 'Allāh' (اللَّه):",
    isOrdered: true,
    pointsUr: [
      "تفخیم (موٹا / پُر پڑھنا): جب اسمِ جلالت سے پہلے والے حرف پر زبر (فتحہ) یا پیش (ضمہ) ہو۔",
      "ترقیق (باریک پڑھنا): جب اسمِ جلالت سے پہلے والے حرف کے نیچے زیر (کسرہ) ہو۔",
      "نوٹ: عام کلمات کے تمام عام لام ہمیشہ باریک ہی پڑھے جاتے ہیں۔"
    ],
    pointsEn: [
      "Tafkheem (Heavy / Full-mouth): When the letter preceding Ism al-Jalalah carries a Fathah (ـَ) or Dammah (ـُ).",
      "Tarqeeq (Light / Thin-mouth): When the letter preceding Ism al-Jalalah carries a Kasrah (ـِ).",
      "Note: All occurrences of the letter Lam in regular Arabic words are always read light (thin)."
    ],
    examples: [
      {
        ar: "قَالَ اللَّهُ",
        noteUr: "تفخیم (ماقبل زبر ہونے کی وجہ سے لام موٹا ہے)",
        noteEn: "Tafkheem (heavy Lam preceded by Fathah)"
      },
      {
        ar: "عَبْدُ اللَّهِ",
        noteUr: "تفخیم (ماقبل پیش ہونے کی وجہ سے لام موٹا ہے)",
        noteEn: "Tafkheem (heavy Lam preceded by Dammah)"
      },
      {
        ar: "بِسْمِ اللَّهِ",
        noteUr: "ترقیق (ماقبل زیر ہونے کی وجہ سے لام باریک ہے)",
        noteEn: "Tarqeeq (light Lam preceded by Kasrah)"
      }
    ]
  },
  {
    slideNum: 12,
    titleUr: "را کے احکام",
    titleEn: "Rules of Ra (Tafkheem & Tarqeeq)",
    badgeUr: "احکامِ را",
    badgeEn: "Rules of Ra",
    topicUr: "حرفِ را (ر) کو اعراب اور حرکات کے اعتبار سے پر یا باریک پڑھا جاتا ہے:",
    topicEn: "The letter Ra (ر) is pronounced heavy or light depending on its vowelization and context:",
    isOrdered: true,
    pointsUr: [
      "تفخیم (موٹا پڑھنا): جب را پر زبر یا پیش ہو، یا را ساکن ہو اور ماقبل زبر یا پیش ہو۔",
      "ترقیق (باریک پڑھنا): جب را کے نیچے زیر ہو، یا را ساکن ہو اور ماقبل اصلی زیر ہو۔"
    ],
    pointsEn: [
      "Tafkheem (Heavy): When Ra has Fathah or Dammah, or is Sakin preceded by Fathah or Dammah.",
      "Tarqeeq (Light): When Ra has Kasrah, or is Sakin preceded by an original Kasrah."
    ],
    examples: [
      {
        ar: "رَبِّ ، رَسُول",
        noteUr: "تفخیم کی مثالیں (زبر کی وجہ سے را موٹا پڑھا جائے گا)",
        noteEn: "Tafkheem examples (heavy Ra due to Fathah)"
      },
      {
        ar: "رِزْق ، فِرْعَوْن",
        noteUr: "ترقیق کی مثالیں (زیر کی وجہ سے را باریک پڑھا جائے گا)",
        noteEn: "Tarqeeq examples (light Ra due to Kasrah / preceded by Kasrah)"
      }
    ]
  },
  {
    slideNum: 13,
    titleUr: "فوری خلاصہ و مراجعہ",
    titleEn: "Summary & Quick Review",
    badgeUr: "خلاصہ",
    badgeEn: "Summary",
    topicUr: "بنیادی تجویدی ضوابط کا فوری اعادہ:",
    topicEn: "Quick review of fundamental Tajweed principles:",
    pointsUr: [
      "مخارج: حروف کے اصل مقاماتِ ادائیگی۔",
      "نون ساکن و تنوین: 4 قواعد (اظہار، ادغام، اقلاب، اخفاء)۔",
      "میم ساکن: 3 قواعد (اظہارِ شفوی، ادغامِ شفوی، اخفاءِ شفوی)۔",
      "مد: آواز کو 2 تا 6 حرکات تک دراز کرنا۔",
      "غنہ: ناک کے بانسے کی مترنم آواز (نون و میم مشدد پر واجب)۔",
      "قلقلہ: حروفِ 'قُطْبُ جَدٍّ' پر گونج دار ادائیگی۔",
      "تفخیم و ترقیق: لامِ جلالت اور را کو موٹا یا باریک پڑھنے کے اصول۔"
    ],
    pointsEn: [
      "Makharij: The vocal origin points of Arabic letters.",
      "Noon Sakin & Tanween: 4 rules (Izhar, Idgham, Iqlab, Ikhfa).",
      "Meem Sakin: 3 rules (Izhar Shafawi, Idgham Shafawi, Ikhfa Shafawi).",
      "Madd: Prolonging vowel sounds from 2 up to 6 counts.",
      "Ghunnah: Nasal sound (obligatory 2 counts on Noon and Meem Mushaddad).",
      "Qalqalah: Echoing bounce on letters of 'Qutb Jad' (قُطْبُ جَدٍّ).",
      "Tafkheem & Tarqeeq: Rules governing heavy vs. light articulation of Lam and Ra."
    ],
    examples: []
  },
  {
    slideNum: 14,
    titleUr: "مشقی سرگرمی و تطبیق",
    titleEn: "Practice Activity & Application",
    badgeUr: "مشق",
    badgeEn: "Practice",
    topicUr: "درج ذیل امثلہ کو درست ادائیگی سے پڑھیں اور متعلقہ تجویدی قاعدہ بیان کریں:",
    topicEn: "Recite the following examples accurately and identify the governing Tajweed rule:",
    pointsUr: [],
    pointsEn: [],
    examples: [
      {
        ar: "مِنْهَا",
        noteUr: "قاعدہ: اظہارِ حلق (نون ساکن کے بعد حرفِ حلق ہا ہے)",
        noteEn: "Rule: Izhar Halqi (clear Noon before throat letter Ha)"
      },
      {
        ar: "مَنْ يَقُولُ",
        noteUr: "قاعدہ: ادغام مع الغنہ (نون ساکن کے بعد حرفِ یرملون یاء ہے)",
        noteEn: "Rule: Idgham with Ghunnah (Noon merged into Ya)"
      },
      {
        ar: "أَنْبِئْهُمْ",
        noteUr: "قاعدہ: اقلاب (نون ساکن با سے قبل میم سے بدلا)",
        noteEn: "Rule: Iqlab (Noon converted to Meem before Ba)"
      },
      {
        ar: "لَهُمْ مَا",
        noteUr: "قاعدہ: ادغامِ شفوی (میم ساکن کے بعد میم متحرک ہے)",
        noteEn: "Rule: Idgham Shafawi (Meem merged into Meem with Ghunnah)"
      },
      {
        ar: "قَالَ",
        noteUr: "قاعدہ: مدِ طبعی (الف ماقبل زبر، دو حرکات کی طوالت)",
        noteEn: "Rule: Madd Tabee'ee (natural elongation of 2 counts)"
      },
      {
        ar: "إِنَّ",
        noteUr: "قاعدہ: غنہ (نون مشدد پر دو حرکات کا واجب غنہ)",
        noteEn: "Rule: Obligatory Ghunnah on Noon Mushaddad"
      },
      {
        ar: "أَحَدْ",
        noteUr: "قاعدہ: قلقلہ کبریٰ (دال پر بوقتِ وقف سکون ہے)",
        noteEn: "Rule: Qalqalah Kubra on Dal when stopping"
      },
      {
        ar: "بِسْمِ اللَّهِ",
        noteUr: "قاعدہ: ترقیق (اسمِ جلالت کے لام سے قبل زیر ہے)",
        noteEn: "Rule: Tarqeeq (light Lam of Jalalah preceded by Kasrah)"
      }
    ]
  }
];
