// CPII Design System — Tailwind config compartido
// Este archivo define la paleta de color y tipografías base
// para las pantallas oscuras principales (landing + simulador).

// [SEC-01] Tailwind Config
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#C1A85D",
        "primary-hover": "#A8924D",
        "background-dark": "#161513",
        "card-dark": "#1e1b14",
        "border-dark": "#35332c",
        "text-secondary": "#b2afa3",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Manrope", "system-ui", "sans-serif"],
      },
    },
  },
};
