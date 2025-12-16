import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Github, ExternalLink, Plus, Trash2, Edit2, Save, X, Image as ImageIcon, Settings, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Types
interface ProjectContent {
  title: string;
  description: string;
}

interface ProjectData {
  id: number;
  imageUrl: string;
  tags: string[];
  links: { demo: string; code: string };
  content: {
    en: ProjectContent;
    ar: ProjectContent;
  };
}

// Initial Static Data (Fallback)
const INITIAL_PROJECTS: ProjectData[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1481487484168-9b930d5b7d9f?q=80&w=2061&auto=format&fit=crop",
    tags: ["Next.js", "Framer Motion", "Stripe"],
    links: { demo: "#", code: "#" },
    content: {
      en: { title: "Luxury E-Commerce Experience", description: "Award-winning design implementation for a high-end fashion brand." },
      ar: { title: "متجر إلكتروني فاخر", description: "تصميم حائز على جوائز لعلامة أزياء راقية." }
    }
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
    tags: ["React Native", "Firebase", "WebSockets"],
    links: { demo: "#", code: "#" },
    content: {
      en: { title: "Social Connect Platform", description: "A responsive social platform interface with real-time chat features." },
      ar: { title: "منصة تواصل اجتماعي", description: "واجهة منصة اجتماعية متجاوبة تماماً مع ميزات المحادثة الفورية." }
    }
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    tags: ["React", "D3.js", "Tailwind"],
    links: { demo: "#", code: "#" },
    content: {
      en: { title: "Analytics Dashboard", description: "High-performance data visualization dashboard for tracking business metrics." },
      ar: { title: "لوحة تحكم تحليلية", description: "لوحة عرض بيانات عالية الأداء لتتبع مقاييس الأعمال." }
    }
  }
];

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  
  // State
  const [projects, setProjects] = useState<ProjectData[]>(INITIAL_PROJECTS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null); // ID of project being edited
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<ProjectData>({
    id: 0,
    imageUrl: '',
    tags: [],
    links: { demo: '', code: '' },
    content: {
      en: { title: '', description: '' },
      ar: { title: '', description: '' }
    }
  });

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('filex_projects');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (e) {
        console.error("Failed to parse projects", e);
      }
    }
  }, []);

  // Save to LocalStorage whenever projects change
  useEffect(() => {
    localStorage.setItem('filex_projects', JSON.stringify(projects));
  }, [projects]);

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // CRUD Operations
  const handleSave = () => {
    if (isEditing) {
      setProjects(prev => prev.map(p => p.id === isEditing ? { ...formData, id: isEditing } : p));
    } else {
      setProjects(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleReset = () => {
    if (window.confirm('This will restore the default projects and erase your changes. Are you sure?')) {
      setProjects(INITIAL_PROJECTS);
      localStorage.removeItem('filex_projects');
    }
  };

  const handleEdit = (project: ProjectData) => {
    setFormData(project);
    setIsEditing(project.id);
    setShowForm(true);
    // Scroll to form
    const formElement = document.getElementById('project-form');
    if (formElement) {
       formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
       // If form isn't rendered yet, wait a tick
       setTimeout(() => document.getElementById('project-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      imageUrl: '',
      tags: [],
      links: { demo: '', code: '' },
      content: { en: { title: '', description: '' }, ar: { title: '', description: '' } }
    });
    setIsEditing(null);
    setShowForm(false);
  };

  return (
    <section id="projects" className="py-32 bg-paper border-t border-white/5 relative scroll-mt-28">
      
      {/* --- ADMIN CONTROLS (Visible Button) --- */}
      <div className="absolute top-8 right-6 z-50 flex gap-2">
        {isAdmin && (
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase tracking-wider"
            title="Reset to Default"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
        <button 
          onClick={() => setIsAdmin(!isAdmin)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all border border-white/10 shadow-lg backdrop-blur-md ${isAdmin ? 'bg-gold text-paper shadow-[0_0_15px_rgba(56,189,248,0.5)]' : 'bg-surface/80 text-subtle hover:text-white hover:bg-surface hover:border-gold/50'}`}
        >
          <Settings className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">
            {isAdmin ? 'Close Admin' : 'Manage Portfolio'}
          </span>
        </button>
      </div>

      {isAdmin && (
        <div className="max-w-7xl mx-auto px-6 mb-12 animate-in fade-in slide-in-from-top-4">
          <div className="bg-surface border border-gold/20 rounded-xl p-6 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
             
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-serif text-gold flex items-center gap-2">
                 {isEditing ? <Edit2 className="w-5 h-5"/> : <Plus className="w-5 h-5"/>} 
                 {isEditing ? 'Edit Project' : 'Add New Project'}
               </h3>
               {!showForm && !isEditing && (
                 <button onClick={() => setShowForm(true)} className="bg-gold/10 hover:bg-gold text-gold hover:text-paper px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                   + Create New
                 </button>
               )}
               {(showForm || isEditing) && (
                 <button onClick={resetForm} className="text-red-400 hover:text-red-300">
                   <X className="w-5 h-5" />
                 </button>
               )}
             </div>

             {(showForm || isEditing !== null) && (
               <div id="project-form" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Image Upload */}
                 <div className="space-y-4">
                   <label className="block text-sm font-bold text-subtle">Project Image (Upload from Device)</label>
                   <div className="relative aspect-video bg-paper border-2 border-dashed border-white/10 rounded-lg overflow-hidden hover:border-gold/50 transition-colors group cursor-pointer">
                     <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />
                     {formData.imageUrl ? (
                       <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                     ) : (
                       <div className="absolute inset-0 flex flex-col items-center justify-center text-subtle group-hover:text-gold">
                         <ImageIcon className="w-8 h-8 mb-2" />
                         <span className="text-xs">Click to upload image</span>
                       </div>
                     )}
                   </div>
                   <p className="text-[10px] text-subtle/50">Images are saved locally in your browser.</p>
                 </div>

                 {/* Inputs */}
                 <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <label className="text-xs text-gold uppercase tracking-wider">English Title</label>
                       <input 
                         value={formData.content.en.title}
                         onChange={e => setFormData(prev => ({...prev, content: {...prev.content, en: {...prev.content.en, title: e.target.value}}}))}
                         className="w-full bg-paper border border-white/10 rounded p-2 text-ink text-sm focus:border-gold outline-none"
                         placeholder="Project Title"
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-xs text-gold uppercase tracking-wider">Arabic Title</label>
                       <input 
                         value={formData.content.ar.title}
                         onChange={e => setFormData(prev => ({...prev, content: {...prev.content, ar: {...prev.content.ar, title: e.target.value}}}))}
                         className="w-full bg-paper border border-white/10 rounded p-2 text-ink text-sm focus:border-gold outline-none text-right"
                         placeholder="عنوان المشروع"
                       />
                     </div>
                   </div>

                   <div className="space-y-2">
                     <label className="text-xs text-subtle uppercase tracking-wider">Description (EN)</label>
                     <textarea 
                       value={formData.content.en.description}
                       onChange={e => setFormData(prev => ({...prev, content: {...prev.content, en: {...prev.content.en, description: e.target.value}}}))}
                       className="w-full bg-paper border border-white/10 rounded p-2 text-ink text-sm focus:border-gold outline-none h-20"
                     />
                   </div>

                   <div className="space-y-2">
                     <label className="text-xs text-subtle uppercase tracking-wider">Description (AR)</label>
                     <textarea 
                       value={formData.content.ar.description}
                       onChange={e => setFormData(prev => ({...prev, content: {...prev.content, ar: {...prev.content.ar, description: e.target.value}}}))}
                       className="w-full bg-paper border border-white/10 rounded p-2 text-ink text-sm focus:border-gold outline-none h-20 text-right"
                     />
                   </div>

                   <div className="space-y-2">
                     <label className="text-xs text-subtle uppercase tracking-wider">Tags (comma separated)</label>
                     <input 
                       value={formData.tags.join(', ')}
                       onChange={e => setFormData(prev => ({...prev, tags: e.target.value.split(',').map(t => t.trim())}))}
                       className="w-full bg-paper border border-white/10 rounded p-2 text-ink text-sm focus:border-gold outline-none"
                       placeholder="React, Tailwind, API"
                     />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-subtle uppercase tracking-wider">Demo Link</label>
                        <input 
                          value={formData.links.demo}
                          onChange={e => setFormData(prev => ({...prev, links: {...prev.links, demo: e.target.value}}))}
                          className="w-full bg-paper border border-white/10 rounded p-2 text-ink text-sm focus:border-gold outline-none"
                          placeholder="https://..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-subtle uppercase tracking-wider">Code Link</label>
                        <input 
                          value={formData.links.code}
                          onChange={e => setFormData(prev => ({...prev, links: {...prev.links, code: e.target.value}}))}
                          className="w-full bg-paper border border-white/10 rounded p-2 text-ink text-sm focus:border-gold outline-none"
                          placeholder="https://..."
                        />
                      </div>
                   </div>

                   <button onClick={handleSave} className="w-full bg-gold text-paper font-bold py-3 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
                     <Save className="w-4 h-4" /> Save Project
                   </button>
                 </div>
               </div>
             )}
          </div>
        </div>
      )}

      {/* --- MAIN DISPLAY --- */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 space-y-4 relative">
           <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold cursor-default">
             Portfolio
           </div>
          <h2 className="text-4xl md:text-6xl font-serif text-ink">{t('projects.title')}</h2>
          <p className="text-subtle max-w-2xl mx-auto font-light">{t('projects.desc')}</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project) => (
            <div key={project.id} className="group flex flex-col h-full relative">
              
              {/* Admin Actions */}
              {isAdmin && (
                <div className="absolute top-2 right-2 z-30 flex gap-2">
                  <button onClick={() => handleEdit(project)} className="p-2 bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(project.id)} className="p-2 bg-red-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform"><Trash2 className="w-4 h-4" /></button>
                </div>
              )}

              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface mb-6 rounded-lg border border-white/5 shadow-lg group-hover:shadow-[0_0_30px_rgba(56,189,248,0.1)] transition-all duration-500">
                
                {/* Luxury Header/Overlay requested by user */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-paper/80 via-paper/20 to-transparent z-10 pointer-events-none"></div>
                
                {/* Existing Hover Effect */}
                <div className="absolute inset-0 bg-paper/20 group-hover:bg-transparent transition-colors z-10"></div>
                
                <img 
                  src={project.imageUrl || "https://via.placeholder.com/800x600/0f172a/38bdf8?text=Project+Image"} 
                  alt={project.content?.[language]?.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* Overlay Links */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-black/40 backdrop-blur-[2px]">
                  <a href={project.links?.demo} className="p-3 bg-paper rounded-full hover:bg-gold hover:text-white text-ink transition-colors" title="Live Demo">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a href={project.links?.code} className="p-3 bg-paper rounded-full hover:bg-gold hover:text-white text-ink transition-colors" title="View Code">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-3 flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-serif text-ink group-hover:text-gold transition-colors">
                    {project.content?.[language]?.title || "Untitled Project"}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-subtle group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                
                <p className="text-sm text-subtle leading-relaxed line-clamp-3 font-light flex-1">
                  {project.content?.[language]?.description || "No description provided."}
                </p>
                
                <div className="flex flex-wrap gap-x-3 gap-y-2 pt-4 mt-auto">
                  {project.tags?.map((tag: string, i: number) => (
                    <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-subtle/60 border border-white/5 px-2 py-1 rounded hover:border-gold/30 hover:text-gold/80 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {projects.length === 0 && (
           <div className="text-center py-12 border border-dashed border-white/10 rounded-lg">
             <p className="text-subtle">No projects visible.</p>
             {isAdmin && <button onClick={() => setShowForm(true)} className="text-gold hover:underline mt-2">Add your first project</button>}
           </div>
        )}

        <div className="mt-24 text-center">
             <a href="#" className="inline-block border-b border-white/20 pb-1 text-ink hover:text-gold hover:border-gold transition-colors text-sm font-medium tracking-widest uppercase">
               View All Archives
             </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;