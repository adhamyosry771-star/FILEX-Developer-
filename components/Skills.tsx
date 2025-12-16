import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const skills = [
  { name: 'HTML5 / CSS3', level: 98 },
  { name: 'React.js / Next.js', level: 95 },
  { name: 'Tailwind CSS', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'UI / UX Design', level: 100 },
  { name: 'Performance', level: 85 },
];

const Skills: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-32 bg-paper relative overflow-hidden scroll-mt-28">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Section Header */}
          <div className="md:col-span-4 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-subtle block">
              Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-ink leading-tight">
              {t('skills.title')} <br/>
              <span className="italic text-gold">{t('skills.titleSuffix')}</span>
            </h2>
            <p className="text-subtle font-light leading-relaxed">
              {t('skills.desc')}
            </p>
          </div>
          
          {/* Skills List */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            {skills.map((skill) => (
              <div key={skill.name} className="group">
                <div className="flex justify-between mb-2 items-end">
                  <span className="font-serif text-lg text-ink group-hover:text-gold transition-colors">{skill.name}</span>
                </div>
                <div className="h-px bg-white/10 w-full relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gold shadow-[0_0_10px_rgba(56,189,248,0.5)] transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;