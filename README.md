# Document Extractor 📄⚡

Document Extractor is an enterprise-grade document intelligence platform that allows users to upload PDF or text documents, get instant summarization and risk analysis, view documents in an interactive preview pane, and run natural language Q&A chats grounded strictly on document content.

The application features a **Dual-Mode AI fallback engine** (supporting Google Gemini and OpenRouter APIs) and a **High-Fidelity Local QA Engine** that generates visual diagrams, examples, and exact text highlights in the document preview when APIs are unavailable.

---

## 🌟 Key Features

* **Advanced PDF Ingestion**: Extracts raw text from uploaded PDFs natively using robust base64 slicing and `pdf-parse` (Mehmet Kozan v2).
* **Interactive Document Preview**: Shows the document on the left panel with dynamic HSL-based highlights matching matched sentences or query keywords.
* **Dual-Provider LLM Fallback**:
  * Leverages Google **Gemini 3.5 Flash** and **OpenRouter** APIs.
  * Timeout caps set at 10 seconds per request.
  * If the primary provider fails, is rate-limited, or has no credits, the app seamlessly falls back to the secondary provider.
* **Intelligent Local QA Fallback**: 
  * If all API keys are missing or fail, a local keyword-based sentence matcher processes queries.
  * Splits slides/pages smartly by newlines, filters out slide numbering artifacts, and cleans formatting.
  * Structures answers with a **Detailed Answer**, **Example**, and an **ASCII tree/diagram** to visually explain concepts.
  * Exposes double-quoted exact quotes under the **"Extracted text from your pdf:"** header, enabling instant amber highlighting in the document preview.
* **Responsive Dashboard & Logs**: View token allocation, upload status, risk detection metrics, and active processing logs.
* **Settings & Access Shortcut**: Clickable settings shortcut located in the top header linking to application settings.

---

## 🛠️ Technology Stack

* **Frontend**: React 19, TypeScript, Vite, Lucide Icons, HSL CSS variables, and modern animations.
* **Backend**: Node.js, Express.js, TypeScript (`tsx` execution), `esbuild` (CJS production bundler).
* **AI & Document Processing**: `@google/genai` (Gemini SDK), `fetch` (OpenRouter endpoints), and class-based `pdf-parse`.

---

## 🚀 Complete Step-by-Step Setup Guide

```text
================================================================================
                     HOW TO SETUP AND RUN DOCUMENT EXTRACTOR
================================================================================

STEP 1: INSTALL NODE.JS (PREREQUISITE)
--------------------------------------
If Node.js is not installed, download and install the LTS version from:
👉 https://nodejs.org/


STEP 2: OBTAIN YOUR API KEYS
----------------------------
1. Google Gemini Key:
   a. Go to: https://aistudio.google.com/
   b. Log in with your Google account.
   c. Click "Get API Key" -> "Create API Key".
   d. Copy the generated key (starts with "AIzaSy").

2. OpenRouter Key:
   a. Go to: https://openrouter.ai/
   b. Sign in and go to Settings -> Keys (https://openrouter.ai/settings/keys).
   c. Click "Create Key", name it, and copy it (starts with "sk-or-").


STEP 3: EXTRACT AND NAVIGATE TO PROJECT DIRECTORY
-------------------------------------------------
1. Unzip the "Document Extractor.zip" file.
2. Open terminal/command prompt and run:
   cd "C:\Users\User\Downloads\Document Extractor"


STEP 4: CONFIGURE ENVIRONMENT VARIABLES (.env file)
---------------------------------------------------
1. Copy ".env.example" and rename it to ".env":
   Windows Command Prompt:  copy .env.example .env
   PowerShell / macOS:      cp .env.example .env

2. Open the ".env" file in a text editor (like Notepad) and add your keys:
   GEMINI_API_KEY=YOUR_AIzaSy_KEY_HERE
   OPENROUTER_API_KEY=YOUR_sk-or-_KEY_HERE


STEP 5: INSTALL DEPENDENCIES
----------------------------
Run this command in the terminal to download package dependencies:
   npm install


STEP 6: START THE APPLICATION
-----------------------------
To start the app in development mode:
   npm run dev


STEP 7: LAUNCH IN BROWSER
-------------------------
Once the console says "server listening on http://localhost:3000":
1. Open your web browser.
2. Go to: http://localhost:3000
3. Upload your PDF and start querying!
================================================================================
