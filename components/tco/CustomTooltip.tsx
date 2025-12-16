import React from 'react';

export const CustomTooltip = ({ active, payload, label }: any) => {
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