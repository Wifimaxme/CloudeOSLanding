export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 255, b: 255 };
};

export const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

const distToSegmentSquared = (p: {x:number, y:number, z:number}, a: {x:number, y:number, z:number}, b: {x:number, y:number, z:number}) => {
    const l2 = (b.x - a.x)**2 + (b.y - a.y)**2 + (b.z - a.z)**2;
    if (l2 === 0) return (p.x - a.x)**2 + (p.y - a.y)**2 + (p.z - a.z)**2;
    let t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y) + (p.z - a.z) * (b.z - a.z)) / l2;
    t = Math.max(0, Math.min(1, t));
    return (p.x - (a.x + t * (b.x - a.x)))**2 + 
           (p.y - (a.y + t * (b.y - a.y)))**2 + 
           (p.z - (a.z + t * (b.z - a.z)))**2;
};

// Shape Generators
export const generateRubleGrid = () => {
    const voxels: {x:number, y:number, z:number}[] = [];
    const step = 0.08;
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
    return voxels;
};

export const generateLightningGrid = () => {
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
    return voxels;
};

export const generateRefreshGrid = () => {
    const voxels: {x:number, y:number, z:number}[] = [];
    const radius = 0.6;
    const tubeThickness = 0.15;
    const voxelStep = 0.08;

    // Scan box
    for (let x = -0.8; x <= 0.8; x += voxelStep) {
        for (let y = -0.8; y <= 0.8; y += voxelStep) {
            for (let z = -0.15; z <= 0.15; z += voxelStep) {
                const r = Math.sqrt(x*x + y*y);
                if (Math.abs(r - radius) <= tubeThickness) {
                    let angle = Math.atan2(y, x);
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
    return voxels;
};

// Target Generators
export const getSphereTarget = (i: number, total: number, radius: number) => {
  const phi = Math.acos(1 - 2 * (i + 0.5) / total);
  const theta = Math.PI * (1 + 5 ** 0.5) * i;
  return {
    x: radius * Math.cos(theta) * Math.sin(phi),
    y: radius * Math.sin(theta) * Math.sin(phi),
    z: radius * Math.cos(phi)
  };
};

export const getCubeTarget = (i: number, total: number, size: number) => {
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

export const getGridTarget = (i: number, voxels: {x:number, y:number, z:number}[], size: number) => {
    if (voxels.length === 0) return { x: 0, y: 0, z: 0 };
    const v = voxels[i % voxels.length];
    return { x: v.x * size, y: v.y * size, z: v.z * size };
};

export const getShieldTarget = (i: number, total: number, size: number) => {
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

export const getGalaxyTarget = (i: number, total: number, size: number) => {
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

export const getPlaneTarget = (i: number, total: number, size: number) => {
    const progress = i / total;
    const width = progress * size; 
    const side = i % 2 === 0 ? 1 : -1;
    const x = (0.5 - progress) * size * 2;
    const z = width * side;
    const y = Math.abs(z) * 0.3;
    return { x, y, z };
};