'use strict';

const { cursorUp, clearLine, hideCursor, showCursor } = require('./colors');
const { SPEED_INTERVALS } = require('./constants');

function animate(renderFn, percent, opts = {}) {
  const speed = opts.speed || 3;
  const interval = SPEED_INTERVALS[speed] || SPEED_INTERVALS[3];
  const onFrame = opts.onFrame || ((text) => process.stdout.write(text + '\n'));
  const onComplete = opts.onComplete || (() => {});
  const wavePhase = opts.wavePhase !== undefined ? opts.wavePhase : 0;

  let current = 0;
  let prevLines = 0;
  let timer = null;

  // Hide cursor during animation
  if (process.stdout.isTTY) process.stdout.write(hideCursor());

  function cleanup() {
    if (timer) clearInterval(timer);
    timer = null;
    if (process.stdout.isTTY) process.stdout.write(showCursor());
  }

  function tick() {
    // Move cursor up to overwrite previous frame
    if (prevLines > 0 && process.stdout.isTTY) {
      process.stdout.write(cursorUp(prevLines));
      for (let i = 0; i < prevLines; i++) {
        process.stdout.write(clearLine());
        if (i < prevLines - 1) process.stdout.write(cursorUp(1));
      }
      if (prevLines > 1) process.stdout.write(cursorDown(prevLines - 1));
    }

    const frameOpts = { ...opts, phase: wavePhase + current * 0.05 };
    const text = renderFn(current, frameOpts);
    onFrame(text);

    // Count lines in output
    prevLines = text.split('\n').length;

    current += Math.max(1, speed * 0.5);
    if (current >= percent) {
      current = percent;
      // Final frame
      if (prevLines > 0 && process.stdout.isTTY) {
        process.stdout.write(cursorUp(prevLines));
        for (let i = 0; i < prevLines; i++) {
          process.stdout.write(clearLine());
          if (i < prevLines - 1) process.stdout.write(cursorUp(1));
        }
        if (prevLines > 1) process.stdout.write(cursorDown(prevLines - 1));
      }
      const finalText = renderFn(percent, frameOpts);
      onFrame(finalText);
      cleanup();
      onComplete();
    }
  }

  timer = setInterval(tick, interval);

  // Handle Ctrl+C gracefully
  const sigint = () => { cleanup(); process.exit(0); };
  process.on('SIGINT', sigint);

  return {
    stop() {
      cleanup();
      process.removeListener('SIGINT', sigint);
    },
  };
}

module.exports = { animate };
