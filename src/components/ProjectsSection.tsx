import React, { useState, useMemo } from 'react';
import { ExternalLink, Star, Eye, Github, Info, Globe, ChevronDown, ChevronUp, SearchX } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  githubLink: string;
  liveLink: string;
  detailsLink: string;
  featured: boolean;
  categories: string[];
  stars?: number;
  views?: number;
}

interface ProjectsSectionProps {
  darkMode: boolean;
  projects?: Project[];
  searchQuery?: string;
}

const defaultProjects: Project[] = [
  {
    id: '1',
    name: "Examify",
    description: "AI-powered web application using OCR and NLP to transform raw text and images into educational questions and study materials.",
    tech: ["Python", "OCR", "NLP", "React"],
    githubLink: "https://github.com/Uri7/Examify",
    liveLink: "#",
    detailsLink: "#",
    featured: true,
    categories: ["AI/ML"],
  },
  {
    id: '2',
    name: "CareConnect",
    description: "Telerehabilitation platform featuring pose-detection for remote physical therapy with gamified engagement.",
    tech: ["React", "Tailwind CSS", "MediaPipe"],
    githubLink: "#",
    liveLink: "#",
    detailsLink: "#",
    featured: true,
    categories: ["Web Dev"],
  },
  {
    id: 'geoscale',
    name: "URIV-GEOSCALE",
    description: "High-performance geospatial engine for address-to-coordinate conversion and spatial indexing of 1.5GB+ OpenStreetMap data.",
    tech: ["Python", "FastAPI", "PostGIS", "Docker", "osm2pgsql"],
    githubLink: "https://github.com/Uri7/uriv-geoscale",
    liveLink: "#",
    detailsLink: "#",
    featured: true,
    categories: ["Geospatial", "Data analysis", "AI/ML"],
  },
  {
    id: 'u-shape',
    name: "uShape",
    description: "AI fitness platform that analyzes goals to build custom, adaptive workout plans and track real-time progress.",
    tech: ["Next.js", "AI Logic", "Tailwind"],
    githubLink: "https://github.com/Uri7/ushape",
    liveLink: "https://ushape.vercel.app/",
    detailsLink: "#",
    featured: true,
    categories: ["Web Dev"],
  },
  {
    id: 'leetcode',
    name: "LeetCode Practice",
    description: "Collection of DSA problems solved on LeetCode focusing on efficiency and optimal complexity.",
    tech: ["C++", "DSA", "Problem Solving"],
    githubLink: "https://github.com/Uri7/Leetcode",
    liveLink: "https://leetcode.com/u/Uriv/",
    detailsLink: "#",
    featured: false,
    categories: ["Practice"],
  },
  {
    id: 'gfg',
    name: "GFG Solutions",
    description: "Practice problems and contest solutions from GeeksforGeeks platform.",
    tech: ["C++", "Algorithms"],
    githubLink: "https://github.com/Uri7/gfg-practice",
    liveLink: "https://www.geeksforgeeks.org/profile/urivgsszj",
    detailsLink: "#",
    featured: false,
    categories: ["Practice"],
  },
  {
    id: 'ev-range',
    name: "EV Range Predictor",
    description: "Machine Learning model to estimate electric vehicle range based on various driving parameters.",
    tech: ["Python", "ML", "Data Science"],
    githubLink: "https://github.com/Uri7/EV-Range-Predictor",
    liveLink: "#",
    detailsLink: "#",
    featured: false,
    categories: ["AI/ML"],
  },
  {
    id: 'sai-talent',
    name: "SAI Talent Platform",
    description: "Assessment platform designed for streamlined talent evaluation and recruitment workflow.",
    tech: ["React", "Node.js", "PostgreSQL"],
    githubLink: "https://github.com/Uri7/SAI-Talent-Assessment-Platform",
    liveLink: "#",
    detailsLink: "#",
    featured: false,
    categories: ["Web Dev"],
  },
  {
    id: 'geopredictor-pro',
    name: "GeoPredictor-Pro",
    description: "Technical tool designed for geospatial data transformation and predictive modeling.",
    tech: ["Python", "Geospatial Libraries"],
    githubLink: "https://github.com/Uri7/GeoPredictor-Pro",
    liveLink: "#",
    detailsLink: "#",
    featured: true,
    categories: ["AI/ML"],
  },
  {
    id: 'color-pro',
    name: "Color Inspector Pro",
    description: "Advanced tool for inspecting, picking, and managing professional color palettes.",
    tech: ["React", "CSS", "UI/UX"],
    githubLink: "https://github.com/Uri7/Color-Inspector-Pro",
    liveLink: "#",
    detailsLink: "#",
    featured: false,
    categories: ["Web Dev"],
  },
  {
    id: 'resume-builder',
    name: "Resume Builder",
    description: "Web application to create professional, ATS-friendly resumes quickly.",
    tech: ["React", "JSON", "Export API"],
    githubLink: "https://github.com/Uri7/resume-builder",
    liveLink: "#",
    detailsLink: "#",
    featured: true,
    categories: ["AI/ML", "Web Dev"]
  },
  {
    id: 'task-mgmt',
    name: "Task Management Software",
    description: "Internal software solution for tracking project tasks and team productivity.",
    tech: ["React", "Firebase"],
    githubLink: "https://github.com/Uri7/task-management-software",
    liveLink: "#",
    detailsLink: "#",
    featured: false,
    categories: ["Web Dev"],
  }
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ darkMode, projects = defaultProjects, searchQuery = "" }) => {
  const [filter, setFilter] = useState<string | null>(null);
  const [showAllFeatured, setShowAllFeatured] = useState(false);
  const [showAllOther, setShowAllOther] = useState(false);

  const allCategories = useMemo(() => Array.from(
    new Set(projects.flatMap(p => p.categories || []))
  ).filter(cat => cat && cat.trim() !== "").sort(), [projects]);

  // NEW LOGIC: Instead of hiding, we check if it's a match and sort it to top
  const { matches, nonMatches } = useMemo(() => {
    const q = searchQuery.toLowerCase();
    
    const results = projects.filter(p => filter ? p.categories.includes(filter) : true);
    
    if (!q) return { matches: results, nonMatches: [] };

    const matchesList: Project[] = [];
    const nonMatchesList: Project[] = [];

    results.forEach(p => {
      const isMatch = p.name.toLowerCase().includes(q) ||
                      p.description.toLowerCase().includes(q) ||
                      p.tech.some(t => t.toLowerCase().includes(q)) ||
                      p.categories.some(c => c.toLowerCase().includes(q));
      
      if (isMatch) matchesList.push(p);
      else nonMatchesList.push(p);
    });

    return { matches: matchesList, nonMatches: nonMatchesList };
  }, [projects, filter, searchQuery]);

  // Combine them: Matches first, then rest of projects
  const displayList = [...matches, ...nonMatches];

  const featuredProjects = displayList.filter(p => p.featured);
  const otherProjects = displayList.filter(p => !p.featured);

  const visibleFeatured = showAllFeatured ? featuredProjects : featuredProjects.slice(0, 4);
  const visibleOther = showAllOther ? otherProjects : otherProjects.slice(0, 3);

  const handleLinkClick = (e: React.MouseEvent, link: string) => {
    if (link === "#" || link === "") {
      e.preventDefault();
      alert("Coming Soon!");
    }
  };

  const ProjectCard = ({ project, isFeatured, isDimmed }: { project: Project; isFeatured: boolean; isDimmed: boolean }) => (
    <div className={`border rounded-xl p-6 transition-all group flex flex-col h-full animate-in fade-in zoom-in-95 duration-500 
      ${isDimmed ? 'opacity-40 grayscale-[50%] scale-[0.98]' : 'opacity-100'}
      ${darkMode ? 'bg-gray-800/40 border-gray-700 hover:border-blue-500/50' : 'bg-white border-gray-200 hover:shadow-lg'}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`${isFeatured ? 'text-2xl' : 'text-xl'} font-bold group-hover:text-blue-500 transition-colors`}>{project.name}</h3>
        <div className="flex flex-wrap gap-1 justify-end max-w-[140px]">
          {project.categories.map(cat => (
            <span key={cat} className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20 whitespace-nowrap">{cat}</span>
          ))}
        </div>
      </div>
      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6 leading-relaxed flex-grow ${!isFeatured && 'text-sm line-clamp-2'}`}>{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech) => (
          <span key={tech} className={`px-2 py-1 rounded text-xs border ${darkMode ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>{tech}</span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 mt-auto pt-4 border-t border-gray-700/20">
        <a href={project.detailsLink} onClick={(e) => handleLinkClick(e, project.detailsLink)} className={`flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}><Info size={14} /> <span className="hidden sm:inline">Info</span></a>
        <a href={project.githubLink} target={project.githubLink === "#" ? "_self" : "_blank"} rel="noopener noreferrer" onClick={(e) => handleLinkClick(e, project.githubLink)} className={`flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}><Github size={14} /> <span className="hidden sm:inline">Code</span></a>
        <a href={project.liveLink} target={project.liveLink === "#" ? "_self" : "_blank"} rel="noopener noreferrer" onClick={(e) => handleLinkClick(e, project.liveLink)} className="flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors"><Globe size={14} /> <span className="hidden sm:inline">Live</span></a>
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4 text-center">Projects & Portfolio</h2>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              <button onClick={() => setFilter(null)} className={`px-4 py-2 rounded-lg transition-all font-medium text-sm ${filter === null ? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>All</button>
              {allCategories.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-lg transition-all font-medium text-sm ${filter === cat ? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>{cat}</button>
              ))}
            </div>
          </div>

          {searchQuery && (
            <div className="text-center mb-8">
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                Found {matches.length} matches. Other projects are dimmed below.
              </p>
            </div>
          )}
        </div>

        {/* Featured Projects Grid */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
               <h3 className="text-2xl font-bold">Featured Projects</h3>
               <div className="flex-grow h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {visibleFeatured.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  isFeatured={true} 
                  isDimmed={searchQuery !== "" && !matches.includes(project)} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects Grid */}
        {otherProjects.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
               <h3 className="text-2xl font-bold">Other Repositories</h3>
               <div className="flex-grow h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleOther.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  isFeatured={false} 
                  isDimmed={searchQuery !== "" && !matches.includes(project)} 
                />
              ))}
            </div>
            {(otherProjects.length > 3 || featuredProjects.length > 4) && (
              <div className="mt-12 flex justify-center gap-4">
                <button 
                  onClick={() => { setShowAllOther(!showAllOther); setShowAllFeatured(!showAllFeatured); }} 
                  className="btn-primary flex items-center gap-2"
                >
                  {showAllOther ? <>Show Less <ChevronUp size={20} /></> : <>View All Projects <ChevronDown size={20} /></>}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};