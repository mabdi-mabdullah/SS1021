// ==========================================================================
// Quranic Arabic Study Companion — Master Grammar Rules Dataset
// Pure thematic listing without lesson mentions
// Fully Bilingual (Urdu & English) with comprehensive practice sub-rules
// ==========================================================================

const GRAMMAR_RULES = [
  {
    id: "RULE-01",
    operator: "إِنَّ",
    operatorTr: "Inna",
    titleEn: "Particle of Emphasis",
    titleUr: "حرفِ تاکید و پختگی",
    arabicRole: "حرف مشبہ بالفعل (حرفِ تاکید)",
    formula: "إِنَّ + اسْمٌ (مفرد) = نَصْب (زبر)",
    primaryMeaningUr: "بیشک، یقیناً، بلاشبہ",
    primaryMeaningEn: "Indeed, Truly, Verily, Without doubt",
    caseEffectUr: "نَصْب (اسم پر زبر)",
    caseEffectEn: "Accusative (نَصْب / Fat-hah)",
    explanationUr: "عربی زبان میں (إِنَّ) جملہ اسمیہ کے شروع میں بات میں پختگی اور یقین پیدا کرنے کے لیے آتا ہے۔ یہ اپنے بعد والے اسم کو زبر (نَصْب) دیتا ہے۔ (إِنَّ) اور اس کے بعد والا اسم مل کر ایک مربوط نحوی قطعہ بناتے ہیں جن کا ترجمہ اکٹھا کیا جاتا ہے۔",
    explanationEn: "Placed at the beginning of a nominal sentence to introduce certainty, removing any skepticism. It governs the following noun (Ism Inna) into the accusative case (نَصْب, typically marked with a Fat-hah). Together, إِنَّ and its governed noun form a unified syntactic clause.",
    subRules: [
      {
        titleUr: "معطوف اسماء پر اعراب کی برابری (حرفِ عطف وَ)",
        textUr: "اگر (إِنَّ) کے بعد دو یا زائد اسماء (وَ) کے ذریعے جڑے ہوں تو وہ سب منصوب (زبر والے) ہوں گے، جیسے: إِنَّ الصَّفَا وَالْمَرْوَةَ (بیشک صفا اور مروہ)، اور إِنَّ فِرْعَوْنَ وَهَامَانَ۔",
        titleEn: "Conjunctions with Wa (وَ)",
        textEn: "When multiple nouns are conjoined by وَ following إِنَّ, all subsequent conjoined nouns also take the accusative case (e.g. إِنَّ الصَّفَا وَالْمَرْوَةَ)."
      },
      {
        titleUr: "فَـ کا سابقہ (فَإِنَّ = تو بیشک / پس یقیناً)",
        textUr: "جب شروع میں (فَـ = پس / تو) آئے تو (فَإِنَّ) بنتا ہے، جیسے: فَإِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ (پس بیشک اللہ بخشنے والا، نہایت رحم فرمانے والا ہے) اور فَإِنَّ الإِنْسَانَ كَفُورٌ۔",
        titleEn: "Prefixing Fa (فَـ = So / Then)",
        textEn: "When prefixed with فَـ (so / then), it forms فَإِنَّ ('then surely' / 'so indeed'), introducing logical consequence with certainty (e.g. فَإِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ)."
      },
      {
        titleUr: "دوہری تاکید (لامِ تاکید لَـ کے ساتھ)",
        textUr: "جب جملے کی خبر یا دوسرے حصے میں (لَـ) آئے تو دوہری تاکید پیدا ہوتی ہے، جیسے: إِنَّ هٰذَا لَسَاحِرٌ (بیشک یہ یقیناً جادوگر ہے) اور إِنَّ الإِنْسَانَ لَظَلُومٌ۔",
        titleEn: "Double Emphasis with Assertive Lām (لَـ)",
        textEn: "An assertive prefix لَـ (La) attached to the predicate establishes double emphasis ('Indeed ... surely'), reinforcing certainty (e.g. إِنَّ هٰذَا لَسَاحِرٌ)."
      },
      {
        titleUr: "اسمائے اشارہ کے ساتھ قطعات",
        textUr: "اسمائے اشارہ (ہٰذَا / ذٰلِكَ) پر اعراب کا ظاہری اثر نہیں ہوتا مگر مفہوم پختہ رہتا ہے، جیسے: إِنَّ هٰذَا عَدُوٌّ (بیشک یہ دشمن ہے) اور إِنَّ ذٰلِكَ لَحَقٌّ (بیشک وہ یقیناً حق ہے)۔",
        titleEn: "Demonstrative Pronoun Clauses",
        textEn: "Invariable demonstrative pronouns (هٰذَا, ذٰلِكَ) maintain implicit accusative state and pair directly with Inna (e.g. إِنَّ هٰذَا عَدُوٌّ)."
      }
    ],
    examples: [
      { ar: "إِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ", ur: "بیشک اللہ بہت بخشنے والا، نہایت رحم فرمانے والا ہے۔", en: "Indeed, Allah is Forgiving and Merciful." },
      { ar: "فَإِنَّ اللَّهَ سَمِيعٌ عَلِيمٌ", ur: "تو بیشک اللہ خوب سننے والا، سب کچھ جاننے والا ہے۔", en: "Then indeed, Allah is All-Hearing and All-Knowing." },
      { ar: "إِنَّ الإِنْسَانَ لَفِي خُسْرٍ", ur: "بیشک انسان یقیناً خسارے میں ہے۔", en: "Indeed, mankind is in loss." }
    ]
  },
  {
    id: "RULE-02",
    operator: "لِـ / لَـ",
    operatorTr: "Li / La",
    titleEn: "Preposition of Ownership & Purpose",
    titleUr: "حرفِ جر برائے ملکیت، غایت و اختصاص",
    arabicRole: "حرفِ جر (ملکیت، غایت، اختصاص) و لامِ تاکید",
    formula: "لِـ + اسْمٌ = جَرّ (زیر)",
    primaryMeaningUr: "لِـ: کے لیے، کی خاطر، کی ملکیت / لَـ: البتہ، یقیناً",
    primaryMeaningEn: "Li: For, Belonging to, Dedicated to / La: Surely, Truly",
    caseEffectUr: "جَرّ (اسم کے نیچے زیر)",
    caseEffectEn: "Genitive (جَرّ / Kasrah)",
    explanationUr: "(لِـ) حرفِ جر ہے جو ملکیت، استحقاق یا مقصد کو ظاہر کرتا ہے اور اپنے بعد والے اسم کے نیچے زیر (جَرّ) لاتا ہے۔ جملے کے اختتام پر آنے پر اس میں 'ہے' کا مفہوم پیدا ہوتا ہے۔ اسے لامِ تاکید (لَـ زبر والا) سے الگ سمجھنا ضروری ہے جو زبر کے ساتھ آتا ہے اور اعراب تبدیل نہیں کرتا۔",
    explanationEn: "The preposition لِـ (with Kasrah) expresses possession, purpose, or exclusive right, placing its noun in the genitive case (جَرّ). At clause end, it frequently supplies the predicate copula ('belongs to / is for'). Distinguish carefully from the assertive prefix لَـ (La, with Fat-hah) which signifies emphasis without altering grammatical case.",
    subRules: [
      {
        titleUr: "نکرہ اسماء (بغیر الْـ) کے ساتھ 'کسی' یا 'ایک' کا مفہوم",
        textUr: "جب (لِـ) بغیر (الْـ) والے اسم پر آئے تو تنوین کے ساتھ 'کسی' یا 'ایک' کا اضافہ ہوتا ہے، جیسے: لِرَسُولٍ (ایک رسول کے لیے)، لِشَيْءٍ (کسی چیز کے لیے)، اور لِأَجَلٍ (ایک مقررہ میعاد کے لیے)۔",
        titleEn: "Indefinite Nouns ('A' / 'Some')",
        textEn: "Preceding an indefinite noun (tanween without Al-), it imparts the indefinite meaning of 'a / an / any' (e.g. لِرَسُولٍ = for a messenger, لِشَيْءٍ = for anything)."
      },
      {
        titleUr: "جملے کے آغاز میں لِلَّهِ کا اختصاص (حصر)",
        textUr: "جب (لِلَّهِ) جملے کے شروع میں آئے تو اختصاص پیدا ہوتا ہے ('اللہ ہی کے لیے / اللہ ہی کا ہے')، جیسے: لِلَّهِ الحَمْدُ (سب تعریف اللہ ہی کے لیے ہے)، لِلَّهِ المُلْكُ، اور لِلَّهِ الشَّفَاعَةُ۔",
        titleEn: "Exclusive Focus (الحصر) with Lillah",
        textEn: "Placing لِلَّهِ at the front of a sentence restricts the attribute exclusively to Allah ('belongs exclusively to Allah alone', e.g. لِلَّهِ الحَمْدُ = All praise belongs solely to Allah)."
      },
      {
        titleUr: "فَـ کا سابقہ (فَلِلَّهِ = پس اللہ ہی کے لیے)",
        textUr: "جب شروع میں (فَـ) لگے تو (فَلِلَّهِ) بنتا ہے، جیسے: فَلِلَّهِ الحَمْدُ (پس اللہ ہی کے لیے ہے سب تعریف) اور فَلِلَّهِ الكِبْرِيَاءُ۔",
        titleEn: "Prefixing Fa (فَلِلَّهِ)",
        textEn: "Yields فَلِلَّهِ ('So to Allah alone belongs...', e.g. فَلِلَّهِ الحَمْدُ = So to Allah belongs all praise)."
      },
      {
        titleUr: "لامِ جارہ اور لامِ تاکید میں فرق",
        textUr: "لامِ جارہ کے نیچے زیر ہوتی ہے (لِـ) اور یہ اسم کو مجرور کرتا ہے، جبکہ لامِ تاکید پر زبر ہوتی ہے (لَـ) اور یہ معنی میں پختگی لاتا ہے مگر اعراب نہیں بدلتا (جیسے: لَسَاحِرٌ)۔",
        titleEn: "Distinction: Prepositional Li vs Assertive La",
        textEn: "Prepositional Lām carries a Kasrah (لِـ) and induces genitive case, whereas assertive Lām carries a Fat-hah (لَـ) and creates emphasis without affecting case."
      }
    ],
    examples: [
      { ar: "لِلَّهِ المُلْكُ", ur: "بادشاہت اللہ ہی کے لیے ہے۔", en: "To Allah belongs the dominion." },
      { ar: "هٰذَا بَيَانٌ لِلنَّاسِ", ur: "یہ لوگوں کے لیے واضح بیان ہے۔", en: "This is a clear declaration for mankind." },
      { ar: "وَلِلَّهِ المَشْرِقُ وَالمَغْرِبُ", ur: "اور اللہ ہی کے لیے ہے مشرق اور مغرب۔", en: "And to Allah belong the east and the west." }
    ]
  },
  {
    id: "RULE-03",
    operator: "فِي",
    operatorTr: "Fī",
    titleEn: "Preposition of Circumstance & Inhabitation",
    titleUr: "حرفِ جر برائے ظرفیت مکانی و زمانی",
    arabicRole: "حرفِ جر (ظرفیت مکانی و زمانی)",
    formula: "فِي + اسْمٌ = جَرّ (زیر)",
    primaryMeaningUr: "میں، اندر، کے درمیان",
    primaryMeaningEn: "In, Within, Inside, Among",
    caseEffectUr: "جَرّ (اسم کے نیچے زیر)",
    caseEffectEn: "Genitive (جَرّ / Kasrah)",
    explanationUr: "(فِي) ظرفیت (مکان یا زمان کے احاطے) کو ظاہر کرنے والا حرفِ جر ہے جو اپنے بعد والے اسم کے نیچے زیر (جَرّ) لاتا ہے۔ یہ ظاہر کرتا ہے کہ کوئی عمل یا ہستی کسی جگہ، وقت یا حالت کے اندر واقع ہے۔",
    explanationEn: "Expresses spatial, temporal, or circumstantial containment (ظرفیت), governing the subsequent noun in the genitive case (جَرّ). Indicates that an entity, action, or state resides within the boundaries of the following noun.",
    subRules: [
      {
        titleUr: "معطوف اسماء میں اعراب کا تسلسل",
        textUr: "جب (وَ) کے ذریعے متعدد اسماء جڑے ہوں تو سب مجرور رہتے ہیں، جیسے: فِي السَّمَاوَاتِ وَالأَرْضِ (آسمانوں اور زمین میں) اور فِي الإِثْمِ وَالعُدْوَانِ۔",
        titleEn: "Conjoined Genitive Series",
        textEn: "Following nouns joined by وَ retain the genitive case continuously (e.g. فِي السَّمَاوَاتِ وَالأَرْضِ)."
      },
      {
        titleUr: "نکرہ اسماء کے ساتھ 'کسی' کا مفہوم",
        textUr: "بغیر (الْـ) اسم پر داخل ہونے سے کسی غیر معین چیز کا مفہوم بنتا ہے، جیسے: فِي كِتَابٍ مُّبِينٍ (ایک واضح کتاب میں) اور فِي سِجْنٍ (کسی قید خانے میں)۔",
        titleEn: "Indefinite Containment",
        textEn: "With indefinite nouns, denotes circumstance within an unspecified entity (e.g. فِي كِتَابٍ مُّبِينٍ = in a clear record)."
      },
      {
        titleUr: "إِنَّ کے ساتھ خبر میں لامِ تاکید کی ترکیب",
        textUr: "قرآن مجید میں (إِنَّ فِي ذٰلِكَ لَـ) کا اسلوب عبرت و نشانیوں کے لیے کثرت سے آتا ہے، جیسے: إِنَّ فِي ذٰلِكَ لَآيَةً (بیشک اس میں یقیناً نشانی ہے) اور إِنَّ فِي ذٰلِكَ لَعِبْرَةً۔",
        titleEn: "Combination with Inna and Assertive Lām",
        textEn: "Frequently combined in Quranic didactic formulas with Inna and La for strong affirmation (e.g. إِنَّ فِي ذٰلِكَ لَآيَةً = Indeed in that is surely a sign)."
      },
      {
        titleUr: "معنوی و روحانی ظرفیت",
        textUr: "مادی مکان کے علاوہ دین، احوال اور اخروی معاملات کے لیے بھی مستعمل ہے، جیسے: فِي الدِّينِ (دین میں)، فِي خُسْرٍ (خسارے میں)، اور فِي ضَلَالٍ (گمراہی میں)۔",
        titleEn: "Abstract and Spiritual Circumstance",
        textEn: "Applies beyond physical space to encompass states of being, faith, or perdition (e.g. فِي الدِّينِ = in religion, فِي خُسْرٍ = in loss)."
      }
    ],
    examples: [
      { ar: "فِي الأَرْضِ", ur: "زمین میں۔", en: "In the earth." },
      { ar: "فِي كِتَابٍ مُّبِينٍ", ur: "ایک واضح کتاب میں۔", en: "In a clear record." },
      { ar: "إِنَّ فِي ذٰلِكَ لَعِبْرَةً", ur: "بیشک اس میں یقیناً بڑی عبرت ہے۔", en: "Indeed in that is a lesson." }
    ]
  },
  {
    id: "RULE-04",
    operator: "عَلَىٰ",
    operatorTr: "‘Alā",
    titleEn: "Preposition of Elevation & Obligation",
    titleUr: "حرفِ جر برائے استعلاء و وجوب",
    arabicRole: "حرفِ جر (استعلاء و وجوب)",
    formula: "عَلَىٰ + اسْمٌ = جَرّ (زیر)",
    primaryMeaningUr: "پر، اوپر، بلندی پر، کے ذمے، لازم",
    primaryMeaningEn: "Upon, On, Over, Bound by, Incumbent upon",
    caseEffectUr: "جَرّ (اسم کے نیچے زیر)",
    caseEffectEn: "Genitive (جَرّ / Kasrah)",
    explanationUr: "(عَلَىٰ) حسی یا معنوی بلندی (پر/اوپر) اور کسی پر لازم ہونے (وجوب) کے مفہوم کے لیے آتا ہے۔ یہ اپنے بعد والے اسم کو زیر (جَرّ) دیتا ہے۔ قرآنی تحیات، سلام اور احکام میں بکثرت استعمال ہوتا ہے۔",
    explanationEn: "Signifies physical elevation ('upon/above'), abstract supremacy, or obligatory duty ('incumbent upon'). Governs the following noun in the genitive case (جَرّ). Common in prophetic greetings, guidance metaphors, and legal responsibilities.",
    subRules: [
      {
        titleUr: "انبیاء اور صلحاء پر سلام کا اسلوب",
        textUr: "قرآنی دعاؤں اور درود و سلام کے قطعات میں (عَلَىٰ) مستعمل ہے، جیسے: سَلَامٌ عَلَىٰ نُوحٍ (سلام ہو نوحؑ پر)، سَلَامٌ عَلَىٰ إِبْرَاهِيمَ، اور سَلَامٌ عَلَى الْمُرْسَلِينَ۔",
        titleEn: "Prophetic Salutations (سَلَامٌ عَلَىٰ)",
        textEn: "Standard Quranic phrasing for peace and blessings upon prophets and righteous figures (e.g. سَلَامٌ عَلَىٰ نُوحٍ = Peace be upon Noah)."
      },
      {
        titleUr: "ہدایت و روش پر استقامت کا استعارہ",
        textUr: "راہِ راست پر قائم رہنے کے لیے (عَلَىٰ) مستعمل ہے، جیسے: عَلَىٰ هُدًى مِّن رَّبِّهِمْ (اپنے رب کی طرف سے ہدایت پر قائم) اور عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ۔",
        titleEn: "Steadfastness upon Guidance",
        textEn: "Metaphor for adhering firmly to truth and the straight course (e.g. عَلَىٰ هُدًى مِّن رَّبِّهِمْ = Upon guidance from their Lord)."
      },
      {
        titleUr: "حرج اور مواخذے کی نفی (لَيْسَ عَلَىٰ)",
        textUr: "معذورین سے شرعی مواخذہ ہٹانے کے لیے، جیسے: لَيْسَ عَلَى الأَعْمَىٰ حَرَجٌ (اندھے پر کوئی گناہ یا تنگی نہیں)۔",
        titleEn: "Negation of Hardship or Blame (لَيْسَ عَلَىٰ)",
        textEn: "Used with Laysa to lift legal obligation or culpability from the incapacitated (e.g. لَيْسَ عَلَى الأَعْمَىٰ حَرَجٌ = No blame is upon the blind)."
      },
      {
        titleUr: "نیکی پر باہمی تعاون (عَلَى البِرِّ)",
        textUr: "اخلاقی و اجتماعی اصول: وَتَعَاوَنُوا عَلَى البِرِّ وَالتَّقْوَىٰ (اور نیکی اور تقویٰ پر باہم تعاون کرو)۔",
        titleEn: "Cooperation in Righteousness",
        textEn: "Expresses moral foundation: cooperating upon righteousness and piety while rejecting transgression."
      }
    ],
    examples: [
      { ar: "عَلَى العَرْشِ", ur: "عرش پر۔", en: "Upon the Throne." },
      { ar: "عَلَىٰ هُدًى مِّن رَّبِّهِمْ", ur: "اپنے رب کی طرف سے ہدایت پر۔", en: "Upon guidance from their Lord." },
      { ar: "سَلَامٌ عَلَىٰ نُوحٍ", ur: "سلام ہو نوحؑ پر۔", en: "Peace upon Noah." }
    ]
  },
  {
    id: "RULE-05",
    operator: "مِنْ",
    operatorTr: "Min",
    titleEn: "Preposition of Origin & Partitive",
    titleUr: "حرفِ جر برائے ابتداء و تبعیض",
    arabicRole: "حرفِ جر (ابتداء الغایہ و تبعیض)",
    formula: "مِنْ + اسْمٌ = جَرّ (زیر)",
    primaryMeaningUr: "سے، کی طرف سے، میں سے، کی وجہ سے",
    primaryMeaningEn: "From, Of, Out of, By reason of",
    caseEffectUr: "جَرّ (اسم کے نیچے زیر)",
    caseEffectEn: "Genitive (جَرّ / Kasrah)",
    explanationUr: "(مِنْ) کسی چیز کی ابتدا، منبع، جگہ، یا کسی مجموعے میں سے بعض (حصہ) کو ظاہر کرنے کے لیے آتا ہے۔ بعد والے اسم کو زیر (جَرّ) دیتا ہے۔",
    explanationEn: "Marks the origin or starting point of an action/location (ابتداء الغایہ), or designates a subset/part of a whole (تبعیض). Governs the subsequent noun in the genitive case (جَرّ).",
    subRules: [
      {
        titleUr: "الْـ والے اسم کے ساتھ نون پر زبر (مِنَ)",
        textUr: "جب (مِنْ) کے بعد (الْـ) والا اسم آئے تو ملا کر پڑھتے ہوئے نون پر زبر لگائی جاتی ہے (مِنَ)، جیسے: مِنَ الكِتَابِ، مِنَ الأَرْضِ، اور مِنَ السَّمَاءِ۔",
        titleEn: "Phonetic Vocalization before Al- (مِنَ)",
        textEn: "When followed by the definite article Al- (الْـ), the sukūn on the nūn assimilates to a Fat-hah (مِنَ) to facilitate smooth recitation (e.g. مِنَ الْكِتَابِ)."
      },
      {
        titleUr: "تبعیض (کُل میں سے جز ظاہر کرنا)",
        textUr: "کسی بڑی جماعت میں سے بعض کا انتخاب، جیسے: مِنَ النَّاسِ (لوگوں میں سے بعض)، مِنَ الصَّالِحَاتِ (نیک اعمال میں سے)، اور مِنَ المَلَائِكَةِ۔",
        titleEn: "Partitive Sense (تبعیض)",
        textEn: "Denotes 'some among' or 'a portion of' a collective body (e.g. مِنَ النَّاسِ = among the people, مِنَ الصَّالِحَاتِ = of righteous deeds)."
      },
      {
        titleUr: "نکرہ اسماء کے ساتھ 'کسی' کا مفہوم",
        textUr: "جب بغیر (الْـ) اسم پر آئے تو نون پر جزم رہتا ہے اور معنی میں 'کسی' یا 'ایک' آتا ہے، جیسے: مِنْ مَّاءٍ (کسی پانی سے) اور مِنْ كِتَابٍ (کسی کتاب سے)۔",
        titleEn: "Indefinite Source ('Any' / 'Some')",
        textEn: "Retains standard sukūn with indefinite nouns, conveying 'from any/some' (e.g. مِنْ مَّاءٍ = from any water, مِنْ كِتَابٍ = from a book)."
      },
      {
        titleUr: "تقابل و موازنہ (Comparative: سے زیادہ)",
        textUr: "دو چیزوں کے درمیان برتری یا شدت ظاہر کرنے کے لیے: وَالفِتْنَةُ أَشَدُّ مِنَ القَتْلِ (اور فتنہ قتل سے بھی زیادہ سخت ہے)۔",
        titleEn: "Comparative Degree Formulation",
        textEn: "Used in comparative constructions to denote superiority or greater intensity (e.g. وَالفِتْنَةُ أَشَدُّ مِنَ القَتْلِ = Discord is worse than slaughter)."
      }
    ],
    examples: [
      { ar: "مِنَ السَّمَاءِ", ur: "آسمان سے۔", en: "From the sky." },
      { ar: "مِنْ مَّاءٍ", ur: "کسی پانی سے۔", en: "From water." },
      { ar: "مِنَ الجِنِّ وَالإِنْسِ", ur: "جنوں اور انسانوں میں سے۔", en: "From among jinn and mankind." }
    ]
  },
  {
    id: "RULE-06",
    operator: "إِلَىٰ",
    operatorTr: "Ilā",
    titleEn: "Preposition of Terminus & Direction",
    titleUr: "حرفِ جر برائے انتہاء الغایہ و منزلِ مقصود",
    arabicRole: "حرفِ جر (انتہاء الغایہ مکانی و زمانی)",
    formula: "إِلَىٰ + اسْمٌ = جَرّ (زیر)",
    primaryMeaningUr: "کی طرف، تک، کے پاس، جانب",
    primaryMeaningEn: "To, Towards, Unto, As far as",
    caseEffectUr: "جَرّ (اسم کے نیچے زیر)",
    caseEffectEn: "Genitive (جَرّ / Kasrah)",
    explanationUr: "(إِلَىٰ) حرکت کی سمت، آخری حد (انتہاء الغایہ)، منزلِ مقصود، یا وقت کے اختتام کو ظاہر کرنے کے لیے آتا ہے۔ بعد والے اسم کو زیر (جَرّ) دیتا ہے۔",
    explanationEn: "Specifies the terminus of motion, ultimate destination, or chronological cutoff (انتہاء الغایہ). Puts the governed noun into the genitive case (جَرّ).",
    subRules: [
      {
        titleUr: "دعوت و رہنمائی کا مقصود",
        textUr: "کسی خیر یا راہِ حق کی طرف بلانے کا رخ، جیسے: يَهْدِي إِلَى الحَقِّ (حق کی طرف رہنمائی کرتا ہے) اور يَدْعُو إِلَى الجَنَّةِ (جنت کی طرف بلاتا ہے)۔",
        titleEn: "Direction of Guidance and Invitation",
        textEn: "Denotes the objective of divine guidance or moral summons (e.g. يَهْدِي إِلَى الحَقِّ = guides toward the truth)."
      },
      {
        titleUr: "زمانی غایت (وقت کی آخری حد)",
        textUr: "کسی عمل کے اختتام کا وقت، جیسے: إِلَى اللَّيْلِ (رات تک)، إِلَى أَجَلٍ مُّسَمًّى (ایک مقررہ وقت تک)، اور إِلَى يَوْمِ القِيَامَةِ۔",
        titleEn: "Temporal Limit",
        textEn: "Marks the endpoint of a period or ritual (e.g. إِلَى اللَّيْلِ = until nightfall, إِلَى يَوْمِ القِيَامَةِ = until the Day of Resurrection)."
      },
      {
        titleUr: "رجوع اور انجام کا رخ (اللہ کی بارگاہ)",
        textUr: "تمام امور اور ارواح کا اللہ کی طرف لوٹنا، جیسے: إِلَى اللَّهِ الْمَصِيرُ (اللہ ہی کی طرف لوٹ کر جانا ہے) اور إِلَى اللَّهِ تُرْجَعُ الأُمُورُ۔",
        titleEn: "Ultimate Return unto Allah",
        textEn: "Emphasizes the theological reality of return and accountability before God (e.g. إِلَى اللَّهِ الْمَصِيرُ = Unto Allah is the final return)."
      },
      {
        titleUr: "تضاد و تغیر کے قطعات (اندھیروں سے روشنی کی طرف)",
        textUr: "کفر سے ایمان کی طرف منتقلی: مِنَ الظُّلُمَاتِ إِلَى النُّورِ (اندھیروں سے روشنی کی طرف)۔",
        titleEn: "Transition from Darkness to Light",
        textEn: "Paired with مِنْ to frame moral transformation (e.g. مِنَ الظُّلُمَاتِ إِلَى النُّورِ = From darknesses into the light)."
      }
    ],
    examples: [
      { ar: "إِلَى اللهِ المَصِيرُ", ur: "اللہ ہی کی طرف لوٹنا ہے۔", en: "To Allah is the destination." },
      { ar: "إِلَى النُّورِ", ur: "روشنی کی طرف۔", en: "Toward the light." },
      { ar: "إِلَى يَوْمِ القِيَامَةِ", ur: "قیامت کے دن تک۔", en: "Until the Day of Resurrection." }
    ]
  },
  {
    id: "RULE-07",
    operator: "بِـ",
    operatorTr: "Bi",
    titleEn: "Preposition of Instrumentality & Exchange",
    titleUr: "حرفِ جر برائے سببیت، استعانت و تعویض",
    arabicRole: "حرفِ جر (استعانت، سببیت، تعویض، الساق)",
    formula: "بِـ + اسْمٌ = جَرّ (زیر)",
    primaryMeaningUr: "ساتھ، کے ذریعے، پر، کو، کے بدلے",
    primaryMeaningEn: "With, By, Through, In exchange for",
    caseEffectUr: "جَرّ (اسم کے نیچے زیر)",
    caseEffectEn: "Genitive (جَرّ / Kasrah)",
    explanationUr: "(بِـ) کثیر الاستعمال حرفِ جر ہے جو سبب، ذریعے، ساتھ ہونے، یا بدلے (قصاص و تعویض) کو ظاہر کرتا ہے۔ بعد والے اسم کو زیر (جَرّ) دیتا ہے۔",
    explanationEn: "A versatile preposition denoting instrumentality ('by means of'), association ('with'), affirmation ('in'), or exact compensation ('in exchange for'). Governs the following noun in the genitive case (جَرّ).",
    subRules: [
      {
        titleUr: "بِـ بمعنی 'کے بدلے' (قصاص و تعویض کے احکام)",
        textUr: "جان اور اعضاء کے برابری کے بدلے کا قانون: النَّفْسَ بِالنَّفْسِ (جان کے بدلے جان)، العَيْنَ بِالعَيْنِ (آنکھ کے بدلے آنکھ)، الأَنْفَ بِالأَنْفِ، اور السِّنَّ بِالسِّنِّ۔",
        titleEn: "Bi of Exact Compensation (Qisas / Retaliation)",
        textEn: "Designates reciprocal exchange in legal justice (e.g. النَّفْسَ بِالنَّفْسِ = Life for life, العَيْنَ بِالعَيْنِ = Eye for eye, السِّنَّ بِالسِّنِّ = Tooth for tooth)."
      },
      {
        titleUr: "استعانت اور ذریعہ (کسی عمل کا وسیلہ)",
        textUr: "کسی کام کو کسی اوزار یا نیکی کے ذریعے انجام دینا، جیسے: بِالقَلَمِ (قلم کے ذریعے) اور بِالصَّبْرِ وَالصَّلَاةِ (صبر اور نماز کے ذریعے مدد چاہو)۔",
        titleEn: "Instrumentality and Assistance (استعانت)",
        textEn: "Denotes the means or virtue employed (e.g. بِالقَلَمِ = by the pen, بِالصَّبْرِ وَالصَّلَاةِ = through patience and prayer)."
      },
      {
        titleUr: "ایمان و تصدیق کا متعلق",
        textUr: "ایمان لانے کا تعلق ظاہر کرنے کے لیے: آمَنَّا بِاللَّهِ (ہم اللہ پر ایمان لائے) اور يُؤْمِنُونَ بِالغَيْبِ (وہ غیب پر ایمان رکھتے ہیں)۔",
        titleEn: "Belief in Unseen Realities",
        textEn: "Standard syntactic link for verbs of faith (e.g. آمَنَّا بِاللَّهِ = We have believed in Allah, يُؤْمِنُونَ بِالغَيْبِ = They believe in the unseen)."
      },
      {
        titleUr: "نکرہ اسماء کے ساتھ قطعات",
        textUr: "بغیر (الْـ) کے اسم پر آنے سے: بِغَضَبٍ (کسی غضب کے ساتھ)، بِعَذَابٍ (کسی عذاب سے)، اور بِآيَةٍ (کسی نشانی کے ساتھ)۔",
        titleEn: "Indefinite Means / Manifestation",
        textEn: "Pairs with indefinite nouns to show specific manifestation (e.g. بِغَضَبٍ = with wrath, بِآيَةٍ = with a sign)."
      }
    ],
    examples: [
      { ar: "بِسْمِ اللَّهِ", ur: "اللہ کے نام سے۔", en: "In the name of Allah." },
      { ar: "بِالقَلَمِ", ur: "قلم کے ذریعے سے۔", en: "By the pen." },
      { ar: "النَّفْسَ بِالنَّفْسِ", ur: "جان کے بدلے جان۔", en: "A life for a life." }
    ]
  },
  {
    id: "RULE-08",
    operator: "لَا",
    operatorTr: "Lā",
    titleEn: "Absolute Categorical Negation",
    titleUr: "لَا نفی جنس برائے قطعی نفی",
    arabicRole: "لَا نافیہ برائے نفیِ جنس",
    formula: "لَا + اسْمٌ نکرہ = نَصْب (صرف ایک زبر، بغیر تنوین)",
    primaryMeaningUr: "بالکل نہیں، ہرگز کوئی نہیں، قطعاً نہیں",
    primaryMeaningEn: "No, None, Not any, Absolute categorical negation",
    caseEffectUr: "نَصْب (صرف ایک زبر، بغیر تنوین)",
    caseEffectEn: "Accusative without nunation (Single Fat-hah / زبر)",
    explanationUr: "یہ (لَا) اپنے بعد والے نکرہ اسم کی پوری جنس کی مکمل اور قطعی نفی کرتا ہے۔ اس کے بعد والے اسم پر تنوین ختم ہو کر صرف ایک زبر (نَصْب) باقی رہتی ہے۔ یہ کلمہ توحید اور ایمانی حقائق کا بنیادی ستون ہے۔",
    explanationEn: "Denies an entire category or genus of existence completely (نفي الجنس). Its governed noun must be indefinite and immediately attached, taking a single Fat-hah without tanween. Foundational to the declaration of Islamic monotheism.",
    subRules: [
      {
        titleUr: "اسم نکرہ پر صرف ایک زبر (بغیر تنوین)",
        textUr: "جنس کی مطلق نفی کے لیے اسم نکرہ پر دو زبر کی جگہ صرف ایک زبر آتی ہے، جیسے: لَا عِلْمَ، لَا شَرِيكَ، لَا رَيْبَ، اور لَا إِكْرَاهَ۔",
        titleEn: "Single Fat-hah without Nunation",
        textEn: "The noun must be indefinite and receives a single Fat-hah without tanween (e.g. لَا عِلْمَ = no knowledge whatsoever, لَا شَرِيكَ = no partner at all)."
      },
      {
        titleUr: "فَـ کا سابقہ (فَلَا = تو کوئی نہیں / پس کوئی نہیں)",
        textUr: "جب شرط یا نتیجے کے طور پر (فَـ) داخل ہو تو (فَلَا) بنتا ہے، جیسے: فَلَا جُنَاحَ عَلَيْهِ (تو اس پر کوئی گناہ نہیں)، فَلَا عُدْوَانَ، اور فَلَا نَاصِرَ۔",
        titleEn: "Prefixing Fa (فَلَا)",
        textEn: "Forms فَلَا to express conclusive ruling or consequence (e.g. فَلَا جُنَاحَ عَلَيْهِ = then no blame is upon him, فَلَا عُدْوَانَ = then no hostility)."
      },
      {
        titleUr: "حج میں منہیات کی جامع نفی",
        textUr: "قرآنی حکم: فَلَا رَفَثَ وَلَا فُسُوقَ وَلَا جِدَالَ فِي الحَجِّ (پس حج میں نہ کوئی فحش بات ہو، نہ کوئی نافرمانی اور نہ کوئی جھگڑا)۔",
        titleEn: "Triple Negation of Prohibitions in Hajj",
        textEn: "Demonstrates compound categorical negation across distinct categories (e.g. no obscenity, no wickedness, no arguing in Hajj)."
      },
      {
        titleUr: "مشہور اصطلاحاتِ عقیدہ و توحید",
        textUr: "ایمانی نفی و اثبات: لَا إِلٰهَ (کوئی معبود نہیں)، لَا غَالِبَ لَكُمُ اليَوْمَ (آج تم پر کوئی غالب نہیں)، اور لَا طَاقَةَ لَنَا۔",
        titleEn: "Theological Imperatives",
        textEn: "Serves as the negating predicate in the Shahadah (لَا إِلٰهَ = there is no deity whatsoever) and affirmations of absolute divine omnipotence."
      }
    ],
    examples: [
      { ar: "لَا رَيْبَ فِيهِ", ur: "اس میں کوئی شک نہیں۔", en: "There is no doubt in it." },
      { ar: "لَا إِكْرَاهَ فِي الدِّينِ", ur: "دین میں کوئی زبردستی نہیں۔", en: "There is no compulsion in religion." },
      { ar: "لَا شَرِيكَ لَهُ", ur: "اس کا کوئی شریک نہیں۔", en: "He has no partner." }
    ]
  },
  {
    id: "RULE-09",
    operator: "إِلَّا",
    operatorTr: "Illā",
    titleEn: "Exceptive Particle & Restriction",
    titleUr: "حرفِ استثناء و حصر",
    arabicRole: "حرفِ استثناء / أداة الحصر",
    formula: "إِلَّا + مُسْتَثْنَىٰ",
    primaryMeaningUr: "سوائے، مگر، بجز، کے علاوہ",
    primaryMeaningEn: "Except, But, Unless, Save, Only",
    caseEffectUr: "عموماً نَصْب (مستثنیٰ کا اعراب سیاق کے مطابق)",
    caseEffectEn: "Typically Accusative (Context-dependent in restriction)",
    explanationUr: "(إِلَّا) استثناء (کسی چیز کو عام حکم سے الگ کرنے) اور نفی کے بعد آنے پر حصر (کسی بات کو اسی ذات یا عمل میں محدود و مخصوص کرنے) کے لیے آتا ہے۔ نفی اور إِلَّا کے ملاپ سے کلام میں زبردست حصر پیدا ہوتا ہے۔",
    explanationEn: "Serves as an exceptive particle to exempt an element from a general ruling, or as a restrictive device (حصر) following negation to mean 'only / none except'. Foundational to expressions of monotheistic uniqueness.",
    subRules: [
      {
        titleUr: "مَا نافیہ کے بعد حصر کا معنی ('صرف / ہی')",
        textUr: "جب نفی (مَا یا إِنْ) کے بعد (إِلَّا) آئے تو معنی 'صرف' یا 'ہی' بن جاتا ہے، جیسے: وَمَا هٰذَا إِلَّا سِحْرٌ (یہ نہیں ہے مگر جادو / یہ صرف جادو ہی ہے) اور وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ (اور محمد ﷺ نہیں مگر ایک رسول ہی ہیں)۔",
        titleEn: "Exclusive Restriction after Negation (Mā ... Illā = Only)",
        textEn: "When paired with negative particle مَا, the construction creates emphatic exclusivity meaning 'nothing but / only' (e.g. وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ = Muhammad is not but a messenger)."
      },
      {
        titleUr: "سابقہ حروفِ جارہ کے ساتھ ترکیب",
        textUr: "جب (إِلَّا) کے بعد حرفِ جر آئے تو استثناء برقرار رہتا ہے، جیسے: إِلَّا فِي كِتَابٍ (مگر کتاب میں)، إِلَّا بِالحَقِّ (مگر حق کے ساتھ)، اور إِلَّا عَلَى اللَّهِ۔",
        titleEn: "Prepositional Exception Clauses",
        textEn: "Prepositions retain their full genitive governing function when placed directly after Illā (e.g. إِلَّا فِي كِتَابٍ = except in a record, إِلَّا بِالحَقِّ = except with truth)."
      },
      {
        titleUr: "کلمہ توحید میں نفی کے بعد اثبات",
        textUr: "پہلے ہر باطل معبود کی نفی پھر اللہ تعالیٰ کی یکتائی کا اثبات: لَا إِلٰهَ إِلَّا اللَّهُ (اللہ کے سوا کوئی معبود نہیں) اور لَا قُوَّةَ إِلَّا بِاللَّهِ۔",
        titleEn: "The Creed of Tawḥīd (Negation followed by Affirmation)",
        textEn: "Negates all false gods first through Lā, then exclusively affirms the One Creator via Illā (e.g. لَا إِلٰهَ إِلَّا اللَّهُ = There is no god except Allah)."
      },
      {
        titleUr: "نکرہ اسماء پر داخل ہونا",
        textUr: "بغیر (الْـ) کے اسم پر آنے سے: إِلَّا نَذِيرٌ (مگر ڈرانے والا)، إِلَّا لَعِبٌ (مگر کھیل)، اور إِلَّا قَلِيلًا (سوائے تھوڑے کے)۔",
        titleEn: "Exception with Indefinite Nouns",
        textEn: "Applied directly to indefinite nouns in predicate or accusative state (e.g. إِلَّا نَذِيرٌ = but a warner, إِلَّا قَلِيلًا = except a few)."
      }
    ],
    examples: [
      { ar: "لَا إِلٰهَ إِلَّا هُوَ", ur: "اس کے سوا کوئی معبود نہیں۔", en: "There is no deity except Him." },
      { ar: "وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ", ur: "اور محمد ﷺ تو بس ایک رسول ہی ہیں۔", en: "Muhammad is not but a messenger." },
      { ar: "إِلَّا إِبْلِيسَ", ur: "سوائے ابلیس کے۔", en: "Except Iblis." }
    ]
  },
  {
    id: "RULE-10",
    operator: "وَ (قَسَم)",
    operatorTr: "Wa (Oath)",
    titleEn: "Oath Particle",
    titleUr: "واوِ قسم برائے سوگند و تعظیم",
    arabicRole: "واوِ قسم (حرفِ جر برائے قسم)",
    formula: "وَ + مُقْسَمٌ بِهِ = جَرّ (زیر)",
    primaryMeaningUr: "قسم ہے ... کی",
    primaryMeaningEn: "By ..., I swear by ...",
    caseEffectUr: "جَرّ (مقسم بہ کے نیچے زیر)",
    caseEffectEn: "Genitive (جَرّ / Kasrah on the sworn entity)",
    explanationUr: "کسی چیز کی عظمت یا اس کے بعد آنے والی حقیقت کی غیر معمولی اہمیت ظاہر کرنے کے لیے اس سے پہلے (وَ) لگا کر قسم کھائی جاتی ہے۔ مقسم بہ (وہ اسم جس کی قسم کھائی گئی ہو) کے آخری حرف کے نیچے زیر (جَرّ) آتی ہے۔",
    explanationEn: "A solemn oath-taking particle functioning as a preposition (حرفِ جر), putting the subsequent sworn entity into the genitive case (جَرّ). Used across the Quran to highlight cosmic witnesses and the grave importance of subsequent truth.",
    subRules: [
      {
        titleUr: "مقسم بہ کا مجرور ہونا",
        textUr: "جس چیز کی قسم کھائی جائے اس کے نیچے لازماً زیر آتی ہے، جیسے: وَاللَّهِ (قسم ہے اللہ کی)، وَالعَصْرِ (قسم ہے زمانے کی)، اور وَالشَّمْسِ (قسم ہے سورج کی)۔",
        titleEn: "Mandatory Genitive on Sworn Noun",
        textEn: "The noun sworn by takes the genitive case under the governing influence of the oath-particle (e.g. وَاللَّهِ = By Allah, وَالعَصْرِ = By the time)."
      },
      {
        titleUr: "نکرہ اسماء (بغیر الْـ) پر واوِ قسم کے ساتھ تنوین (دو زیر)",
        textUr: "اگر مقسم بہ بغیر (الْـ) ہو تو تنوین (دو زیر) کے ساتھ 'ایک' کا مفہوم آتا ہے، جیسے: وَكِتَابٍ مَّسْطُورٍ (قسم ہے ایک لکھی ہوئی کتاب کی) اور وَوَالِدٍ وَمَا وَلَدَ (قسم ہے ایک باپ کی اور اس کی اولاد کی)۔",
        titleEn: "Oaths on Indefinite Nouns (Tanween)",
        textEn: "Without the definite article, takes double Kasrah (tanween) signifying 'a/an' (e.g. وَكِتَابٍ مَّسْطُورٍ = By a written book, وَوَالِدٍ = By a father)."
      },
      {
        titleUr: "قسم اور جوابِ قسم کا ربط",
        textUr: "قسم کے بعد وہ اصل حقیقت بیان ہوتی ہے جس پر قسم کھائی گئی، جیسے: وَالعَصْرِ • إِنَّ الإِنْسَانَ لَفِي خُسْرٍ (زمانے کی قسم! بیشک انسان خسارے میں ہے)۔",
        titleEn: "Oath and Complement (جواب القسم)",
        textEn: "The oath is always accompanied by a solemn assertion (Jawāb al-Qasam) that conveys the ultimate lesson (e.g. By time! Indeed, mankind is in loss)."
      },
      {
        titleUr: "مرکب و مسلسل قسمیں",
        textUr: "سورتوں کے آغاز میں یکے بعد دیگرے مظاہرِ کائنات کی قسمیں، جیسے: وَالشَّفْعِ وَالوَتْرِ (قسم ہے جفت کی اور طاق کی) اور وَالتِّينِ وَالزَّيْتُونِ وَطُورِ سِينِينَ۔",
        titleEn: "Chained Cosmic Oaths",
        textEn: "Multiple cosmic entities are conjoined with continuous genitive endings (e.g. By the fig, and the olive, and Mount Sinai)."
      }
    ],
    examples: [
      { ar: "وَالعَصْرِ", ur: "قسم ہے زمانے کی!", en: "By time!" },
      { ar: "وَالشَّمْسِ وَضُحَاهَا", ur: "قسم ہے سورج کی اور اس کی دھوپ کی!", en: "By the sun and its brightness!" },
      { ar: "وَالتِّينِ وَالزَّيْتُونِ", ur: "قسم ہے انجیر کی اور زیتون کی!", en: "By the fig and the olive!" }
    ]
  },
  {
    id: "RULE-11",
    operator: "أَنَّ",
    operatorTr: "Anna",
    titleEn: "Subordinating Conjunction",
    titleUr: "حرفِ موصولی برائے توکید و مصدریت",
    arabicRole: "حرف مشبہ بالفعل برائے توکید و مصدریت",
    formula: "أَنَّ + اسْمٌ = نَصْب (زبر)",
    primaryMeaningUr: "کہ، یہ کہ، بیشک",
    primaryMeaningEn: "That, Indeed that",
    caseEffectUr: "نَصْب (اسم پر زبر)",
    caseEffectEn: "Accusative (نَصْب / Fat-hah)",
    explanationUr: "(أَنَّ) کلام کے درمیان میں دو جملوں کو جوڑنے اور بات میں پختگی (توکید) پیدا کرنے کے لیے آتا ہے۔ یہ اپنے بعد والے اسم کو زبر (نَصْب) دیتا ہے۔ (إِنَّ) جملے کے شروع میں آتا ہے جبکہ (أَنَّ) کلام کے درمیان میں واقع ہوتا ہے۔",
    explanationEn: "A subordinating conjunction of certainty used mid-sentence to link clauses and embed propositions ('that ...'). Like Inna, it governs its following noun into the accusative case (نَصْب). Unlike Inna (which opens sentences), Anna functions within the body of a sentence.",
    subRules: [
      {
        titleUr: "درمیانِ کلام میں آنا (إِنَّ اور أَنَّ کا فرق)",
        textUr: "(إِنَّ) ہمیشہ جملے کے آغاز میں آتا ہے جبکہ (أَنَّ) ہمیشہ کلام کے درمیان میں واقع ہوتا ہے، جیسے: أَعْلَمُ أَنَّ اللَّهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ (میں جانتا ہوں کہ بیشک اللہ ہر چیز پر قادر ہے)۔",
        titleEn: "Mid-Sentence Positioning vs. Sentence-Initial Inna",
        textEn: "Always occurs internally to connect a governing verb (knowing, declaring, testifying) to an affirmed clause (e.g. I know that Allah is capable of all things)."
      },
      {
        titleUr: "اعرابی اثر (اسم پر زبر)",
        textUr: "اپنے بعد والے اسم کو لازماً زبر دیتا ہے، جیسے: أَنَّ الحَقَّ لِلَّهِ (کہ سارا حق اللہ کے لیے ہے) اور أَنَّ القُوَّةَ لِلَّهِ۔",
        titleEn: "Accusative Case Governance",
        textEn: "Puts the immediate noun (Ism Anna) into the accusative state with Fat-hah (e.g. أَنَّ الْحَقَّ لِلَّهِ = that the truth belongs to Allah)."
      },
      {
        titleUr: "صفاتِ باری تعالیٰ کی توکید",
        textUr: "اللہ تعالیٰ کی صفات کے قطعات میں: وَأَنَّ اللَّهَ سَمِيعٌ عَلِيمٌ (اور یہ کہ اللہ خوب سننے والا، جاننے والا ہے) اور وَأَنَّ اللَّهَ غَفُورٌ رَّحِيمٌ۔",
        titleEn: "Affirmation of Divine Attributes",
        textEn: "Reiterates absolute divine attributes in theological declarations (e.g. and that Allah is All-Hearing and All-Knowing)."
      },
      {
        titleUr: "ایمانی و اخروی حقائق کی قطعی تصدیق",
        textUr: "قیامت اور انجام کی پختگی: وَأَنَّ السَّاعَةَ آتِيَةٌ لَّا رَيْبَ فِيهَا (اور یہ کہ قیامت آنے والی ہے، اس میں کوئی شک نہیں) اور وَأَنَّ الكَافِرِينَ لَا مَوْلَىٰ لَهُمْ۔",
        titleEn: "Eschatological Affirmations",
        textEn: "Embeds certainty regarding the Hour and the final recompense (e.g. and that the Hour is coming, there is no doubt about it)."
      }
    ],
    examples: [
      { ar: "أَنَّ الحَقَّ لِلَّهِ", ur: "کہ سارا حق اللہ ہی کے لیے ہے۔", en: "That the truth belongs to Allah." },
      { ar: "وَأَنَّ السَّاعَةَ آتِيَةٌ", ur: "اور یہ کہ قیامت آنے والی ہے۔", en: "And that the Hour is coming." },
      { ar: "أَنَّ اللَّهَ غَفُورٌ رَّحِيمٌ", ur: "کہ اللہ بہت بخشنے والا، نہایت رحم فرمانے والا ہے۔", en: "That Allah is Forgiving and Merciful." }
    ]
  },
  {
    id: "RULE-12",
    operator: "كَانَ",
    operatorTr: "Kāna",
    titleEn: "Incomplete Verb (Past & Eternal)",
    titleUr: "فعلِ ناقص برائے ماضی و دوامِ صفت",
    arabicRole: "فِعْلٌ نَاقِص (ماضی و دوام)",
    formula: "كَانَ + اسْمٌ (پیش / رَفْع) + خَبَرٌ (دو زبر / نَصْب)",
    primaryMeaningUr: "تھا (ماضی میں) / ہمیشہ سے ہے اور رہے گا (اللہ کی صفات کے ساتھ)",
    primaryMeaningEn: "Was (past) / Has always been and is eternally (with Allah's attributes)",
    caseEffectUr: "اسم پر پیش (رَفْع) اور خبر پر دو زبر (نَصْب)",
    caseEffectEn: "Nominative on subject, Accusative on predicate (دو زبر / Alif)",
    explanationUr: "(كَانَ) فعلِ ناقص ہے جو جملہ اسمیہ پر داخل ہو کر خبر کو دو زبر (منصوب) کرتا ہے۔ مخلوق اور عام کلام میں اس کا معنی ماضی ('تھا') ہوتا ہے، لیکن جب یہ اللہ تعالیٰ کی صفات کے ساتھ آئے تو اس کا معنی ازلی و ابدی ہوتا ہے: 'ہمیشہ سے ہے اور ہمیشہ رہے گا'۔",
    explanationEn: "An incomplete verb entering nominal sentences, keeping its subject in the nominative case (رَفْع) while governing its predicate into the accusative case (نَصْب, marked with two Fat-has and an Alif). When applied to created beings, it denotes the past ('was'); when applied to Allah's divine attributes, it denotes eternal, uninterrupted reality ('has always been and ever remains').",
    subRules: [
      {
        titleUr: "اللہ تعالیٰ کی صفات کے ساتھ ازلی و ابدی معنی ('ہمیشہ سے ہے')",
        textUr: "اللہ کی ذات کے لیے (كَانَ) کا معنی 'تھا' نہیں بلکہ 'ہمیشہ سے ہے اور رہے گا' ہوتا ہے، جیسے: وَكَانَ اللَّهُ عَلِيمًا حَكِيمًا (اور اللہ ہمیشہ سے سب کچھ جاننے والا، حکمت والا ہے) اور وَكَانَ اللَّهُ غَفُورًا رَّحِيمًا۔",
        titleEn: "Eternal Reality with Divine Attributes (Never Past Tense)",
        textEn: "When describing Allah, Kāna signifies continuous, eternal reality without temporal start or end (e.g. وَكَانَ اللَّهُ عَلِيمًا حَكِيمًا = And Allah is ever All-Knowing, All-Wise)."
      },
      {
        titleUr: "مخلوق اور عام حالات کے ساتھ ماضی کا معنی ('تھا')",
        textUr: "مخلوق کے حالات میں گزرا ہوا وقت ظاہر کرتا ہے، جیسے: كَانَ مَرِيضًا (وہ مریض تھا)، كَانَ صِدِّيقًا نَّبِيًّا (وہ سچا نبی تھا)، اور إِنَّ البَاطِلَ كَانَ زَهُوقًا (باطل مٹ جانے ہی والا تھا)۔",
        titleEn: "Past Tense with Created Beings",
        textEn: "Conveys historical past tense when describing created beings or transient states (e.g. كَانَ مَرِيضًا = he was sick, كَانَ صِدِّيقًا نَّبِيًّا = he was a truthful prophet)."
      },
      {
        titleUr: "خبر پر دو زبر اور رسم الخط میں الف کا اضافہ",
        textUr: "مفرد خبر پر دو زبر لگائی جاتی ہے اور رسم الخط میں الف لکھا جاتا ہے، جیسے: رَسُولًا، عَلِيمًا، حَكِيمًا، اور خَيْرًا۔",
        titleEn: "Accusative Predicate with Orthographic Alif",
        textEn: "The predicate takes tanween fat-hah, orthographically appended with an Alif in Arabic script (e.g. رَسُولًا, عَلِيمًا, مُؤْمِنًا)."
      },
      {
        titleUr: "إِنَّ کے ساتھ كَانَ کا ملاپ (دوہری توکید)",
        textUr: "جب (إِنَّ) اور (كَانَ) اکٹھے آئیں تو ازلی صفت کی دوہری تاکید بنتی ہے، جیسے: إِنَّ اللَّهَ كَانَ عَلِيمًا حَكِيمًا اور إِنَّ اللَّهَ كَانَ تَوَّابًا رَّحِيمًا۔",
        titleEn: "Compound Synthesis: Inna + Kāna",
        textEn: "Synthesizes the emphasis of Inna with the eternal permanence of Kāna (e.g. إِنَّ اللَّهَ كَانَ عَلِيمًا حَكِيمًا = Indeed, Allah has ever been All-Knowing and All-Wise)."
      },
      {
        titleUr: "انسان کی جبلت اور فطری خصلت کا بیان",
        textUr: "انسان کی عمومی خصلت: وَكَانَ الإِنْسَانُ عَجُولًا (اور انسان بڑا جلد باز ہے) اور وَكَانَ الإِنْسَانُ قَتُورًا (اور انسان بڑا تنگ دل ہے)۔",
        titleEn: "Inherent Human Tendencies",
        textEn: "Characterizes intrinsic human inclinations across creation (e.g. وَكَانَ الإِنْسَانُ عَجُولًا = And man is ever hasty)."
      }
    ],
    examples: [
      { ar: "وَكَانَ اللَّهُ غَفُورًا رَّحِيمًا", ur: "اور اللہ ہمیشہ سے بہت بخشنے والا، نہایت رحم فرمانے والا ہے۔", en: "And Allah is ever Forgiving and Merciful." },
      { ar: "إِنَّ البَاطِلَ كَانَ زَهُوقًا", ur: "بیشک باطل مٹ جانے ہی والا تھا۔", en: "Indeed, falsehood was bound to perish." },
      { ar: "كَانَ صِدِّيقًا نَّبِيًّا", ur: "وہ نہایت سچے نبی تھے۔", en: "He was a man of truth and a prophet." }
    ]
  },
  {
    id: "RULE-13",
    operator: "يَا / أَيُّهَا",
    operatorTr: "Yā / Ayyuhā",
    titleEn: "Vocative Particles",
    titleUr: "حروفِ نداء برائے تخاطب و پکار",
    arabicRole: "حُرُوفُ النِّدَاء (تخاطب و تنبیہ)",
    formula: "يَا + عَلَمٌ (ایک پیش) / يَا أَيُّهَا + اسْمٌ مُعَرَّف بِالْـ (پیش)",
    primaryMeaningUr: "اے، او (پکارنے اور متوجہ کرنے کا کلمہ)",
    primaryMeaningEn: "O ..., Oh ... (Vocative address)",
    caseEffectUr: "منادیٰ مفرد معرفہ پر ایک پیش (بغیر تنوین)",
    caseEffectEn: "Singular definite addressee takes single Dammah (No Tanween)",
    explanationUr: "کسی کو بلانے، پکارنے یا اس کی توجہ مبذول کرانے کے لیے (يَا) یا (يَا أَيُّهَا) استعمال ہوتا ہے۔ اگر منادیٰ خاص نام (عَلَم) ہو تو تنوین ختم ہو کر صرف ایک پیش رہ جاتی ہے۔ اگر منادیٰ (الْـ) والا عام اسم ہو تو اس سے پہلے (أَيُّهَا) کا اضافہ ضروری ہوتا ہے۔",
    explanationEn: "Vocative particles used to summon attention or directly address individuals or groups. When addressing a singular proper noun, nunation is stripped and replaced with a single Dammah. When addressing a generic noun with the definite article (الْـ), the particle أَيُّهَا is mandatorily interposed.",
    subRules: [
      {
        titleUr: "مفرد نام (عَلَم) پر تنوین ختم ہو کر صرف ایک پیش",
        textUr: "جب (يَا) کے بعد خاص نام آئے تو تنوین ختم ہو کر صرف ایک پیش رہ جاتی ہے، جیسے: نُوحٌ سے يَا نُوحُ، آدَمُ سے يَا آدَمُ، مَرْيَمُ سے يَا مَرْيَمُ، اور إِبْلِيسُ سے يَا إِبْلِيسُ۔",
        titleEn: "Single Dammah on Proper Names (No Tanween)",
        textEn: "Addressing a proper name eliminates nunation (tanween), terminating in a single Dammah (e.g. نُوحٌ becomes يَا نُوحُ, آدَمُ becomes يَا آدَمُ, مَرْيَمُ becomes يَا مَرْيَمُ)."
      },
      {
        titleUr: "الْـ والے معرفہ اسم کے ساتھ أَيُّهَا کا لازمی اضافہ",
        textUr: "جب کسی (الْـ) والے اسم کو پکارا جائے تو پکارتے وقت (يَا أَيُّهَا) یا صرف (أَيُّهَا) لگایا جاتا ہے، جیسے: يَا أَيُّهَا النَّبِيُّ، يَا أَيُّهَا الرَّسُولُ، يَا أَيُّهَا النَّاسُ، اور يَا أَيُّهَا الإِنْسَانُ۔",
        titleEn: "Mandatory Interposition of Ayyuhā with Al- (يَا أَيُّهَا)",
        textEn: "Generic nouns bearing the definite article Al- cannot directly follow Yā alone; they mandatorily require أَيُّهَا (e.g. يَا أَيُّهَا النَّبِيُّ = O Prophet, يَا أَيُّهَا النَّاسُ = O mankind)."
      },
      {
        titleUr: "اسمائے مبارکہ و القاب میں تخاطب",
        textUr: "نبی کریم ﷺ کے مبارک القاب: يَا أَيُّهَا الْمُزَّمِّلُ (اے کمبل اوڑھنے والے آقا ﷺ!)، يَا أَيُّهَا الْمُدَّثِّرُ، اور أَيُّهَا الصِّدِّيقُ (اے سچے یوسفؑ!)۔",
        titleEn: "Honorable Quranic Titles",
        textEn: "Used in exalted divine addresses to the Holy Prophet ﷺ (e.g. يَا أَيُّهَا الْمُزَّمِّلُ = O you wrapped in garments, يَا أَيُّهَا الْمُدَّثِّرُ = O you enveloped in a cloak)."
      },
      {
        titleUr: "جمادات اور مظاہرِ کائنات کو ندائے الٰہی",
        textUr: "اللہ تعالیٰ کی کائناتی پکار: يَا أَرْضُ ابْلَعِي مَاءَكِ (اے زمین! اپنا پانی نگل لے) اور يَا نَارُ كُونِي بَرْدًا وَسَلَامًا (اے آگ! ٹھنڈی اور سلامتی والی بن جا)۔",
        titleEn: "Divine Address to Elements of Creation",
        textEn: "Demonstrates divine cosmic authority calling upon inanimate creations (e.g. يَا أَرْضُ = O earth!, يَا نَارُ = O fire!)."
      }
    ],
    examples: [
      { ar: "يَا آدَمُ", ur: "اے آدمؑ!", en: "O Adam!" },
      { ar: "يَا أَيُّهَا النَّبِيُّ", ur: "اے نبی ﷺ!", en: "O Prophet!" },
      { ar: "يَا أَيُّهَا النَّاسُ", ur: "اے لوگو!", en: "O mankind!" }
    ]
  }
];
