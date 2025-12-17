import React from 'react';
import { ShieldCheck, Server, Lock, ArrowRight, FileCheck, Cloud, Laptop, Network } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Security: React.FC = () => {
  return (
    <section id="security" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-3 py-1 bg-kvadra-indigo/10 text-kvadra-indigo rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-kvadra-indigo/20 backdrop-blur-sm">
              Для IT-директоров
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Security by Design</h2>
            <p className="text-slate-400 text-lg backdrop-blur-sm bg-white/5 p-2 rounded-lg inline-block border border-white/5">
              Централизованная архитектура упрощает защиту контура. Данные не хранятся на устройствах, что исключает утечки при потере ноутбука.
            </p>
          </div>

          {/* Architecture Diagram */}
          <div className="relative max-w-6xl mx-auto mb-20">
             {/* Background glow for diagram */}
             <div className="absolute inset-0 bg-kvadra-indigo/5 blur-3xl rounded-3xl pointer-events-none"></div>

             {/* Main Diagram Container */}
             <div className="bg-[#111827]/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative z-10">
                
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative">
                    
                    {/* Left Side: Client Devices */}
                    <div className="flex flex-col gap-6 w-full lg:w-1/4">
                        {/* Old PCs */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all flex flex-col items-center text-center group shadow-lg">
                             <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-slate-700 transition-colors border border-white/5">
                                <Network className="w-6 h-6 text-slate-300" />
                             </div>
                             <h4 className="font-bold text-white mb-1">Старые ПК</h4>
                        </div>

                        {/* New Laptops */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all flex flex-col items-center text-center group shadow-lg">
                             <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-slate-700 transition-colors border border-white/5">
                                <Laptop className="w-6 h-6 text-slate-300" />
                             </div>
                             <h4 className="font-bold text-white mb-1">Новые Лэптопы</h4>
                             <p className="text-xs text-slate-400 uppercase tracking-wide">Тонкий клиент</p>
                        </div>
                    </div>

                    {/* Middle: Connection Line */}
                    <div className="flex-1 flex flex-col items-center justify-center relative min-h-[60px] lg:min-h-auto w-full self-stretch">
                         {/* Horizontal Line for Desktop */}
                         <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-slate-700"></div>
                         {/* Vertical Line for Mobile */}
                         <div className="lg:hidden w-px h-full min-h-[60px] bg-slate-700 absolute top-0 bottom-0 left-1/2 -translate-x-1/2"></div>

                         {/* Label */}
                         <div className="relative z-10 px-4 py-1.5 bg-[#0b0f19] border border-slate-700 rounded text-xs font-mono text-slate-400 uppercase tracking-wide shadow-xl">
                            TLS / SSL Encrypted
                         </div>
                    </div>

                    {/* Right Side: Secure Cloud Core */}
                    <div className="w-full lg:w-1/3 relative pt-6 lg:pt-0">
                        {/* Badge */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:-translate-y-1/2 z-20">
                            <div className="bg-[#0ea5e9] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(14,165,233,0.5)] whitespace-nowrap">
                                Защищенный контур
                            </div>
                        </div>

                        <div className="bg-white/[0.02] backdrop-blur-md rounded-3xl p-8 border border-white/10 relative overflow-hidden flex flex-col items-center text-center h-full shadow-2xl group hover:border-[#0ea5e9]/30 transition-colors">
                             
                             <div className="mb-6 relative mt-4">
                                <div className="absolute inset-0 bg-[#0ea5e9]/20 blur-2xl rounded-full"></div>
                                <Cloud className="w-20 h-20 text-[#0ea5e9] relative z-10 drop-shadow-[0_0_10px_rgba(14,165,233,0.3)]" />
                             </div>

                             <h3 className="text-xl font-bold text-white mb-2">Облачное Ядро</h3>
                             <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                                Централизованное хранение, аутентификация, профили
                             </p>

                             {/* Sub features */}
                             <div className="grid grid-cols-2 gap-4 w-full">
                                <div className="bg-[#0ea5e9]/5 rounded-xl p-3 text-center border border-[#0ea5e9]/20">
                                    <span className="text-xs font-bold text-[#38bdf8] block">App<br/>Streaming</span>
                                </div>
                                <div className="bg-[#0ea5e9]/5 rounded-xl p-3 text-center border border-[#0ea5e9]/20">
                                    <span className="text-xs font-bold text-[#38bdf8] block flex items-center justify-center h-full">Storage</span>
                                </div>
                             </div>
                        </div>
                    </div>

                </div>
             </div>
          </div>

          {/* Integration Benefits */}
          <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm shadow-sm group">
                <h5 className="font-bold text-white mb-2 flex items-center gap-2">
                  <div className="p-1.5 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                     <ShieldCheck className="w-4 h-4 text-green-400" />
                  </div>
                  Обмен данными
                </h5>
                <p className="text-sm text-slate-400">
                  Устранение сложностей обмена данными между ведомствами. Единое пространство.
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm shadow-sm group">
                <h5 className="font-bold text-white mb-2 flex items-center gap-2">
                  <div className="p-1.5 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <FileCheck className="w-4 h-4 text-blue-400" />
                  </div>
                  ФСТЭК
                </h5>
                <p className="text-sm text-slate-400">
                  Обеспечение защиты информации в полном соответствии с актуальными требованиями.
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm shadow-sm group">
                <h5 className="font-bold text-white mb-2 flex items-center gap-2">
                   <div className="p-1.5 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                      <Server className="w-4 h-4 text-purple-400" />
                   </div>
                  Интеграция
                </h5>
                <p className="text-sm text-slate-400">
                  Легко встраивается в Active Directory / LDAP. Не требует перестройки сети.
                </p>
              </div>
          </div>
          
          <div className="text-center mt-16">
             <a 
               href="/architecture-schema.jpg" 
               download="Architecture_Security_Fabric.jpg"
               className="text-kvadra-purple hover:text-purple-300 border-b border-kvadra-purple/30 hover:border-kvadra-purple transition-colors pb-1 inline-flex items-center gap-2 font-medium cursor-pointer"
             >
               Скачать архитектурную схему для ИБ-отдела <ArrowRight className="w-4 h-4" />
             </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};