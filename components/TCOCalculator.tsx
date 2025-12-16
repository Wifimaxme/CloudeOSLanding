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
import { TrendingDown, Calculator, Info } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const data = [
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

const totalTrad = data.reduce((acc, curr) => acc + curr.traditional, 0);
const totalCloud = data.reduce((acc, curr) => acc + curr.cloud, 0);
const savingsPercent = Math.round(((totalTrad - totalCloud) / totalTrad) * 100);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 backdrop-blur-md p-4 border border-white/50 rounded-xl shadow-xl outline-none">
        <p className="text-sm font-bold text-slate-800 mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs">
              <span className="flex items-center gap-1.5 font-medium" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                {entry.name}:
              </span>
              <span className="font-bold text-slate-700">
                {entry.value.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          ))}
          <div className="pt-2 mt-2 border-t border-slate-200 flex justify-between gap-4 text-xs font-bold text-green-600">
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

  return (
    <section id="tco" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Экономика: Снижение TCO</h2>
              <p className="text-slate-600 text-lg backdrop-blur-sm bg-white/20 p-2 rounded-lg inline-block">
                Переход от капитальных затрат (CAPEX) к операционным (OPEX). Платите за сервис, а не за обслуживание "железа".
              </p>
            </div>
            <div className="bg-emerald-50/80 backdrop-blur-md text-emerald-700 border border-emerald-100/50 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase opacity-70">Ваша выгода</p>
                <p className="text-2xl font-bold">до {savingsPercent}%</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 bg-white/60 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-xl border border-white/40">
            {/* Chart Side */}
            <div ref={chartRef} className="h-[450px] w-full flex flex-col">
              <div className="flex items-center justify-between mb-6 px-2">
                 <h3 className="text-lg font-bold text-slate-800">Затраты на 1 рабочее место</h3>
                 <div className="flex gap-4 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-slate-400"></span>
                      <span className="text-slate-500">Классика</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-cloud-500"></span>
                      <span className="text-slate-800">Cloud OS</span>
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
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity={1}/>
                          <stop offset="95%" stopColor="#0284c7" stopOpacity={1}/>
                        </linearGradient>
                        <linearGradient id="colorTrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#94a3b8" stopOpacity={1}/>
                          <stop offset="95%" stopColor="#64748b" stopOpacity={1}/>
                        </linearGradient>
                      </defs>
                      
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                      
                      <XAxis 
                        type="number" 
                        hide={false} 
                        axisLine={false} 
                        tickLine={false}
                        tick={{fill: '#94a3b8', fontSize: 11}}
                        tickFormatter={(value) => `${value / 1000}к`}
                      />
                      
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={140} 
                        axisLine={false} 
                        tickLine={false}
                        tick={{fill: '#475569', fontSize: 13, fontWeight: 500}} 
                      />
                      
                      <Tooltip 
                        content={<CustomTooltip />}
                        cursor={{fill: '#f1f5f9', opacity: 0.5}}
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
              <div className="mt-4 flex items-start gap-2 text-xs text-slate-500 bg-white/50 p-3 rounded-lg border border-slate-200/50">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-cloud-500" />
                <p>
                  Расчет включает стоимость владения оборудованием в течение 3 лет, включая амортизацию, лицензии ПО, зарплату администраторов и затраты на инцидентную поддержку.
                </p>
              </div>
            </div>

            {/* Detailed Table Side */}
            <div className="flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-slate-200 lg:pl-10 pt-8 lg:pt-0">
              <h3 className="text-lg font-bold text-slate-800 mb-6 px-2 lg:px-0">Детализация расходов</h3>
              <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white/40 backdrop-blur-sm">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50/80 text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                      <th className="px-4 md:px-6 py-3 font-medium">Статья</th>
                      <th className="px-4 md:px-6 py-3 font-medium text-right">Классика</th>
                      <th className="px-4 md:px-6 py-3 font-medium text-right text-cloud-600 bg-cloud-50/30">Cloud OS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-white/50 transition-colors group">
                      <td className="px-4 md:px-6 py-3 font-medium text-slate-700">ПК / Ноутбук</td>
                      <td className="px-4 md:px-6 py-3 text-slate-500 text-right group-hover:text-slate-800">60 000 ₽</td>
                      <td className="px-4 md:px-6 py-3 text-cloud-600 font-bold text-right bg-cloud-50/10">39 000 ₽</td>
                    </tr>
                    <tr className="hover:bg-white/50 transition-colors group">
                      <td className="px-4 md:px-6 py-3 font-medium text-slate-700">Лицензия ОС</td>
                      <td className="px-4 md:px-6 py-3 text-slate-500 text-right group-hover:text-slate-800">15 000 ₽</td>
                      <td className="px-4 md:px-6 py-3 text-emerald-600 font-bold text-right bg-cloud-50/10">0 ₽</td>
                    </tr>
                    <tr className="hover:bg-white/50 transition-colors group">
                      <td className="px-4 md:px-6 py-3 font-medium text-slate-700">Управление</td>
                      <td className="px-4 md:px-6 py-3 text-slate-500 text-right group-hover:text-slate-800">15 000 ₽</td>
                      <td className="px-4 md:px-6 py-3 text-cloud-600 font-bold text-right bg-cloud-50/10">12 000 ₽</td>
                    </tr>
                    <tr className="hover:bg-white/50 transition-colors group">
                      <td className="px-4 md:px-6 py-3 font-medium text-slate-700">Поддержка</td>
                      <td className="px-4 md:px-6 py-3 text-slate-500 text-right group-hover:text-slate-800">10 000 ₽</td>
                      <td className="px-4 md:px-6 py-3 text-cloud-600 font-bold text-right bg-cloud-50/10">7 000 ₽</td>
                    </tr>
                    <tr className="bg-slate-50/80 font-bold text-base border-t-2 border-slate-200">
                      <td className="px-4 md:px-6 py-4 text-slate-800">ИТОГО</td>
                      <td className="px-4 md:px-6 py-4 text-slate-500 text-right line-through decoration-slate-400/50">{totalTrad.toLocaleString('ru-RU')} ₽</td>
                      <td className="px-4 md:px-6 py-4 text-cloud-600 text-right bg-cloud-100/30">{totalCloud.toLocaleString('ru-RU')} ₽</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 flex justify-center lg:justify-start">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white/80 border border-slate-200 hover:border-cloud-300 text-slate-600 hover:text-cloud-600 font-medium rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 backdrop-blur-sm">
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