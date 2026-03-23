import React, { useState } from 'react';
import { Brain, Code2, ExternalLink, Server } from 'lucide-react';

interface SkillsSectionProps {
  darkMode: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Simplified data structure with only names
  const skills = {
    "AI/ML": [
      "Natural Language Processing",
      "Computer Vision",
      "Unsupervised Learning",
      "Vector Space Models",
      "PyTorch & TensorFlow",
      "Transformers & LLMs"
    ],
    "Programming": [
      "C++ (DSA)",
      "Python",
      "Java",
      "C",
      "SQL",
    ],
    "Web Dev": [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Next.js",
      "REST APIs",
      "GraphQL"
    ],
    "DevOps": [
      "Docker",
      "Kubernetes",
      "CI/CD Pipelines",
      "AWS",
      "Git & GitHub",
      "Infrastructure as Code"
    ]
  };

  const categories = Object.keys(skills) as (keyof typeof skills)[];
  const icons: { [key: string]: React.ReactNode } = {
    "AI/ML": <Brain className="text-blue-500" size={24} />,
    "Programming": <Code2 className="text-cyan-500" size={24} />,
    "Web Dev": <ExternalLink className="text-green-500" size={24} />,
    "DevOps": <Server className="text-orange-500" size={24} />
  };

  return (
    <section id="skills" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Expertise & Skills</h2>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center mb-12`}>
          Comprehensive skill set across AI, programming, web development, and DevOps
        </p>

        {/* Category Filter Buttons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className={`border rounded-xl p-4 transition-all text-left ${
                selectedCategory === category
                  ? darkMode
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-blue-500 bg-blue-50'
                  : darkMode
                    ? 'bg-gray-800/50 border-gray-700 hover:border-blue-500/50'
                    : 'bg-white border-gray-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                {icons[category]}
                <h3 className="text-lg font-semibold">{category}</h3>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {skills[category].length} skills
              </p>
            </button>
          ))}
        </div>

        {/* Skills List Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div 
              key={category} 
              className={`border rounded-xl p-6 transition-all ${
                darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
              } ${selectedCategory && selectedCategory !== category ? 'opacity-30' : 'opacity-100'}`}
            >
              <div className="flex items-center gap-3 mb-6">
                {icons[category]}
                <h3 className="text-xl font-semibold">{category}</h3>
              </div>

              <div className="space-y-3">
                {skills[category].map((skillName) => (
                  <div 
                    key={skillName}
                    className={`flex items-center gap-2 p-2 rounded-lg ${
                      darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <p className="text-sm font-medium">{skillName}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};