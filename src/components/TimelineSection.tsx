import React, { useState } from 'react';
import { Briefcase, GraduationCap, Award, School, BookOpen } from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  skills: string[];
  current: boolean;
}

interface TimelineSectionProps {
  darkMode: boolean;
  experiences?: Experience[];
}

const defaultExperiences: Experience[] = [
  {
    id: '1',
    title: 'Web & UX/UI Developer Intern',
    company: 'Ernest-well Business Solutions Ltd | Liverpool, United Kingdom',
    startDate: 'May 2025',
    endDate: 'Aug 2025',
    description: 'Designed and implemented cross-platform responsive interfaces (HTML, CSS, JS) improving mobile load speed and accessibility across devices. Spearheaded UI/UX design for a core module evaluated by 500+ testers resulting in 45% improvement in user task completion rate and interface responsiveness. Collaborated with a cross-functional team of 8 in Agile sprints to deliver UI features incorporating feedback to improve usability and reduce UI issues.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'Figma', 'Docker'],
    current: false
  },
  {
    id: '2',
    title: 'Machine Learning Engineer',
    company: 'Self-Employed / Open Source',
    startDate: 'Jan 2023',
    description: 'Building AI-powered applications and contributing to open-source ML projects. Developing solutions in NLP and Computer Vision domains.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'],
    current: true
  },
  {
    id: '3',
    title: 'Full-Stack Developer',
    company: 'Personal Projects',
    startDate: 'Jan 2023',
    description: 'Developing production-ready web applications using modern tech stack. Building scalable backend services and interactive frontend interfaces.',
    skills: ['React', 'Node.js', 'Tailwind CSS', 'Supabase', 'TypeScript'],
    current: true
  },
  {
    id: '4',
    title: 'Data Structures and Algorithms',
    company: 'LeetCode / Hacker-rank',
    startDate: 'Jan 2022',
    description: 'Solving complex algorithmic problems and DSA challenges. Developing strong problem-solving skills and competitive programming expertise.',
    skills: ['C++', 'Data Structures', 'Algorithms', 'Problem Solving'],
    current: true
  }
];

export const TimelineSection: React.FC<TimelineSectionProps> = ({ darkMode, experiences = defaultExperiences }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <>
      {/* EXPERIENCE SECTION */}
      <section id="experience" className={`py-24 px-6 scroll-mt-20 relative ${
        darkMode ? 'bg-gradient-to-b from-slate-900 to-slate-950' : 'bg-gradient-to-b from-slate-50 to-white'
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className={`inline-block px-4 py-2 rounded-full mb-4 ${
              darkMode
                ? 'bg-blue-600/20 border border-blue-500/30 text-blue-300'
                : 'bg-blue-100 border border-blue-200 text-blue-700'
            }`}>
              <span className="text-sm font-semibold">My Journey</span>
            </div>
            <h2 className="text-5xl font-bold mb-4">Experience & Journey</h2>
            <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'} max-w-2xl mx-auto`}>
              A timeline of my professional growth and technical achievements
            </p>
          </div>

          <div className="space-y-4 relative">
            {/* Timeline vertical line */}
            <div className={`absolute left-8 top-0 bottom-0 w-1 ${
              darkMode ? 'bg-gradient-to-b from-blue-600 to-cyan-600' : 'bg-gradient-to-b from-blue-400 to-cyan-400'
            }`}></div>

            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="relative pl-24 pb-8"
              >
                {/* Timeline dot */}
                <div className={`absolute left-2 top-3 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                  darkMode
                    ? 'bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/50'
                    : 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-400/50'
                }`}
                onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                >
                  {index === 0 ? (
                    <Briefcase size={24} className="text-white" />
                  ) : index === 1 ? (
                    <Briefcase size={24} className="text-white" />
                  ) : (
                    <Award size={24} className="text-white" />
                  )}
                </div>

                {/* Experience card */}
                <div
                  className={`border rounded-2xl p-6 transition-all cursor-pointer ${
                    darkMode
                      ? 'bg-slate-800/70 border-slate-700/50 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10'
                      : 'bg-white border-slate-200 hover:shadow-xl hover:shadow-blue-400/10'
                  }`}
                  onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                        {exp.title}
                      </h3>
                      <p className={`text-lg font-semibold mb-1 ${
                        darkMode ? 'text-cyan-400' : 'text-blue-600'
                      }`}>
                        {exp.company}
                      </p>
                    </div>
                    {exp.current && (
                      <span className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ml-4 ${
                        darkMode
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}>
                        Current
                      </span>
                    )}
                  </div>

                  <p className={`text-sm font-medium mb-4 ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {exp.startDate} {exp.endDate && `– ${exp.endDate}`}
                  </p>

                  {expandedId === exp.id && (
                    <div className={`space-y-4 mt-6 pt-6 border-t ${
                      darkMode ? 'border-slate-700/50' : 'border-slate-200'
                    } animate-in fade-in duration-300`}>
                      <p className={`text-sm leading-relaxed ${
                        darkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {exp.description}
                      </p>
                      <div>
                        <p className={`text-sm font-semibold mb-3 ${
                          darkMode ? 'text-slate-200' : 'text-slate-900'
                        }`}>
                          Tech Stack:
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {exp.skills.map(skill => (
                            <span
                              key={skill}
                              className={`text-xs px-4 py-2 rounded-lg font-medium transition-all ${
                                darkMode
                                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30'
                                  : 'bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" className={`py-24 px-6 scroll-mt-20 ${
        darkMode
          ? 'bg-gradient-to-b from-slate-950 to-slate-900'
          : 'bg-gradient-to-b from-white to-slate-50'
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className={`inline-block px-4 py-2 rounded-full mb-4 ${
              darkMode
                ? 'bg-cyan-600/20 border border-cyan-500/30 text-cyan-300'
                : 'bg-cyan-100 border border-cyan-200 text-cyan-700'
            }`}>
              <span className="text-sm font-semibold">Academic Background</span>
            </div>
            <h2 className="text-5xl font-bold mb-4">Education</h2>
          </div>

          <div className="space-y-5">
            {/* B.Tech - LPU */}
            <div className={`border rounded-2xl p-8 transition-all ${
              darkMode
                ? 'bg-slate-800/70 border-slate-700/50 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10'
                : 'bg-white border-slate-200 hover:shadow-xl hover:shadow-cyan-400/10'
            }`}>
              <div className="flex gap-5 items-start">
                <div className={`p-4 rounded-xl flex-shrink-0 ${
                  darkMode ? 'bg-cyan-600/20 border border-cyan-500/30' : 'bg-cyan-100 border border-cyan-200'
                }`}>
                  <GraduationCap className={darkMode ? 'text-cyan-400' : 'text-cyan-600'} size={32} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    Bachelor of Technology (CSE)
                  </h3>
                  <p className={`text-lg font-semibold mb-2 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                    Lovely Professional University, Punjab
                  </p>
                  <p className={`text-sm font-medium mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Aug 2023 – 2027 | Currently Pursuing
                  </p>
                  <div className={`border-t ${darkMode ? 'border-slate-700/50' : 'border-slate-200'} pt-4 space-y-2`}>
                    <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      <span className={`font-semibold ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>CGPA:</span> 8.08/10.0
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      <span className="font-semibold">Focus:</span> Data Structures, Algorithms, Machine Learning, Web Development
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Intermediate - Govt School */}
            <div className={`border rounded-2xl p-8 transition-all ${
              darkMode
                ? 'bg-slate-800/70 border-slate-700/50 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10'
                : 'bg-white border-slate-200 hover:shadow-xl hover:shadow-blue-400/10'
            }`}>
              <div className="flex gap-5 items-start">
                <div className={`p-4 rounded-xl flex-shrink-0 ${
                  darkMode ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-blue-100 border border-blue-200'
                }`}>
                  <School className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={32} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    Intermediate (Class XII)
                  </h3>
                  <p className={`text-lg font-semibold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    Govt. Model Sr. Sec. School, Faridabad
                  </p>
                  <p className={`text-sm font-medium mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Apr 2020 – Mar 2022
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="font-semibold">Percentage:</span> <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>76%</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Matriculation - Govt School */}
            <div className={`border rounded-2xl p-8 transition-all ${
              darkMode
                ? 'bg-slate-800/70 border-slate-700/50 hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-500/10'
                : 'bg-white border-slate-200 hover:shadow-xl hover:shadow-teal-400/10'
            }`}>
              <div className="flex gap-5 items-start">
                <div className={`p-4 rounded-xl flex-shrink-0 ${
                  darkMode ? 'bg-teal-600/20 border border-teal-500/30' : 'bg-teal-100 border border-teal-200'
                }`}>
                  <BookOpen className={darkMode ? 'text-teal-400' : 'text-teal-600'} size={32} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    Matriculation (Class X)
                  </h3>
                  <p className={`text-lg font-semibold mb-2 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                    Govt. Model Sr. Sec. School, Faridabad
                  </p>
                  <p className={`text-sm font-medium mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Apr 2019 – Mar 2020
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="font-semibold">Percentage:</span> <span className={darkMode ? 'text-teal-400' : 'text-teal-600'}>88%</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};