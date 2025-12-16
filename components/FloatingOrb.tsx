import React, { useEffect, useRef } from 'react';
import { 
  hexToRgb, 
  lerp, 
  generateRubleGrid, 
  generateLightningGrid, 
  generateRefreshGrid,
  getSphereTarget,
  getCubeTarget,
  getGridTarget,
  getShieldTarget,
  getGalaxyTarget,
  getPlaneTarget
} from '../utils/orbUtils';

// Types
interface Point {
  x: number;
  y: number;
  z: number;
  r: number;
  g: number;
  b: number;
}

type SectionState = 'hero' | 'solution' | 'tco' | 'ux' | 'security' | 'strategy' | 'contact';

export const FloatingOrb: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const activeSectionRef = useRef<SectionState>('hero');
  const particlesRef = useRef<Point[]>([]);
  
  // Storage for pre-calculated voxel shapes
  const rubleGridRef = useRef<{x:number, y:number, z:number}[]>([]);
  const lightningGridRef = useRef<{x:number, y:number, z:number}[]>([]);
  const refreshGridRef = useRef<{x:number, y:number, z:number}[]>([]);

  // Animation State Refs for smooth transitions
  const currentCenterRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0, z: 0 });

  // Config
  const PARTICLE_COUNT = 800; 
  const LERP_FACTOR = 0.05; 
  const CENTER_LERP_FACTOR = 0.02;

  // REFINED COLORS
  const COLORS = {
    hero: '#c084fc',     // Kvadra Purple
    solution: '#818cf8', // Indigo
    tco: '#2dd4bf',      // Teal
    ux: '#fbbf24',       // Amber
    security: '#60a5fa', // Blue
    strategy: '#f472b6', // Pink
    contact: '#e2e8f0'   // Slate 200
  };

  // Pre-calculate Voxel Grids
  useEffect(() => {
    if (rubleGridRef.current.length === 0) rubleGridRef.current = generateRubleGrid();
    if (lightningGridRef.current.length === 0) lightningGridRef.current = generateLightningGrid();
    if (refreshGridRef.current.length === 0) refreshGridRef.current = generateRefreshGrid();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (particlesRef.current.length === 0) {
      const rgb = hexToRgb(COLORS.hero);
      currentCenterRef.current = { x: window.innerWidth * 0.75, y: window.innerHeight * 0.35 };
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push({ x: 0, y: 0, z: 0, r: rgb.r, g: rgb.g, b: rgb.b });
      }
    }

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const animate = () => {
      if (!canvas || !ctx) return;
      
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      // Destination params
      let destCx = width * 0.85;
      let destCy = height * 0.25;
      let targetColorHex = COLORS.hero;
      let shapeType = 'sphere';
      let shapeSize = 120;
      let rotSpeed = { x: 0, y: 0, z: 0 };

      switch (activeSectionRef.current) {
        case 'hero':
          destCx = width * 0.75; destCy = height * 0.35;
          targetColorHex = COLORS.hero; shapeType = 'sphere';
          rotSpeed = { x: 0.0005, y: 0.002, z: 0 };
          break;
        case 'solution':
          destCx = width * 0.15; destCy = height * 0.5;
          targetColorHex = COLORS.solution; shapeType = 'refresh';
          shapeSize = 160; 
          rotSpeed = { x: 0, y: 0, z: -0.02 }; 
          break;
        case 'tco':
          destCx = width * 0.90; destCy = height * 0.4;
          targetColorHex = COLORS.tco; shapeType = 'ruble';
          shapeSize = 180; 
          rotSpeed = { x: 0, y: 0.005, z: 0 }; 
          break;
        case 'ux':
          destCx = width * 0.5; destCy = height * 0.5;
          targetColorHex = COLORS.ux; shapeType = 'lightning'; 
          shapeSize = 180; 
          rotSpeed = { x: 0, y: 0.005, z: 0 };
          break;
        case 'security':
          destCx = width * 0.5; destCy = height * 0.5;
          targetColorHex = COLORS.security; shapeType = 'shield'; shapeSize = 160;
          rotSpeed = { x: 0, y: 0, z: 0 };
          break;
        case 'strategy':
          destCx = width * 0.5; destCy = height * 0.5;
          targetColorHex = COLORS.strategy; shapeType = 'galaxy'; shapeSize = 200;
          rotSpeed = { x: 0.001, y: 0.001, z: 0 };
          break;
        case 'contact':
          destCx = width * 0.85; destCy = height * 0.85;
          targetColorHex = COLORS.contact; shapeType = 'plane'; shapeSize = 80;
          rotSpeed = { x: 0, y: 0.01, z: 0 };
          break;
      }

      // Physics
      currentCenterRef.current.x = lerp(currentCenterRef.current.x, destCx, CENTER_LERP_FACTOR);
      currentCenterRef.current.y = lerp(currentCenterRef.current.y, destCy, CENTER_LERP_FACTOR);
      
      // Enforce Upright Orientation
      if (['tco', 'ux', 'security', 'solution'].includes(activeSectionRef.current)) {
         let targetX = Math.round(currentRotationRef.current.x / (Math.PI * 2)) * (Math.PI * 2);
         let targetY = Math.round(currentRotationRef.current.y / (Math.PI * 2)) * (Math.PI * 2);
         let targetZ = Math.round(currentRotationRef.current.z / (Math.PI * 2)) * (Math.PI * 2);
         
         if (activeSectionRef.current === 'solution') {
             currentRotationRef.current.z += rotSpeed.z;
             currentRotationRef.current.x = lerp(currentRotationRef.current.x, targetX, 0.05);
             currentRotationRef.current.y = lerp(currentRotationRef.current.y, targetY, 0.05);
         } else {
             currentRotationRef.current.x = lerp(currentRotationRef.current.x, targetX, 0.05);
             currentRotationRef.current.z = lerp(currentRotationRef.current.z, targetZ, 0.05);
             
             if (activeSectionRef.current === 'security') {
                const sway = Math.sin(Date.now() * 0.0015) * 0.15; 
                currentRotationRef.current.y = lerp(currentRotationRef.current.y, targetY + sway, 0.05);
             } else {
                currentRotationRef.current.y += rotSpeed.y;
             }
         }
      } else {
         currentRotationRef.current.x += rotSpeed.x;
         currentRotationRef.current.y += rotSpeed.y;
         currentRotationRef.current.z += rotSpeed.z;
      }

      const targetRgb = hexToRgb(targetColorHex);
      
      const cosY = Math.cos(currentRotationRef.current.y); const sinY = Math.sin(currentRotationRef.current.y);
      const cosX = Math.cos(currentRotationRef.current.x); const sinX = Math.sin(currentRotationRef.current.x);
      const cosZ = Math.cos(currentRotationRef.current.z); const sinZ = Math.sin(currentRotationRef.current.z);

      // Use lighter for a glowing effect on dark background, or source-over for standard visibility
      ctx.globalCompositeOperation = 'lighter'; 

      particlesRef.current.forEach((p, i) => {
        let t = { x: 0, y: 0, z: 0 };
        
        if (shapeType === 'sphere') t = getSphereTarget(i, PARTICLE_COUNT, shapeSize);
        else if (shapeType === 'cube') t = getCubeTarget(i, PARTICLE_COUNT, shapeSize);
        else if (shapeType === 'ruble') t = getGridTarget(i, rubleGridRef.current, shapeSize);
        else if (shapeType === 'lightning') t = getGridTarget(i, lightningGridRef.current, shapeSize);
        else if (shapeType === 'refresh') t = getGridTarget(i, refreshGridRef.current, shapeSize);
        else if (shapeType === 'shield') t = getShieldTarget(i, PARTICLE_COUNT, shapeSize);
        else if (shapeType === 'galaxy') t = getGalaxyTarget(i, PARTICLE_COUNT, shapeSize);
        else if (shapeType === 'plane') t = getPlaneTarget(i, PARTICLE_COUNT, shapeSize);

        // Rotation & Projection
        const x1 = t.x * cosY - t.z * sinY;
        const z1 = t.x * sinY + t.z * cosY;
        const y2 = t.y * cosX - z1 * sinX;
        const z2 = t.y * sinX + z1 * cosX;
        const x3 = x1 * cosZ - y2 * sinZ;
        const y3 = x1 * sinZ + y2 * cosZ;

        const fov = 1000;
        const scale = fov / (fov + z2);
        
        const projX = x3 * scale + currentCenterRef.current.x;
        const projY = y3 * scale + currentCenterRef.current.y;

        p.x = lerp(p.x, projX, LERP_FACTOR);
        p.y = lerp(p.y, projY, LERP_FACTOR);
        p.z = lerp(p.z, z2, LERP_FACTOR);
        p.r = lerp(p.r, targetRgb.r, 0.05);
        p.g = lerp(p.g, targetRgb.g, 0.05);
        p.b = lerp(p.b, targetRgb.b, 0.05);

        const sizeScale = Math.max(0.1, (1000 / (1000 + p.z)));
        const alpha = Math.min(1, sizeScale);
        
        ctx.fillStyle = `rgba(${Math.round(p.r)}, ${Math.round(p.g)}, ${Math.round(p.b)}, ${alpha})`;
        
        if (['ruble', 'lightning', 'refresh'].includes(shapeType)) {
            const s = 5 * sizeScale;
            if (typeof ctx.roundRect === 'function') {
                ctx.beginPath();
                ctx.roundRect(p.x - s/2, p.y - s/2, s, s, s * 0.25);
                ctx.fill();
            } else {
                ctx.fillRect(p.x - s/2, p.y - s/2, s, s);
            }
        } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.5 * sizeScale, 0, Math.PI * 2);
            ctx.fill();
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSectionRef.current = entry.target.id as SectionState;
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ['hero', 'solution', 'tco', 'ux', 'security', 'strategy', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[1] blur-[0px]"
    />
  );
};