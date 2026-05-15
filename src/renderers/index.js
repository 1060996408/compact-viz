'use strict';

const bar     = require('./bar');
const unicode = require('./unicode');
const grid    = require('./grid');
const wave    = require('./wave');

const renderers = { bar, unicode, grid, wave };

function createRenderer(name) {
  const r = renderers[name];
  if (!r) throw new Error(`Unknown theme: ${name}. Available: ${Object.keys(renderers).join(', ')}`);
  return r;
}

module.exports = { renderers, createRenderer };
