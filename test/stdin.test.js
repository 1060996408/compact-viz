'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { extractPercent } = require('../src/stdin');

describe('extractPercent', () => {
  it('extracts plain number', () => {
    assert.equal(extractPercent('55'), 55);
  });

  it('extracts number with percent sign', () => {
    assert.equal(extractPercent('55%'), 55);
  });

  it('extracts from sentence', () => {
    assert.equal(extractPercent('compressing: 55%'), 55);
  });

  it('extracts decimal', () => {
    assert.equal(extractPercent('33.5%'), 33.5);
  });

  it('returns NaN for empty', () => {
    assert.ok(isNaN(extractPercent('')));
  });

  it('returns NaN for no number', () => {
    assert.ok(isNaN(extractPercent('hello')));
  });

  it('returns NaN for null', () => {
    assert.ok(isNaN(extractPercent(null)));
  });

  it('returns NaN for undefined', () => {
    assert.ok(isNaN(extractPercent(undefined)));
  });
});
