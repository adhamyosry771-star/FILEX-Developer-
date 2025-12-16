import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills'; 
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-gold selection:text-white">
      <NavBar />
      <main>
        <Hero />
        <About />
        <Skills />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;