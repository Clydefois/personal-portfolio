import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

/**
 * ParallaxLights Component
 * Creates small light elements that move at different speeds during scroll
 * for a parallax effect on #fafafa background
 */
const ParallaxLights = () => {
  const lightsContainerRef = useRef(null)
  const lightRefs = useRef([])

  useEffect(() => {
    if (!lightsContainerRef.current) return

    // New parallax logic: lights move down when scrolling down, stay in viewport
    lightRefs.current.forEach((light, index) => {
      if (!light) return

      // Different speed variations for each light
      const speed = 0.5 + (index % 7) * 0.3 // 0.5 to 2.3 speed multiplier

      // Move lights down following scroll direction - stay visible in viewport
      gsap.fromTo(light, 
        {
          y: 0, // Start at original position
        },
        {
          y: () => `${speed * 100}vh`, // Move down proportionally to scroll (max 230vh)
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1, // Smooth following of scroll
            invalidateOnRefresh: true,
          }
        }
      )

      // Optional: Add slight horizontal drift for more dynamic movement
      if (index % 3 === 0) { // Every third light gets horizontal drift
        gsap.fromTo(light, 
          {
            x: 0,
          },
          {
            x: () => `${(Math.random() - 0.5) * 20}vw`, // Random horizontal drift ±10vw
            ease: 'none',
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 2, // Slower horizontal movement
              invalidateOnRefresh: true,
            }
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Generate light positions and properties - spread across entire page
  const lights = [
    // First section small lights (0-25% of total height)
    { x: '10%', y: '3%', size: 'w-2 h-2', opacity: 'opacity-100', shadow: 'drop-shadow-lg' },
    { x: '25%', y: '8%', size: 'w-3 h-3', opacity: 'opacity-80', shadow: 'drop-shadow-xl' },
    { x: '70%', y: '2%', size: 'w-1 h-1', opacity: 'opacity-90', shadow: 'drop-shadow-md' },
    { x: '85%', y: '12%', size: 'w-2 h-2', opacity: 'opacity-75', shadow: 'drop-shadow-lg' },
    { x: '15%', y: '14%', size: 'w-4 h-4', opacity: 'opacity-60', shadow: 'drop-shadow-2xl' },
    { x: '90%', y: '6%', size: 'w-1 h-1', opacity: 'opacity-85', shadow: 'drop-shadow-sm' },
    { x: '40%', y: '11%', size: 'w-2 h-2', opacity: 'opacity-70', shadow: 'drop-shadow-lg' },
    { x: '60%', y: '4%', size: 'w-3 h-3', opacity: 'opacity-80', shadow: 'drop-shadow-xl' },
    { x: '5%', y: '9%', size: 'w-1 h-1', opacity: 'opacity-65', shadow: 'drop-shadow-md' },
    { x: '95%', y: '13%', size: 'w-2 h-2', opacity: 'opacity-55', shadow: 'drop-shadow-lg' },
    { x: '32%', y: '18%', size: 'w-2 h-2', opacity: 'opacity-70', shadow: 'drop-shadow-lg' },
    { x: '78%', y: '22%', size: 'w-1 h-1', opacity: 'opacity-60', shadow: 'drop-shadow-md' },
    
    // Second section lights (25-50% of total height)
    { x: '20%', y: '28%', size: 'w-2 h-2', opacity: 'opacity-50', shadow: 'drop-shadow-lg' },
    { x: '65%', y: '35%', size: 'w-1 h-1', opacity: 'opacity-45', shadow: 'drop-shadow-md' },
    { x: '45%', y: '32%', size: 'w-3 h-3', opacity: 'opacity-40', shadow: 'drop-shadow-xl' },
    { x: '80%', y: '38%', size: 'w-2 h-2', opacity: 'opacity-35', shadow: 'drop-shadow-lg' },
    { x: '12%', y: '42%', size: 'w-1 h-1', opacity: 'opacity-30', shadow: 'drop-shadow-sm' },
    { x: '55%', y: '45%', size: 'w-2 h-2', opacity: 'opacity-45', shadow: 'drop-shadow-lg' },
    { x: '88%', y: '41%', size: 'w-1 h-1', opacity: 'opacity-40', shadow: 'drop-shadow-md' },
    { x: '35%', y: '48%', size: 'w-2 h-2', opacity: 'opacity-35', shadow: 'drop-shadow-lg' },
    
    // Third section lights (50-75% of total height)
    { x: '18%', y: '55%', size: 'w-1 h-1', opacity: 'opacity-30', shadow: 'drop-shadow-sm' },
    { x: '72%', y: '62%', size: 'w-2 h-2', opacity: 'opacity-25', shadow: 'drop-shadow-lg' },
    { x: '42%', y: '58%', size: 'w-1 h-1', opacity: 'opacity-20', shadow: 'drop-shadow-md' },
    { x: '85%', y: '68%', size: 'w-2 h-2', opacity: 'opacity-30', shadow: 'drop-shadow-lg' },
    { x: '8%', y: '72%', size: 'w-1 h-1', opacity: 'opacity-25', shadow: 'drop-shadow-sm' },
    { x: '58%', y: '65%', size: 'w-2 h-2', opacity: 'opacity-20', shadow: 'drop-shadow-lg' },
    { x: '92%', y: '71%', size: 'w-1 h-1', opacity: 'opacity-15', shadow: 'drop-shadow-md' },
    
    // Fourth section lights (75-100% of total height)
    { x: '25%', y: '82%', size: 'w-1 h-1', opacity: 'opacity-15', shadow: 'drop-shadow-sm' },
    { x: '68%', y: '88%', size: 'w-2 h-2', opacity: 'opacity-20', shadow: 'drop-shadow-lg' },
    { x: '45%', y: '85%', size: 'w-1 h-1', opacity: 'opacity-10', shadow: 'drop-shadow-md' },
    { x: '82%', y: '92%', size: 'w-2 h-2', opacity: 'opacity-15', shadow: 'drop-shadow-lg' },
    { x: '15%', y: '95%', size: 'w-1 h-1', opacity: 'opacity-10', shadow: 'drop-shadow-sm' },
    { x: '55%', y: '90%', size: 'w-1 h-1', opacity: 'opacity-12', shadow: 'drop-shadow-md' },
  ]

  // Colorful blur effects - keep your original positions
  const colorfulLights = [
    // Upper left corner light - YELLOW
    { x: '-12%', y: '-1%', class: 'w-80 h-96 rotate-[-171.57deg] bg-[#EAC77D] blur-2xl', opacity: 'opacity-50', shadow: 'drop-shadow-[0_20px_20px_rgba(251,146,60,0.15)]' },
    
    // Upper right corner light - YELLOW
    { x: '590%', y: '-2%', class: 'w-80 h-96 rotate-[171.57deg] bg-[#EAC77D] blur-2xl', opacity: 'opacity-100', shadow: 'drop-shadow-[0_20px_20px_rgba(251,146,60,0.15)]' },
    
    // First 15% colorful lights with scattered shadow effects
    // right large light - BLUE
    { x: '75%', y: '5%', class: 'w-80 h-120 bg-[#A6CBD8] blur-[100px]', opacity: 'opacity-100', shadow: 'drop-shadow-[0_25px_25px_rgba(166,203,216,0.3)]' },
    // Left side light - YELLOW
    { x: '-5%', y: '20%', class: 'size-40 bg-[#EAC77D] blur-3xl', opacity: 'opacity-100', shadow: 'drop-shadow-[0_20px_20px_rgba(234,199,125,0.2)]' },
    // Center top light - BLUE
    { x: '45%', y: '2%', class: 'size-64 bg-[#A6CBD8] blur-[80px]', opacity: 'opacity-30', shadow: 'drop-shadow-[0_25px_25px_rgba(166,203,216,0.3)]' },
    // Right side light - BLUE
    { x: '70%', y: '8%', class: 'w-90 h-126 bg-[#A6CBD8] blur-3xl', opacity: 'opacity-100', shadow: 'drop-shadow-[0_100px_100px_rgba(166,203,216,0.90)]' },
    // Far left light - BLUE
    { x: '5%', y: '5%', class: 'size-48 bg-[#A6CBD8] blur-3xl', opacity: 'opacity-25', shadow: 'drop-shadow-[0_25px_25px_rgba(166,203,216,0.25)]' },
    
    // Very minimal scattered throughout other sections
    // Mid section light - BLUE
    { x: '60%', y: '25%', class: 'w-24 h-32 bg-[#A6CBD8] blur-[60px] rotate-[-30deg]', opacity: 'opacity-10', shadow: 'drop-shadow-[0_15px_15px_rgba(166,203,216,0.1)]' },
    // Lower section light - YELLOW
    { x: '30%', y: '13%', class: 'size-32 bg-[#EAC77D] blur-2xl', opacity: 'opacity-60', shadow: 'drop-shadow-[0_10px_10px_rgba(234,199,125,0.08)]' },
  ]

  return (
    <div ref={lightsContainerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Colorful blur effects with scattered shadows */}
      {colorfulLights.map((light, index) => (
        <div
          key={`colorful-${index}`}
          ref={el => lightRefs.current[index] = el}
          className={`absolute ${light.class} ${light.opacity} ${light.shadow}`}
          style={{
            left: light.x,
            top: light.y,
            willChange: 'transform',
          }}
        />
      ))}
      
      {/* Small subtle lights with scattered shadows */}
      {lights.map((light, index) => (
        <div
          key={`light-${index}`}
          ref={el => lightRefs.current[colorfulLights.length + index] = el}
          className={`absolute ${light.size} ${light.opacity} ${light.shadow} bg-gradient-to-br from-gray-300 to-gray-400 rounded-full blur-sm`}
          style={{
            left: light.x,
            top: light.y,
            willChange: 'transform',
          }}
        />
      ))}
      
      {/* Additional scattered tiny lights - keep original simple distribution */}
      {Array.from({ length: 25 }, (_, index) => (
        <div
          key={`tiny-${index}`}
          ref={el => lightRefs.current[colorfulLights.length + lights.length + index] = el}
          className={`absolute w-px h-px bg-gray-300 rounded-full drop-shadow-sm ${
            Math.random() > 0.5 ? 'opacity-20' : 'opacity-30'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}

export default ParallaxLights