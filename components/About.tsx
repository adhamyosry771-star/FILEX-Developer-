import React from 'react';
import { Code, Terminal, Cpu, Palette } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-surface/50 relative overflow-hidden border-y border-white/5 scroll-mt-28">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-pulse-slow"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold flex items-center gap-2">
                <span className="w-8 h-px bg-gold"></span>
                {t('about.subtitle')}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-ink leading-tight">
                {t('about.title')}
              </h2>
            </div>

            <div className="prose prose-invert text-subtle font-light leading-relaxed space-y-6">
              <p className="text-lg">
                {t('about.p1')}
              </p>
              <p>
                {t('about.p2')}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              {[
                { icon: <Code className="w-5 h-5" />, title: t('about.feature1') },
                { icon: <Terminal className="w-5 h-5" />, title: t('about.feature2') },
                { icon: <Cpu className="w-5 h-5" />, title: t('about.feature3') },
                { icon: <Palette className="w-5 h-5" />, title: t('about.feature4') },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-gold/30 transition-colors">
                  <div className="text-gold">{item.icon}</div>
                  <span className="text-sm font-medium text-ink">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual/Image Side */}
          <div className="relative">
            <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-paper">
              <div className="absolute inset-0 bg-gradient-to-tr from-paper via-transparent to-gold/10 z-10"></div>
              {/* Code Snippet Visualization */}
              <div className="p-8 font-mono text-xs md:text-sm text-subtle/80 leading-loose">
                <span className="text-purple-400">class</span> <span className="text-gold">FilexEngineer</span> <span className="text-white">{`{`}</span><br/>
                &nbsp;&nbsp;<span className="text-purple-400">constructor</span>() <span className="text-white">{`{`}</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-400">this</span>.name = <span className="text-green-400">"FILEX"</span>;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-400">this</span>.passion = <span className="text-green-400">"Infinite"</span>;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-400">this</span>.skills = [<span className="text-green-400">"React"</span>, <span className="text-green-400">"Architecture"</span>];<br/>
                &nbsp;&nbsp;<span className="text-white">{`}`}</span><br/><br/>
                
                &nbsp;&nbsp;<span className="text-blue-400">buildFuture</span>() <span className="text-white">{`{`}</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">while</span>(<span className="text-gold">alive</span>) <span className="text-white">{`{`}</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">code</span>();<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">create</span>();<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">innovate</span>();<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`}</span><br/>
                &nbsp;&nbsp;<span className="text-white">{`}`}</span><br/>
                <span className="text-white">{`}`}</span>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 md:bottom-10 md:-left-10 bg-surface border border-white/10 p-6 rounded-xl shadow-xl backdrop-blur-md max-w-[200px]">
              <div className="text-gold font-serif text-4xl font-bold mb-1">100%</div>
              <div className="text-xs uppercase tracking-widest text-subtle">{t('about.commitment')}</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;