import React from 'react';
import { TrendingDown } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTCO } from '../hooks/useTCO';
import { TCOControls } from './tco/TCOControls';
import { TCOChart } from './tco/TCOChart';
import { TCOTable } from './tco/TCOTable';

export const TCOCalculator: React.FC = () => {
  const { 
    workplaceCount, 
    setWorkplaceCount, 
    data, 
    totalTrad, 
    totalCloud, 
    totalSavings, 
    savingsPercent 
  } = useTCO();

  return (
    <section id="tco" className="py-20 relative scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Экономика: Снижение TCO</h2>
              <p className="text-slate-400 text-lg backdrop-blur-sm bg-white/5 p-2 rounded-lg inline-block border border-white/5">
                Переход от капитальных затрат (CAPEX) к операционным (OPEX). Платите за сервис, а не за обслуживание "железа".
              </p>
            </div>
            <div className="bg-kvadra-teal/10 backdrop-blur-md text-kvadra-teal border border-kvadra-teal/20 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-[0_0_20px_rgba(45,212,191,0.1)]">
              <div className="bg-kvadra-teal/20 p-2 rounded-lg">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase opacity-70">Ваша выгода</p>
                <p className="text-2xl font-bold">до {savingsPercent}%</p>
              </div>
            </div>
          </div>

          <TCOControls 
            workplaceCount={workplaceCount}
            setWorkplaceCount={setWorkplaceCount}
            totalTrad={totalTrad}
            totalCloud={totalCloud}
            totalSavings={totalSavings}
          />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 bg-[#1e293b]/40 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-xl border border-white/5">
            <TCOChart data={data} workplaceCount={workplaceCount} />
            <TCOTable 
              data={data} 
              totalTrad={totalTrad} 
              totalCloud={totalCloud} 
              workplaceCount={workplaceCount} 
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};