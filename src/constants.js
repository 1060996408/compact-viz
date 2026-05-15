'use strict';

const DEFAULT_THEME = 'unicode';
const DEFAULT_WIDTH = 30;
const DEFAULT_SPEED = 3;
const DEFAULT_PERCENT = 0;

const SPEED_INTERVALS = {
  1: 200, 2: 160, 3: 120, 4: 100, 5: 80,
  6: 60, 7: 50, 8: 40, 9: 30, 10: 20,
};

const WAVE_ROWS = 6;
const GRID_ROWS = 5;
const GRID_COLS_MULT = 2; // grid cols = width * this

const THEMES = ['bar', 'unicode', 'grid', 'wave'];

module.exports = {
  DEFAULT_THEME, DEFAULT_WIDTH, DEFAULT_SPEED, DEFAULT_PERCENT,
  SPEED_INTERVALS, WAVE_ROWS, GRID_ROWS, GRID_COLS_MULT, THEMES,
};
