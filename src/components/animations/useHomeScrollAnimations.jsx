import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register the plugins
gsap.registerPlugin(ScrollTrigger);

function useHomeScrollAnimations() {
  // Animation refs for home section elements
  const connectRef = useRef(null)
  const helloRef = useRef(null)
  const nameRef = useRef(null)
  const rectangleRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const buttonsRef = useRef(null)
  const personGroupRef = useRef(null)
  const leftRectanglesRef = useRef(null)
  
  // Animation refs for pull-up content
  const pullUpContentRef = useRef(null)
  const homeSectionRef = useRef(null)
  const nextSectionRef = useRef(null)
  const parallaxLightsRef = useRef(null)
  const takeALookTextRef = useRef(null)
  
  // Animation refs for horizontal scroll
  const horizontalWrapperRef = useRef(null)
  const horizontalContainerRef = useRef(null)
  const panelRefs = useRef([])
  const horizontalScrollTriggerRef = useRef(null)

  useLayoutEffect(() => {
    if (!homeSectionRef.current) return;

    // ====== INITIAL SETUP ======
    // Section 2 starts below the viewport (natural document flow)
    if (nextSectionRef.current) {
      gsap.set(nextSectionRef.current, {
        opacity: 0,
        y: 100,
        position: 'relative',
        zIndex: 1
      });
      console.log('Section 2 initialized');
    }
    
    // Set up panels
    const panels = panelRefs.current || [];
    panels.forEach((panel) => {
      if (!panel) return;
      gsap.set(panel, {
        opacity: 0,
        scale: 1,
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      });
    });

    // ====== CONFIG & HELPERS ======
    const target = descriptionRef.current;
    
    const animateDescription = (element) => {
      if (!element) return;
      gsap.to(element, { 
        opacity: 1, 
        duration: 2,
        ease: 'elastic.out(1, 0.5)'
      });
    };

    // Initial animation
    if (helloRef.current) {
      gsap.from(helloRef.current, {
        y: -50,
        opacity: 0,
        ease: 'elastic.out(1, 0.3)',
        duration: 2,
        delay: 0.5
      });
    }

    // Track current phase
    let currentPhase = 0;
    
    const restartAnimations = () => {
      if (target) animateDescription(target);
    };

    const stopAnimations = () => {
      // Stop logic if needed
    };

    // MASTER timeline - Vertical cinematic intro ONLY
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: homeSectionRef.current,
        start: "top top",
        end: "+=10000vh",
        scrub: 1.5,
        pin: true,
        pinSpacing: true,
        markers: false,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          let newPhase;
          
          if (progress < 0.01) newPhase = 0;
          else if (progress < 0.08) newPhase = 1;
          else if (progress < 0.20) newPhase = 2;
          else if (progress < 0.35) newPhase = 3;
          else if (progress < 0.50) newPhase = 4;
          else newPhase = 5;
          
          if (newPhase !== currentPhase) {
            if (newPhase <= 1 && currentPhase >= 2) {
              console.log(`ScrollTrigger: Returning to Phase ${newPhase} - restarting`);
              currentPhase = newPhase;
              restartAnimations();
            } else if (currentPhase <= 1 && newPhase >= 2) {
              console.log(`ScrollTrigger: Entering Phase ${newPhase} - stopping`);
              stopAnimations();
              currentPhase = newPhase;
            } else {
              currentPhase = newPhase;
            }
          }
        }
      }
    });

    // Add phases to master timeline
    master
      .to({}, { duration: 40 }) // Initial delay
      .call(() => {
        console.log('Entering Phase 1');
        if (descriptionRef.current) {
          gsap.set(descriptionRef.current, { opacity: 1 });
        }
      }, [], 20)
      .to(helloRef.current, {
        y: -250, opacity: 0,
        ease: "power2.inOut", duration: 100
      }, 45)
      .to(nameRef.current, {
        y: -280, opacity: 0,
        ease: "power2.inOut", duration: 100
      }, 45)
      .to(titleRef.current, {
        y: -300, opacity: 0,
        ease: "power3.inOut", duration: 100
      }, 45)
      .to(descriptionRef.current, {
        y: -220, opacity: 0,
        ease: "power3.inOut", duration: 100
      }, 45)
      .to(buttonsRef.current, {
        y: -200, opacity: 0,
        ease: "power3.inOut", duration: 100
      }, 45)
      .to(connectRef.current, {
        x: -400, opacity: 0,
        ease: "power2.inOut", duration: 100
      }, 45)
      .to(personGroupRef.current, {
        x: 500, opacity: 0,
        ease: "power2.inOut", duration: 100
      }, 45)
      .to(leftRectanglesRef.current, {
        y: 300, opacity: 0,
        ease: "power2.inOut", duration: 100
      }, 45)
      
      // Phase 2 - Rectangle expansion
      .addLabel("phase2", 140)
      .call(() => console.log('Phase 2: Rectangle expansion'), [], 140)
      .to(rectangleRef.current, {
        width: "100vw",
        borderTopRightRadius: 55,
        ease: "power2.inOut",
        duration: 200
      }, 140)
      
      // Phase 3 - Full rectangle + content
      .addLabel("phase3", 340)
      .call(() => console.log('Phase 3: Full rectangle + content'), [], 340)
      .set([pullUpContentRef.current], { visibility: 'visible' }, 340)
      .to(rectangleRef.current, {
        height: "100vh",
        ease: "power2.inOut",
        duration: 150
      }, 340)
      .fromTo(rectangleRef.current.querySelectorAll('h3, div, span'),
        { scale: 1 },
        {
          scale: 1.15,
          ease: "power2.out",
          duration: 90,
          stagger: 0.5
        }, 360)
      .to(pullUpContentRef.current, {
        y: -250,
        opacity: 1,
        ease: "power2.out",
        duration: 80
      }, 500)
      
      // Phase 4 - Content positioning
      .addLabel("phase4", 540)
      .call(() => console.log('Phase 4: Content positioning'), [], 540)
      .to([rectangleRef.current, pullUpContentRef.current], {
        y: "-80vh",
        ease: "power2.inOut",
        duration: 200
      }, 540)
      .to(rectangleRef.current, {
        borderTopLeftRadius: 500,
        borderTopRightRadius: 500,
        ease: "power2.inOut",
        duration: 200
      }, 540)
      .to(pullUpContentRef.current, {
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,
        ease: "power2.inOut",
        duration: 200,
      }, 540)
      
      // Phase 5 - Exit & Section 2 reveal
      .addLabel("phase5", 740)
      .call(() => console.log('Phase 5: Section 2 transition'), [], 740)
      .to(rectangleRef.current, {
        y: "-200vh",
        ease: "power2.in",
        duration: 80
      }, 780)
      .to(pullUpContentRef.current, {
        y: "-200vh",
        ease: "power2.in",
        borderBottomLeftRadius: 1000,
        borderBottomRightRadius: 1000,
        duration: 80,
      }, 780)
      .to(rectangleRef.current.querySelectorAll('*'), {
        opacity: 0,
        ease: "power2.in",
        duration: 40,
        stagger: 0.1
      }, 810)
      .to(pullUpContentRef.current.querySelectorAll('*'), {
        opacity: 0,
        ease: "power2.inOut",
        duration: 40,
        stagger: 0.1
      }, 810)
      .set([pullUpContentRef.current, pullUpContentRef.current.querySelectorAll('*')], { 
        visibility: 'hidden' 
      }, 850)
      .to(nextSectionRef.current, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 100,
        onComplete: () => {
          console.log('Horizontal scroll setup');
          setupHorizontalScroll();
        }
      }, 860);

    // Horizontal scroll setup function
    function setupHorizontalScroll() {
      if (!horizontalContainerRef.current || !horizontalWrapperRef.current) return;

      const panels = panelRefs.current || [];

      // Clean up existing scroll trigger
      if (horizontalScrollTriggerRef.current) {
        horizontalScrollTriggerRef.current.kill();
      }

      // Configure wrapper
      gsap.set(horizontalWrapperRef.current, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        zIndex: 10
      });

      // Configure container
      gsap.set(horizontalContainerRef.current, {
        position: "absolute",
        display: "flex",
        width: `${panels.length * 100}vw`,
        height: "100vh",
        left: 0,
        top: 0,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "flex-start"
      });

      // Configure panels
      panels.forEach((panel, index) => {
        if (!panel) return;
        gsap.set(panel, {
          width: "100vw",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          opacity: index === 0 ? 1 : 0,
          scale: 1,
          x: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        });
      });

      // Create snap points
      const labels = panels.map((_, i) => i / (panels.length - 1));

      // Create main horizontal scroll animation
      const horizontalTween = gsap.to(horizontalContainerRef.current, {
        x: () => -(panels.length - 1) * window.innerWidth,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalWrapperRef.current,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${(panels.length - 1) * window.innerWidth}`,
          scrub: 0.3,
          snap: {
            snapTo: labels,
            duration: 0.4,
            delay: 0,
            ease: "power2.out",
            inertia: false
          },
          markers: false,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const currentIndex = Math.round(self.progress * (panels.length - 1));
            
            panels.forEach((panel, index) => {
              const isActive = currentIndex === index;
              const distance = Math.abs(currentIndex - index);
              const opacity = isActive ? 1 : Math.max(0, 1 - distance * 2);
              
              gsap.to(panel, {
                opacity,
                scale: 1,
                x: 0,
                zIndex: isActive ? 2 : 1,
                duration: 0.4,
                ease: "power2.inOut",
                overwrite: "auto"
              });
            });
          }
        }
      });

      horizontalScrollTriggerRef.current = horizontalTween.scrollTrigger;
      ScrollTrigger.refresh();
    }

    // Initial setup
    setupHorizontalScroll();

    // Cleanup
    return () => {
      if (master?.scrollTrigger) master.scrollTrigger.kill();
      if (master) master.kill();
      if (horizontalScrollTriggerRef.current) horizontalScrollTriggerRef.current.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

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
    homeSectionRef,
    nextSectionRef,
    parallaxLightsRef,
    takeALookTextRef,
    horizontalWrapperRef,
    horizontalContainerRef,
    panelRefs
  };
}

export default useHomeScrollAnimations;