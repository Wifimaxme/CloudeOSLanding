import React from 'react';
import { ShieldCheck, Server, Globe, Lock, ArrowRight, FileCheck } from 'lucide-react';
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
          <div className="relative max-w-5xl mx-auto bg-[#111827]/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
             {/* Background glow for diagram */}
             <div className="absolute inset-0 bg-kvadra-indigo/5 blur-3xl rounded-3xl pointer-events-none"></div>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              
              {/* Client */}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/10 shadow-lg backdrop-blur-sm group hover:border-kvadra-purple/50 transition-colors">
                  <Globe className="w-10 h-10 text-kvadra-purple" />
                </div>
                <h4 className="font-bold text-lg mb-2 text-white">Тонкий Клиент</h4>
                <p className="text-sm text-slate-400">Только интерфейс. Никаких данных на диске. Read-only система.</p>
              </div>

              {/* Connection */}
              <div className="hidden md:flex items-center justify-center">
                 <div className="h-1 w-full bg-gradient-to-r from-slate-700 via-kvadra-indigo to-slate-700 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0b0f19] p-2 rounded-full border border-kvadra-indigo shadow-[0_0_10px_rgba(129,140,248,0.5)]">
                      <Lock className="w-4 h-4 text-kvadra-indigo" />
                    </div>
                 </div>
              </div>

              {/* Cloud/Server */}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/10 shadow-lg backdrop-blur-sm group hover:border-kvadra-indigo/50 transition-colors">
                  <Server className="w-10 h-10 text-kvadra-indigo" />
                </div>
                <h4 className="font-bold text-lg mb-2 text-white">Защищенный Контур</h4>
                <p className="text-sm text-slate-400">Централизованное хранение, бэкапы, политики безопасности.</p>
              </div>
            </div>

            {/* Integration Benefits */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
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
          </div>
          
          <div className="text-center mt-12">
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