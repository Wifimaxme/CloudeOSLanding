import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { TCOCalculator } from './components/TCOCalculator';
import { UXFeatures } from './components/UXFeatures';
import { Security } from './components/Security';
import { Strategy } from './components/Strategy';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingOrb } from './components/FloatingOrb';

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-slate-200 selection:bg-kvadra-purple selection:text-black relative overflow-hidden bg-[#0b0f19]">
      {/* Layer 0: Global Background & Grid */}
      <div className="fixed inset-0 z-0">
         {/* Subtle Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
         {/* Glow spots */}
         <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-kvadra-purple/5 rounded-full blur-[120px] pointer-events-none"></div>
         <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-kvadra-indigo/5 rounded-full blur-[120px] pointer-events-none"></div>
      </div>
      
      {/* Layer 1: Particles Canvas */}
      <FloatingOrb />

      {/* Layer 2: Content */}
      <div className="relative z-10">
        <Header />
        <main className="space-y-0">
          <Hero />
          <ProblemSolution />
          <TCOCalculator />
          <UXFeatures />
          <Security />
          <Strategy />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;