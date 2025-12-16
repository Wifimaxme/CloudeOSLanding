import React from 'react';
import { Users } from 'lucide-react';

interface TCOControlsProps {
  workplaceCount: number;
  setWorkplaceCount: (val: number) => void;
  totalTrad: number;
  totalCloud: number;
  totalSavings: number;
}

export const TCOControls: React.FC<TCOControlsProps> = ({
  workplaceCount,
  setWorkplaceCount,
  totalTrad,
  totalCloud,
  totalSavings
}) => {
  return (
    <div className="mb-8 bg-[#1e293b]/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-8 shadow-sm">
      <div className="w-full md:w-1/2">
          <label className="flex items-center gap-2 text-slate-300 font-bold mb-4">
              <div className="bg-kvadra-purple/10 p-1.5 rounded-lg text-kvadra-purple">
                  <Users className="w-5 h-5" />
              </div>
              Количество рабочих мест: <span className="text-kvadra-purple text-xl">{workplaceCount}</span>
          </label>
          <input 
              type="range" 
              min="10" 
              max="500" 
              step="10" 
              value={workplaceCount} 
              onChange={(e) => setWorkplaceCount(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-kvadra-purple focus:outline-none focus:ring-2 focus:ring-kvadra-purple/50"
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
              <p className="text-xl md:text-2xl font-bold text-kvadra-purple">{(totalCloud / 1000000).toFixed(1)} млн ₽</p>
           </div>
           <div className="hidden sm:block h-10 w-px bg-white/10"></div>
           <div className="hidden sm:block text-center">
              <p className="text-sm text-kvadra-teal font-semibold mb-1">Экономия</p>
              <p className="text-xl md:text-2xl font-bold text-kvadra-teal">{(totalSavings / 1000000).toFixed(1)} млн</p>
           </div>
      </div>
    </div>
  );
};