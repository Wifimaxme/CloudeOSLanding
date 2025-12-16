import React from 'react';
import { Calculator } from 'lucide-react';

interface TCOTableProps {
  data: any[];
  totalTrad: number;
  totalCloud: number;
  workplaceCount: number;
}

export const TCOTable: React.FC<TCOTableProps> = ({ 
  data, 
  totalTrad, 
  totalCloud, 
  workplaceCount 
}) => {
  
  const handleDownload = () => {
    // Excel-compatible CSV generation
    // 1. BOM for UTF-8 correct display in Excel
    const BOM = "\uFEFF"; 
    
    // 2. Semicolon separator is preferred for RU locales in Excel, though comma works in many others. 
    // We use semicolon to ensure columns split correctly on Russian systems.
    const headers = ["Статья расхода", "Классика (руб)", "kvadra Cloud OS (руб)"];
    
    const rows = data.map(item => [
      item.name,
      item.traditional,
      item.cloud
    ]);

    // Add Total Row
    rows.push(["ИТОГО", totalTrad, totalCloud]);

    // Combine content
    const csvContent = BOM + [
      headers.join(';'),
      ...rows.map(row => row.join(';'))
    ].join('\n');

    // Create Blob and Trigger Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `raschet_tco_${workplaceCount}_mest.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-10 pt-8 lg:pt-0">
      <h3 className="text-lg font-bold text-white mb-6 px-2 lg:px-0">Детализация расходов ({workplaceCount} мест)</h3>
      <div className="overflow-hidden rounded-xl border border-white/10 shadow-sm bg-[#0b0f19]/50 backdrop-blur-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/5 text-slate-400 font-medium border-b border-white/10">
            <tr>
              <th className="px-4 md:px-6 py-3 font-medium">Статья</th>
              <th className="px-4 md:px-6 py-3 font-medium text-right">Классика</th>
              <th className="px-4 md:px-6 py-3 font-medium text-right text-kvadra-purple bg-kvadra-purple/5">kvadra Cloud OS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                    <td className="px-4 md:px-6 py-3 font-medium text-slate-300">{item.name}</td>
                    <td className="px-4 md:px-6 py-3 text-slate-500 text-right group-hover:text-slate-300">{(item.traditional).toLocaleString('ru-RU')} ₽</td>
                    <td className="px-4 md:px-6 py-3 text-kvadra-purple font-bold text-right bg-kvadra-purple/5">{(item.cloud).toLocaleString('ru-RU')} ₽</td>
                </tr>
            ))}
            <tr className="bg-white/5 font-bold text-base border-t-2 border-white/10">
              <td className="px-4 md:px-6 py-4 text-white">ИТОГО</td>
              <td className="px-4 md:px-6 py-4 text-slate-500 text-right line-through decoration-slate-500/50">{totalTrad.toLocaleString('ru-RU')} ₽</td>
              <td className="px-4 md:px-6 py-4 text-kvadra-purple text-right bg-kvadra-purple/10">{totalCloud.toLocaleString('ru-RU')} ₽</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 flex justify-center lg:justify-start">
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-white/20 hover:border-kvadra-purple text-slate-300 hover:text-kvadra-purple font-medium rounded-lg transition-all shadow-sm hover:shadow-[0_0_15px_rgba(192,132,252,0.2)] active:scale-95 backdrop-blur-sm"
        >
          <Calculator className="w-5 h-5" />
          Скачать детальный расчет (Excel/CSV)
        </button>
      </div>
    </div>
  );
};