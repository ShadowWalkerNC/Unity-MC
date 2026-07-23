# 🎨 Design System & Tokens

This document details the unified visual system for the ShadowWalkerNC projects, ensuring a premium, high-fidelity user experience across all web platforms.

## 🌈 Color Palette (Tailored HSL)

We avoid flat primary colors and use carefully curated HSL scales.

### Dark Theme (Default)
- **Background**: `hsl(224, 25%, 12%)` (Deep slate night)
- **Card / Surface**: `hsl(224, 25%, 16%)` (Glow-ready elevated surface)
- **Primary / Brand**: `hsl(263, 70%, 50%)` (Vibrant purple)
- **Accent / Glow**: `hsl(190, 90%, 50%)` (Neon cyan glow)
- **Foreground / Text**: `hsl(210, 40%, 98%)` (Crisp off-white)
- **Muted Text**: `hsl(215, 20%, 65%)` (Steel gray)

### Light Theme (Fallbacks)
- **Background**: `hsl(210, 20%, 98%)`
- **Surface**: `hsl(0, 0%, 100%)`
- **Primary / Brand**: `hsl(263, 70%, 45%)`
- **Foreground**: `hsl(224, 25%, 12%)`

---

## ✍️ Typography

- **Primary Font**: `Outfit`, `Inter` (Sans-serif, sourced from Google Fonts)
- **Code / Mono**: `JetBrains Mono` or `Fira Code`
- **Heading Styles**:
  - `h1`: Bold, tracking tight, modern letter spacing.
  - `h2`: Semi-bold, subtle gradient fills.

---

## ✨ Micro-Animations & Effects

To achieve a premium, state-of-the-art feel:

### Glassmorphism
Apply to floating headers, card overlays, and dialogs:
```css
.glass-panel {
  background: rgba(25, 30, 45, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### Hover Transitions
All interactive buttons and links must use smooth transition scales or custom glowing border offsets:
```css
.interactive-element {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.interactive-element:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}
```
