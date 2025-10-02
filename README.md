# 🎙️ Numou Podcast Website

This is the official repository for the **Numou Podcast** website.  
It is built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <https://github.com/rwwwn/podcast-numou.git>
cd podcast-numou
``` 
### 2. Install dependencies

We use a lockfile for consistent installs:
```bash
npm ci
```
### 3. Set up environment variables

Copy the example environment file and fill in your values:
```bash
cp .env.example .env.local
```

Then edit `.env.local` with your actual credentials. See the [📬 Contact Form](#-contact-form) section below for details on each variable.

### 4. Run the development server
```bash
npm run dev
``` 
Now open < http://localhost:3000 > in your browser.

## 📬 Contact Form

The website includes a fully functional contact form with security features to protect against spam and abuse.

### Features

- **Email Delivery**: Uses [Resend](https://resend.com/) API to send contact form submissions to the team inbox
- **Rate Limiting**: Implemented with [Upstash Redis](https://upstash.com/) to prevent spam (configurable limits per IP)
- **Bot Protection**: [hCaptcha](https://www.hcaptcha.com/) verification to prevent automated submissions
- **Data Storage**: Optional storage in [Supabase](https://supabase.com/) for keeping records of submissions

### Environment Setup

All required environment variables are documented in `.env.example`. Here's what you need:

#### 1. Resend (Email Service)
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx           # Get from https://resend.com/api-keys
CONTACT_FROM=noreply@yourdomain.com       # Must be verified in Resend
CONTACT_INBOX_TO=team@yourdomain.com      # Where submissions are sent
```

**Setup steps:**
1. Sign up at [resend.com](https://resend.com/)
2. Verify your domain or use their test domain for development
3. Create an API key in the dashboard
4. Set the `CONTACT_FROM` email (must be from your verified domain)

#### 2. Upstash Redis (Rate Limiting)
```bash
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxxxxxxxxxx
```

**Setup steps:**
1. Sign up at [console.upstash.com](https://console.upstash.com/)
2. Create a new Redis database (free tier available)
3. Copy the REST URL and token from the database details

#### 3. hCaptcha (Bot Protection)
```bash
HCAPTCHA_SITE_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
HCAPTCHA_SECRET=0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Setup steps:**
1. Sign up at [hcaptcha.com](https://www.hcaptcha.com/)
2. Add a new site in the dashboard
3. Copy both the site key (for frontend) and secret key (for backend)

#### 4. Supabase (Optional - Data Storage)
```bash
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxxxxxxxxxxxx
```

**Setup steps:**
1. Sign up at [supabase.com](https://supabase.com/)
2. Create a new project
3. Get the URL and service role key from project settings

### Testing the Contact Form

#### Local Testing
1. Ensure all environment variables are set in `.env.local`
2. Run the development server: `npm run dev`
3. Navigate to the contact page: `http://localhost:3000/contact`
4. Fill out the form and submit
5. Check that:
   - hCaptcha challenge appears
   - Rate limiting works (try submitting multiple times quickly)
   - Email arrives at the inbox specified in `CONTACT_INBOX_TO`
   - (Optional) Submission is stored in Supabase

#### Testing Rate Limiting
The rate limiting is configured to allow a limited number of submissions per IP address within a time window. To test:
1. Submit the form successfully
2. Try submitting again immediately
3. You should see a rate limit error message

#### Testing Without Production Services
For development without setting up all external services:
- Comment out or skip services you're not testing
- Use mock implementations or test keys where available
- hCaptcha provides test keys for development that always pass

### Security Considerations

✅ **Implemented protections:**
- Rate limiting per IP address (prevents spam flooding)
- hCaptcha verification (blocks automated bots)
- Server-side validation of all form fields
- Email sanitization to prevent injection attacks
- CORS and security headers via Next.js

⚠️ **Important notes:**
- Never commit `.env.local` or expose API keys
- Keep `SUPABASE_SERVICE_ROLE_KEY` and `HCAPTCHA_SECRET` secret
- Use Resend's verified domains in production (not test domains)
- Monitor Upstash Redis usage to stay within free tier limits
- Regularly review Supabase stored data for privacy compliance

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

**Contact Form Services:**
- *Email:* Resend API
- *Rate Limiting:* Upstash Redis
- *Bot Protection:* hCaptcha
- *Data Storage:* Supabase (optional)

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
