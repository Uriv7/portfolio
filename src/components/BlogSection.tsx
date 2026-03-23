import React, { useState, useMemo, useEffect } from 'react';
import { Search, ArrowRight, X, ArrowLeft } from 'lucide-react';

// --- Data Types ---
interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string; 
  author: string;
  category: string;
  thumbnail?: string;
  tags: string[];
}

const MY_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Building Production-Ready NLP Pipelines',
    excerpt: 'A guide to creating scalable NLP systems with proper error handling.',
    content: 'Natural Language Processing (NLP) at scale requires more than just a model. It requires a pipeline that can handle thousands of requests per second. Using asynchronous workers with Redis and FastAPI provides the best latency for Uriv-grade production systems.',
    author: 'Uriv',
    category: 'AI/ML',
    tags: ['NLP', 'Python', 'Production'],
    thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '2',
    title: 'DevOps for Machine Learning',
    excerpt: 'Essential practices to deploy and manage models effectively.',
    content: 'MLOps is the bridge between data science and reliable engineering. By automating the deployment of models via GitHub Actions and monitoring them with Prometheus, we ensure that the system remains healthy.',
    author: 'Uriv',
    category: 'Infrastructure',
    tags: ['DevOps', 'Docker', 'Kubernetes'],
    thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

export function BlogSection({ darkMode }: { darkMode: boolean }) {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = useMemo(() => ['All', ...new Set(MY_ARTICLES.map(a => a.category))], []);

  const filtered = MY_ARTICLES.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(query.toLowerCase());
    const matchesCat = activeCat === 'All' || a.category === activeCat;
    return matchesSearch && matchesCat;
  });

  // --- ESCAPE KEY & SCROLL LOCK ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArticle(null);
    };

    if (selectedArticle) {
      document.body.style.overflow = 'hidden'; // Lock background scroll
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset'; // Unlock background scroll
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArticle]);

  return (
    <div className={`min-h-screen w-full relative transition-colors duration-300 ${darkMode ? 'bg-[#0f172a] text-white' : 'bg-white text-gray-900'}`}>
      
      {/* --- HEADER --- */}
      <header className={`fixed top-0 w-full h-16 z-40 backdrop-blur-md border-b flex items-center justify-between px-6 ${darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-100'}`}>
        <div className="font-bold text-xl text-blue-500">URIV.DEV</div>
        <nav className="flex items-center gap-6">
          <a href="#articles" className="text-sm font-bold hover:text-blue-500">Articles</a>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-500/10 transition-all">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </header>

      {/* --- LIST SECTION --- */}
      <main id="articles" className="relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
        <h2 className="text-5xl font-black mb-12">Writing.</h2>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`text-sm font-bold pb-1 border-b-2 transition-all ${
                activeCat === cat ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Cards */}
        <div className="grid gap-16">
          {filtered.map(article => (
            <div key={article.id} className="flex flex-col md:flex-row gap-8 items-start group cursor-pointer" onClick={() => setSelectedArticle(article)}>
              <div className="w-full md:w-64 h-44 overflow-hidden rounded-2xl">
                <img src={article.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" alt="" />
              </div>
              <div className="flex-1">
                <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest block mb-2">{article.category}</span>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-500">{article.title}</h3>
                <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{article.excerpt}</p>
                <span className="text-blue-500 font-bold flex items-center gap-2 text-sm">Read More <ArrowRight size={16} /></span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- ARTICLE MODAL (THE OVERLAY) --- */}
      {selectedArticle && (
        <div className="fixed inset-0 w-full h-full z-[100] flex items-center justify-center p-4">
          
          {/* Backdrop - High visibility black with blur */}
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-lg cursor-zoom-out"
            onClick={() => setSelectedArticle(null)}
          ></div>

          {/* Modal Container */}
          <div className={`relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-[2rem] shadow-2xl animate-in zoom-in-95 duration-200 ${
            darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
          }`}>
            
            {/* STICKY HEADER INSIDE MODAL */}
            <div className={`sticky top-0 w-full p-6 flex justify-between items-center z-20 border-b ${
              darkMode ? 'bg-gray-900/90 border-white/5' : 'bg-white/90 border-gray-100'
            }`}>
              <button onClick={() => setSelectedArticle(null)} className="text-blue-500 font-bold flex items-center gap-2">
                <ArrowLeft size={18} /> Back
              </button>
              <button onClick={() => setSelectedArticle(null)} className="p-2 rounded-full bg-gray-500/10">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 md:p-12">
              <img src={selectedArticle.thumbnail} className="w-full h-64 object-cover rounded-2xl mb-8" alt="" />
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{selectedArticle.title}</h2>
              <div className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <p>{selectedArticle.content}</p>
              </div>
              <div className="mt-12 pt-8 border-t border-gray-500/10">
                 <button onClick={() => setSelectedArticle(null)} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl">
                   Close Article
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}