/* eslint-disable */
// @ts-nocheck
//ローカル用：http://localhost:3000/api/posts/dinamic-ogp
import { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas, registerFont, loadImage } from 'canvas';

import fs from 'fs';
import matter from 'gray-matter';

const createOgp = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const slug = req.query.slug;
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

  const backgroundImage = await loadImage('public/images/ogp/ogp_background.png');
  context.drawImage(backgroundImage, DX, DY, WIDTH, HEIGHT);

  registerFont('src/assets/fonts/NotoSansJP-Regular.otf.ttf', { family: 'NotoSans' });
  context.font = 'bold 68px NotoSans';
  context.fillStyle = '#fff';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(data.title, 600, 300);

  context.fillStyle = '#aaa';
  context.font = '40px NotoSans';
  context.fillText(data.date.replace(/-/g, '/'), 1040, 580);

  context.font = '32px NotoSans';
  context.fillText("- Tsue's sandbox -", 600, 220);

  const buffer = canvas.toBuffer();

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
  });
  res.end(buffer, 'binary');
};

export default createOgp;
