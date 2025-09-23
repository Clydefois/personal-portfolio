import React from 'react'

/**
 * Next Section Component
 * Second full-height section that serves as animation target
 */
const NextSection = () => {
  return (
    <section 
      id="next" 
      className="h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 to-teal-900 text-white relative overflow-hidden"
    >
      {/* Main content container */}
      <div className="text-center z-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          About
        </h2>
        <p className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
          I'm a creative developer passionate about crafting beautiful, 
          interactive experiences that blend cutting-edge technology with 
          thoughtful design principles.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-2">Frontend</h3>
            <p className="opacity-70">React, Vue, TypeScript</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-2">Animation</h3>
            <p className="opacity-70">GSAP, Framer Motion</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-2">Design</h3>
            <p className="opacity-70">Figma, After Effects</p>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-emerald-300 opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-teal-300 opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* Additional content sections can be added here */}
      <div className="absolute bottom-8 right-8 text-white opacity-40">
        <p className="text-sm">Section 02</p>
      </div>
    </section>
  )
}

export default NextSection