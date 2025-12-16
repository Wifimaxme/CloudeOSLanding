import React from 'react';
import { AlertTriangle, Check, Laptop, HardDrive, RefreshCw } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const ProblemSolution: React.FC = () => {
  return (
    <section id="solution" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Выход из тупика устаревшего парка</h2>
            <p className="text-slate-600 max-w-2xl mx-auto backdrop-blur-sm bg-white/30 p-2 rounded-lg inline-block">
              12 миллионов компьютеров в России старше 5 лет. Они не тянут современные тяжелые ОС и требуют замены. У нас есть другое решение.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
            {/* Old Way */}
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-white/50 relative overflow-hidden group shadow-lg">
              <div className="absolute top-0 right-0 bg-slate-200/80 px-4 py-1 rounded-bl-xl text-xs font-bold text-slate-600 uppercase">
                Старый путь
              </div>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 shadow-inner">
                  <AlertTriangle className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-6">Закупка нового железа</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-slate-600">
                  <div className="mt-1 min-w-[20px] text-red-500"><Check className="w-5 h-5 rotate-45" /></div>
                  <span>Высокие CAPEX затраты на новые ПК</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <div className="mt-1 min-w-[20px] text-red-500"><Check className="w-5 h-5 rotate-45" /></div>
                  <span>Покупка дорогих лицензий ОС</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <div className="mt-1 min-w-[20px] text-red-500"><Check className="w-5 h-5 rotate-45" /></div>
                  <span>Сложная миграция и простой сотрудников</span>
                </li>
              </ul>
            </div>

            {/* New Way */}
            <div className="bg-cloud-50/70 backdrop-blur-md rounded-2xl p-8 border-2 border-cloud-200/50 relative overflow-hidden shadow-xl shadow-cloud-500/10">
              <div className="absolute top-0 right-0 bg-cloud-500 px-4 py-1 rounded-bl-xl text-xs font-bold text-white uppercase shadow-md">
                Решение Cloud OS
              </div>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-cloud-100 rounded-full flex items-center justify-center text-cloud-600 shadow-inner">
                  <RefreshCw className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-6">Обновление только софта</h3>
              
              <div className="space-y-4">
                <div className="bg-white/80 p-4 rounded-xl border border-cloud-100 flex items-start gap-4 hover:bg-white transition-colors">
                  <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                     <HardDrive className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Вторая жизнь старых ПК</h4>
                    <p className="text-sm text-slate-500">Установите бесплатную легкую ОС на существующее оборудование.</p>
                  </div>
                </div>

                <div className="bg-white/80 p-4 rounded-xl border border-cloud-100 flex items-start gap-4 hover:bg-white transition-colors">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                     <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Новые легкие ноутбуки</h4>
                    <p className="text-sm text-slate-500">Закупка бюджетных устройств, оптимизированных под Cloud OS.</p>
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