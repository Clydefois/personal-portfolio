import React, { useEffect, useRef } from 'react'
import { useScrollTrigger } from '../../hooks/useScrollTrigger'

/**
 * ExpandingSquare Component
 * Animates from a small square in bottom-right to full screen on scroll
 * 
 * CUSTOMIZATION AREAS:
 * 1. Initial size and position (lines 20-25)
 * 2. Animation trigger points (lines 35-37) 
 * 3. Transform properties (lines 29-33)
 * 4. Colors and styling (line 19)
 */
const ExpandingSquare = ({ lenis }) => {
  const squareRef = useRef(null)
  const { createScrollAnimation } = useScrollTrigger(lenis)

  useEffect(() => {
    if (!squareRef.current || !lenis) return

    // 🎨 CUSTOMIZE: Animation properties
    const animation = createScrollAnimation(
      squareRef.current,
      {
        // Transform from small corner square to full screen
        scaleX: 50,           // Scale width to cover full screen (adjust as needed)
        scaleY: 50,           // Scale height to cover full screen (adjust as needed)
        x: '-45vw',           // Move left to center horizontally
        y: '-45vh',           // Move up to center vertically
      },
      {
        // 🎨 CUSTOMIZE: Scroll trigger points
        trigger: '#home',           // Start animation when home section is in view
        start: 'bottom center',     // Start when bottom of home hits center of viewport
        end: 'bottom top',          // End when bottom of home hits top of viewport
        scrub: true,                // Sync with scroll progress (smooth)
        // markers: true,           // Uncomment to see trigger points during development
      }
    )

    // Cleanup function
    return () => {
      if (animation) animation.kill()
    }
  }, [lenis, createScrollAnimation])

  return (
    <div
      ref={squareRef}
      className="fixed bottom-8 right-8 w-16 h-16 bg-yellow-400 z-50 origin-center"
      style={{
        // 🎨 CUSTOMIZE: Initial square styling
        // You can change colors, border-radius, opacity, etc.
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        // Add any additional custom styles here
      }}
    >
      {/* 🎨 CUSTOMIZE: Optional content inside the square */}
      <div className="w-full h-full flex items-center justify-center">
        {/* You can add icons, text, or other content here */}
        <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
      </div>
    </div>
  )
}

export default ExpandingSquare

/**
 * CUSTOMIZATION GUIDE:
 * 
 * 1. INITIAL POSITION & SIZE:
 *    - Change 'bottom-8 right-8' for different corner positions
 *    - Change 'w-16 h-16' for different initial size
 *    - Modify scaleX/scaleY values to control final size
 * 
 * 2. ANIMATION TIMING:
 *    - Adjust 'start' and 'end' values to change when animation occurs
 *    - Change 'trigger' to animate based on different sections
 * 
 * 3. TRANSFORM PROPERTIES:
 *    - Modify x/y values to control final position
 *    - Add rotation, opacity, or other GSAP properties
 * 
 * 4. STYLING:
 *    - Change 'bg-yellow-400' to any Tailwind color
 *    - Modify borderRadius, boxShadow in style object
 *    - Add custom CSS classes or inline styles
 * 
 * 5. CONTENT:
 *    - Add any React components inside the square
 *    - Icons, text, images, etc.
 */