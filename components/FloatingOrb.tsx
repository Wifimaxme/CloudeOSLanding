import React, { useEffect, useRef } from 'react';

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

// Utils
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 255, b: 255 };
};

const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

// Distance from point P to segment AB
const distToSegmentSquared = (p: {x:number, y:number, z:number}, a: {x:number, y:number, z:number}, b: {x:number, y:number, z:number}) => {
    const l2 = (b.x - a.x)**2 + (b.y - a.y)**2 + (b.z - a.z)**2;
    if (l2 === 0) return (p.x - a.x)**2 + (p.y - a.y)**2 + (p.z - a.z)**2;
    let t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y) + (p.z - a.z) * (b.z - a.z)) / l2;
    t = Math.max(0, Math.min(1, t));
    return (p.x - (a.x + t * (b.x - a.x)))**2 + 
           (p.y - (a.y + t * (b.y - a.y)))**2 + 
           (p.z - (a.z + t * (b.z - a.z)))**2;
};

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

  // UPDATED KVADRA COLORS
  const COLORS = {
    hero: '#22d3ee', // Cyan
    solution: '#22d3ee', // Cyan
    tco: '#2dd4bf', // Teal
    ux: '#eab308', // Yellow (kept for contrast)
    security: '#818cf8', // Indigo
    strategy: '#f97316', // Orange
    contact: '#ffffff' // White
  };

  // Pre-calculate Voxel Grids
  useEffect(() => {
    const step = 0.08;
    
    // --- RUBLE GENERATION ---
    if (rubleGridRef.current.length === 0) {
        const voxels: {x:number, y:number, z:number}[] = [];
        const depth = 0.20; 

        // 1. Stem (Vertical bar)
        for (let x = -0.15; x <= 0.15; x += step) {
            for (let y = -0.8; y <= 0.8; y += step) {
                for (let z = -depth/2; z <= depth/2; z += step) voxels.push({ x, y, z });
            }
        }

        // 2. Bowl (Curved 'P' part)
        const cx = 0.15, cy = -0.45, rOuter = 0.35, rInner = 0.15;
        for (let x = cx; x <= cx + rOuter; x += step) {
             for (let y = cy - rOuter; y <= cy + rOuter; y += step) {
                 for (let z = -depth/2; z <= depth/2; z += step) {
                     const distSq = (x - cx)**2 + (y - cy)**2;
                     if (distSq >= rInner*rInner && distSq <= rOuter*rOuter && x >= cx - step/2) {
                         voxels.push({ x, y, z });
                     }
                 }
             }
        }

        // 3. Strike (Horizontal bar)
        for (let x = -0.35; x <= 0.35; x += step) {
            for (let y = 0.1; y <= 0.3; y += step) {
                for (let z = -depth/2; z <= depth/2; z += step) voxels.push({ x, y, z });
            }
        }

        rubleGridRef.current = voxels;
    }

    // --- LIGHTNING GENERATION ---
    if (lightningGridRef.current.length === 0) {
        const voxels: {x:number, y:number, z:number}[] = [];
        const thickness = 0.15;
        const lightningStep = 0.1;
        
        const segments = [
          [{x: 0.3, y: -0.9, z: 0}, {x: -0.2, y: 0.0, z: 0}],
          [{x: -0.2, y: 0.0, z: 0}, {x: 0.3, y: -0.1, z: 0}],
          [{x: 0.3, y: -0.1, z: 0}, {x: -0.3, y: 0.9, z: 0}]
        ];

        for (let x = -0.5; x <= 0.5; x += lightningStep) {
            for (let y = -1.0; y <= 1.0; y += lightningStep) {
                for (let z = -0.3; z <= 0.3; z += lightningStep) {
                    const p = {x, y, z};
                    for (const [start, end] of segments) {
                        if (distToSegmentSquared(p, start, end) < thickness * thickness) {
                            voxels.push({x, y, z});
                            break;
                        }
                    }
                }
            }
        }
        lightningGridRef.current = voxels;
    }

    // --- REFRESH/UPDATE ICON GENERATION ---
    if (refreshGridRef.current.length === 0) {
        const voxels: {x:number, y:number, z:number}[] = [];
        const radius = 0.6;
        const tubeThickness = 0.15;
        const voxelStep = 0.08;

        // Scan box
        for (let x = -0.8; x <= 0.8; x += voxelStep) {
            for (let y = -0.8; y <= 0.8; y += voxelStep) {
                for (let z = -0.15; z <= 0.15; z += voxelStep) {
                    const r = Math.sqrt(x*x + y*y);
                    // Check if inside the ring thickness
                    if (Math.abs(r - radius) <= tubeThickness) {
                        let angle = Math.atan2(y, x); // -PI to PI
                        if (angle < 0) angle += Math.PI * 2;
                        const deg = angle * 180 / Math.PI;

                        const isGap1 = (deg > 30 && deg < 70);
                        const isGap2 = (deg > 210 && deg < 250);
                        
                        if (!isGap1 && !isGap2) {
                            voxels.push({x, y, z});
                        }
                    }
                }
            }
        }

        const addArrowHead = (angleDeg: number) => {
            const rad = angleDeg * Math.PI / 180;
            const cx = Math.cos(rad) * radius;
            const cy = Math.sin(rad) * radius;
            
            for (let x = -0.25; x <= 0.25; x+=voxelStep) {
                for (let y = -0.25; y <= 0.25; y+=voxelStep) {
                     for (let z = -0.15; z <= 0.15; z+=voxelStep) {
                         if (x*x + y*y + z*z < 0.05) {
                             voxels.push({x: cx+x, y: cy+y, z: z});
                         }
                     }
                }
            }
        };
        
        addArrowHead(30);
        addArrowHead(210);

        refreshGridRef.current = voxels;
    }

  }, []);

  // --- Shape Generators ---
  const getSphereTarget = (i: number, total: number, radius: number) => {
    const phi = Math.acos(1 - 2 * (i + 0.5) / total);
    const theta = Math.PI * (1 + 5 ** 0.5) * i;
    return {
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi)
    };
  };

  const getCubeTarget = (i: number, total: number, size: number) => {
    const face = i % 6;
    const pointsPerFace = Math.floor(total / 6);
    const indexInFace = Math.floor(i / 6);
    const grid = Math.ceil(Math.sqrt(pointsPerFace));
    const u = (indexInFace % grid) / grid - 0.5;
    const v = Math.floor(indexInFace / grid) / grid - 0.5;
    const s = size * 2;
    let x = 0, y = 0, z = 0;
    switch(face) {
      case 0: x = size; y = u * s; z = v * s; break;
      case 1: x = -size; y = u * s; z = v * s; break;
      case 2: y = size; x = u * s; z = v * s; break;
      case 3: y = -size; x = u * s; z = v * s; break;
      case 4: z = size; x = u * s; y = v * s; break;
      case 5: z = -size; x = u * s; y = v * s; break;
    }
    return { x, y, z };
  };

  const getRubleTarget = (i: number, total: number, size: number) => {
    const voxels = rubleGridRef.current;
    if (voxels.length === 0) return { x: 0, y: 0, z: 0 };
    const v = voxels[i % voxels.length];
    return { x: v.x * size, y: v.y * size, z: v.z * size };
  };

  const getLightningTarget = (i: number, total: number, size: number) => {
    const voxels = lightningGridRef.current;
    if (voxels.length === 0) return { x: 0, y: 0, z: 0 };
    const v = voxels[i % voxels.length];
    return { x: v.x * size, y: v.y * size, z: v.z * size };
  };

  const getRefreshTarget = (i: number, total: number, size: number) => {
    const voxels = refreshGridRef.current;
    if (voxels.length === 0) return { x: 0, y: 0, z: 0 };
    const v = voxels[i % voxels.length];
    return { x: v.x * size, y: v.y * size, z: v.z * size };
  };

  const getShieldTarget = (i: number, total: number, size: number) => {
    const row = Math.floor(Math.sqrt(total));
    const u = (i % row) / row; 
    const v = Math.floor(i / row) / row;
    const xRaw = (u - 0.5) * 2;
    const yRaw = (v - 0.5) * 2;
    const y = yRaw * size * 1.2;
    const widthAtY = Math.cos(yRaw * 1.2) * size;
    const x = xRaw * widthAtY;
    const z = Math.cos(xRaw * Math.PI / 2) * size * 0.3;
    return { x, y, z };
  };

  const getGalaxyTarget = (i: number, total: number, size: number) => {
    const ringCount = Math.floor(total * 0.7);
    if (i < ringCount) {
      const angle = (i / ringCount) * Math.PI * 2 + (i * 0.1);
      const r = size * 1.5 + (Math.random() * 20);
      return { x: r * Math.cos(angle), y: (Math.random() - 0.5) * 10, z: r * Math.sin(angle) };
    } else {
      const idx = i - ringCount;
      const count = total - ringCount;
      return getSphereTarget(idx, count, size * 0.5);
    }
  };

  const getPlaneTarget = (i: number, total: number, size: number) => {
      const progress = i / total;
      const width = progress * size; 
      const side = i % 2 === 0 ? 1 : -1;
      const x = (0.5 - progress) * size * 2;
      const z = width * side;
      const y = Math.abs(z) * 0.3;
      return { x, y, z };
  };

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
          targetColorHex = COLORS.solution; shapeType = 'refresh'; // Changed to 'refresh'
          shapeSize = 160; 
          rotSpeed = { x: 0, y: 0, z: -0.02 }; // Rotate around Z axis (which is facing viewer in default orientation? No, Z is depth.)
          // We want it to spin like a wheel. In this 3D space, assuming default camera looking down Z?
          // Let's test rotation below.
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
      
      // Enforce Upright Orientation for specific shapes
      if (activeSectionRef.current === 'tco' || activeSectionRef.current === 'ux' || activeSectionRef.current === 'security' || activeSectionRef.current === 'solution') {
         // Default upright orientation
         let targetX = Math.round(currentRotationRef.current.x / (Math.PI * 2)) * (Math.PI * 2);
         let targetY = Math.round(currentRotationRef.current.y / (Math.PI * 2)) * (Math.PI * 2);
         let targetZ = Math.round(currentRotationRef.current.z / (Math.PI * 2)) * (Math.PI * 2);
         
         if (activeSectionRef.current === 'solution') {
             // For refresh icon, we want it facing the user (X=0, Y=0) and spinning around Z?
             // Or spinning around Y?
             // A flat icon facing screen is on XY plane. Z is depth.
             // Spinning it like a wheel means rotating around Z.
             // But 'rotSpeed' is added to currentRotation.
             currentRotationRef.current.z += rotSpeed.z;
             
             // Stabilize X and Y to face user
             currentRotationRef.current.x = lerp(currentRotationRef.current.x, targetX, 0.05);
             currentRotationRef.current.y = lerp(currentRotationRef.current.y, targetY, 0.05);
         } else {
             // TCO (Ruble) and UX (Lightning) spin around Y
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

      ctx.globalCompositeOperation = 'screen'; 

      particlesRef.current.forEach((p, i) => {
        let t = { x: 0, y: 0, z: 0 };
        
        if (shapeType === 'sphere') t = getSphereTarget(i, PARTICLE_COUNT, shapeSize);
        else if (shapeType === 'cube') t = getCubeTarget(i, PARTICLE_COUNT, shapeSize);
        else if (shapeType === 'ruble') t = getRubleTarget(i, PARTICLE_COUNT, shapeSize);
        else if (shapeType === 'lightning') t = getLightningTarget(i, PARTICLE_COUNT, shapeSize);
        else if (shapeType === 'shield') t = getShieldTarget(i, PARTICLE_COUNT, shapeSize);
        else if (shapeType === 'galaxy') t = getGalaxyTarget(i, PARTICLE_COUNT, shapeSize);
        else if (shapeType === 'plane') t = getPlaneTarget(i, PARTICLE_COUNT, shapeSize);
        else if (shapeType === 'refresh') t = getRefreshTarget(i, PARTICLE_COUNT, shapeSize);

        // Rotation
        const x1 = t.x * cosY - t.z * sinY;
        const z1 = t.x * sinY + t.z * cosY;
        const y2 = t.y * cosX - z1 * sinX;
        const z2 = t.y * sinX + z1 * cosX;
        const x3 = x1 * cosZ - y2 * sinZ;
        const y3 = x1 * sinZ + y2 * cosZ;

        // Projection
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
        
        // Render
        ctx.fillStyle = `rgba(${Math.round(p.r)}, ${Math.round(p.g)}, ${Math.round(p.b)}, ${alpha})`;
        
        if (shapeType === 'ruble' || shapeType === 'lightning' || shapeType === 'refresh') {
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
      className="fixed inset-0 pointer-events-none z-[-1] blur-[0px]"
    />
  );
};