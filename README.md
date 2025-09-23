# 🚀 React Portfolio with Lenis + GSAP

A modern React portfolio landing page featuring smooth scrolling with Lenis and scroll-driven animations with GSAP ScrollTrigger.

## ✨ Features

- **Smooth Scrolling**: Lenis integration for buttery smooth scroll experience
- **Scroll Animations**: GSAP ScrollTrigger for scroll-driven parallax and transforms
- **Modular Architecture**: Clean, organized component structure
- **Full-Height Sections**: 100vh sections with responsive design
- **Expanding Animation**: Square that grows from corner to full screen on scroll
- **TailwindCSS v4**: Modern utility-first styling
- **Performance Optimized**: GPU-accelerated animations and smooth transforms

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/           # Full-height page sections
│   │   ├── HomeSection.jsx     # Landing/hero section
│   │   ├── NextSection.jsx     # About/second section
│   │   └── index.js            # Section exports
│   └── animations/         # Animated components
│       ├── ExpandingSquare.jsx # Square that expands on scroll
│       └── index.js            # Animation exports
├── hooks/                  # Custom React hooks
│   ├── useLenis.js            # Lenis smooth scroll hook
│   ├── useScrollTrigger.js    # GSAP ScrollTrigger hook
│   └── index.js               # Hook exports
├── App.jsx                # Main app component
├── index.css             # Global styles + Tailwind
└── App.css              # Component-specific styles
```

## 🎯 Key Components

### **useLenis Hook**

Initializes and manages Lenis smooth scrolling:

```javascript
const lenis = useLenis();
```

### **useScrollTrigger Hook**

Integrates GSAP ScrollTrigger with Lenis:

```javascript
const { createScrollAnimation } = useScrollTrigger(lenis);
```

### **ExpandingSquare Component**

Animated square that transforms from bottom-right corner to full screen:

- Starts as 64px square in bottom-right
- Expands to cover full viewport on scroll
- Animation triggered by scroll progress
- Uses `transform` with `scrub: true` for smooth motion

## 🎨 Customization Guide

### **1. Modify Animation Trigger Points**

In `ExpandingSquare.jsx`:

```javascript
{
  trigger: '#home',           // Element that triggers animation
  start: 'bottom center',     // When animation starts
  end: 'bottom top',          // When animation ends
  scrub: true,               // Sync with scroll progress
}
```

### **2. Adjust Transform Properties**

```javascript
{
  scaleX: 50,    // How much to scale width
  scaleY: 50,    // How much to scale height
  x: '-45vw',    // Horizontal movement
  y: '-45vh',    // Vertical movement
}
```

### **3. Change Square Styling**

In `ExpandingSquare.jsx`:

```javascript
className = "fixed bottom-8 right-8 w-16 h-16 bg-yellow-400";
//          ↑position   ↑size     ↑color
```

### **4. Add More Sections**

In `App.jsx`:

```javascript
<HomeSection />
<NextSection />
<YourNewSection />  // Add here
```

### **5. Create New Animations**

Follow the pattern in `ExpandingSquare.jsx`:

```javascript
const { createScrollAnimation } = useScrollTrigger(lenis);

createScrollAnimation(
  targetElement,
  {
    /* animation properties */
  },
  {
    /* ScrollTrigger options */
  }
);
```

## 🚀 Development

### **Start Development Server**

```bash
npm run dev
```

### **Build for Production**

```bash
npm run build
```

### **Preview Production Build**

```bash
npm run preview
```

## 📋 Animation Debugging

Enable ScrollTrigger markers for development:

```javascript
{
  // ... other options
  markers: true,  // Shows trigger points visually
}
```

## 🎛️ Lenis Configuration

Customize smooth scrolling in `useLenis.js`:

```javascript
new Lenis({
  duration: 1.2, // Animation duration
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing
  direction: "vertical", // Scroll direction
  smooth: true, // Enable smooth scrolling
  mouseMultiplier: 1, // Mouse sensitivity
  touchMultiplier: 2, // Touch sensitivity
});
```

## 🛠️ Technologies

- **React 19.1.1** - UI library
- **Lenis 1.3.11** - Smooth scrolling
- **GSAP 3.13.0** - Animation library with ScrollTrigger
- **TailwindCSS v4** - Utility-first CSS
- **Vite 7.1.6** - Build tool

## 📝 Notes

- All animations use `transform` properties for optimal performance
- ScrollTrigger is synced with Lenis for smooth integration
- Components are modular and easily customizable
- Responsive design with mobile optimizations
- Accessibility considerations included (reduced motion support)

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
