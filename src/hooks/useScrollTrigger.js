import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

/**
 * Custom hook for GSAP ScrollTrigger integration with Lenis
 * Syncs ScrollTrigger with Lenis smooth scrolling
 */
export const useScrollTrigger = (lenis) => {
  useEffect(() => {
    if (!lenis) return

    // Update ScrollTrigger when Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update)

    // Integrate ScrollTrigger with Lenis
    gsap.ticker.lagSmoothing(0)

    // Cleanup function
    return () => {
      lenis.off('scroll', ScrollTrigger.update)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [lenis])

  /**
   * Helper function to create scroll-triggered animations
   * @param {string|Element} trigger - Element or selector that triggers the animation
   * @param {Object} animation - GSAP animation properties
   * @param {Object} scrollTriggerOptions - ScrollTrigger configuration options
   */
  const createScrollAnimation = (trigger, animation, scrollTriggerOptions = {}) => {
    return gsap.to(trigger, {
      ...animation,
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true, // Sync animation with scroll progress
        ...scrollTriggerOptions
      }
    })
  }

  /**
   * Helper function to create timeline-based scroll animations
   * @param {string|Element} trigger - Element or selector that triggers the animation
   * @param {Function} timelineFunction - Function that returns a GSAP timeline
   * @param {Object} scrollTriggerOptions - ScrollTrigger configuration options
   */
  const createScrollTimeline = (trigger, timelineFunction, scrollTriggerOptions = {}) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        ...scrollTriggerOptions
      }
    })

    return timelineFunction(tl)
  }

  return {
    createScrollAnimation,
    createScrollTimeline,
    ScrollTrigger,
    gsap
  }
}