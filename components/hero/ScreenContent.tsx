import React from 'react';
import { Cloud } from 'lucide-react';

export const ScreenContent = ({ delay = 0 }: { delay?: number }) => (
  <div className="w-full h-full bg-slate-900 relative overflow-hidden flex flex-col group">
    {/* Wallpaper / Bg */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]"></div>
    
    {/* Enhanced Carbon Texture */}
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay"></div>
    
    {/* Screen Lighting Effects (Gloss & Vignette) */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08)_0%,transparent_60%)]"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
    
    {/* Taskbar */}
    <div className="h-6 bg-black/40 backdrop-blur-md absolute bottom-0 w-full flex items-center justify-center gap-2 z-10 px-2 border-t border-white/5">
       {[1,2,3,4].map(i => (
         <div key={i} className="w-4 h-4 rounded bg-white/10 hover:bg-white/30 transition-colors shadow-sm animate-pulse" style={{ animationDelay: `${delay + i * 0.2}s` }}></div>
       ))}
    </div>

    {/* Window */}
    <div className="flex-1 p-4 flex items-center justify-center relative z-0">
       <div className="w-full max-w-[80%] bg-[#1e293b]/90 backdrop-blur-sm rounded-lg shadow-2xl border border-white/10 overflow-hidden animate-fade-in-up" style={{ animationDelay: `${delay + 0.5}s` }}>
          <div className="h-4 bg-black/20 border-b border-white/5 flex items-center px-2 gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
          </div>
          <div className="p-3 space-y-2">
             <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-kvadra-purple/20 rounded-full flex items-center justify-center text-kvadra-purple">
                   <Cloud className="w-3 h-3" />
                </div>
                <div className="h-2 w-20 bg-white/10 rounded"></div>
             </div>
             <div className="h-16 bg-black/20 rounded border border-white/5"></div>
             <div className="grid grid-cols-2 gap-2">
                <div className="h-8 bg-kvadra-purple/10 rounded"></div>
                <div className="h-8 bg-kvadra-indigo/10 rounded"></div>
             </div>
          </div>
       </div>
    </div>
  </div>
);