# 🌟 Laoluthecreator — Portfolio Web App

This is the official repository for the personal portfolio of **Olayinka Hopewell Olaoluwa** (known professionally as **Laoluthecreator**). He is a Computer Engineer, Content & Social Media Manager, Creative Designer, and Web Developer based in Lagos, Nigeria.

The web application is built with a modern tech stack to highlight his diverse skill set across engineering, software development, content creation, and digital design.

---

## 🛠️ Tech Stack & Features

- **Framework/Build Tool**: [React.js](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS3 (curated dark theme palette, glassmorphism, responsive grid layouts)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for premium entrance transitions and cross-fades
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (FontAwesome, etc.)

### Key Features Implemented:
1. **Interactive Hero**: Features an auto-rotating image slider (3-second interval), clear CTAs to view work, download the resume directly from the public assets, and redirect users to his design storefront ([Laolu Collective](https://laolu-collective.vercel.app/)).
2. **Interactive Skills Section**: Displays technical tools alongside a specialized **Adobe Suite Interactive Popup** (Photoshop, Illustrator, Premiere Pro, After Effects).
3. **Web Development Service Card**: Highlighted featured card showing his skills in HTML, CSS, JavaScript, React.js, and Next.js.
4. **Brands Marquee**: An auto-scrolling logo strip with logos from brands worked with (Penciledge, Attrotech, Revived Life Tech, Strike Climate, Orchid Hospitality), designed with a white background strip, grayscale filter, and full-color transitions on hover.
5. **Video Portfolio**: High-quality video grid showcasing Google Sites layouts and clickable TikTok video links.
6. **Formspree Contact Integration**: Modern contact form that submits asynchronously to **Formspree** for direct email delivery to `olayinkahopewell@gmail.com` with a built-in `mailto:` fallback.

---

## 📂 Project Structure

```text
/ (root)
├── index.html              # Entry HTML file
├── vite.config.js          # Vite config
├── package.json            # Project dependencies & scripts
├── public/                 # Static assets (Resume.pdf)
└── src/
    ├── main.jsx            # App entry point
    ├── App.jsx             # Main layout & component assembler
    ├── index.css           # Global variables & theme styles
    ├── assets/             # Core local images
    └── components/         # Modular React components:
        ├── Header.jsx      # Navigation header (Laoluthecreator)
        ├── Hero.jsx        # Landing hero section with slider & CTA buttons
        ├── About.jsx       # Professional summary & personal interests
        ├── Experience.jsx  # Work history timelines
        ├── Education.jsx   # Academic background
        ├── Skills.jsx      # Hard/soft skills & Adobe popup
        ├── Services.jsx    # Offerings (Web Dev, Content, Design, etc.)
        ├── VideoPortfolio.jsx # Previews and TikTok work links
        ├── ContactForm.jsx # Async Formspree contact form
        └── Footer.jsx      # Social & quick links
```

---

## 🚀 Getting Started & Local Development

To run this project locally, make sure you have [Node.js](https://nodejs.org/) installed.

1. **Clone the repository and navigate into it**:
   ```bash
   git clone <repository-url>
   cd "My portfolio"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   This will output a optimized static build inside the `/dist` directory, ready to be hosted on Vercel, Netlify, or Github Pages.

---

## 📧 Configuring the Contact Form (Formspree)

To enable real email notifications from the contact form:
1. Register a free account at [Formspree](https://formspree.io/).
2. Create a new form targeted to your email address: `olayinkahopewell@gmail.com`.
3. Copy your Formspree Form ID (e.g., `mqkovgqw`).
4. Open [ContactForm.jsx](file:///Users/user/Desktop/App%20Project/My%20portfolio/src/components/ContactForm.jsx) and update the `FORMSPREE_FORM_ID` variable:
   ```javascript
   const FORMSPREE_FORM_ID = 'YOUR_FORMSPREE_FORM_ID_HERE';
   ```
   *Note: If this ID is left blank or empty, the form will gracefully fall back to opening a prefilled `mailto:` link.*

---

## 👨🏽‍💻 About the Developer & Professional Info

### Profile Summary
**Olayinka Hopewell Olaoluwa** is a Computer Engineer and Creative Professional passionate about combining technology, design, and digital storytelling to help brands grow and connect with their audiences. With a background in computer engineering, he possesses a unique advantage in understanding both the technical and creative sides of modern digital solutions.

- **Location**: Lagos, Nigeria
- **Email**: olayinkahopewell@gmail.com
- **Phone**: +234 911 259 6934 | +234 906 934 3361
- **GitHub**: [github.com/Dev-Laolu](https://github.com/Dev-Laolu)
- **Official Portfolio**: [laoluthecreator (Google Sites)](https://sites.google.com/view/laoluthecreator/)

### Core Skills & Tools
* **Development**: HTML, CSS, JavaScript, React.js, Next.js, Git, GitHub
* **Design & Multimedia**: Adobe Photoshop, Adobe Illustrator, Canva, Figma
* **Video Production**: Adobe Premiere Pro, After Effects, CapCut, Motion Graphics
* **Marketing & Management**: Content Strategy, Social Media Management, Analytics, Community Management
* **Technical & Infrastructure**: Networking, Computer Repair, IT Support, Microsoft Office Suite

### Professional Experience
- **Content & Social Media Manager** at **BuildwithMMO (Remote)** *(June 2026 – Present)*
  - Execute content strategies across multiple social media platforms, producing reels, motion graphics, and marketing assets.
- **Social Media Manager** at **Attrotech Developer (Remote)** *(February 2026 – Present)*
  - Manage social media content, visual branding, and analyze metrics to improve campaign performance.
- **Creative Designer** at **Penciledge LLC (Remote)** *(March 2025 – Present)*
  - Create social media graphics, campaign visuals, and maintain brand consistency.
- **Assistant Lecturer (Computer Science)** at **OAK Business School** *(February 2025 – August 2025)*
  - Facilitated undergraduate courses, supervised student coding projects, and supported CBT operations.
- **Social Media Manager & Graphic Design Intern** at **Penciledge LLC** *(September 2024 – February 2025)*
- **Social Media Manager** at **Orchid Hospitality Consulting Limited** *(February 2024 – May 2024)*
- **IT Support Officer (NYSC)** at **Ministry of Education (PESP), Lagos** *(June 2023 – June 2024)*
- **IT Support Officer (Intern)** at **ATIBEX Technologies Ltd** *(September 2019 – September 2020)*

### Education
- **Higher National Diploma (HND) in Computer Engineering** – Federal Polytechnic, Ilaro *(Second Class Upper | 2022)*
- **National Diploma (ND) in Computer Engineering** – Federal Polytechnic, Ilaro *(Second Class Upper | 2019)*

### Certifications
- ALX Professional Foundation (2025)
- Professional Brand Designer — Domestika (2025)
- Digital Graphic Designer — Kingmoflix Art (2019)
- Computer Repair & Networking — Federal Polytechnic, Ilaro (2022)
- Embedded Systems & Robotics — Federal Polytechnic, Ilaro (2022)
- Computer Technician — ATIBEX Technologies (2018)
- 82 Hours Marathon Messiah's Praise Volunteer Certificate (2024)

### Research & Publications
- **Enhancing Food Security in Nigeria Through STEM-Based Training Using Embedded Systems and Robotics Knowledge** — *Published at Atupa International Conference (2023)*
- **Politics of Climate Change: Economic Importance to ECOWAS Nations** — *Published on Academia (2023)*
- **Smart Bin Waste Management System** — *Undergraduate Research Project using Embedded Systems and Android Development*

---

Made eby Olayinka Hopewell Olaoluwa
