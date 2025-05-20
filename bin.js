#!/usr/bin/env node

import chalk from 'chalk';

// Colors
const fg = chalk.hex('#000000');
const primary = chalk.hex('#0061ab');
const secondary = chalk.green;
const accent = chalk.redBright;
const subtle = chalk.hex('#d3d3d3');
const highlight = fg;
const border = primary;

// Layout
const width = 54;
const topBorder = border('┌' + '─'.repeat(width) + '┐');
const bottomBorder = border('└' + '─'.repeat(width) + '┘');

const DEFAULT_OPTIONS = Object.freeze({
  alignment: 'left',
});

// Function to create a line with perfectly aligned borders
const line = (text, options) => {
  options = { ...DEFAULT_OPTIONS, ...options };
  // Strip ANSI codes for accurate length calculation
  const cleanText = text.replace(/\u001b\[\d+(;\d+)*m/g, '');
  const padding = width - cleanText.length;
  
  let paddedText = '';
  switch (options.alignment) {
    case 'right':
      paddedText = ' '.repeat(padding) + text;
      break;
    case 'center':
      const leftPadding = Math.floor(padding / 2);
      const rightPadding = padding - leftPadding;
      paddedText = ' '.repeat(leftPadding) + text + ' '.repeat(rightPadding);
      break;
    case 'left':
    default:
      paddedText = text + ' '.repeat(padding);
      break;
  }

  return border('│') + paddedText + border('│');
};

// Empty line and divider
const emptyLine = line(' '.repeat(width));
const divider = line(' ' + subtle('━'.repeat(width - 2)) + ' ');

const cLine = (text) => line(text, { alignment: 'center' });
const rLine = (text) => line(text, { alignment: 'right' });

// Build the card with precise spacing
const card = [
  '',
  topBorder,
  emptyLine,
  cLine(`${chalk.bold(primary('[Anthony Utt]'))} ${accent('<anthonyutt.dev>')}`),
  emptyLine,
  divider,
  emptyLine,
  cLine(`   ${secondary('Work')} :: Sr. Software Engineer @ Spaceback`),
  cLine(` ${secondary('GitHub')} :: ${chalk.underline('https://github.com/AnthonyUtt')}    `),
  cLine(`  ${secondary('Email')} :: anthony@anthonyutt.dev           `),
  emptyLine,
  divider,
  emptyLine,
  cLine(`Run \`npx anthonyutt\` to generate this card!`),
  emptyLine,
  bottomBorder,
  ''
].join('\n');

console.log(card);
