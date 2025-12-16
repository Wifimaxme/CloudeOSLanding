import React from 'react';
import { Clock, Power, Cloud, Wifi, Battery, Search, Zap, RotateCcw } from 'lucide-react';

interface BootDemoProps {
    bootState: 'off' | 'booting' | 'on';
    progress: number;
    startBoot: () => void;
    resetBoot: () => void;
}

export const BootDemo: React.FC<BootDemoProps> = ({ bootState, progress, startBoot, resetBoot }) => {
    return (
        <div className="bg-[#111827]/80 backdrop-blur-md p-8 rounded-3xl border border-white/10 relative shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-white">
            <Clock className="w-48 h-48" />
            </div>

            <h3 className="text-center font-bold text-white mb-8">Время до начала работы</h3>

            {/* Comparison Bars */}
            <div className="space-y-8 mb-12 relative z-10">
            <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-slate-500">Windows 11 (HDD)</span>
                <span className="text-red-500">~65 сек</span>
                </div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-slate-600 w-full animate-pulse opacity-50"></div>
                </div>
            </div>

            <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-white">kvadra Cloud OS (Любой ПК)</span>
                <span className="text-kvadra-purple font-bold">8 сек</span>
                </div>
                <div className="h-4 bg-kvadra-purple/10 rounded-full overflow-hidden relative">
                    <div 
                    className="h-full bg-kvadra-purple rounded-full transition-all duration-300 ease-out shadow-[0_0_15px_rgba(192,132,252,0.6)]"
                    style={{ width: bootState === 'off' ? '0%' : bootState === 'on' ? '100%' : `${progress}%` }}
                    ></div>
                </div>
            </div>
            </div>

            {/* Simulated Device Screen */}
            <div className="bg-black rounded-xl overflow-hidden shadow-2xl aspect-video relative border-8 border-[#1e293b] ring-1 ring-white/10">
            
            {/* STATE: OFF */}
            {bootState === 'off' && (
                <div className="absolute inset-0 bg-black flex flex-col items-center justify-center">
                <button 
                    onClick={startBoot}
                    className="group relative flex flex-col items-center gap-4 transition-all"
                >
                    <div className="w-16 h-16 rounded-full border-2 border-[#334155] group-hover:border-kvadra-purple group-hover:shadow-[0_0_20px_rgba(192,132,252,0.5)] flex items-center justify-center transition-all duration-300 bg-[#0f172a]">
                    <Power className="w-8 h-8 text-slate-500 group-hover:text-kvadra-purple transition-colors" />
                    </div>
                    <span className="text-slate-500 text-sm font-medium tracking-widest uppercase group-hover:text-kvadra-purple transition-colors">Включить</span>
                </button>
                </div>
            )}

            {/* STATE: BOOTING */}
            {bootState === 'booting' && (
                <div className="absolute inset-0 bg-black flex flex-col items-center justify-center animate-fade-in-up">
                <div className="mb-8 relative">
                    <div className="w-20 h-20 bg-kvadra-purple rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(192,132,252,0.3)] animate-pulse">
                    <Cloud className="w-10 h-10 text-black" />
                    </div>
                </div>
                <h4 className="text-white font-medium text-lg tracking-tight mb-2">kvadra Cloud OS</h4>
                <div className="w-48 h-1 bg-[#1e293b] rounded-full overflow-hidden">
                    <div 
                    className="h-full bg-kvadra-purple shadow-[0_0_10px_rgba(192,132,252,0.8)]"
                    style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="mt-4 text-slate-500 text-xs font-mono">
                    System check... OK<br/>
                    Mounting root fs... OK<br/>
                    Starting user session...
                </p>
                </div>
            )}

            {/* STATE: ON (DESKTOP) */}
            {bootState === 'on' && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex flex-col animate-fade-in-up">
                {/* Status Bar */}
                <div className="h-6 bg-black/40 backdrop-blur-md flex items-center justify-between px-4 text-white/90 text-[10px] font-medium border-b border-white/5">
                    <span>kvadra Cloud OS 2.0</span>
                    <div className="flex items-center gap-3">
                    <Wifi className="w-3 h-3" />
                    <Battery className="w-3 h-3" />
                    <span>12:42</span>
                    </div>
                </div>

                {/* Desktop Area */}
                <div className="flex-1 relative p-8 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                    {/* Window */}
                    <div className="w-full max-w-sm bg-[#1e293b]/90 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden animate-fade-in-up border border-white/10" style={{ animationDuration: '0.4s' }}>
                        <div className="h-8 bg-black/40 border-b border-white/5 flex items-center px-3 gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                            <div className="ml-2 flex-1 bg-white/5 h-5 rounded border border-white/5 flex items-center px-2">
                            <Search className="w-3 h-3 text-slate-500 mr-2" />
                            <span className="text-[10px] text-slate-500">Поиск в интернете...</span>
                            </div>
                        </div>
                        <div className="p-6 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-kvadra-purple/10 rounded-full flex items-center justify-center mb-3">
                            <Zap className="w-6 h-6 text-kvadra-purple" />
                            </div>
                            <h3 className="text-white font-bold mb-1">Готов к работе</h3>
                            <p className="text-slate-400 text-xs mb-4">Система загружена за 8.00 сек</p>
                            <button className="px-4 py-2 bg-kvadra-purple text-black text-xs font-bold rounded hover:bg-purple-400 transition-colors shadow-lg shadow-purple-500/20">
                            Запустить Браузер
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dock */}
                <div className="h-12 bg-white/5 backdrop-blur-md border-t border-white/5 flex items-center justify-center gap-4 px-4">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-lg bg-white/10 shadow-lg hover:-translate-y-1 transition-transform cursor-pointer hover:bg-white/20"></div>
                    ))}
                </div>
                
                {/* Restart Button Overlay */}
                <button 
                    onClick={resetBoot}
                    className="absolute top-10 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm transition-all"
                    title="Перезагрузить"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
                </div>
            )}
            </div>
        </div>
    );
};