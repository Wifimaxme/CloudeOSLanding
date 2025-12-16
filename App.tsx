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
    <div className="min-h-screen text-slate-800 selection:bg-cloud-200 relative overflow-hidden">
      {/* Layer -1: Global Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-100 z-[-2]" />
      
      {/* Layer 0: Particles Canvas */}
      <FloatingOrb />

      {/* Layer 1: Glass Content */}
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