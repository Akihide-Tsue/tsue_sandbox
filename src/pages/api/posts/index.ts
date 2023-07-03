import type { Post } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Post[]>) {
  const posts = await prisma.post.findMany();

  res.status(200).json(posts);
}
