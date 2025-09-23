import React, { useState, useEffect } from 'react'

const navItems = [
  { name: 'HOME', id: 'home' },
  { name: 'PROJECTS', id: 'projects' },
  { name: 'SKILLS', id: 'skills' },
  { name: 'CONTACT', id: 'contact' }
]

const NavBar = () => {
  const [activeSection, setActiveSection] = useState('HOME')

  // Scroll detection to auto-update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      const documentHeight = document.documentElement.scrollHeight
      
        // Home is 0% to ~45%, Projects ~45% to ~65%, Skills ~65% to ~85%, Contact ~85% to 100%
      const sectionThresholds = [
        { name: 'HOME', start: 0, end: 0.45 },
        { name: 'PROJECTS', start: 0.45, end: 0.65 },
        { name: 'SKILLS', start: 0.65, end: 0.85 },
        { name: 'CONTACT', start: 0.85, end: 1 }
      ]

      const scrollPercentage = scrollPosition / documentHeight

      // current section
      let currentSection = 'HOME'
      for (const section of sectionThresholds) {
        if (scrollPercentage >= section.start && scrollPercentage < section.end) {
          currentSection = section.name
          break
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to section when clicked
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      


      const scrollPositions = {
        home: 0,
        projects: documentHeight * 0.55 - windowHeight / 2,
        skills: documentHeight * 0.75 - windowHeight / 2,  
        contact: documentHeight * 0.95 - windowHeight / 2
      }

      window.scrollTo({
        top: scrollPositions[sectionId] || 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    //container
    <div 
      className='fixed top-0 left-0 right-0 z-50 bg-transparent '
    >
      <div className='flex items-center justify-between px-3 py-2 sm:px-4 md:px-6 lg:px-8 xl:px-10'>
        {/* left box - Logo */}
        <div className='bg-black py-1 px-3 rounded-md flex-shrink-0'>
            <p className='font-[gotham] font-bold text-xs sm:text-sm md:text-base lg:text-lg blue-theme-text'>
              <span className='hidden sm:inline'>ClydeDevs</span>
              <span className='sm:hidden'>C&C</span>
            </p>
        </div>
        
        {/* right box - Navigation */}
        <div className='flex items-center'>
            <div className='bg-black rounded-full py-1 px-2 sm:py-2 sm:px-3 md:px-4'>
                <ul className='flex space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4'>
                    {navItems.map((item) => (
                        <li 
                            key={item.name}
                            onClick={() => scrollToSection(item.id)}
                            className={`cursor-pointer transition-all duration-500 font-[gotham] font-bold text-center flex items-center justify-center text-xs sm:text-xs md:text-sm lg:text-sm ${
                                activeSection === item.name 
                                    ? 'bg-white text-black py-1 px-2 sm:py-1 sm:px-2 md:px-3 rounded-full' 
                                    : 'text-white hover:text-gray-300 py-1 px-2 sm:py-1 sm:px-2'
                            }`}
                        >
                            <span className='hidden sm:inline'>{item.name}</span>
                            <span className='sm:hidden flex items-center justify-center'>
                              {item.name === 'HOME' && (
                                <img 
                                  src="/icons/home.svg" 
                                  alt="Home" 
                                  className={`w-3 h-3 ${activeSection === 'HOME' ? '' : 'filter invert'}`}
                                />
                              )}
                              {item.name === 'PROJECTS' && (
                                <img 
                                  src="/icons/folder.svg" 
                                  alt="Projects" 
                                  className={`w-3 h-3 ${activeSection === 'PROJECTS' ? '' : 'filter invert'}`}
                                />
                              )}
                              {item.name === 'SKILLS' && (
                                <img 
                                  src="/icons/projects.svg" 
                                  alt="Projects" 
                                  className={`w-3 h-3 ${activeSection === 'SKILLS' ? '' : 'filter invert'}`}
                                />
                              )}
                              {item.name === 'CONTACT' && (
                                <img 
                                  src="/icons/about.svg" 
                                  alt="About" 
                                  className={`w-3 h-3 ${activeSection === 'CONTACT' ? '' : 'filter invert'}`}
                                />
                              )}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar