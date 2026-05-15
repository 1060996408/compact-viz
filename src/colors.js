'use strict';

const ESC = '\x1b[';

const wrap = (text, code) => `${ESC}${code}m${text}${ESC}0m`;

module.exports = {
  bold:   (t) => wrap(t, 1),
  dim:    (t) => wrap(t, 2),
  italic: (t) => wrap(t, 3),
  red:    (t) => wrap(t, 31),
  green:  (t) => wrap(t, 32),
  yellow: (t) => wrap(t, 33),
  blue:   (t) => wrap(t, 34),
  magenta:(t) => wrap(t, 35),
  cyan:   (t) => wrap(t, 36),
  white:  (t) => wrap(t, 37),
  gray:   (t) => wrap(t, 90),

  bgRed:    (t) => wrap(t, 41),
  bgGreen:  (t) => wrap(t, 42),
  bgBlue:   (t) => wrap(t, 44),
  bgCyan:   (t) => wrap(t, 46),
  bgGray:   (t) => wrap(t, 100),

  cursorUp:    (n) => `${ESC}${n || 1}A`,
  cursorDown:  (n) => `${ESC}${n || 1}B`,
  clearLine:   ()  => `${ESC}2K`,
  hideCursor:  ()  => `${ESC}?25l`,
  showCursor:  ()  => `${ESC}?25h`,
  reset:       ()  => `${ESC}0m`,
};
