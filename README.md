# compact-viz

Animated compression progress visualizer for the terminal.

Four themes: **Bar**, **Unicode**, **Diagonal Grid**, **Wave**.

```
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱ 55%
```

## Install

```bash
npm install -g compact-viz
```

Or run directly:

```bash
npx compact-viz -p 55
```

## Usage

```bash
# Static frame
compact-viz -p 55

# With theme
compact-viz -p 80 --theme grid

# Animated (0 → target)
compact-viz -p 100 --animate --theme wave

# Pipe mode
echo 55 | compact-viz
echo "compressing: 55%" | compact-viz --theme unicode

# Custom width
compact-viz -p 50 --width 40
```

## Themes

### `unicode` (default)

```
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱ 55%
```

### `bar`

```
████████████████░░░░░░░░░░░░░░ 55%
```

### `grid`

Diagonal fill with shade gradient:

```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                           55%
```

### `wave`

Sine-wave animated vertical bars:

```
·····█···█···█···█···█···█··█···
····█··█··█··█··█··█··█··█··█···
···█··█··█··█··█··█··█··█··█··█·
··█··█··█··█··█··█··█··█··█··█··
·█··█··█··█··█··█··█··█··█··█··█
█··█··█··█··█··█··█··█··█··█··█·
55%
```

## Options

| Flag | Short | Description | Default |
|------|-------|-------------|---------|
| `--percent <n>` | `-p` | Progress 0-100 | — |
| `--theme <name>` | `-t` | `bar`, `unicode`, `grid`, `wave` | `unicode` |
| `--width <n>` | `-w` | Bar width in characters | `30` |
| `--speed <n>` | `-s` | Animation speed 1-10 | `3` |
| `--animate` | `-a` | Animate from 0 to target | off |
| `--help` | `-h` | Show help | — |
| `--version` | `-v` | Show version | — |

## Library API

```js
const { render, animate, themes } = require('compact-viz');

// Render a single frame (returns string)
const frame = render(55, { theme: 'bar', width: 40 });
console.log(frame);

// Animate (returns controller with .stop())
const ctrl = animate(80, {
  theme: 'wave',
  speed: 5,
  onComplete: () => console.log('done'),
});

// Stop early
setTimeout(() => ctrl.stop(), 2000);
```

## Demo

Open `demo/index.html` in a browser for the interactive web version, or:

```bash
npm run demo
# → http://localhost:3000
```

## Requirements

- Node.js >= 16
- Terminal with Unicode support (Windows Terminal, iTerm2, most Linux terminals)

## License

MIT
