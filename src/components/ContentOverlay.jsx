import React, { useEffect, useRef } from 'react'
import { useScrollTrigger } from '../hooks/useScrollTrigger'

/**
 * ContentOverlay Component
 * Floating content that appears at specific scroll positions
 * 
 * CUSTOMIZATION AREAS:
 * 1. Position mapping (lines 15-25)
 * 2. Animation entrance effects (lines 35-50)
 * 3. Content styling and layout (lines 55-75)
 */
const ContentOverlay = ({ position = 'start', children, lenis }) => {
  const contentRef = useRef(null)
  const { createScrollAnimation, gsap } = useScrollTrigger(lenis)

  // 🎨 CUSTOMIZE: Position mappings for different scroll points
  const positionMap = {
    start: { trigger: 'top center', progress: '0%' },
    quarter: { trigger: 'top center', progress: '25%' },
    middle: { trigger: 'center center', progress: '50%' },
    'three-quarter': { trigger: 'bottom center', progress: '75%' },
    end: { trigger: 'bottom top', progress: '100%' },
  }

  const currentPosition = positionMap[position] || positionMap.start

  useEffect(() => {
    if (!contentRef.current || !lenis) return

    // 🎨 CUSTOMIZE: Entrance animation
    gsap.set(contentRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.8,
    })

    const animation = createScrollAnimation(
      contentRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
      },
      {
        trigger: 'body',
        start: `${currentPosition.progress} center`,
        end: `+=${window.innerHeight}px`,
        scrub: false, // Instant animation when triggered
        toggleActions: 'play none none reverse',
        // markers: true, // Uncomment for development
      }
    )

    // Cleanup
    return () => {
      if (animation) animation.kill()
    }
  }, [lenis, position, createScrollAnimation, gsap, currentPosition])

  return (
    <div
      ref={contentRef}
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-40"
      style={{
        // 🎨 CUSTOMIZE: Overlay positioning and styling
        background: 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(1px)',
      }}
    >
      <div 
        className="max-w-4xl mx-auto text-center px-8 pointer-events-auto"
        style={{
          // 🎨 CUSTOMIZE: Content container styling
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '3rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        }}
      >
        {children}
      </div>
    </div>
  )
}

/**
 * Pre-built content components for common use cases
 */

// Welcome/Hero content
export const WelcomeOverlay = ({ lenis }) => (
  <ContentOverlay position="start" lenis={lenis}>
    <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
      Portfolio
    </h1>
    <p className="text-xl md:text-2xl text-white opacity-80 mb-8">
      Creative Developer & Designer
    </p>
    <button className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300">
      Explore Work
    </button>
  </ContentOverlay>
)

// About content
export const AboutOverlay = ({ lenis }) => (
  <ContentOverlay position="middle" lenis={lenis}>
    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
      About
    </h2>
    <p className="text-lg md:text-xl text-white opacity-80 mb-8 max-w-3xl">
      I'm a creative developer passionate about crafting beautiful, 
      interactive experiences that blend cutting-edge technology with 
      thoughtful design principles.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
      <div>
        <h3 className="text-xl font-semibold mb-2">Frontend</h3>
        <p className="opacity-70">React, Vue, TypeScript</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Animation</h3>
        <p className="opacity-70">GSAP, Framer Motion</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Design</h3>
        <p className="opacity-70">Figma, After Effects</p>
      </div>
    </div>
  </ContentOverlay>
)

// Contact content
export const ContactOverlay = ({ lenis }) => (
  <ContentOverlay position="end" lenis={lenis}>
    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
      Let's Connect
    </h2>
    <p className="text-lg md:text-xl text-white opacity-80 mb-8">
      Ready to bring your ideas to life? Let's create something amazing together.
    </p>
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      <button className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all duration-300">
        Send Message
      </button>
      <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300">
        View Resume
      </button>
    </div>
  </ContentOverlay>
)

export default ContentOverlay

/**
 * CUSTOMIZATION GUIDE:
 * 
 * 1. POSITIONING:
 *    - Add more positions to positionMap
 *    - Modify trigger points and progress percentages
 *    - Create custom position logic
 * 
 * 2. ANIMATIONS:
 *    - Change entrance effects (opacity, y, scale, rotation)
 *    - Modify animation duration and easing
 *    - Add exit animations with toggleActions
 * 
 * 3. STYLING:
 *    - Customize backdrop and container styles
 *    - Change colors, blur effects, borders
 *    - Add custom CSS classes
 * 
 * 4. CONTENT:
 *    - Create more pre-built overlay components
 *    - Add interactive elements (forms, buttons)
 *    - Include images, videos, or complex layouts
 * 
 * 5. INTERACTION:
 *    - Enable/disable pointer-events
 *    - Add click handlers and navigation
 *    - Integrate with routing or state management
 */