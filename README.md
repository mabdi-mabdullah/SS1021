# مُعْجَمُ الْقُرْآنِ — Quranic Arabic Dictionary

A fast, lightweight, and responsive Quranic Arabic dictionary web application designed for students and study groups.

---

## ✨ Key Features

1. **Pure Alphabetical Lexicon (أ تا ی):**
   - All 407 base words arranged strictly in Arabic alphabetical order (Dictionary format).
   - Horizontal alphabet bar to jump instantly to any letter (`أ`, `ب`, `ت` ... `ي`).
2. **Bilingual Meanings (English & Urdu):**
   - Full English and Urdu translations for all 407 words.
   - Quick 3-way language toggle: **Both (دونوں)**, **Urdu only**, or **English only**.
3. **Simplified 26-Key English Transliteration & Meaning Search:**
   - Type using your standard English keyboard: `kitab`, `ibrahim`, `insan`, `shirk`, `salat`.
   - Also search directly by English meanings: typing `book`, `earth`, `death`, `prayer`, `guidance`, `mercy` instantly finds the corresponding Arabic words.
4. **Diacritic-Tolerant Arabic Search:**
   - Type in plain Arabic without worrying about Tashkeel (e.g. `كتاب` matches `كِتَابٌ`, `الله` matches `اللَّهُ`).
   - Harmonizes Alif variations (`إ / أ / آ / ا`) and Urdu/Persian characters (`ک` and `ی`).
5. **Course Outline & Roadmap Modal:**
   - Built-in `📋 Course Outline` popup detailing assessment weightages (Quiz 1, Assignment 1, Sessional 1, Final) and the week-by-week syllabus.
6. **Compact Dictionary Layout:**
   - Clean, compact dictionary rows focused on Arabic script, transliteration, part of speech, and bilingual meanings.
   - Zero clutter, clean and minimalist design.
7. **Dark & Light Mode:**
   - High-contrast reading themes with automatic persistence.
8. **Zero-Setup & Offline Ready:**
   - Runs instantly offline by double-clicking `index.html`. No web server, Node.js, or build step required.

---

## 🚀 How to Run Locally

Simply double-click **`index.html`** or right-click $\rightarrow$ *Open with* (Google Chrome, Microsoft Edge, Firefox, or Safari).

---

## 🌐 How to Deploy to GitHub Pages (2 Minutes)

This entire `dictionary_app/` folder is self-contained and ready to be hosted for free on GitHub Pages:

### Method A: Host as a Dedicated Repository
1. Create a new repository on GitHub (e.g., `quran-dictionary`).
2. Inside this `dictionary_app/` folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial Quranic Arabic dictionary"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/quran-dictionary.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings** $\rightarrow$ **Pages** $\rightarrow$ Under **Build and deployment**, select **Deploy from a branch** $\rightarrow$ choose branch `main` and folder `/ (root)` $\rightarrow$ click **Save**.
4. In about 60 seconds, your site is live at: `https://<YOUR_USERNAME>.github.io/quran-dictionary/`

### Method B: Host within an Existing Repository
If you push the entire repository to GitHub:
- You can place these files at the root of your repository or use a GitHub Action to deploy the `dictionary_app` folder directly to GitHub Pages.
