import React from 'react';
import { ChevronDown, Download } from 'lucide-react';
// 1. Import your local photo here
import profilePhoto from '../photo/profile.png';

interface HeroSectionProps {
  darkMode: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ darkMode }) => {
  return (
    /* Added id="about" and scroll-mt-20 to fix header navigation */
    <section id="about" className={`min-h-[calc(100vh-80px)] flex items-center justify-center px-6 scroll-mt-20`}>
      <div className="max-w-5xl w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-2xl opacity-20"></div>
              <img
                // 2. Changed the src to the imported variable
                src={profilePhoto}
                alt="Virender Gupta"
                className={`relative w-72 h-96 object-cover rounded-2xl border-2 ${
                  darkMode ? 'border-blue-500/30 shadow-2xl' : 'border-blue-200 shadow-xl'
                }`}
              />
            </div>
          </div>

          <div className="text-center md:text-left order-1 md:order-2">
            <div className={`inline-block mb-4 px-4 py-2 ${
              darkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-100 border-blue-200'
            } border rounded-full`}>
              <span className="text-blue-500 text-sm font-medium">Available for opportunities</span>
            </div>

            <h1 className={`text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent`}>
              Virender Gupta
            </h1>

            <p className={`text-xl md:text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
              Machine Learning Engineer | DevOps Specialist | Full-Stack Developer
            </p>

            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
              Specializing in NLP, Computer Vision, and building scalable AI-powered applications. Currently pursuing excellence through a 100-Day Challenge.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
              <a
                href="#contact"
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Get in Touch
              </a>
              <a
                href="https://drive.google.com/drive/folders/1pMvdgAHR9p5lD9v_RFL_WWEagyBklSlg"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-3 flex items-center justify-center gap-2 ${
                  darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-300 hover:bg-gray-50'
                } rounded-lg font-semibold transition-all border`}
              >
                <Download size={18} />
                Download Resume
              </a>
            </div>

            <div className="flex gap-6 justify-center md:justify-start">
              <a href="https://github.com/Uriv7" target="_blank" rel="noopener noreferrer" title="GitHub">
                <svg className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-blue-500 transition-colors`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/urivgupta" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <svg className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-blue-500 transition-colors`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.469v6.766z"/>
                </svg>
              </a>
              <a href="mailto:virender.sonu.gupta@gmail.com" title="Email">
                <svg className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-blue-500 transition-colors`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center animate-bounce">
          <ChevronDown size={32} className={`mx-auto ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
        </div>
      </div>
    </section>
  );
};