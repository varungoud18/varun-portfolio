# ✨ Varun Goud Karupothula — Personal Portfolio

[![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite)](https://vite.dev)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)

Welcome to the repository of my personal developer portfolio, live at **[varungoud.me](https://varungoud.me)**. This project is a premium, interactive, and fully responsive developer showcase built from scratch with React and Vite, featuring rich glassmorphism layouts, clean animations, and a dynamic interactive particle background.

---

## 🎨 Core Features

- **💡 Dual Theme System**: Seamless transition between Dark and Light mode. Theme preferences are persisted in `localStorage` for a consistent experience across visits.
- **🔤 Interactive Logo Font-Cycling**: A highly responsive hover state on the brand logo (`VGK Varun Goud Karupothula`) that cycles rapidly through 13 custom Google Fonts (serif, display, script, monospace, and sans-serif) every 250ms, with absolute layout stability.
- **⚡ Performance-Optimized Constellation Background**: An interactive HTML5 Canvas background particle system that responds to mouse movement. Optimized using distance-squared calculations to guarantee a buttery-smooth 60fps refresh rate.
- **🏅 Extended Hero & Credentials**: Expanded hero layout featuring a profile avatar with a sleek gradient border and a three-column quick credentials grid highlighting OCI certifications.
- **🛠️ Permanent Unique Skill Iconography**: Categorized skills matrix showing unique, custom-coded vector SVGs for every single skill, eliminating generic placeholders.
- **✨ Premium Card Zoom & Glow**: Elevated hover transitions (`translateY(-8px) scale(1.05)`) with active theme accent borders and glow shadows specifically for project and certification cards.
- **🚀 CI/CD Pipeline (GitHub Actions)**: Automated deployment workflows that compile and publish changes to GitHub Pages under the custom domain on every push.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 19, JavaScript (ES6+)
- **Build Tool**: Vite 8
- **Styling**: Vanilla CSS (Fluid grids, flexbox, custom properties, glassmorphism)
- **Icons**: Lucide React
- **Background Engine**: Vanilla Canvas API (Interactive particle systems)
- **Deployment**: GitHub Actions & GitHub Pages

---

## 📂 Project Structure

```text
varun-portfolio/
├── .github/workflows/   # CI/CD Deployment configurations
│   └── deploy.yml       # Automated build & deploy to GitHub Pages
├── public/              # Static assets
│   ├── CNAME            # Custom domain routing (varungoud.me)
│   ├── resume.pdf       # Downloadable/previewable resume document
│   └── profile.jpg      # Main avatar image
├── src/                 # Application source code
│   ├── App.jsx          # Main application file & state managers
│   ├── index.css        # Core design tokens, layout styles, and theme variables
│   └── main.jsx         # App entry point
├── package.json         # Dependencies & scripts
└── vite.config.js       # Vite bundler options
```

---

## 🚀 Getting Started

To run the project locally in your development environment:

### 1. Clone the repository
```bash
git clone https://github.com/varungoud18/varun-portfolio.git
cd varun-portfolio/varun-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser to view the application.

### 4. Create a production build
```bash
npm run build
```

---

## 🔧 Personalization & Customization Guide

### Update Your Resume
Simply replace the file located at `public/resume.pdf` with your updated resume PDF. Make sure the filename remains exactly `resume.pdf`.

### Change Your Profile Photo
Replace the image located at `public/profile.jpg` with your own profile image.

### Modify Bio, Skills, or Projects
Open `src/App.jsx` and edit the local arrays:
- **Typing Roles**: Update the cycling roles in the typing header.
- **Skills Matrix**: Modify the category structure and skill lists in the main component.
- **Featured Projects**: Edit the array of cards inside the project component.

---

## 🌟 License

This project is open-source and free to use under the MIT License.
