/* eslint-disable */
import fs from 'fs';
import * as path from 'path';

import { createCanvas, registerFont, loadImage, Canvas } from 'canvas';
import matter from 'gray-matter';

interface SeparatedText {
  line: string;
  remaining: string;
}

const createTextLine = (canvas: Canvas, text: string): SeparatedText => {
  const context = canvas.getContext('2d');
  const MAX_WIDTH = 1000 as const;

  for (let i = 0; i < text.length; i += 1) {
    const line = text.substring(0, i + 1);

    if (context.measureText(line).width > MAX_WIDTH) {
      return {
        line,
        remaining: text.substring(i + 1),
      };
    }
  }

  return {
    line: text,
    remaining: '',
  };
};

const createTextLines = (canvas: Canvas, text: string): string[] => {
  const lines: string[] = [];
  let currentText = text;

  while (currentText !== '') {
    const separatedText = createTextLine(canvas, currentText);
    lines.push(separatedText.line);
    currentText = separatedText.remaining;
  }

  return lines;
};

const createOgp = async (slug: string): Promise<void> => {
  const file = fs.readFileSync(`src/posts/${slug}.md`, 'utf-8');
  const { data } = matter(file);

  const WIDTH = 1200 as const;
  const HEIGHT = 630 as const;
  const DX = 0 as const;
  const DY = 0 as const;
  const canvas = createCanvas(WIDTH, HEIGHT);

  const context = canvas.getContext('2d');

  context.fillStyle = '#fff';
  context.fillRect(DX, DY, WIDTH, HEIGHT);

  const backgroundImage = await loadImage('public/ogp/ogp_background.png');
  context.drawImage(backgroundImage, DX, DY, WIDTH, HEIGHT);

  registerFont('src/assets/fonts/NotoSansJP-Regular.otf', { family: 'NotoSans' });

  context.textAlign = 'center';
  context.textBaseline = 'middle';

  context.font = '40px NotoSans';
  context.fillText(data.date.replace(/-/g, '/'), 1040, 580);

  context.fillStyle = '#bbb';
  context.font = '40px NotoSans';
  context.fillText(data.date.replace(/-/g, '/'), 1040, 580);

  context.font = '36px NotoSans';
  context.fillText("- Tsue's sandbox -", 600, 200);

  context.font = 'bold 68px NotoSans';
  context.fillStyle = '#fff';
  //titleが長い場合に折り返す
  const lines = createTextLines(canvas, data.title);
  lines.forEach((line, index) => {
    const y = 314 + 80 * (index - (lines.length - 1) / 2);
    context.fillText(line, 600, y);
  });

  const buffer = canvas.toBuffer();
  fs.writeFileSync(path.resolve(`./public/ogp/${slug}.png`), buffer);
};

export default createOgp;
