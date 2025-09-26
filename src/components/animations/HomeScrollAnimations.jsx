import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register the plugins
gsap.registerPlugin(ScrollTrigger);

export default function HomeScrollStepByStep(setShowLanguagesOverlay) {
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
  const nextSectionRef = useRef(null)
  const parallaxLightsRef = useRef(null)
  const langOverlayRef = useRef(null)
  const panelRefs = useRef([])
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    // capture refs in locals when needed inside cleanup blocks
    if (!homeSectionRef.current) return;



    
    panelRefs.current.forEach((panel, index) => {
      if (panel) {
        gsap.set(panel, {
          opacity: 0,
          x: 100,
          scale: 0.9
        });
        console.log(`Panel ${index + 1} initialized`);
      }
    });

    // ====== CONFIG ======
    const target = descriptionRef.current;
    
    // ====== HELPERS ======
    const animateDescription = (element) => {
      if (!element) return;
      gsap.to(element, { 
        opacity: 1, 
        duration: 2,
        ease: 'elastic.out(1, 0.5)'
      });
    };

    // ====== H1 ANIMATION ======
    

    // Track current phase
    let currentPhase = 0;
    
    const restartAnimations = () => {
      if (target) {
        animateDescription(target);
      }
    };



    // MASTER timeline - Vertical cinematic intro ONLY
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: homeSectionRef.current,
        start: "top top",
        end: "+=7000vh", // Long scroll distance for slower animations
        scrub: 1,
        pin: true,
        pinSpacing: true,
        markers: false,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          let newPhase;
          
          if (progress < 0.01) {
            newPhase = 0;
          } else if (progress < 0.08) {
            newPhase = 1;
          } else if (progress < 0.20) {
            newPhase = 2;
          } else if (progress < 0.35) {
            newPhase = 3;
          } else if (progress < 0.50) {
            newPhase = 4;
          } else {
            newPhase = 5;
          }
          
          if (newPhase !== currentPhase) {
            if (newPhase <= 1 && currentPhase >= 2) {
              console.log(`ScrollTrigger: Returning to Phase ${newPhase} - restarting animations`);
              currentPhase = newPhase;
              restartAnimations();
            } else if (currentPhase <= 1 && newPhase >= 2) {
              console.log(`ScrollTrigger: Entering Phase ${newPhase} - stopping animations`);
                stopAnimations();
              currentPhase = newPhase;
            } else {
              currentPhase = newPhase;
            }
          }
        }
      }
    });




    // ---- PHASE 1 (40 → 140s) - Uniform animations
    master
      .call(() => {
        console.log('Entering Phase 1 - stopping initial animation');
        if (descriptionRef.current) {
          gsap.set(descriptionRef.current, {
            opacity: 1,
          });
        }
      }, [], 20)
      
      .to(helloRef.current, {
        y: -250,
        opacity: 0,
        ease: "power2.inOut",
        duration: 30
      }, 45)
      
      .to(nameRef.current, {
        y: -280,
        opacity: 0,
        ease: "power2.inOut",
        duration: 100
      }, 45)
      
      .to(titleRef.current, {
        y: -300,
        opacity: 0,
        ease: "power3.inOut",
        duration: 100
      }, 45)
      
      .to(descriptionRef.current, {
        y: -220,
        opacity: 0,
        ease: "power3.inOut",
        duration: 100
      }, 45)
      
      .to(buttonsRef.current, {
        y: -200,
        opacity: 0,
        ease: "power3.inOut",
        duration: 100
      }, 45)
      
      .to(connectRef.current, {
        x: -400,
        opacity: 0,
        ease: "power2.inOut",
        duration: 100
      }, 45)
      
      .to(personGroupRef.current, {
        x: 500,
        opacity: 0,
        ease: "power2.inOut",
        duration: 100
      }, 45)
      
      .to(leftRectanglesRef.current, {
        y: 300,
        opacity: 0,
        ease: "power2.inOut",
        duration: 100
      }, 45);

    // ---- PHASE 2 (140 → 340s) - Rectangle width expansion
    master.addLabel("phase2", 140)
      .call(() => console.log('Entering Phase 2 - rectangle expansion'), [], 140)
      .to(rectangleRef.current, {
        width: "100vw",
        borderTopRightRadius: 55,
        ease: "power2.inOut",
        duration: 200
      }, 140);

    // ---- PHASE 3 (340 → 540s) - Rectangle height expansion
    master.addLabel("phase3", 340)
      .call(() => console.log('Entering Phase 3 - full rectangle + content'), [], 340)
      .set([pullUpContentRef.current], { visibility: 'visible' }, 340)
      .to(rectangleRef.current, {
        height: "100vh",
        ease: "power2.inOut",
        duration: 150
      }, 340)
      .fromTo(rectangleRef.current.querySelectorAll('h3, div, span'), {
        scale: 1
      }, {
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
      }, 500);

    // ---- PHASE 4 (540 → 740s) - Content positioning
    master.addLabel("phase4", 540)
      .call(() => console.log('Entering Phase 4 - content positioning'), [], 540)
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
      }, 540);

    // ---- PHASE 5 (740 → 940s) - Final exit & reveal Section 2
    master.addLabel("phase5", 740)
      
      // Move rectangle completely out of view upward
      .to(rectangleRef.current, {
        y: "-200vh",
        ease: "power2.in",
        duration: 80
      }, 780)
      
      // Move pull-up container out upward
      .to(pullUpContentRef.current, {
        y: "-200vh",
        ease: "power2.in",
        borderBottomLeftRadius: 1000,
        borderBottomRightRadius: 1000,
        duration: 80,
      }, 780)
      
     
      
      // Fade out content during movement
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

      // (Overlay opacity no longer driven here)
    // (Section 2 is revealed during the exit tween above)
    

    // --- SECTION 2: pinned "Take A Look" (simple example) ---
    // First, fade out section 1 content
   // --- SECTION 2: pinned "Take A Look" ---
master.addLabel("section1Exit", 900)
  // Fade out Section 1
  .to([homeSectionRef.current, parallaxLightsRef.current], { 
    autoAlpha: 0, 
    duration: 40
  }, "section1Exit")
 
  // Section 2 reveal handled at t=780; keep this block free to avoid conflicts
 
  // Optional: debug log
  .call(() => console.log('Entering new Section 2 - Take A Look'), [], "section1Exit+=20")
  // (Section 2 ScrollTrigger is created outside master; here we only reveal)
  .call(() => {
    if (nextSectionRef.current) {
      gsap.set(nextSectionRef.current, { autoAlpha: 1 });
    }
  }, [], "section1Exit+=0") // just after the fade in starts
// === PINNED SECTION 2 PARALLAX OVERLAY ===
gsap.delayedCall(0, () => {
  if (section2Ref.current && langOverlayRef.current) {
    ScrollTrigger.create({
      trigger: section2Ref.current,
      start: "top top",
      end: "bottom top",
      pin: false,
      scrub: true,
      onUpdate: (self) => {
        // Animate langOverlayRef vertically based on scroll progress
        const y = gsap.utils.interpolate(-100, 100, self.progress); // adjust range as needed
        gsap.to(langOverlayRef.current, { y, duration: 0.2, overwrite: 'auto' });
      },
      onEnter: () => setShowLanguagesOverlay?.(true),
      onLeave: () => setShowLanguagesOverlay?.(false),
      onEnterBack: () => setShowLanguagesOverlay?.(true),
      onLeaveBack: () => setShowLanguagesOverlay?.(false),
    });
  }
});

// === SECTION 2: pinned "Take A Look" animation ===
gsap.delayedCall(0, () => {
  if (section2Ref.current) {
    const titleEl = section2Ref.current.querySelector('.title');
    if (titleEl) {
      // Initial state
      gsap.set(titleEl, { autoAlpha: 0, y: 80 });

      // Timeline for title fade in
      gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top top",
          end: "+=400%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })
      .to(titleEl, { autoAlpha: 1, y: 0, duration: 2, ease: 'power2.out' }, 0);
    }
  }
});

    // Section 3: horizontal panels with snap
    gsap.delayedCall(0, () => {
      const sectionEl = section3Ref.current;
      const wrapEl = wrapperRef.current;
      if (sectionEl && wrapEl) {
        const panels = gsap.utils.toArray(wrapEl.querySelectorAll('.panel'));
        if (panels.length > 0) {
          wrapEl.style.width = `${panels.length * 100}vw`;
          wrapEl.style.display = 'flex';
          wrapEl.style.height = '100vh';
          wrapEl.style.willChange = 'transform';
          panels.forEach((p) => (p && (p.style.willChange = 'transform, opacity')));
          gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: 'none',
            scrollTrigger: {
              trigger: sectionEl,
              pin: true,
              scrub: 1,
              snap: panels.length > 1 ? 1 / (panels.length - 1) : 0,
              end: () => "+=" + (wrapEl ? wrapEl.offsetWidth : 0),
            },
          });
        }
      }
    });
    
    ScrollTrigger.refresh();

    const resizeHandler = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      // Kill master timeline
      if (master && master.scrollTrigger) {
        master.scrollTrigger.kill();
      }
      if (master) {
        master.kill();
      }
      
      // Clean up all ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Return refs
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
    langOverlayRef,
    panelRefs,
    section2Ref,
    section3Ref,
    wrapperRef,
  }
}