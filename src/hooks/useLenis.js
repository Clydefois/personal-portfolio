import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Custom hook for Lenis smooth scrolling
 * Initializes Lenis and provides the instance for GSAP integration
 */
export const useLenis = () => {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Initialize Lenis with normal scrolling speed
    const lenis = new Lenis({
      duration: 1.2,        // Normal animation duration 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      direction: 'vertical', // Scroll direction
      gestureDirection: 'vertical', // Gesture direction
      smooth: true,         // Enable smooth scrolling
      mouseMultiplier: 1,   // Normal mouse wheel sensitivity
      smoothTouch: false,   // Disable smooth scrolling on touch devices
      touchMultiplier: 2,   // Normal touch gesture sensitivity
      infinite: false,      // Disable infinite scrolling
      syncTouch: true,      // Sync touch gestures with smooth scrolling
    })

    lenisRef.current = lenis

    // Animation frame function for Lenis
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    // Start the animation loop
    requestAnimationFrame(raf)

    // Cleanup function
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef.current
}