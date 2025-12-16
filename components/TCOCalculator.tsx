import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';
import { TrendingDown, Calculator, Info, Users } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const UNIT_DATA = [
  {
    name: 'Железо (ПК)',
    traditional: 60000,
    cloud: 39000, 
  },
  {
    name: 'Лицензии ОС',
    traditional: 15000,
    cloud: 0,
  },
  {
    name: 'Управление (3 года)',
    traditional: 15000,
    cloud: 12000,
  },
  {
    name: 'Поддержка',
    traditional: 10000,
    cloud: 7000,
  },
];

const UNIT_TOTAL_TRAD = UNIT_DATA.reduce((acc, curr) => acc + curr.traditional, 0);
const UNIT_TOTAL_CLOUD = UNIT_DATA.reduce((acc, curr) => acc + curr.cloud, 0);
const SAVINGS_PERCENT = Math.round(((UNIT_TOTAL_TRAD - UNIT_TOTAL_CLOUD) / UNIT_TOTAL_TRAD) * 100);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e293b]/90 backdrop-blur-md p-4 border border-white/20 rounded-xl shadow-2xl outline-none z-50">
        <p className="text-sm font-bold text-white mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs">
              <span className="flex items-center gap-1.5 font-medium" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                {entry.name}:
              </span>
              <span className="font-bold text-slate-300">
                {entry.value.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          ))}
          <div className="pt-2 mt-2 border-t border-white/10 flex justify-between gap-4 text-xs font-bold text-kvadra-teal">
             <span>Разница:</span>
             <span>{(payload[0].value - payload[1].value).toLocaleString('ru-RU')} ₽</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const TCOCalculator: React.FC = () => {
  const [chartVisible, setChartVisible] = useState(false);
  const [workplaceCount, setWorkplaceCount] = useState(100);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setChartVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const data = UNIT_DATA.map(item => ({
    name: item.name,
    traditional: item.traditional * workplaceCount,
    cloud: item.cloud * workplaceCount
  }));

  const totalTrad = UNIT_TOTAL_TRAD * workplaceCount;
  const totalCloud = UNIT_TOTAL_CLOUD * workplaceCount;
  const totalSavings = totalTrad - totalCloud;

  return (
    <section id="tco" className="py-20 relative">
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
                <p className="text-2xl font-bold">до {SAVINGS_PERCENT}%</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mb-8 bg-[#1e293b]/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <div className="w-full md:w-1/2">
                <label className="flex items-center gap-2 text-slate-300 font-bold mb-4">
                    <div className="bg-kvadra-cyan/10 p-1.5 rounded-lg text-kvadra-cyan">
                        <Users className="w-5 h-5" />
                    </div>
                    Количество рабочих мест: <span className="text-kvadra-cyan text-xl">{workplaceCount}</span>
                </label>
                <input 
                    type="range" 
                    min="10" 
                    max="500" 
                    step="10" 
                    value={workplaceCount} 
                    onChange={(e) => setWorkplaceCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-kvadra-cyan focus:outline-none focus:ring-2 focus:ring-kvadra-cyan/50"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
                    <span>10 мест</span>
                    <span>250 мест</span>
                    <span>500 мест</span>
                </div>
            </div>
            
            <div className="w-full md:w-1/2 flex items-center justify-around">
                 <div className="text-center">
                    <p className="text-sm text-slate-500 mb-1">Бюджет (Классика)</p>
                    <p className="text-xl md:text-2xl font-bold text-slate-400">{(totalTrad / 1000000).toFixed(1)} млн ₽</p>
                 </div>
                 <div className="h-10 w-px bg-white/10"></div>
                 <div className="text-center">
                    <p className="text-sm text-slate-500 mb-1">Бюджет (Cloud OS)</p>
                    <p className="text-xl md:text-2xl font-bold text-kvadra-cyan">{(totalCloud / 1000000).toFixed(1)} млн ₽</p>
                 </div>
                 <div className="hidden sm:block h-10 w-px bg-white/10"></div>
                 <div className="hidden sm:block text-center">
                    <p className="text-sm text-kvadra-teal font-semibold mb-1">Экономия</p>
                    <p className="text-xl md:text-2xl font-bold text-kvadra-teal">{(totalSavings / 1000000).toFixed(1)} млн</p>
                 </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 bg-[#1e293b]/40 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-xl border border-white/5">
            {/* Chart Side */}
            <div ref={chartRef} className="h-[450px] w-full flex flex-col">
              <div className="flex items-center justify-between mb-6 px-2">
                 <h3 className="text-lg font-bold text-white">Структура затрат (3 года)</h3>
                 <div className="flex gap-4 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-slate-600"></span>
                      <span className="text-slate-400">Классика</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-kvadra-cyan"></span>
                      <span className="text-white">Cloud OS</span>
                    </div>
                 </div>
              </div>
              
              <div className="flex-1 w-full min-h-0">
                {chartVisible && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data}
                      layout="vertical"
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      barGap={4}
                    >
                      <defs>
                        <linearGradient id="colorCloud" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity={1}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={1}/>
                        </linearGradient>
                        <linearGradient id="colorTrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#475569" stopOpacity={1}/>
                          <stop offset="95%" stopColor="#334155" stopOpacity={1}/>
                        </linearGradient>
                      </defs>
                      
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
                      
                      <XAxis 
                        type="number" 
                        hide={false} 
                        axisLine={false} 
                        tickLine={false}
                        tick={{fill: '#94a3b8', fontSize: 11}}
                        tickFormatter={(value) => `${(value / 1000000).toFixed(1)}м`}
                      />
                      
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={140} 
                        axisLine={false} 
                        tickLine={false}
                        tick={{fill: '#cbd5e1', fontSize: 13, fontWeight: 500}} 
                      />
                      
                      <Tooltip 
                        content={<CustomTooltip />}
                        cursor={{fill: '#ffffff', opacity: 0.05}}
                      />
                      
                      <Bar 
                        dataKey="traditional" 
                        name="Классическая ОС" 
                        fill="url(#colorTrad)" 
                        radius={[0, 6, 6, 0]} 
                        barSize={24}
                        animationDuration={1500}
                        animationEasing="ease-out"
                        isAnimationActive={true}
                      />
                      
                      <Bar 
                        dataKey="cloud" 
                        name="Cloud OS" 
                        fill="url(#colorCloud)" 
                        radius={[0, 6, 6, 0]} 
                        barSize={24}
                        animationDuration={1500}
                        animationEasing="ease-out"
                        animationBegin={200}
                        isAnimationActive={true}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="mt-4 flex items-start gap-2 text-xs text-slate-400 bg-white/5 p-3 rounded-lg border border-white/5">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-kvadra-cyan" />
                <p>
                  Расчет для <strong>{workplaceCount} рабочих мест</strong> за 3 года. Включает амортизацию, лицензии, администрирование и поддержку.
                </p>
              </div>
            </div>

            {/* Detailed Table Side */}
            <div className="flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-10 pt-8 lg:pt-0">
              <h3 className="text-lg font-bold text-white mb-6 px-2 lg:px-0">Детализация расходов ({workplaceCount} мест)</h3>
              <div className="overflow-hidden rounded-xl border border-white/10 shadow-sm bg-[#0b0f19]/50 backdrop-blur-sm">
                <table className="w-full text-sm text-left">
                  <thead className="bg-white/5 text-slate-400 font-medium border-b border-white/10">
                    <tr>
                      <th className="px-4 md:px-6 py-3 font-medium">Статья</th>
                      <th className="px-4 md:px-6 py-3 font-medium text-right">Классика</th>
                      <th className="px-4 md:px-6 py-3 font-medium text-right text-kvadra-cyan bg-kvadra-cyan/5">Cloud OS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {data.map((item, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors group">
                            <td className="px-4 md:px-6 py-3 font-medium text-slate-300">{item.name}</td>
                            <td className="px-4 md:px-6 py-3 text-slate-500 text-right group-hover:text-slate-300">{(item.traditional).toLocaleString('ru-RU')} ₽</td>
                            <td className="px-4 md:px-6 py-3 text-kvadra-cyan font-bold text-right bg-kvadra-cyan/5">{(item.cloud).toLocaleString('ru-RU')} ₽</td>
                        </tr>
                    ))}
                    <tr className="bg-white/5 font-bold text-base border-t-2 border-white/10">
                      <td className="px-4 md:px-6 py-4 text-white">ИТОГО</td>
                      <td className="px-4 md:px-6 py-4 text-slate-500 text-right line-through decoration-slate-500/50">{totalTrad.toLocaleString('ru-RU')} ₽</td>
                      <td className="px-4 md:px-6 py-4 text-kvadra-cyan text-right bg-kvadra-cyan/10">{totalCloud.toLocaleString('ru-RU')} ₽</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 flex justify-center lg:justify-start">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-white/20 hover:border-kvadra-cyan text-slate-300 hover:text-kvadra-cyan font-medium rounded-lg transition-all shadow-sm hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] active:scale-95 backdrop-blur-sm">
                  <Calculator className="w-5 h-5" />
                  Скачать детальный расчет (XLSX)
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};