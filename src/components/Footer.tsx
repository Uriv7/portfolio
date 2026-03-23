import React, { useState } from 'react';
import { Github, Linkedin, Mail, Twitter, Rss } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
  onNewsletterSignup?: (email: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ darkMode, onNewsletterSignup }) => {
  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNewsletterSignup) {
      onNewsletterSignup(email);
      setSubscribeMessage('Thanks for subscribing!');
      setEmail('');
      setTimeout(() => setSubscribeMessage(''), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const resources = [
    { label: 'Blog', href: '#articles' },
    { label: 'Education', href: '#education' },
    { label: 'Resume', href: '#resume' },
    { label: 'Certifications', href: '#certificates' },
  ];

  const socialLinks = [
    { icon: Github, url: 'https://github.com/Uriv7', label: 'GitHub' },
    { icon: Linkedin, url: 'https://linkedin.com/in/urivgupta', label: 'LinkedIn' },
    { icon: Mail, url: 'mailto:virender.sonu.gupta@gmail.com', label: 'Email' },
    { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: Rss, url: '#articles', label: 'Blog' },
  ];

  return (
    <footer className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} border-t transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-black text-lg">U</span>
              </div>
              <div>
                <h3 className="text-lg font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Uriv
                </h3>
                <p className={`text-xs font-semibold ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>ML Engineer</p>
              </div>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
              Building AI-powered solutions with a focus on real-world impact and innovation.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-blue-500">Navigation</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`text-sm ${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-cyan-500">Resources</h4>
            <ul className="space-y-2">
              {resources.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`text-sm ${darkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'} transition-colors`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-green-500">Newsletter</h4>
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Get insights on ML, DevOps, and Full-Stack Development
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } border`}
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-all"
                >
                  Subscribe
                </button>
              </div>
              {subscribeMessage && (
                <p className="text-xs text-green-500">{subscribeMessage}</p>
              )}
            </form>

            <div className="flex gap-4 mt-6">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
                  title={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} py-8`}></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              © {currentYear} Virender Gupta (Uriv)
            </p>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              Lovely Professional University | Computer Science & Engineering
            </p>
          </div>
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            Built with React, TypeScript, Tailwind CSS & Supabase
          </p>
        </div>
      </div>
    </footer>
  );
};
