/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // --- Universo LUX (Namespace Fiduciario) ---
        lux: {
          gold: '#C1A85D',
          dark: '#161513',
          card: '#1e1b14',
          border: '#35332c',
          text: '#f5f0e8',
          muted: '#b2afa3'
        },
        // --- Mapeo Legado (Sistema de Diseño v1.0 / index.html) ---
        primary: {
          DEFAULT: '#C1A85D',
          hover: '#a8924d',
        },
        'background-dark': '#161513',
        'card-dark': '#1e1b14',
        'border-dark': '#35332c',
        'text-primary': '#f5f0e8',
        'text-secondary': '#b2afa3',
        
        // --- Mapeo Legado (access-form.html / design-system.css) ---
        gold: {
          DEFAULT: '#C1A85D',
          light: '#D4C183',
          dim: 'rgba(193, 168, 93, 0.1)'
        },
        carbon: {
          DEFAULT: '#161513',
          mid: '#1a1917',
          light: '#1e1d1b'
        },
        'dark-grey': '#1e1b14',
        'border-sub': '#35332c',
        'text-main': '#f5f0e8',
        'text-muted': '#b2afa3',
        'text-dim': '#7a776e',
        'input-bg': '#1a1814'
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Manrope", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 30px rgba(193,168,93,0.18)",
        "gold-sm": "0 0 12px rgba(193,168,93,0.12)",
        card: "0 8px 48px rgba(0,0,0,0.55)",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        growLine: {
          to: { height: "100px" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.55s ease both",
        "spin-slow": "spin 0.7s linear infinite",
        "grow-line": "growLine 1.2s ease 0.6s forwards",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
}