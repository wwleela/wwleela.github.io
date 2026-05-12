# UGH - Urban Gliding Hyderabad

Premium skateboarding coaching concierge in Hyderabad.

## 🚀 Quick Start (Local Development)

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up Environment Variables**:
   Copy `.env.example` to `.env` and fill in your keys.
   ```bash
   cp .env.example .env
   ```
4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 🌐 Hosting on GitHub Pages (Recommended)

This project is pre-configured for GitHub Pages.

1. **Push to GitHub**:
   Create a new repository and push your code.
2. **Enable GitHub Actions**:
   The workflow in `.github/workflows/deploy.yml` will automatically build and deploy your site to the `gh-pages` branch whenever you push to `main`.
3. **Configure Repository Settings**:
   - Go to **Settings > Pages**.
   - Under **Build and deployment > Source**, select **GitHub Actions**.

## 🛠️ Full-Stack Backend (Optional)

If you wish to use the enrollment email system:
- Deploy the project to a platform that supports Node.js (e.g., Railway, Render, Vercel).
- Set the `RESEND_API_KEY` and `ADMIN_SECRET_KEY` environment variables.
- Run using `npm run dev:server`.

## 🎨 Architecture
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Auth**: Clerk
- **Icons**: Lucide React
- **Data**: Static JSON in `public/assets/content.json`
