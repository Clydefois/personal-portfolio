
import { useLenis } from './hooks/useLenis'
import { useScrollTrigger } from './hooks/useScrollTrigger'
import ParallaxLights from './components/ParallaxLights'
import './App.css'
import NavBar from './components/global/NavBar'
import HomeScrollAnimations from './components/animations/HomeScrollAnimations'

/**
 * Main App Component - Simple scrolling with animated shapes
 * Combines the simple scroll structure with fixed animated elements
 */
function App() {
  // Initialize Lenis smooth scrolling
  const lenis = useLenis()
  
  // Initialize ScrollTrigger integration
  useScrollTrigger(lenis)

  // Get animation refs from HomeScrollAnimations
  const animationRefs = HomeScrollAnimations()

  return (
    <div className="App relative">
      {/* Main scrollable container with light background */}

      <div style={{ height: '1200vh' }} className="relative bg-[#fafafa]">
        {/* Parallax lights - move at different speeds */}
        <NavBar/>

        <ParallaxLights />
        
        {/* Content at different scroll positions */}
        {/* 1st section here - Initially fixed */}
        <section ref={animationRefs.homeSectionRef} id="home" className="fixed  w-full h-[100vh] top-0 transform text-gray-800">
          <div className="flex sticky items-center h-full">
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
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black font-medium font-[gotham] leading-relaxed" ref={animationRefs.descriptionRef}>
                  Ready to <span className='font-extrabold slate-sky-theme'>Build</span> your Next Idea!
              </p>
              
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
              
              <div className="flex flex-col sm:flex-row space-x-3" ref={animationRefs.buttonsRef}>
                  <button className="slate-sky-theme-bg text-black font-black outline-1 outline-neutral-400 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] text-base sm:text-lg md:text-xl px-4 sm:px-6 md:px-13 py-1.5 rounded-[15px] font-[gotham] hover:bg-gray-800 transition-colors">
                    PROJECTS
                  </button>
                  <button className="yellow-gradient-2-bg text-black font-black outline-1 outline-neutral-400 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] text-base sm:text-lg md:text-xl px-4 sm:px-6 md:px-8 py-1.5 rounded-[15px] font-[gotham] hover:bg-gray-800 transition-colors">
                    SKILLS
                  </button>
              </div>
            </div>
            
           
            
            {/* Person and Background Elements Group */}
            <div 
              ref={animationRefs.personGroupRef}
              className="absolute bottom-0 right-0 w-full h-full"
            >
              {/* Person Image - positioned in front of behind person rectangle */}
              <img 
                draggable="false"
                src="/images/me.png" 
                alt="Clyde" 
                
                className="absolute  z-20 bottom-28 right-50 w-85 h-[560.40px] object-contain object-center"
              />
              
              {/* Stroke outlines for Behind Person Rectangle */}
              <div 
                className="absolute w-75 h-[580.40px] rounded-tr-full rounded-tl-full bottom-0 right-49 overflow-visible"
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
                className="BehindPerson w-72 h-[570.40px] bg-gradient-to-b rounded-tr-full rounded-tl-full from-[#51B2EC] to-[#ffffff29] absolute bottom-0 right-50"
                style={{
                  background: `
                    radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%),
                    linear-gradient(to bottom, #51B2EC, rgba(255, 255, 255, 0.16))
                  `
                }}
              >
              </div>
            </div>
            
            {/* DECORATIVE ELEMENTS - Left Corner Geometric Shapes */}
            <div 
              ref={animationRefs.leftRectanglesRef}
              className="absolute bottom-0 left-0 z-10"
            >
              {/* Blue Tall Rectangle */}
              <div className="absolute bottom-0 left-56 w-15 h-40 bg-[#7BB3D3] rounded-tr-full rounded-tl-full"></div>
              
              {/* Light Blue Medium Rectangle */}
              <div className="absolute bottom-0 left-75 w-15 h-30 bg-[#B5D3E7] rounded-tr-full rounded-tl-full"></div>
              
              {/* Gray Short Rectangle */}
              <div className="absolute bottom-0 left-38 w-15 h-28 bg-[#D1D5DB] rounded-tr-full rounded-tl-full"></div>
            </div>
            
            {/* GSAP Animated Rectangle - Main Stats Container (Bottom Right) */}
            <div 
              ref={animationRefs.rectangleRef}
              className="absolute z-100 w-[848px] h-100 px-9 py-6 bg-[#1B374B] rounded-tl-[65px] bottom-0 right-0 lg:h-42 bg-gradient-to-br"
            >
              {/* Statistics Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 h-full items-center text-center">
                {/* Stat 1 - Delivered Websites */}
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold yellow-theme-text-3 font-[gotham]">
                    15+
                  </h3>
                  <div className="text-xs md:text-sm lg:text-base text-gray-300 font-[gotham] text-center leading-tight">
                    <span className="text-white font-semibold">Delivered websites</span>
                    <span className="text-gray-400"> and </span>
                    <br className="hidden md:block" />
                    <span className=" font-semibold">web apps</span>
                    <span className="yellow-theme-text-2 font-bold"> across industries</span>
                    <span className="text-gray-400">, </span>
                    <br className="hidden md:block" />
                    <span className="text-gray-400">from mini-businesses to </span>
                    <br className="hidden md:block" />
                    <span className="text-gray-400">personal projects.</span>
                  </div>
                </div>

                {/* Stat 2 - Collaborated Clients */}
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl  yellow-theme-text-3 font-bold text-white font-[gotham]">
                    10+
                  </h3>
                  <div className="text-xs md:text-sm lg:text-base text-gray-300 font-[gotham] leading-tight">
                    <span className="text-gray-400">Collaborated with </span>
                    <br className="hidden md:block" />
                    <span className="text-white font-semibold">professional clients</span>
                    <span className="text-gray-400">, turning </span>
                    <br className="hidden md:block" />
                    <span className="text-gray-400">ideas into  </span>
                    <span className="yellow-theme-text-2 font-semibold">functional digital</span>
                    <br className="hidden md:block" />
                    <span className="text-gray-400">experiences.</span>
                  </div>
                </div>

                {/* Stat 3 - Hours Spent */}
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl  yellow-theme-text-3 font-bold text-white font-[gotham]">
                    10K+
                  </h3>
                  <div className="text-xs md:text-sm lg:text-base text-gray-300 font-[gotham] leading-tight">
                    <span className="text-white font-semibold">Hours</span>
                    <span className="text-gray-400"> Spent in coding, </span>
                    <br className="hidden md:block" />
                    <span className="text-gray-400">debugging, and perfecting </span>
                    <br className="hidden md:block" />
                    <span className="text-gray-400">clean, efficient, and </span>
                    <br className="hidden md:block" />
                    <span className="text-gray-400">scalable </span>
                    <span className="yellow-theme-text-2 font-semibold">web solutions</span>
                    <span className="text-gray-400">.</span>
                  </div>
                </div>
              </div>

                 

            </div>

            {/* GSAP Pull-Up Containersssss */}
            <div 
              ref={animationRefs.pullUpContentRef}
              className="absolute bottom-[-300px] right-0 w-[850px] z-100 h-[300px] bg-[#1B374B] "
            >
              {/* Two-Column Layout: Services (Left) | About (Right) - Content at bottom of expanded container */}
              <div className="flex h-full relative items-end">
                {/* LEFT COLUMN - Services Offered */}
                <div className="w-1/2 flex flex-col justify-end px-20 py-6">
                  <div className="space-y-6">
                    {/* Service 1: Website Development */}
                    <div className="flex items-center space-x-8">
                      {/* Service Indicator Line with Top Circle */}
                      <div className="relative">
                        <div className="w-1 h-12 bg-white rounded-full"></div>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                      </div>
                        
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-md flex items-center justify-center">
                          <img
                            src="/icons/webdev.svg"
                            alt="Website Development"
                            className="w-10 h-10"
                          />
                        </div>
                        <h3 className="text-white font-bold text-lg font-[gotham]">Website Development</h3>
                      </div>
                    </div>

                    {/* Application Development */}

                    {/* Line */}
                    {/* Service 2: Application Development */}
                    <div className="flex items-center space-x-8">
                      {/* Service Indicator Line with Top Circle */}
                      <div className="relative">
                        <div className="w-1 h-12 bg-white rounded-full"></div>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      {/* Service Icon and Title */}
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-md flex items-center justify-center">
                          <img 
                            src="/icons/appdev.svg" 
                            alt="Application Development" 
                            className="w-10 h-10"
                          />
                        </div>
                        <h3 className="text-white font-bold text-lg font-[gotham]">Application Development</h3>
                      </div>
                    </div>

                    {/* Service 3: Hosting Services */}
                    <div className="flex items-center space-x-8">
                      {/* Service Indicator Line with Top Circle */}
                      <div className="relative">
                        <div className="w-1 h-12 bg-white rounded-full"></div>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-md flex items-center justify-center">
                          <img 
                            src="/icons/host.svg" 
                            alt="Hosting Services" 
                            className="w-10 h-10"
                          />
                        </div>
                        <h3 className="text-white font-bold text-lg font-[gotham]">Hosting Services</h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* VERTICAL DIVIDER - Separates Services from About Section (Fixed Height) */}
                <div className="absolute left-1/2 bottom-8 w-[15px] h-[200px] bg-white rounded-full transform -translate-x-1/2"></div>

                {/* RIGHT COLUMN - About Me Section */}
                <div className="w-1/2 flex flex-col justify-end px-15 py-6">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-white font-[gotham] mb-4">Who am I?</h2>
                    <div className="text-sm text-gray-300 font-[gotham] leading-relaxed space-y-2">
                      <p>
                        My name is <span className="gradient-theme-text font-semibold">Kenneth Clyde A. Que</span>. I started my 
                        <span className=" font-semibold"> software journey</span> back in college, tinkering with code and 
                        <span className="font-semibold"> experimenting with small</span> projects.
                      </p>
                      <p>
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
        
        {/* 2nd section here */}
        <section id="about" className="absolute left-1/2 transform -translate-x-1/2 text-gray-800 text-center p-8" style={{ top: '35%' }}>
          <h2 className="text-4xl font-bold">About</h2>
          <p>Section content goes here</p>
        </section>
        
        <section id="projects" className="absolute left-1/2 transform -translate-x-1/2 text-gray-800 text-center p-8" style={{ top: '55%' }}>
          <h2 className="text-4xl font-bold">Projects</h2>
          <p>Section content goes here</p>
        </section>
        
        <section id="skills" className="absolute left-1/2 transform -translate-x-1/2 text-gray-800 text-center p-8" style={{ top: '75%' }}>
          <h2 className="text-4xl font-bold">Skills</h2>
          <p>Section content goes here</p>
        </section>
        
        <section id="contact" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-gray-800 text-center p-8">
          <h2 className="text-4xl font-bold">Contact</h2>
          <p>Section content goes here</p>
        </section>
        
      </div>
    </div>
  )
}

export default App