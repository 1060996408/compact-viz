'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const bar = require('../src/renderers/bar');
const unicode = require('../src/renderers/unicode');
const grid = require('../src/renderers/grid');
const wave = require('../src/renderers/wave');

describe('bar renderer', () => {
  it('renders 0%', () => {
    const out = bar(0);
    assert.ok(out.includes('0%'));
    assert.ok(out.length > 10);
  });

  it('renders 50%', () => {
    const out = bar(50);
    assert.ok(out.includes('50%'));
  });

  it('renders 100%', () => {
    const out = bar(100);
    assert.ok(out.includes('100%'));
  });

  it('respects width option', () => {
    const out = bar(50, { width: 20 });
    assert.ok(out.includes('50%'));
  });

  it('has lines property', () => {
    assert.equal(bar.lines, 1);
  });

  it('clamps values', () => {
    assert.ok(bar(-10).includes('0%'));
    assert.ok(bar(200).includes('100%'));
  });
});

describe('unicode renderer', () => {
  it('renders 0%', () => {
    const out = unicode(0);
    assert.ok(out.includes('0%'));
    assert.ok(out.includes('▱'));
  });

  it('renders 50%', () => {
    const out = unicode(50);
    assert.ok(out.includes('50%'));
    assert.ok(out.includes('▰'));
    assert.ok(out.includes('▱'));
  });

  it('renders 100%', () => {
    const out = unicode(100);
    assert.ok(out.includes('100%'));
    assert.ok(out.includes('▰'));
  });

  it('has lines property', () => {
    assert.equal(unicode.lines, 1);
  });
});

describe('grid renderer', () => {
  it('renders multi-line output', () => {
    const out = grid(50);
    const lines = out.split('\n');
    assert.ok(lines.length > 1, 'should have multiple lines');
    assert.ok(out.includes('50%'));
  });

  it('renders 0%', () => {
    const out = grid(0);
    assert.ok(out.includes('0%'));
  });

  it('renders 100%', () => {
    const out = grid(100);
    assert.ok(out.includes('100%'));
  });

  it('has correct lines property', () => {
    assert.equal(grid.lines, 6); // 5 rows + 1 pct line
  });
});

describe('wave renderer', () => {
  it('renders multi-line output', () => {
    const out = wave(50);
    const lines = out.split('\n');
    assert.ok(lines.length > 1, 'should have multiple lines');
    assert.ok(out.includes('50%'));
  });

  it('renders 0%', () => {
    const out = wave(0);
    assert.ok(out.includes('0%'));
  });

  it('renders 100%', () => {
    const out = wave(100);
    assert.ok(out.includes('100%'));
  });

  it('has correct lines property', () => {
    assert.equal(wave.lines, 7); // 6 rows + 1 pct line
  });
});
