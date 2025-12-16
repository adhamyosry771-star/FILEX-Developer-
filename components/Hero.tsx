import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        
        {/* 1. The Large Glowing Orb */}
        <div className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-transparent blur-3xl animate-float opacity-60"></div>
        
        {/* 2. Secondary Glow */}
        <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-3xl animate-pulse-slow" style={{ transform: 'translate(50px, -50px)' }}></div>

        {/* 3. Vertical Mesh Cylinder */}
        <div className="absolute h-[150%] w-[120px] md:w-[200px] border-x border-white/5 overflow-hidden rotate-6 md:rotate-0">
           {/* The moving grid pattern inside the column */}
           <div className="absolute inset-0 mesh-pattern animate-scroll-vertical opacity-50"></div>
           
           {/* Fade masks for top and bottom of the cylinder */}
           <div className="absolute inset-0 bg-gradient-to-b from-paper via-transparent to-paper"></div>
        </div>

        {/* 4. Fine rotating ring */}
        <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full animate-spin-slow opacity-40"></div>
        <div className="absolute w-[580px] h-[580px] border border-white/5 rounded-full animate-spin-slow opacity-30 animation-delay-2000" style={{ animationDirection: 'reverse' }}></div>

        {/* 5. NEW: 3D Geometric Sphere & Orbitals */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="relative flex items-center justify-center w-[600px] h-[600px] md:w-[800px] md:h-[800px]">
             
             {/* The Sphere: Soft, 3D looking ball */}
             <div className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),rgba(56,189,248,0.1),transparent_70%)] shadow-[0_0_40px_rgba(56,189,248,0.15)] backdrop-blur-[1px] z-10 animate-pulse-slow"></div>
             
             {/* Inner Core Glow */}
             <div className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-gold/5 blur-md z-0"></div>

             {/* Orbiting Rings - SVG */}
             <svg className="absolute w-full h-full animate-spin-slow opacity-70" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                <defs>
                   <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(56,189,248,0)" />
                      <stop offset="50%" stopColor="rgba(56,189,248,0.4)" />
                      <stop offset="100%" stopColor="rgba(56,189,248,0)" />
                   </linearGradient>
                </defs>
                
                {/* Ellipse 1 (Main Orbit) */}
                <ellipse cx="400" cy="400" rx="320" ry="80" stroke="url(#ringGrad)" strokeWidth="1.5" fill="none" transform="rotate(25 400 400)" />
                
                {/* Ellipse 2 */}
                <ellipse cx="400" cy="400" rx="320" ry="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" transform="rotate(145 400 400)" />
                
                {/* Ellipse 3 */}
                <ellipse cx="400" cy="400" rx="320" ry="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" transform="rotate(265 400 400)" />
             </svg>
             
             {/* Counter-Rotating Outer Ring */}
             <div className="absolute inset-0 animate-[spin_80s_linear_infinite_reverse] opacity-30">
                <svg className="w-full h-full" viewBox="0 0 800 800">
                   <circle cx="400" cy="400" r="380" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" fill="none" strokeDasharray="4 8" />
                </svg>
             </div>
          </div>
        </div>

      </div>

      <div className="max-w-4xl mx-auto px-4 text-center z-10 space-y-8 relative">
        
        {/* Introduction Tag */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
           <span className="inline-block px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-[10px] uppercase tracking-[0.3em] font-bold text-gold backdrop-blur-sm">
             {t('hero.role')}
           </span>
        </div>
        
        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-ink animate-in fade-in zoom-in duration-1000 delay-100 leading-[0.9] drop-shadow-2xl">
          FILEX
          <span className="block text-2xl md:text-4xl lg:text-5xl font-light italic mt-6 text-subtle font-serif">
             Digital Architect
          </span>
        </h1>
        
        {/* Description */}
        <p className="max-w-xl mx-auto text-lg md:text-xl text-subtle leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          {t('hero.desc')}
        </p>
        
        {/* Call to Action Button */}
        <div className="pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <a 
            href="https://wa.me/201027833873" 
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center px-12 py-4 bg-gold text-paper rounded-full text-sm font-medium tracking-widest uppercase hover:bg-white hover:text-paper transition-all duration-500 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1"
          >
            {t('hero.viewWork')}
          </a>
        </div>

      </div>
      
      {/* Scroll Indicator - Perfect Centering using w-full and flex justify-center */}
      <div className="absolute bottom-12 inset-x-0 w-full flex justify-center animate-bounce text-gold/80 z-20 pointer-events-none">
        <ArrowDown className="w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;