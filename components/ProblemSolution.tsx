import React from 'react';
import { AlertTriangle, Check, Laptop, HardDrive, RefreshCw } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const ProblemSolution: React.FC = () => {
  return (
    <section id="solution" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Выход из тупика устаревшего парка</h2>
            <p className="text-slate-400 max-w-2xl mx-auto backdrop-blur-sm bg-white/5 p-2 rounded-lg inline-block border border-white/5">
              12 миллионов компьютеров в России старше 5 лет. Они не тянут современные тяжелые ОС и требуют замены. У нас есть другое решение.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
            {/* Old Way */}
            <div className="bg-[#111827]/60 backdrop-blur-md rounded-2xl p-8 border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all duration-300">
              <div className="absolute top-0 right-0 bg-red-900/40 px-4 py-1 rounded-bl-xl text-xs font-bold text-red-300 uppercase border-b border-l border-red-500/20">
                Старый путь
              </div>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 shadow-[inset_0_0_20px_rgba(239,68,68,0.2)] border border-red-500/20">
                  <AlertTriangle className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-6 text-white">Закупка нового железа</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-slate-400">
                  <div className="mt-1 min-w-[20px] text-red-500"><Check className="w-5 h-5 rotate-45" /></div>
                  <span>Высокие CAPEX затраты на новые ПК</span>
                </li>
                <li className="flex items-start gap-3 text-slate-400">
                  <div className="mt-1 min-w-[20px] text-red-500"><Check className="w-5 h-5 rotate-45" /></div>
                  <span>Покупка дорогих лицензий ОС</span>
                </li>
                <li className="flex items-start gap-3 text-slate-400">
                  <div className="mt-1 min-w-[20px] text-red-500"><Check className="w-5 h-5 rotate-45" /></div>
                  <span>Сложная миграция и простой сотрудников</span>
                </li>
              </ul>
            </div>

            {/* New Way */}
            <div className="bg-kvadra-cyan/5 backdrop-blur-md rounded-2xl p-8 border border-kvadra-cyan/30 relative overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.05)]">
              <div className="absolute top-0 right-0 bg-kvadra-cyan px-4 py-1 rounded-bl-xl text-xs font-bold text-black uppercase shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                Решение Cloud OS
              </div>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-kvadra-cyan/10 rounded-full flex items-center justify-center text-kvadra-cyan shadow-[inset_0_0_20px_rgba(34,211,238,0.2)] border border-kvadra-cyan/20">
                  <RefreshCw className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-6 text-white">Обновление только софта</h3>
              
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-start gap-4 hover:bg-white/10 transition-colors group">
                  <div className="bg-white/10 p-2 rounded-lg text-slate-300 group-hover:text-kvadra-cyan transition-colors">
                     <HardDrive className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Вторая жизнь старых ПК</h4>
                    <p className="text-sm text-slate-400">Установите бесплатную легкую ОС на существующее оборудование.</p>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-start gap-4 hover:bg-white/10 transition-colors group">
                  <div className="bg-white/10 p-2 rounded-lg text-slate-300 group-hover:text-kvadra-cyan transition-colors">
                     <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Новые легкие ноутбуки</h4>
                    <p className="text-sm text-slate-400">Закупка бюджетных устройств, оптимизированных под Cloud OS.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};