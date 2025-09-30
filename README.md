# 🎙️ Numou Podcast Website

This is the official repository for the **Numou Podcast** website.  
It is built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd podcast-numou
``` 
### 2. Install dependencies

We use a lockfile for consistent installs:
```bash
npm ci
```
### 3. Run the development server
```bash
npm run dev
``` 
Now open <a href http://localhost:3000 > in your browser.

## 🧪 Testing & Validation

Before pushing any code, run these commands:

### TypeScript type check
```bash
npm run type-check
```
### ESLint (code quality)
```bash
npm run lint 
```
### Production build
```bash
npm run build 
```
### Run Production Server
```bash
npm run star
```
## 🛠️ Tech Stack

*Framework:* Next.js 15 (App Router)

*Language:* TypeScript

*Styling:* Tailwind CSS v4
 with custom design tokens

*Icons:* Lucide

*Linting:* ESLint with TypeScript + Next.js plugins

## 📂 Project Structure
```bash
src/
 ├─ app/                # Next.js App Router pages
 │   ├─ page.tsx        # Home
 │   ├─ blog/           # Blog page
 │   ├─ contact/        # Contact page
 │   ├─ episodes/       # Episodes page
 │   ├─ login/          # Login page
 │   └─ team/           # Team page
 │
 ├─ components/         # Reusable React components
 │   ├─ Footer.tsx
 │   ├─ Header.tsx
 │   ├─ EpisodeCard.tsx
 │   ├─ AboutNumou.tsx
 │   └─ ui/             # Shared UI primitives (accordion, button, etc.)
 │
 ├─ lib/                # Utilities and helpers
 └─ styles/             # Global styles (Tailwind setup)
 ```
 ## 🧹 Code Style & Contribution
    •	Formatting: We don’t use Prettier. ESLint enforces rules.
	•	Branches: Use feature branches (feature/<name>) before opening a PR.
	•	Commits: Keep messages short but clear (e.g. fix: footer icons bug).
	•	Testing before push:
	 1.	npm run type-check
	 2.	npm run lint
	 3.	npm run build

If any of these fail ❌, fix before pushing.

## 👥 Team & Roles

This project is developed by the Numou Podcast Dev Team.
	•	Team Lead: Rawan Albaraiki
	•	Contributors: All Numou developers

## 📌 Notes
•	.next/, node_modules/, and build artifacts are ignored in Git.
	•	If you add a new dependency, run npm install <package> and commit the updated package-lock.json.
	•	If you see ESLint config errors, run:
```bash
npm i -D @next/eslint-plugin-next eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin @eslint/js typescript-eslint
```
### ✅ Quick Commands Cheat Sheet
```bash
# Install deps
npm ci

# Dev mode
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build

# Start production server
npm run start
