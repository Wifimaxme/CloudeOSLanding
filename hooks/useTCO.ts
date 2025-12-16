import { useState, useMemo } from 'react';

const UNIT_DATA = [
  {
    name: 'Железо (ПК / Тонкий клиент)',
    traditional: 60000,
    cloud: 28000, 
  },
  {
    name: 'Лицензии ОС',
    traditional: 15000,
    cloud: 0,
  },
  {
    name: 'Прикладное ПО',
    traditional: 20000,
    cloud: 10000,
  },
  {
    name: 'VDI и Инфраструктура',
    traditional: 2000,
    cloud: 12000,
  },
  {
    name: 'Внедрение и Миграция',
    traditional: 5000,
    cloud: 1000,
  },
  {
    name: 'Обучение персонала',
    traditional: 3000,
    cloud: 0,
  },
  {
    name: 'Бэкап и Безопасность',
    traditional: 5000,
    cloud: 1000,
  },
  {
    name: 'Администрирование (3 года)',
    traditional: 20000,
    cloud: 5000,
  },
];

const UNIT_TOTAL_TRAD = UNIT_DATA.reduce((acc, curr) => acc + curr.traditional, 0);
const UNIT_TOTAL_CLOUD = UNIT_DATA.reduce((acc, curr) => acc + curr.cloud, 0);

export const useTCO = (initialCount = 100) => {
  const [workplaceCount, setWorkplaceCount] = useState(initialCount);

  const { data, totalTrad, totalCloud, totalSavings, savingsPercent } = useMemo(() => {
    const computedData = UNIT_DATA.map(item => ({
      name: item.name,
      traditional: item.traditional * workplaceCount,
      cloud: item.cloud * workplaceCount
    }));

    const totalTrad = UNIT_TOTAL_TRAD * workplaceCount;
    const totalCloud = UNIT_TOTAL_CLOUD * workplaceCount;
    const totalSavings = totalTrad - totalCloud;
    const savingsPercent = Math.round(((UNIT_TOTAL_TRAD - UNIT_TOTAL_CLOUD) / UNIT_TOTAL_TRAD) * 100);

    return { 
      data: computedData, 
      totalTrad, 
      totalCloud, 
      totalSavings, 
      savingsPercent 
    };
  }, [workplaceCount]);

  return {
    workplaceCount,
    setWorkplaceCount,
    data,
    totalTrad,
    totalCloud,
    totalSavings,
    savingsPercent
  };
};