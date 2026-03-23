import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Search } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode, onSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Articles', href: '#articles' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
      // UX Fix: Close the search bar and clear text after submission
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full ${
      darkMode
        ? 'bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900/80 border-gray-800'
        : 'bg-gradient-to-b from-white via-white/95 to-white/80 border-gray-200'
    } backdrop-blur-xl z-50 border-b transition-all duration-300`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-black text-lg">U</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Uriv
              </h1>
              <p className={`text-xs font-semibold ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>ML Engineer</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-1 items-center">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-all text-sm font-medium hover:text-blue-500`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 items-center">
            
            {/* SEARCH INPUT - Fixed: Removed 'hidden md:block' */}
            {searchOpen && (
              <form onSubmit={handleSearch} className="animate-in fade-in slide-in-from-right-2 duration-300">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`px-3 py-2 rounded-lg text-sm w-32 sm:w-48 md:w-64 outline-none ring-2 ring-blue-500/50 ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  } border`}
                  autoFocus
                />
              </form>
            )}

            {/* Search Toggle Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2.5 rounded-xl border transition-all ${
                darkMode 
                  ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300' 
                  : 'border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-600'
              } ${searchOpen ? 'ring-2 ring-blue-500 border-transparent' : ''}`}
              title="Toggle Search"
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border ${
                darkMode ? 'border-gray-700 bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200'
              } transition-all`}
              title="Toggle Theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Contact Button */}
            <a
              href="#contact"
              className="hidden sm:block px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all text-sm shadow-md active:scale-95"
            >
              Contact
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl border ${
                darkMode ? 'border-gray-700 bg-gray-800 text-gray-300' : 'border-gray-300 bg-gray-100 text-gray-600'
              }`}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'} mt-4 pt-4 pb-4 animate-in slide-in-from-top-2 duration-300`}>
            <div className="flex flex-col gap-2">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                    darkMode 
                      ? 'hover:bg-gray-800 text-gray-300 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {/* Mobile Contact Link (since the button is hidden on small screens) */}
              <a 
                href="#contact" 
                className="px-3 py-2 rounded-lg text-sm font-bold text-blue-500 sm:hidden"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Me
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};