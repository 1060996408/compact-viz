'use strict';

function readStdin(timeoutMs = 2000) {
  return new Promise((resolve) => {
    if (process.stdin.isTTY) {
      resolve('');
      return;
    }

    let data = '';
    const timer = setTimeout(() => {
      cleanup();
      resolve(data);
    }, timeoutMs);

    function onChunk(chunk) { data += chunk; }
    function onEnd() { cleanup(); resolve(data); }
    function cleanup() {
      clearTimeout(timer);
      process.stdin.removeListener('data', onChunk);
      process.stdin.removeListener('end', onEnd);
    }

    process.stdin.setEncoding('utf8');
    process.stdin.on('data', onChunk);
    process.stdin.on('end', onEnd);
  });
}

function extractPercent(input) {
  if (!input || typeof input !== 'string') return NaN;
  const match = input.match(/(\d+(?:\.\d+)?)\s*%/);
  if (match) return parseFloat(match[1]);
  const num = input.match(/\d+(?:\.\d+)?/);
  if (num) return parseFloat(num[0]);
  return NaN;
}

module.exports = { readStdin, extractPercent };
