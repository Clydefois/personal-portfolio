import ParallaxLights from './components/ParallaxLights'
import './App.css'
import NavBar from './components/global/NavBar'
import HomeScrollAnimations from './components/animations/HomeScrollAnimations'
import Project1 from './components/panels/Project1'
import Project2 from './components/panels/Project2'
import Project3 from './components/panels/Project3'
import ParallaxLanguagesOverlay from './components/ParallaxLanguagesOverlay'
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import React, { useState } from 'react'

/**
 * Main App Component - Simple scrolling with animated shapes
 * Combines the simple scroll structure with fixed animated elements
 */
function App() {
  // Get animation refs from HomeScrollAnimations hook
  const [showLanguagesOverlay, setShowLanguagesOverlay] = useState(false);
  const animationRefs = HomeScrollAnimations(setShowLanguagesOverlay);

  useEffect(() => {
    if (!animationRefs.homeSectionRef?.current || !animationRefs.section3Ref?.current) return;
    const trigger = ScrollTrigger.create({
      trigger: animationRefs.homeSectionRef.current,
      start: "bottom top",
      endTrigger: animationRefs.section3Ref.current,
      end: "top center",
      onEnter: () => setShowLanguagesOverlay(true),
      onLeave: () => setShowLanguagesOverlay(false),
      onEnterBack: () => setShowLanguagesOverlay(true),
      onLeaveBack: () => setShowLanguagesOverlay(false),
    });
    return () => {
      trigger.kill();
    };
  }, [animationRefs.homeSectionRef, animationRefs.section3Ref]);

  return (
    <div className="App relative">
      {/* Mobile Beta Notice - only visible below lg breakpoint, does not block corners */}
      <div
        className="fixed top-0 left-0 w-full z-[9999] bg-yellow-400 text-black text-center py-2 px-4 font-bold font-[gotham] shadow-lg transition-all duration-300 lg:hidden"
        style={{
          letterSpacing: '0.02em',
          fontSize: '1rem',
          minHeight: '40px',
          pointerEvents: 'none', // allow access to corners
        }}
      >
        🚧 Beta Mode: Mobile view is still in website mode.<br className="sm:hidden" />
        Stay tuned for the upcoming mobile portfolio update!
      </div>
      {/* Scrollable Gradient Background - Circular curved gradients */}
      <div 
        className="absolute top-0 left-0 w-full pointer-events-none z-0"
   style={{
  height: '4000vh',
  background: `
    /* White glow at very top */
    radial-gradient(
      ellipse 200% 45% at 50% 0%,
      #fafafa 0%,
      #fafafa 20%,
      transparent 60%
    ),

    /* Orange glow around 20% */
    radial-gradient(
      ellipse 150% 25% at 50% 4%,
      #F6AA10 40%,
      #F6AA10 25%,
      transparent 70%
    ),

    /* Blue glow around 25% */
    radial-gradient(
      ellipse 140% 15% at 50% 8%,
      #143E5B 0%,
      #143E5B 25%,
      transparent 75%
    ),

    /* Dark navy shadow around 30% */
    radial-gradient(
      ellipse 250% 50% at 50% 7%,
      #021019 20%,
      #021019 40%,
      transparent 90%
    ),

    /* Base vertical gradient */
    linear-gradient(
      to bottom,
      #fafafa 0%,
      #fafafa 6%,
      #F6AA10 20%,
      #143E5B 25%,
      #021019 30%,
      #021019 100%
    )
  `,
  willChange: 'transform',
  transform: 'translateZ(0)',
}}
      />
      
      {/* Fixed ParallaxLights - Always visible during scroll */}
      <div className="fixed inset-0 z-20">
        <ParallaxLights />
      </div>
      
      {/* Fixed Navigation */}
      <NavBar />
      
      {/* Global ParallaxLanguagesOverlay - always rendered, visibility controlled by showLanguagesOverlay */}
      <ParallaxLanguagesOverlay visible={showLanguagesOverlay} />
      <div style={{ height: '4000vh' }} className="relative z-30">
        
        {/* SECTION 1: Home - Will be pinned during animations */}
        <section ref={animationRefs.homeSectionRef} id="home" className="relative w-full  h-[100vh] z-[30]">
          <div className="flex  items-center h-full">
            {/* Left side content */}
            <div className="w-full md:w-[70%] mb-10 ml-4 md:ml-20 px-4 md:px-0 text-left space-y-4 md:space-y-5">
              <div className="space-y-1 md:space-y-2">

                <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-[gotham] font-medium text-gray-800 inline-block px-3 md:px-3 rounded-full outline-1 mb-3" ref={animationRefs.helloRef}>
                  Hello!
                </h1>

                <h2 className="text-sm sm:text-lg md:text-xl lg:text-3xl font-[gotham] font-bold" ref={animationRefs.nameRef}>
                  I'M CLYDE QUE,
                </h2>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-[gotham-narrow] font-extra slate-sky-theme" ref={animationRefs.titleRef}>
                  A Full Stack Web Developer
                </h3>
              </div>
              
              {/* Fixed container for scrambled text to prevent layout shifts */}
              <div className="min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem] lg:min-h-[4.5rem] flex items-start">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black font-medium font-[gotham] leading-relaxed" ref={animationRefs.descriptionRef}>
                 Let’s Bring Your <span className='font-extrabold slate-sky-theme'>Next Idea</span> to Life!
                </p>
              </div>
              
              {/* Gap */}
              <div className="mt-6 md:mt-8 lg:mt-15" ref={animationRefs.connectRef}>
                <div className="flex items-center space-x-4 mb-4 md:mb-6">
                  <p className="text-xs sm:text-xs md:text-sm lg:text-lg font-[gotham] font-bold text-black">
                    CONNECT WITH ME:
                  </p>
                  
                  {/* Social Media Icons */}
                  <div className="flex items-center space-x-3">
                    <a href="#" className="hover:scale-110 transition-transform">
                      <img 
                        src="/icons/facebook.svg" 
                        alt="Facebook" 
                        
                        className="w-5 h-5   sm:w-6 sm:h-6 md:w-7 md:h-7 hover:opacity-75 transition-opacity"
                      />
                    </a>
                    <a href="#" className="hover:scale-110 transition-transform">
                      <img 
                        src="/icons/github.svg" 
                        alt="GitHub" 
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 hover:opacity-75 transition-opacity"
                      />
                    </a>
                    <a href="#" className="hover:scale-110 transition-transform">
                      <img 
                        src="/icons/linkedin.svg" 
                        alt="LinkedIn" 
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 hover:opacity-75 transition-opacity"
                      />
                    </a>
                    <a href="#" className="hover:scale-110 transition-transform">
                      <img 
                        src="/icons/twitter.svg" 
                        alt="Twitter" 
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 hover:opacity-75 transition-opacity"
                      />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-3" ref={animationRefs.buttonsRef}>
                  <button className="slate-sky-theme-bg text-black font-black outline-1 outline-neutral-400 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-6 md:px-8 lg:px-13 py-2 sm:py-1.5 rounded-[15px] font-[gotham] hover:bg-gray-800 transition-colors w-full sm:w-auto">
                    PROJECTS
                  </button>
                  <button className="yellow-gradient-2-bg text-black font-black outline-1 outline-neutral-400 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-6 md:px-8 py-2 sm:py-1.5 rounded-[15px] font-[gotham] hover:bg-gray-800 transition-colors w-full sm:w-auto">
                    SKILLS
                  </button>
              </div>
            </div>
            
           
            
            {/* Person and Background Elements Group */}
            <div 
              ref={animationRefs.personGroupRef}
              className="absolute bottom-0 right-0 w-full h-full hidden md:block"
            >
              {/* Person Image - positioned in front of behind person rectangle */}
              <img 
                draggable="false"
                src="/images/me.png" 
                alt="Clyde Que - Full Stack Developer"
                className="absolute z-20 bottom-20 sm:bottom-24 md:bottom-28 right-4 sm:right-8 md:right-12 w-48 sm:w-64 md:w-80 h-auto max-h-[400px] sm:max-h-[480px] md:max-h-[560px] object-contain object-center"
              />
              
              {/* Stroke outlines for Behind Person Rectangle */}
              <div 
                className="absolute w-48 sm:w-60 md:w-72 h-[400px] sm:h-[480px] md:h-[580px] rounded-tr-full rounded-tl-full bottom-0 right-6 sm:right-10 md:right-14 overflow-visible"
                style={{ 
                  transform: 'scale(1.08)',
                  background: 'linear-gradient(to bottom, rgba(27, 55, 75, 0.8), rgba(255, 255, 255, 0.8))',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  padding: '4px'
                }}
              >
              </div>
              
              {/* Behind Person Rectangle - positioned above the bottom rectangle */}
              <div 
                data-layer="behind person" 
                className="BehindPerson w-48 sm:w-60 md:w-72 h-[390px] sm:h-[470px] md:h-[570px] bg-gradient-to-b rounded-tr-full rounded-tl-full from-[#51B2EC] to-[#ffffff29] absolute bottom-0 right-4 sm:right-8 md:right-12"
                style={{
                  background: `
                    radial-gradient(circle at center, #D1D5DB, transparent 70%),
                    linear-gradient(to bottom, #51B2EC, rgba(255, 255, 255, 0.16))
                  `
                }}
              >
              </div>
            </div>
            
            {/* DECORATIVE ELEMENTS - Left Corner Geometric Shapes */}
            <div 
              ref={animationRefs.leftRectanglesRef}
              className="absolute bottom-0 left-0 z-10 hidden sm:block"
            >
              {/* Blue Tall Rectangle */}
              <div className="absolute bottom-0 left-32 sm:left-40 md:left-56 w-8 sm:w-12 md:w-16 h-24 sm:h-32 md:h-40 bg-[#7BB3D3] rounded-tr-full rounded-tl-full"></div>
              
              {/* Light Blue Medium Rectangle */}
              <div className="absolute bottom-0 left-48 sm:left-60 md:left-80 w-8 sm:w-12 md:w-16 h-20 sm:h-26 md:h-32 bg-[#B5D3E7] rounded-tr-full rounded-tl-full"></div>
              
              {/* Gray Short Rectangle */}
              <div className="absolute bottom-0 left-20 sm:left-28 md:left-40 w-8 sm:w-12 md:w-16 h-16 sm:h-22 md:h-28 bg-[#D1D5DB] rounded-tr-full rounded-tl-full"></div>
            </div>
            
            {/* GSAP Animated Rectangle - Main Stats Container (Bottom Right) */}
            <div 
              ref={animationRefs.rectangleRef}
              className="absolute z-[100] w-full sm:w-[600px] md:w-[700px] lg:w-[848px] h-32 sm:h-36 md:h-40 lg:h-44 px-4 sm:px-6 md:px-9 py-4 sm:py-5 md:py-6 bg-[#1B374B] rounded-tl-[35px] sm:rounded-tl-[45px] md:rounded-tl-[65px] bottom-0 right-0 bg-gradient-to-br"
            >
              {/* Statistics Content Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-8 h-full items-center text-center">
                {/* Stat 1 - Delivered Websites */}
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold yellow-theme-text-3 font-[gotham]">
                    15+
                  </h3>
                  <div className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-300 font-[gotham] text-center leading-tight">
                    <span className="text-white font-semibold">Delivered websites</span>
                    <span className="text-gray-400"> and </span>
                    <br className="hidden lg:block" />
                    <span className="font-semibold">web apps</span>
                    <span className="yellow-theme-text-2 font-bold"> across industries</span>
                    <span className="text-gray-400 hidden sm:inline">, </span>
                    <br className="hidden lg:block" />
                    <span className="text-gray-400 hidden sm:inline">from mini-businesses to </span>
                    <br className="hidden lg:block" />
                    <span className="text-gray-400 hidden sm:inline">personal projects.</span>
                  </div>
                </div>

                {/* Stat 2 - Collaborated Clients */}
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl yellow-theme-text-3 font-bold text-white font-[gotham]">
                    10+
                  </h3>
                  <div className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-300 font-[gotham] leading-tight">
                    <span className="text-gray-400 hidden sm:inline">Collaborated with </span>
                    <br className="hidden lg:block" />
                    <span className="text-white font-semibold">Professional clients</span>
                    <span className="text-gray-400 hidden sm:inline">, turning </span>
                    <br className="hidden lg:block" />
                    <span className="text-gray-400 hidden sm:inline">ideas into </span>
                    <span className="yellow-theme-text-2 font-semibold">digital solutions</span>
                    <br className="hidden lg:block" />
                    <span className="text-gray-400 hidden lg:inline">experiences.</span>
                  </div>
                </div>

                {/* Stat 3 - Hours Spent */}
                <div className="space-y-1 md:space-y-2 sm:col-span-2 lg:col-span-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl yellow-theme-text-3 font-bold text-white font-[gotham]">
                    10K+
                  </h3>
                  <div className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-300 font-[gotham] leading-tight">
                    <span className="text-white font-semibold">Hours</span>
                    <span className="text-gray-400"> coding, </span>
                    <br className="hidden lg:block" />
                    <span className="text-gray-400 hidden sm:inline">debugging, and perfecting </span>
                    <br className="hidden lg:block" />
                    <span className="text-gray-400 hidden sm:inline">clean, efficient, and </span>
                    <br className="hidden lg:block" />
                    <span className="text-gray-400 hidden sm:inline">scalable </span>
                    <span className="yellow-theme-text-2 font-semibold">web solutions</span>
                    <span className="text-gray-400">.</span>
                  </div>
                </div>
              </div>

                 

            </div>

            {/* GSAP Pull-Up Content - Hidden "Who am I" section */}
            <div 
              ref={animationRefs.pullUpContentRef}
              className="absolute bottom-[-300px] right-0  w-full z-[100] h-[300px] bg-[#1B374B]"
            >
              
              {/* Two-Column Layout: Services (Left) | About (Right) */}
              <div className="flex flex-col sm:flex-row h-full relative items-end">
                {/* LEFT COLUMN - Services Offered */}
                <div className="w-full sm:w-1/2 flex flex-col justify-end px-4 sm:px-8 md:px-12 lg:px-20 py-3 sm:py-4 md:py-6">
                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    {/* Service 1: Website Development */}
                    <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
                      <div className="relative hidden sm:block">
                        <div className="w-1 h-8 sm:h-10 md:h-12 bg-white rounded-full"></div>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                        <div className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 rounded-md flex items-center justify-center">
                          <img src="/icons/webdev.svg" alt="Website Development" className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10" />
                        </div>
                        <h3 className="text-white font-bold text-sm sm:text-base md:text-lg font-[gotham]">Website Development</h3>
                      </div>
                    </div>

                    {/* Service 2: Application Development */}
                    <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
                      <div className="relative hidden sm:block">
                        <div className="w-1 h-8 sm:h-10 md:h-12 bg-white rounded-full"></div>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                        <div className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 rounded-md flex items-center justify-center">
                          <img src="/icons/appdev.svg" alt="Application Development" className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10" />
                        </div>
                        <h3 className="text-white font-bold text-sm sm:text-base md:text-lg font-[gotham]">Application Development</h3>
                      </div>
                    </div>

                    {/* Service 3: Hosting Services */}
                    <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
                      <div className="relative hidden sm:block">
                        <div className="w-1 h-8 sm:h-10 md:h-12 bg-white rounded-full"></div>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                        <div className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 rounded-md flex items-center justify-center">
                          <img src="/icons/host.svg" alt="Hosting Services" className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10" />
                        </div>
                        <h3 className="text-white font-bold text-sm sm:text-base md:text-lg font-[gotham]">Hosting Services</h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* VERTICAL DIVIDER */}
                <div className="absolute left-1/2 bottom-6 sm:bottom-8 w-[10px] sm:w-[12px] md:w-[15px] h-[120px] sm:h-[160px] md:h-[200px] bg-white rounded-full transform -translate-x-1/2 hidden sm:block"></div>

                {/* RIGHT COLUMN - About Me Section */}
                <div className="w-full sm:w-1/2 flex flex-col justify-end px-4 sm:px-8 md:px-12 lg:px-15 py-3 sm:py-4 md:py-6">
                  <div className="space-y-2 sm:space-y-3 md:space-y-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-[gotham] mb-2 sm:mb-3 md:mb-4">Who am I?</h2>
                    <div className="text-xs sm:text-sm md:text-sm text-gray-300 font-[gotham] leading-relaxed space-y-1 sm:space-y-2">
                      <p>
                        My name is <span className="gradient-theme-text font-semibold">Kenneth Clyde A. Que</span>. I started my 
                        <span className="font-semibold"> software journey</span> back in college, tinkering with code and 
                        <span className="font-semibold"> experimenting with small</span> projects.
                      </p>
                      <p className="hidden sm:block">
                        Now, as a 3rd-year CS student, I've grown into building real 
                        <span className="yellow-theme-text font-semibold"> professional websites</span> and apps, 
                        <span className="yellow-theme-text font-semibold"> taking freelance gigs</span>, and 
                        <span className="yellow-theme-text- font-semibold"> learning something new</span> every day.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
        </section>

     {/* SECTION 2 */}
<section
  ref={animationRefs.section2Ref}
  style={{
    width: "100vw",
    height: "100vh",
    display: "grid",
    placeItems: "center",
  }}
>
  {/* Global overlay – visible between Section 1 and Section 3 */}
  <ParallaxLanguagesOverlay visible={showLanguagesOverlay} />

  <h2 className="title font-[gotham] font-bold lg:text-8xl">
    Take A Look!
  </h2>
</section>

      {/* SECTION 3 */}
      <section 
      ref={animationRefs.section3Ref} 
      style={{ width: "100vw", height: "100vh", overflow: "hidden",  }}>
        <div 
        ref={animationRefs.wrapperRef}
        >
          <article className="panel" style={{ minWidth: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center",}}>
            <div className="panel-inner flex w-full max-w-7xl mx-auto px-6 gap-8">
              <Project1/>
            </div>
          </article>

          <article className="panel" style={{ minWidth: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
             <div className="panel-inner flex w-full max-w-7xl mx-auto px-6 gap-8">
              <Project2/>
            </div>
          </article>

          <article className="panel" style={{ minWidth: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#ec4899" }}>
            <div className="panel-inner flex w-full max-w-7xl mx-auto px-6 gap-8">
                <Project3/>
            </div>
          </article>
        </div>
      </section>

        {/* Last container after horizontal panels */}
        <div className="lastContainer w-full h-[100vh] flex items-center justify-center bg-[#021019] text-white text-3xl">
          Last Container
        </div>
      </div>
    </div>
  )
}

export default App