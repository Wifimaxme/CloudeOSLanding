import React from 'react';
import { Monitor, Wifi } from 'lucide-react';
import { ScreenContent } from './ScreenContent';

export const DeviceComposition: React.FC = () => {
    return (
        <div className="relative w-full max-w-[600px] perspective-[1000px]">
        
        {/* 1. Monoblock (Desktop) - Back Right */}
        <div className="absolute right-4 md:right-0 top-0 w-[280px] md:w-[380px] aspect-[16/10] bg-[#1e293b] rounded-xl border-[6px] border-[#334155] shadow-2xl z-10 transform translate-y-4">
            <div className="w-full h-full bg-black rounded overflow-hidden relative border border-white/10">
                <ScreenContent delay={0} />
            </div>
            {/* Stand */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-24 h-16 bg-gradient-to-b from-[#334155] to-[#1e293b] flex flex-col items-center">
                <div className="w-full h-full bg-[#1e293b]" style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0% 100%)' }}></div>
                <div className="w-32 h-2 bg-[#334155] rounded-full mt-[-2px] shadow-lg"></div>
            </div>
        </div>

        {/* 2. Laptop - Front Left */}
        <div className="absolute left-0 md:-left-8 bottom-12 w-[260px] md:w-[320px] z-20 transform translate-y-8 lg:translate-y-0 group">
            {/* Screen */}
            <div className="relative w-[90%] mx-auto bg-[#0f172a] rounded-t-xl border-[4px] border-[#334155] shadow-xl origin-bottom transition-transform duration-500 ease-out group-hover:rotate-x-0" style={{ transform: 'rotateX(-5deg)' }}>
                <div className="aspect-[16/10] bg-black rounded-t overflow-hidden border border-white/10">
                <ScreenContent delay={0.5} />
                </div>
                {/* Webcam dot */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-600 rounded-full"></div>
            </div>
            {/* Base */}
            <div className="relative w-full h-4 bg-gradient-to-b from-[#334155] to-[#1e293b] rounded-b-xl rounded-t-md shadow-2xl flex justify-center items-start border-t border-white/10 z-30">
                {/* Thumb notch */}
                <div className="w-20 h-1.5 bg-black/30 rounded-b-md"></div>
            </div>
            {/* Base shadow reflection */}
            <div className="absolute -bottom-4 left-4 right-4 h-6 bg-kvadra-purple/20 blur-xl rounded-full"></div>
        </div>

        {/* 3. Tablet - Front Right */}
        <div className="absolute right-8 md:right-12 -bottom-4 w-[100px] md:w-[120px] aspect-[3/4] bg-[#1e293b] rounded-xl border-[4px] border-[#334155] shadow-xl z-30 transform rotate-6 translate-x-4">
            <div className="w-full h-full bg-black rounded-lg overflow-hidden border border-white/10">
                <div className="w-full h-full bg-[#0f172a] relative flex flex-col">
                    <div className="h-6 bg-white/5 flex items-center justify-end px-2 gap-1">
                    <div className="w-3 h-1.5 rounded-sm bg-slate-500"></div>
                    </div>
                    <div className="flex-1 p-2 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-2 w-full">
                        {[1,2,3,4,5,6].map(i => (
                            <div key={i} className="aspect-square bg-white/5 rounded-lg animate-pulse" style={{ animationDelay: `${1 + i * 0.1}s` }}></div>
                        ))}
                    </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-6 -left-4 md:-left-12 bg-[#1e293b]/80 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/10 flex items-center gap-3 animate-bounce z-20" style={{ animationDuration: '4s' }}>
            <div className="bg-kvadra-purple/20 p-2 rounded-full text-kvadra-purple">
            <Monitor className="w-4 h-4" />
            </div>
            <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Любой экран</p>
            <p className="text-xs font-bold text-white">Единый опыт</p>
            </div>
        </div>

        <div className="absolute bottom-20 -right-2 md:-right-8 bg-[#1e293b]/80 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/10 flex items-center gap-3 animate-bounce z-40" style={{ animationDuration: '3s' }}>
            <div className="bg-kvadra-teal/20 p-2 rounded-full text-kvadra-teal">
            <Wifi className="w-4 h-4" />
            </div>
            <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Облако</p>
            <p className="text-xs font-bold text-white">Всегда онлайн</p>
            </div>
        </div>
        </div>
    );
};