'use strict';

const { cyan, dim } = require('../colors');
const { DEFAULT_WIDTH, WAVE_ROWS } = require('../constants');

function render(percent, opts = {}) {
  const width = opts.width || DEFAULT_WIDTH;
  const rows = opts.rows || WAVE_ROWS;
  const p = Math.max(0, Math.min(100, Math.round(percent)));
  const phase = opts.phase || 0;
  const barCount = width;

  // Calculate bar heights (0..rows)
  const heights = [];
  for (let i = 0; i < barCount; i++) {
    const wave = Math.sin(phase + i * 0.3) * 0.4 + 0.6; // 0.2..1.0
    const filled = i < Math.round(p / 100 * barCount);
    const h = filled ? Math.max(1, Math.round(wave * rows)) : 0;
    heights.push(h);
  }

  // Render top-down
  const lines = [];
  for (let row = rows; row >= 1; row--) {
    let line = '';
    for (let i = 0; i < barCount; i++) {
      if (heights[i] >= row) {
        line += cyan('█');
      } else {
        line += dim('·');
      }
    }
    lines.push(line);
  }

  // Percentage
  const pct = cyan(`${p}%`);
  lines.push(pct);

  return lines.join('\n');
}

render.lines = WAVE_ROWS + 1;

module.exports = render;
