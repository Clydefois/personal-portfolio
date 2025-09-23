import React from 'react'

/**
 * Home Section Component
 * Full-height landing section with intro content
 */
const HomeSection = () => {
  return (
    <section 
      id="home" 
      className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white relative overflow-hidden"
    >
      {/* Main content container */}
      <div className="text-center z-10">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
          Portfolio
        </h1>
        <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto">
          Creative Developer & Designer
        </p>
        <div className="mt-8">
          <button className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-purple-900 transition-all duration-300">
            View Work
          </button>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300 opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center text-white opacity-60">
          <span className="text-sm mb-2">Scroll</span>
          <div className="w-px h-8 bg-white"></div>
        </div>
      </div>
    </section>
  )
}

export default HomeSection