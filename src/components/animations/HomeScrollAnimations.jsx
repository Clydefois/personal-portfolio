import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

const HomeScrollAnimations = () => {
  const connectRef = useRef(null)
  const helloRef = useRef(null)
  const nameRef = useRef(null)
  const rectangleRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const buttonsRef = useRef(null)
  const personGroupRef = useRef(null)
  const leftRectanglesRef = useRef(null)
  const pullUpContentRef = useRef(null)
  const homeSectionRef = useRef(null)

  useEffect(() => {
    // Setters
    gsap.set([connectRef.current, helloRef.current, nameRef.current, titleRef.current, descriptionRef.current, buttonsRef.current], {
      opacity: 1,
      x: 0,
      y: 0
    })

    // Setters of personn
    gsap.set(personGroupRef.current, {
      opacity: 1,
      x: 0,
      y: 0
    })

    // Setter for rctangles
    gsap.set(leftRectanglesRef.current, {
      opacity: 1,
      x: 0,
      y: 0
    })

    

    gsap.set(pullUpContentRef.current, {
      width: "100vw", // Pull-up content is already full width
      right: "0px",
      bottom: "-299px", // Positioned below the rectangle, hidden initially
      opacity: 1
    })

    // Animation for HellO!
    gsap.fromTo(helloRef.current, 
      {
        y: 0,
        opacity: 1
      },
      {
        y: -100,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: helloRef.current,
          start: "top -30%",
          end: "top -120%", // Slower scroll progression
          scrub: 1,

        }
      }
    )

    // Animation for "Connect with me"
    gsap.fromTo(connectRef.current, 
      {
        x: 0,
        opacity: 1
      },
      {
        x: -200,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: connectRef.current,
          start: "top -20%",
          end: "top -110%", // Slower scroll progression
          scrub: 1,
          
        }
      }
    )

    // Animation for "I'M CLYDE QUE" 
    gsap.fromTo(nameRef.current, 
      {
        y: 0,
        opacity: 1
      },
      {
        y: -150,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: nameRef.current,
          start: "top -25%",
          end: "top -115%", // Slower scroll progression
          scrub: 1,

        }
      }
    )

    // Animation for title "A Full Stack Web Developer" 
    gsap.fromTo(titleRef.current, 
      {
        y: 0,
        opacity: 1
      },
      {
        y: -100,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top -22%",
          end: "top -112%", // Slower scroll progression
          scrub: 1,

        }
      }
    )

    // Animation for description "Ready to Build" 
    gsap.fromTo(descriptionRef.current, 
      {
        opacity: 1,
        y: 0
      },
      {
        opacity: 0,
        y: -50,
        ease: "power2.out",
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top -18%",
          end: "top -108%", // Slower scroll progression
          scrub: 1,

        }
      }
    )

    // Animation for buttons
    gsap.fromTo(buttonsRef.current, 
      {
        opacity: 1,
        y: 0
      },
      {
        opacity: 0,
        y: 50,
        ease: "power4.out",
        scrollTrigger: {
          trigger: buttonsRef.current,
          start: "top -15%",
          end: "top -105%", // Slower scroll progression
          scrub: 1,

        }
      }
    )

    // Animation for person group 
    gsap.fromTo(personGroupRef.current, 
      {
        y: 0,
        opacity: 1
      },
      {
        y: 200,
        opacity: 0,
        ease: "power4.out",
        scrollTrigger: {
          trigger: personGroupRef.current,
          start: "top -5%", // Start animation later (with delay)
          end: "top -95%", // Slower scroll progression
          scrub: 2, 
        }
      }
    )

    // Animation for left rectangles -
    gsap.fromTo(leftRectanglesRef.current, 
      {
        y: 0,
        opacity: 1
      },
      {
        y: 150,
        opacity: 0,
        ease: "power4.out",
        scrollTrigger: {
          trigger: leftRectanglesRef.current,
          start: "top -10%", 
          end: "top -100%", // Slower scroll progression
          scrub: 2, // Smooth animation

        }
      }
    )

    // Animation for rectangle - three-phase complex animation with extensive delays
    const rectangleTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: rectangleRef.current,
        start: "top -12%",
        end: "top -600%", 
        scrub: 2,
        // markers: true // Enable for debugging
      }
    })

    rectangleTimeline
      // Phase 1: Expand rectangle width to full screen
      .fromTo(rectangleRef.current, 
        {
          width: "848px",
          right: "0px"
        },
        {
          width: "100vw",
          right: "0px",
          ease: "power4.inOut",
          duration: 5 // 20% of timeline for width expansion
        }
      )
      // Phase 2: Move both full-width rectangle and pull-up content up together
      .to([rectangleRef.current, pullUpContentRef.current], 
        {
          y: -300, 
          ease: "power2.out",
          duration: 5,
        }
      )
      .to(rectangleRef.current, 
        {
          borderTopRightRadius: "65px",
          ease: "power2.out"
        }, "<" 
      )
      // Phase 3a: Grow the stats text and rectangle container
      .to(rectangleRef.current, 
        {
          height: "250px", // Increase height from 180px to 250px
          scale: "2em",
          ease: "power4.Inout",
          duration: 3 
          
        }
      )
      // DELAY: Hold the grown state before moving up
      .to({}, { duration: 3 }) // delay - empty animation for pause
      // Phase 3b: Move pullup up while rectangle moves right and fades out
      .to(pullUpContentRef.current, 
        {
          y: -350, // Move pullup content up 
          ease: "power4.out",
          duration: 0.3
        }, "<"
      )
      .to(rectangleRef.current, 
        {
          x: "200vw",
          opacity: 0,
          ease: "circ.inOut",
          duration: 4
        }, "<" 
      )
      .to(pullUpContentRef.current, 
        {
          height: "100vh", // Expand to full viewport height
          top: "0px", // Extend upper part to top of screen
          bottom: "auto", // Remove bottom constraint
          ease: "expo.inOut",
          borderBottomLeftRadius: "35px",
          borderBottomRightRadius: "35px",
          duration: 4 // Same duration as movement for synchronized expansion
        }, "<" // Start at same time as upward movement
      )

    // Animation to change section positioning after rectangle animation - DISABLED
    /*
    gsap.to(homeSectionRef.current, {
      scrollTrigger: {
        trigger: rectangleRef.current,
        start: "top -80%", // After rectangle animation completes
        end: "top -81%", // Immediate change
        scrub: 1, // 
        onEnter: () => {
          // Change from fixed to relative positioning
          gsap.set(homeSectionRef.current, {
            position: "relative",
            top: "auto",
            transform: "none"
          })
        },
        onLeaveBack: () => {
          // Revert to fixed positioning when scrolling back up
          gsap.set(homeSectionRef.current, {
            position: "fixed",
            top: "0",
            transform: "initial"
          })
        }
      }
    })
    */

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Return refs object to be used by parent component
  return {
    connectRef,
    helloRef,
    nameRef,
    rectangleRef,
    titleRef,
    descriptionRef,
    buttonsRef,
    personGroupRef,
    leftRectanglesRef,
    pullUpContentRef,
    homeSectionRef
  }
}

export default HomeScrollAnimations
