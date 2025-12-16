import { useState, useRef, useEffect } from 'react';

export const useBootSequence = () => {
  const [bootState, setBootState] = useState<'off' | 'booting' | 'on'>('off');
  const [progress, setProgress] = useState(0);
  
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const startBoot = () => {
    if (bootState === 'booting') return;
    
    setBootState('booting');
    setProgress(0);
    startTimeRef.current = Date.now();
    
    const duration = 8000; 
    
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);

      if (elapsed < duration) {
        timerRef.current = requestAnimationFrame(animate);
      } else {
        setBootState('on');
      }
    };
    
    timerRef.current = requestAnimationFrame(animate);
  };

  const resetBoot = () => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    setBootState('off');
    setProgress(0);
  };
  
  useEffect(() => {
    return () => {
        if (timerRef.current) cancelAnimationFrame(timerRef.current);
    }
  }, []);

  return {
    bootState,
    progress,
    startBoot,
    resetBoot
  };
};