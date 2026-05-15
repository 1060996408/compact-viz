'use strict';

const { createRenderer, renderers } = require('./renderers');
const { animate } = require('./animation');
const { THEMES, DEFAULT_THEME, DEFAULT_WIDTH, DEFAULT_SPEED } = require('./constants');

/**
 * Render a single frame of the progress visualization.
 * @param {number} percent - 0..100
 * @param {object} [opts] - { theme, width, speed, phase }
 * @returns {string} The rendered frame (may be multi-line)
 */
function render(percent, opts = {}) {
  const theme = opts.theme || DEFAULT_THEME;
  const fn = createRenderer(theme);
  return fn(percent, opts);
}

/**
 * Animate the progress from 0 to the target percent.
 * @param {number} percent - Target 0..100
 * @param {object} [opts] - { theme, width, speed, onFrame, onComplete }
 * @returns {{ stop: () => void }}
 */
function startAnimate(percent, opts = {}) {
  const theme = opts.theme || DEFAULT_THEME;
  const fn = createRenderer(theme);
  return animate(fn, percent, opts);
}

module.exports = {
  render,
  animate: startAnimate,
  createRenderer,
  themes: THEMES,
  DEFAULT_THEME,
  DEFAULT_WIDTH,
  DEFAULT_SPEED,
};
