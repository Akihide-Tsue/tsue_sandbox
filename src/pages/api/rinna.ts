import type { NextApiRequest, NextApiResponse } from 'next';
export const RINNA_KEY = process.env.RINNA_PRIMARY_KEY || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestBody = {
    rawInput: `B:${req.query.word}A:`,
    outputLength: 25,
  };

  const result = await fetch(`https://api.rinna.co.jp/models/cce`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Ocp-Apim-Subscription-Key': RINNA_KEY,
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error('通信に失敗しました', error);
    });

  res.status(200).json({ result, word: req.query.word });
}
