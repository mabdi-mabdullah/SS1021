# Lexicon (BETA) — Quranic Arabic Study Companion

A fast, lightweight, and responsive Quranic Arabic study companion web application designed for comprehensive, one-shot study and exam preparation.

---

## Key Features & Study Views

The navigation is arranged systematically into four dedicated study views from left to right:

### 1. Tajweed Tab (Lecture 1: Basic Rules & Makharij)
- **16 Curricular Slides:** Full Urdu translation of Lecture 1 slides faithfully presented without external additions.
- **Foundations & Necessity:** Definitions (linguistic and terminological), religious importance, and recitation objectives.
- **Makharij al-Huroof:** Five primary articulation points (`الجوف`, `الحلق`, `اللسان`, `الشفتان`, `الخيشوم`).
- **Core Recitation Rules:** Noon Sakin & Tanween (Izhar, Idgham, Iqlab, Ikhfa), Meem Sakin, Madd, Ghunnah, Qalqalah, Lam of Jalalah, and Ra rules.
- **Practice & Exam Questions:** Authentic drill words and five core exam review questions.
- **Strict Gulzar Urdu Typography:** Native RTL layout with calibrated horizontal alignment.

### 2. Rules Tab (Unified Grammar Reference)
- **Lesson-Agnostic Reference:** All 13 core grammatical operators and syntactic rules compiled in a single unified view.
- **Syntactic Formulations:** Details governing operators, formulas, case effects (I'rab: `نصب`, `جر`, `رفع`), and primary meanings.
- **Comprehensive Practice Sub-Rules:** Explains sub-rules, conjunctions, and drill patterns from the textbook drills.
- **Authentic Quranic Applications:** Each rule card features Quranic verse examples demonstrating real-world applications.
- **Strict RTL Urdu Layout:** In Urdu mode, titles, badges, formulas, sub-rules, and examples adapt to right-to-left layout and Gulzar standardized typography.

### 3. Words Tab (Alphabetical Lexicon & Universal Search)
- **407 Base Words:** Arranged strictly in Arabic alphabetical order (أ تا ی).
- **Alphabet Jump Bar:** Instant jumping to any Arabic letter (`أ`, `ب`, `ت` ... `ي`).
- **Harakaat-Tolerant Search:** Search in plain Arabic without diacritics (e.g. `متقون`, `الله`, `كتاب`). Tolerant to missing or erroneous vowels, Alif variations (`إ / أ / آ / ا`), and Persian/Urdu characters (`ک` and `ی`).
- **Transliteration & Meaning Search:** Search using a standard 26-key English keyboard (e.g. `kitab`, `taqwa`, `ibrahim`) or by English meaning (`book`, `fear`, `mercy`, `prayer`).
- **Universal Occurrence Matching:** Searches across both the 407 base vocabulary entries and all 115 curricular verses and phrase occurrences simultaneously.
- **Part-of-Speech Taxonomy:** Every card clearly identifies grammatical classification (`Noun`, `Particle`, `Proper Name`, `Verb`, `Adjective`).

### 4. Ayahs & Slices Tab (Curricular Practice)
- **Unit and Lesson Navigation:** Dual dropdown filters (`Unit > Lesson`) allowing targeted verse study by curricular progression.
- **Color-Coded Word Correspondence:** Each chunk of Arabic text is mapped to its matching translation in distinct, harmonious colors (`chunk-0` through `chunk-5`), enabling instant syntactic comprehension without visual fatigue.
- **Phrase Slices Distinction:** Non-ayah practice phrases are visually separated with dedicated cards and clean `/` clause delimiters.
- **Single-Language Focus:** Verses and slices display strictly one translation at a time (Urdu or English), avoiding dual-text clutter.

### 5. Tab-Contextual Language Toggles
- **Words Tab:** Supports `Both` (Urdu + English by default), `اردو` (Urdu only), or `English` (English only).
- **Ayahs & Rules Tabs:** The `Both` button is automatically hidden, providing a clean choice between `[اردو]` and `[English]`.
- **Tajweed Tab:** Operates in pure Urdu mode faithful to the lecture presentation.

### 6. Ergonomics & Accessibility
- **Floating Back-to-Top Button:** High-contrast floating button appears when scrolling down, returning smoothly to top.
- **Course Outline Modal:** Built-in syllabus modal detailing weekly topics (Weeks 01 to 08) and grading weightages.
- **Theme Switcher:** High-contrast Light and Dark reading modes with local storage persistence.
- **Zero-Setup & Offline Ready:** Runs directly in any web browser by opening `index.html`. Zero build steps or dependencies.

---

## How to Run Locally

Double-click `index.html` or open it with Google Chrome, Microsoft Edge, Mozilla Firefox, or Apple Safari.

---

## Deployment to GitHub Pages

This application is completely self-contained and ready for free hosting on GitHub Pages:

### Method A: Host as a Dedicated Repository
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial Quranic Arabic study companion"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
   git push -u origin main
   ```
2. On GitHub, navigate to **Settings** > **Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**, choose branch `main` and folder `/ (root)`, then click **Save**.
4. The site will be live within 60 seconds at `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/`.

### Method B: Deploy from Monorepo Subfolder
Configure GitHub Actions to deploy the `dictionary_app/` folder to GitHub Pages.
