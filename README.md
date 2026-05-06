# PorTaxPH: BIR ORUS Redesign Mockup

PorTaxPH is a high-fidelity frontend redesign of the Bureau of Internal Revenue (BIR) **Online Registration and Update System (ORUS)**. This project transforms the traditional government portal into a modern, premium, and user-centric experience while maintaining the official branding and security-focused aesthetic.

## 🚀 Overview

The goal of this project was to refactor and redesign the BIR ORUS interface to improve usability, visual hierarchy, and performance. We migrated from a monolithic, utility-heavy structure to a modular, semantic architecture using custom CSS and Flask.

### Key Features
- **Brutalist-Premium Design**: A bold, clean aesthetic using high-contrast typography, glassmorphism effects, and vibrant gradients.
- **Modular CSS Architecture**: Every page has its own dedicated stylesheet in `static/css/pages/`, ensuring minimal CSS bloat and easy maintenance.
- **Interactive Service Portals**: Custom-built modal systems for registration, updates, and verification services.
- **Scroll-Reveal Animations**: Smooth, scroll-triggered animations implemented via a global reveal system.
- **Full Responsiveness**: Optimized for all devices, from mobile phones to high-resolution desktops.

---

## 🛠️ Technology Stack

- **Backend**: Python 3.x with Flask
- **Frontend**: HTML5, Vanilla CSS (Custom Modular System)
- **Interactivity**: Vanilla JavaScript (ES6+)
- **Icons**: SVG-based system for high performance and scalability

---

## 📂 Project Structure

```text
flask/
├── app.py                 # Main Flask application entry point
├── requirements.txt       # Project dependencies
├── static/
│   ├── css/
│   │   ├── global.css     # Design tokens, variables, and shared utilities
│   │   ├── components/    # Reusable component styles (Navbar, Footer)
│   │   └── pages/         # Page-specific stylesheets
│   ├── images/            # Branding assets and UI illustrations
│   └── js/                # Page-specific interactivity and global animations
├── templates/
│   ├── partials/          # Reusable HTML snippets (Navbar, Footer)
│   └── *.html             # Core service templates (Home, Registration, etc.)
└── README.md              # Project documentation
```

---

## 🏁 How to Run

### 1. Prerequisites
Ensure you have **Python 3.8+** installed on your system.

### 2. Installation
Clone the repository and install the required dependencies:
```bash
pip install -r requirements.txt
```

### 3. Execution
Launch the local development server:
```bash
python app.py
```
The application will be available at `http://127.0.0.1:5000/`.

---

## 🎨 Design Standards

- **Typography**: Uses a mix of heavy-weight headers (Inter/Black) for a "Brutalist" feel and high-readability body text.
- **Color Palette**: 
  - `Primary Blue`: `#03297b` (BIR Brand)
  - `Accent Blue`: `#2563eb`
  - `Background`: `#f8fafc` (Slate-50)
- **Spacing System**: Strictly follows a 4px/8px grid for consistent alignment.
- **Shadows**: Custom "Premium" shadows defined in `global.css` for depth without clutter.

---

## 📝 Author
Nas, John Carlo  
Hermoso, Guiller Angelo
Malanon, Remar