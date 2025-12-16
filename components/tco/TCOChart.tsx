import React, { useRef, useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Info } from 'lucide-react';
import { CustomTooltip } from './CustomTooltip';

interface TCOChartProps {
  data: any[];
  workplaceCount: number;
}

export const TCOChart: React.FC<TCOChartProps> = ({ data, workplaceCount }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartVisible, setChartVisible] = useState(false);

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
    <div ref={chartRef} className="h-[600px] w-full flex flex-col">
      <div className="flex items-center justify-between mb-6 px-2">
         <h3 className="text-lg font-bold text-white">Структура затрат (3 года)</h3>
         <div className="flex gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-600"></span>
              <span className="text-slate-400">Классика</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-kvadra-purple"></span>
              <span className="text-white">kvadra Cloud OS</span>
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
                  <stop offset="0%" stopColor="#c084fc" stopOpacity={1}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={1}/>
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
                tick={{fill: '#cbd5e1', fontSize: 11, fontWeight: 500}} 
                interval={0}
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
                barSize={16}
                animationDuration={1500}
                animationEasing="ease-out"
                isAnimationActive={true}
              />
              
              <Bar 
                dataKey="cloud" 
                name="kvadra Cloud OS" 
                fill="url(#colorCloud)" 
                radius={[0, 6, 6, 0]} 
                barSize={16}
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
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-kvadra-purple" />
        <p>
          Расчет для <strong>{workplaceCount} рабочих мест</strong> за 3 года. Включает амортизацию, лицензии, администрирование и поддержку.
        </p>
      </div>
    </div>
  );
};