import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

/**
 * PinnedShape Component
 * A shape that stays fixed in viewport but moves/transforms based on scroll progress
 * Uses position: fixed and animates only transforms for smooth performance
 */
const PinnedShape = ({ lenis }) => {
  const shapeRef = useRef(null)

  useEffect(() => {
    if (!shapeRef.current) return

    // Sync ScrollTrigger with Lenis if available
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update)
    }

    // Create a timeline that animates the shape through different positions
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,    // Use document.body to track full page scroll
        start: 'top top',          // Start when page starts
        end: 'bottom bottom',      // End when page ends
        scrub: 1,                  // Smooth animation tied to scroll progress
        markers: true,             // Enable markers for debugging
        onUpdate: (self) => {
          console.log('ScrollTrigger progress:', self.progress)
        }
      }
    })

    // Set initial position
    gsap.set(shapeRef.current, {
      x: window.innerWidth - 100,
      y: window.innerHeight - 100,
      scale: 1,
      rotation: 0,
    })

    // Animate through keyframes based on scroll progress
    tl
      // 25% scroll: move to center, bigger
      .to(shapeRef.current, {
        x: window.innerWidth / 2 - 40,
        y: window.innerHeight / 2 - 40,
        scale: 1.5,
        rotation: 90,
        duration: 0.25,
      })
      
      // 50% scroll: move to top-left, even bigger
      .to(shapeRef.current, {
        x: 50,
        y: 50,
        scale: 2,
        rotation: 180,
        duration: 0.25,
      })
      
      // 75% scroll: expand horizontally across top
      .to(shapeRef.current, {
        x: window.innerWidth / 2 - 100,
        y: 50,
        scaleX: 4,
        scaleY: 0.5,
        rotation: 0,
        duration: 0.25,
      })
      
      // 100% scroll: return to bottom-right, original size
      .to(shapeRef.current, {
        x: window.innerWidth - 100,
        y: window.innerHeight - 100,
        scaleX: 1,
        scaleY: 1,
        rotation: 360,
        duration: 0.25,
      })

    // Cleanup function
    return () => {
      if (tl) tl.kill()
      if (lenis) {
        lenis.off('scroll', ScrollTrigger.update)
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [lenis])

  return (
    <div
      ref={shapeRef}
      className="fixed w-20 h-20 bg-yellow-400 rounded-full z-40"
      style={{
        top: 0,
        left: 0,
        transformOrigin: 'center center',
        willChange: 'transform',
      }}
    >
      {/* Optional content inside the shape */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
      </div>
    </div>
  )
}

export default PinnedShape