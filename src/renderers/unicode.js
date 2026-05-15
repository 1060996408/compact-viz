'use strict';

const { cyan, dim, bold } = require('../colors');
const { DEFAULT_WIDTH } = require('../constants');

const FILLED = '▰';
const EMPTY  = '▱';

function render(percent, opts = {}) {
  const width = opts.width || DEFAULT_WIDTH;
  const p = Math.max(0, Math.min(100, Math.round(percent)));
  const filled = Math.round(p / 100 * width);
  const empty = width - filled;

  const bar = cyan(FILLED.repeat(filled)) + dim(EMPTY.repeat(empty));
  const pct = bold(cyan(`${p}%`));

  return `${bar} ${pct}`;
}

render.lines = 1;

module.exports = render;
