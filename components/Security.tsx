import React from 'react';
import { ShieldCheck, Server, Globe, Lock, ArrowRight, FileCheck } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Security: React.FC = () => {
  return (
    <section id="security" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-3 py-1 bg-cloud-100 text-cloud-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-cloud-200 backdrop-blur-sm">
              Для IT-директоров
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Безопасность по замыслу (Security by Design)</h2>
            <p className="text-slate-600 text-lg backdrop-blur-sm bg-white/30 p-2 rounded-lg inline-block">
              Централизованная архитектура упрощает защиту контура. Данные не хранятся на устройствах, что исключает утечки при потере ноутбука.
            </p>
          </div>

          {/* Architecture Diagram */}
          <div className="relative max-w-5xl mx-auto bg-white/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/50 shadow-2xl">
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              
              {/* Client */}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-slate-50/80 rounded-2xl flex items-center justify-center mb-4 border border-slate-200 shadow-sm backdrop-blur-sm">
                  <Globe className="w-10 h-10 text-cloud-500" />
                </div>
                <h4 className="font-bold text-lg mb-2 text-slate-900">Тонкий Клиент</h4>
                <p className="text-sm text-slate-600">Только интерфейс. Никаких данных на диске. Read-only система.</p>
              </div>

              {/* Connection */}
              <div className="hidden md:flex items-center justify-center">
                 <div className="h-1 w-full bg-gradient-to-r from-slate-200 via-cloud-400 to-slate-200 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full border border-cloud-200 shadow-sm">
                      <Lock className="w-4 h-4 text-emerald-500" />
                    </div>
                 </div>
              </div>

              {/* Cloud/Server */}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-slate-50/80 rounded-2xl flex items-center justify-center mb-4 border border-slate-200 shadow-sm backdrop-blur-sm">
                  <Server className="w-10 h-10 text-purple-500" />
                </div>
                <h4 className="font-bold text-lg mb-2 text-slate-900">Защищенный Контур</h4>
                <p className="text-sm text-slate-600">Централизованное хранение, бэкапы, политики безопасности.</p>
              </div>
            </div>

            {/* Integration Benefits */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-white/50 p-6 rounded-xl border border-slate-200/60 hover:bg-white/80 transition-colors backdrop-blur-sm shadow-sm group">
                <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <div className="p-1.5 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                     <ShieldCheck className="w-4 h-4 text-green-600" />
                  </div>
                  Обмен данными
                </h5>
                <p className="text-sm text-slate-600">
                  Устранение сложностей обмена данными между ведомствами. Единое пространство.
                </p>
              </div>

              <div className="bg-white/50 p-6 rounded-xl border border-slate-200/60 hover:bg-white/80 transition-colors backdrop-blur-sm shadow-sm group">
                <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <div className="p-1.5 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <FileCheck className="w-4 h-4 text-blue-600" />
                  </div>
                  ФСТЭК
                </h5>
                <p className="text-sm text-slate-600">
                  Обеспечение защиты информации в полном соответствии с актуальными требованиями.
                </p>
              </div>

              <div className="bg-white/50 p-6 rounded-xl border border-slate-200/60 hover:bg-white/80 transition-colors backdrop-blur-sm shadow-sm group">
                <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                   <div className="p-1.5 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <Server className="w-4 h-4 text-purple-600" />
                   </div>
                  Интеграция
                </h5>
                <p className="text-sm text-slate-600">
                  Легко встраивается в Active Directory / LDAP. Не требует перестройки сети.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
             <button className="text-cloud-700 hover:text-cloud-900 border-b border-cloud-300 hover:border-cloud-500 transition-colors pb-1 inline-flex items-center gap-2 font-medium">
               Скачать архитектурную схему для ИБ-отдела <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};