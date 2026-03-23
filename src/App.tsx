import React, { useState, useEffect, useRef } from 'react';
import { Header, Footer, HeroSection, SkillsSection, ProjectsSection, BlogSection, ContactSection, TimelineSection } from './components';
import { subscribeNewsletter, submitContactForm } from './utils/supabase';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Refs for Animation and Scrolling
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const searchAnchorRef = useRef<HTMLDivElement>(null);

  // --- 1. Scroll Progress Logic ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- 2. 3D Background Animation Logic ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    const particles: any[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    class Particle3D {
      x: number; y: number; z: number;
      vx: number; vy: number; vz: number;
      size: number;
      angle: number;
      angleSpeed: number;

      constructor() {
        this.x = (Math.random() - 0.5) * 2;
        this.y = (Math.random() - 0.5) * 2;
        this.z = Math.random();
        this.vx = (Math.random() - 0.5) * 0.01;
        this.vy = (Math.random() - 0.5) * 0.01;
        this.vz = (Math.random() - 0.5) * 0.005;
        this.size = Math.random() * 2 + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;
        this.angle += this.angleSpeed;

        if (this.x > 1) this.x = -1;
        if (this.x < -1) this.x = 1;
        if (this.y > 1) this.y = -1;
        if (this.y < -1) this.y = 1;
        if (this.z > 1) this.z = 0;
        if (this.z < 0) this.z = 1;
      }

      project(width: number, height: number) {
        const scale = 200 / (this.z + 1);
        return {
          x: (this.x * scale + width / 2),
          y: (this.y * scale + height / 2),
          scale: scale / 200,
          z: this.z
        };
      }
    }

    const init = () => {
      for (let i = 0; i < 80; i++) {
        particles.push(new Particle3D());
      }
    };

    const animate = () => {
      time += 1;

      ctx.fillStyle = darkMode
        ? 'rgba(15, 23, 42, 0.15)' 
        : 'rgba(248, 250, 252, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => p.update());
      particles.sort((a, b) => a.z - b.z);

      particles.forEach((p, idx) => {
        const proj = p.project(canvas.width, canvas.height);
        const opacity = p.z * 0.9;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(proj.x, proj.y);
        ctx.rotate(p.angle);

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * proj.scale);

        if (darkMode) {
          gradient.addColorStop(0, `rgba(59, 130, 246, ${1 * opacity})`);
          gradient.addColorStop(0.4, `rgba(34, 197, 231, ${0.6 * opacity})`);
          gradient.addColorStop(1, `rgba(6, 182, 212, ${0})`);
        } else {
          gradient.addColorStop(0, `rgba(59, 130, 246, ${0.8 * opacity})`);
          gradient.addColorStop(0.4, `rgba(34, 197, 231, ${0.5 * opacity})`);
          gradient.addColorStop(1, `rgba(34, 197, 231, ${0})`);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(-p.size * proj.scale, -p.size * proj.scale, p.size * proj.scale * 2, p.size * proj.scale * 2);
        ctx.restore();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const proj2 = p2.project(canvas.width, canvas.height);
          const dx = proj.x - proj2.x;
          const dy = proj.y - proj2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180 && p.z > 0.2) {
            const lineOpacity = (1 - dist / 180) * opacity * 0.4;
            ctx.strokeStyle = darkMode
              ? `rgba(34, 197, 231, ${lineOpacity})`
              : `rgba(59, 130, 246, ${lineOpacity * 0.8})`;
            ctx.lineWidth = 1.2 + (1 - p.z) * 0.8;
            ctx.beginPath();
            ctx.moveTo(proj.x, proj.y);
            ctx.lineTo(proj2.x, proj2.y);
            ctx.stroke();
          }
        }
      });

      particles.forEach(p => {
        const proj = p.project(canvas.width, canvas.height);
        const mdx = proj.x - mouse.current.x;
        const mdy = proj.y - mouse.current.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < 300) {
          const mouseOpacity = (1 - mDist / 300) * p.z * 0.5;
          ctx.strokeStyle = darkMode
            ? `rgba(34, 197, 231, ${mouseOpacity * 0.9})`
            : `rgba(59, 130, 246, ${mouseOpacity * 0.8})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(proj.x, proj.y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  // --- 3. Dark Mode HTML Class Toggle ---
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // --- 4. Handlers ---
  const handleNewsletterSignup = async (email: string) => {
    try {
      await subscribeNewsletter(email);
    } catch (error) {
      console.error('Newsletter signup error:', error);
    }
  };

  const handleContactSubmit = async (data: any) => {
    try {
      await submitContactForm({
        ...data,
        createdAt: new Date().toISOString(),
        read: false,
        responded: false
      });
    } catch (error) {
      console.error('Contact form error:', error);
    }
  };

  // Fixed Search Handler with Auto-Scroll logic
  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
    
    // Auto-scroll to Skills/Projects section when typing
    if (query.trim().length > 0 && searchAnchorRef.current) {
      searchAnchorRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  return (
    <div className={`${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-900'} min-h-screen transition-colors duration-300 scroll-smooth relative overflow-x-hidden`}>
      
      {/* 3D ANIMATED CANVAS */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
      />

      {/* GRADIENT DEPTH OVERLAYS */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className={`absolute top-0 left-0 w-full h-full ${
          darkMode
            ? 'bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900'
            : 'bg-gradient-to-b from-slate-50 via-white to-white'
        }`}></div>
        <div className={`absolute inset-0 ${
          darkMode
            ? 'bg-[radial-gradient(circle_at_20%_50%,rgba(37,99,235,0.12)_0%,rgba(37,99,235,0)_60%)]'
            : 'bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.05)_0%,rgba(59,130,246,0)_60%)]'
        }`}></div>
        <div className={`absolute inset-0 ${
          darkMode
            ? 'bg-[radial-gradient(circle_at_80%_50%,rgba(6,182,212,0.1)_0%,rgba(6,182,212,0)_60%)]'
            : 'bg-[radial-gradient(circle_at_80%_50%,rgba(34,197,231,0.03)_0%,rgba(34,197,231,0)_60%)]'
        }`}></div>
      </div>

      {/* SCROLL PROGRESS BAR */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 z-50 transition-all duration-150" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <Header darkMode={darkMode} setDarkMode={setDarkMode} onSearch={handleSearch} />

      {/* SECTIONS WRAPPER */}
      <div className="relative z-10 pt-20">
        <HeroSection darkMode={darkMode} />
        <TimelineSection darkMode={darkMode} />
        
        {/* Search Results Anchor: Viewport jumps here on search */}
        <div ref={searchAnchorRef} className="scroll-mt-24">
          <SkillsSection darkMode={darkMode} searchQuery={searchQuery} />
          <ProjectsSection darkMode={darkMode} searchQuery={searchQuery} />
        </div>

        <BlogSection darkMode={darkMode} searchQuery={searchQuery} />
        <ContactSection darkMode={darkMode} onSubmit={handleContactSubmit} />
      </div>

      <Footer darkMode={darkMode} onNewsletterSignup={handleNewsletterSignup} />
    </div>
  );
}

export default App;