'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('path');

const CLI = path.join(__dirname, '..', 'bin', 'compact-viz.js');
const run = (args = []) => execFileSync(process.execPath, [CLI, ...args], {
  encoding: 'utf8',
  timeout: 5000,
}).trim();

describe('CLI', () => {
  it('--version', () => {
    const out = run(['--version']);
    assert.match(out, /^\d+\.\d+\.\d+$/);
  });

  it('--help', () => {
    const out = run(['--help']);
    assert.ok(out.includes('Usage'));
    assert.ok(out.includes('--percent'));
    assert.ok(out.includes('--theme'));
  });

  it('-p 55 (static)', () => {
    const out = run(['-p', '55']);
    assert.ok(out.includes('55%'));
  });

  it('--percent 0', () => {
    const out = run(['--percent', '0']);
    assert.ok(out.includes('0%'));
  });

  it('--percent 100', () => {
    const out = run(['--percent', '100']);
    assert.ok(out.includes('100%'));
  });

  it('-p 55 --theme bar', () => {
    const out = run(['-p', '55', '--theme', 'bar']);
    assert.ok(out.includes('55%'));
    assert.ok(out.includes('█'));
  });

  it('-p 55 --theme unicode', () => {
    const out = run(['-p', '55', '--theme', 'unicode']);
    assert.ok(out.includes('55%'));
    assert.ok(out.includes('▰'));
  });

  it('-p 55 --theme grid', () => {
    const out = run(['-p', '55', '--theme', 'grid']);
    assert.ok(out.includes('55%'));
  });

  it('-p 55 --theme wave', () => {
    const out = run(['-p', '55', '--theme', 'wave']);
    assert.ok(out.includes('55%'));
  });

  it('bare number as percent', () => {
    const out = run(['75']);
    assert.ok(out.includes('75%'));
  });

  it('--width 20', () => {
    const out = run(['-p', '50', '--width', '20']);
    assert.ok(out.includes('50%'));
  });
});
