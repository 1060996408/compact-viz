'use strict';

const { green, dim } = require('../colors');
const { DEFAULT_WIDTH, GRID_ROWS, GRID_COLS_MULT } = require('../constants');

const SHADES = ['█', '▓', '▒', '░'];

function render(percent, opts = {}) {
  const width = opts.width || DEFAULT_WIDTH;
  const cols = width * GRID_COLS_MULT;
  const rows = opts.rows || GRID_ROWS;
  const p = Math.max(0, Math.min(100, Math.round(percent)));

  // Total cells and how many filled
  const totalCells = cols * rows;
  const filledCells = Math.round(p / 100 * totalCells);

  // Build diagonal index for each cell (fill from top-right to bottom-left)
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const diag = c - r + rows; // higher = more top-right
      cells.push({ r, c, diag });
    }
  }
  cells.sort((a, b) => b.diag - a.diag || a.c - b.c);

  // Build grid
  const grid = Array.from({ length: rows }, () => Array(cols).fill(null));

  for (let i = 0; i < cells.length; i++) {
    const { r, c } = cells[i];
    if (i < filledCells) {
      // Brightness based on position in fill order
      const brightness = 1 - (i / totalCells) * 0.6;
      const shadeIdx = Math.min(SHADES.length - 1, Math.floor((1 - brightness) * SHADES.length));
      grid[r][c] = { filled: true, shade: shadeIdx };
    } else {
      grid[r][c] = { filled: false };
    }
  }

  // Render to strings
  const lines = [];
  for (let r = 0; r < rows; r++) {
    let line = '';
    for (let c = 0; c < cols; c++) {
      const cell = grid[r][c];
      if (cell.filled) {
        line += green(SHADES[cell.shade]);
      } else {
        line += dim('░');
      }
    }
    lines.push(line);
  }

  // Add percentage line
  const pct = `${' '.repeat(Math.max(0, Math.floor(cols / 2) - 3))}${green(`${p}%`)}`;
  lines.push(pct);

  return lines.join('\n');
}

render.lines = GRID_ROWS + 1;

module.exports = render;
