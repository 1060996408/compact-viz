'use strict';

const { render, animate, themes } = require('./index');
const { readStdin, extractPercent } = require('./stdin');
const { bold, dim, cyan } = require('./colors');
const { DEFAULT_THEME, DEFAULT_WIDTH, DEFAULT_SPEED } = require('./constants');

const VERSION = require('../package.json').version;

const HELP = `
  ${bold('compact-viz')} ${dim(`v${VERSION}`)}

  ${bold('Usage:')}
    compact-viz [options]

  ${bold('Options:')}
    -p, --percent <n>   Progress percentage (0-100)
    -t, --theme <name>  Theme: ${themes.join(', ')} ${dim(`[default: ${DEFAULT_THEME}]`)}
    -w, --width <n>     Bar width in characters ${dim(`[default: ${DEFAULT_WIDTH}]`)}
    -s, --speed <n>     Animation speed 1-10 ${dim(`[default: ${DEFAULT_SPEED}]`)}
    -a, --animate       Animate from 0 to target
    -h, --help          Show this help
    -v, --version       Show version

  ${bold('Examples:')}
    compact-viz -p 55
    compact-viz -p 80 --animate --theme wave
    echo 55 | compact-viz
    echo "compressing: 55%" | compact-viz --theme grid
`;

function parseArgs(argv) {
  const args = {
    percent: null,
    theme: DEFAULT_THEME,
    width: DEFAULT_WIDTH,
    speed: DEFAULT_SPEED,
    animate: false,
    help: false,
    version: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case '-p': case '--percent':
        args.percent = parseFloat(argv[++i]);
        break;
      case '-t': case '--theme':
        args.theme = argv[++i];
        break;
      case '-w': case '--width':
        args.width = parseInt(argv[++i], 10);
        break;
      case '-s': case '--speed':
        args.speed = parseInt(argv[++i], 10);
        break;
      case '-a': case '--animate':
        args.animate = true;
        break;
      case '-h': case '--help':
        args.help = true;
        break;
      case '-v': case '--version':
        args.version = true;
        break;
      default:
        // Try to parse as a bare number (shorthand for --percent)
        if (/^\d+(\.\d+)?$/.test(a)) {
          args.percent = parseFloat(a);
        }
        break;
    }
  }

  return args;
}

async function main(argv) {
  const args = parseArgs(argv);

  if (args.version) {
    console.log(VERSION);
    return 0;
  }

  if (args.help) {
    console.log(HELP);
    return 0;
  }

  // Try stdin if no percent provided
  if (args.percent === null) {
    const stdinData = await readStdin(1000);
    const extracted = extractPercent(stdinData);
    if (!isNaN(extracted)) {
      args.percent = extracted;
    }
  }

  if (args.percent === null) {
    console.log(HELP);
    return 1;
  }

  const percent = Math.max(0, Math.min(100, args.percent));

  if (!themes.includes(args.theme)) {
    console.error(`Unknown theme: ${args.theme}. Available: ${themes.join(', ')}`);
    return 1;
  }

  if (args.animate) {
    // Animated mode
    return new Promise((resolve) => {
      animate(percent, {
        theme: args.theme,
        width: args.width,
        speed: args.speed,
        onComplete: () => resolve(0),
      });
    });
  } else {
    // Static frame
    const text = render(percent, {
      theme: args.theme,
      width: args.width,
    });
    console.log(text);
    return 0;
  }
}

module.exports = { main, parseArgs };
