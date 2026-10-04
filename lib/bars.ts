/* Geometry for the hero bar field, rebuilt from reckoner.com's `.home_bg` SVG (measured 4 Oct 2026):
   - viewBox 0 0 1440 810, 103 columns, one <path> per <g>
   - columns 23.45 units apart, running from x ≈ -600 to 1800, so the field overflows both edges
   - every column is a stepped spindle on a 67-unit row grid: thin "wick" rows at the ends, wider "body" rows
     between (half-widths about 0.2 to 5.5 units), 2 to 6 rows tall
   - neighbouring columns come in pairs that share a top row, and the pairs climb a diagonal from bottom left to top
     right (about -0.55 units of y per unit of x), give or take a row
   Reckoner ships the paths as static markup; here they are generated from a fixed seed so the result is identical
   on every load and on the server. */

export const BAR_VIEWBOX = { w: 1440, h: 810 };
const PITCH = 23.45;
const ROW = 66.97;
const COLUMNS = 103;
const X0 = -596;

// mulberry32: a small deterministic PRNG.
function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r2 = (n: number) => Math.round(n * 100) / 100;

export function barPaths(seed = 1984): string[] {
  const rand = rng(seed);
  const paths: string[] = [];
  let pairTop = 0;
  for (let i = 0; i < COLUMNS; i++) {
    const cx = X0 + i * PITCH;
    // A new pair every two columns: snap the diagonal to the row grid, then nudge by up to one row.
    if (i % 2 === 0) {
      const trend = 960 - 0.55 * (cx + 600);
      pairTop = Math.round(trend / ROW) * ROW + (rand() < 0.3 ? (rand() < 0.5 ? -ROW : ROW) : 0);
    }
    const rows = 2 + Math.floor(rand() * 5); // 2 to 6 rows
    const widths: number[] = [];
    for (let k = 0; k < rows; k++) {
      const end = k === 0 || k === rows - 1;
      widths.push(end ? 0.15 + rand() * 0.5 : 1.2 + rand() * 4.3);
    }
    // Right edge down, then the left edge back up (mirrored), stepping out and in at each row boundary.
    let d = `M${r2(cx + widths[0])} ${r2(pairTop)}`;
    for (let k = 0; k < rows; k++) {
      if (k > 0) d += `H${r2(cx + widths[k])}`;
      d += `V${r2(pairTop + ROW * (k + 1))}`;
    }
    for (let k = rows - 1; k >= 0; k--) {
      d += `H${r2(cx - widths[k])}`;
      d += `V${r2(pairTop + ROW * k)}`;
    }
    paths.push(d + "Z");
  }
  return paths;
}
