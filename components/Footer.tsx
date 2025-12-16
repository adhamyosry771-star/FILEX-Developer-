import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const TikTokIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
  );

  const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.188 8.188 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23M8.53 7.33c-.19-.43-.43-.43-.63-.43-.16 0-.35 0-.53.01-.19 0-.49.07-.75.34-.26.27-1 .98-1 2.4 0 1.42 1.03 2.79 1.17 2.99.14.2 2.03 3.1 4.92 4.35 2.89 1.25 2.89.83 3.43.78.53-.05 1.17-.48 1.34-.94.17-.46.17-.86.12-.94-.05-.08-.19-.13-.4-.23-.21-.11-1.23-.61-1.42-.68-.19-.07-.33-.11-.47.11-.14.21-.55.68-.67.83-.12.14-.24.16-.45.06-.21-.11-.89-.33-1.69-1.04-.63-.56-1.05-1.25-1.17-1.47-.12-.21-.01-.33.09-.44.1-.09.21-.24.32-.37.11-.13.14-.21.21-.35.07-.14.04-.27-.02-.38-.06-.11-.53-1.28-.73-1.75z" />
    </svg>
  );

  return (
    <footer id="contact" className="bg-paper py-20 border-t border-white/5 scroll-mt-28">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center space-y-12">
        
        <div className="space-y-6">
           <h2 className="text-3xl md:text-5xl font-serif text-ink tracking-tight">
             {t('footer.title')}
           </h2>
           <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full opacity-60"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            { icon: <Facebook className="w-6 h-6" />, href: "https://www.facebook.com/share/1ALbvixvBo/" },
            { icon: <WhatsAppIcon className="w-6 h-6" />, href: "https://wa.me/201027833873" },
            { icon: <TikTokIcon className="w-6 h-6" />, href: "https://www.tiktok.com/@filex_io?_r=1&_t=ZS-92GEmzrJxKq" },
            { icon: <Instagram className="w-6 h-6" />, href: "https://www.instagram.com/filex.io?igsh=czU5M2x1MGFmbm54" },
          ].map((social, idx) => (
            <a 
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-4 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
            >
              <span className="text-subtle group-hover:text-gold transition-colors duration-300 relative z-10 block">
                {social.icon}
              </span>
              <div className="absolute inset-0 rounded-full bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            </a>
          ))}
        </div>
        
        <div className="pt-8 text-[11px] uppercase tracking-[0.2em] text-subtle/40">
          © {new Date().getFullYear()} FILEX. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;