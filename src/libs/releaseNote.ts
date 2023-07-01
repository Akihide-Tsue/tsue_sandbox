import { Client } from '@notionhq/client';
import { markdownToBlocks } from '@tryfabric/martian';

async function main() {
  const TOKEN = process.env.NEXT_PUBLIC_NOTION_TOKEN;
  const DATABASE_ID = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;
  const RELEASE_NOTE = process.env.RELEASE_NOTE || '{"body": "中身"}';

  try {
    const notion = new Client({ auth: TOKEN });
    const release_status = JSON.parse(RELEASE_NOTE);
    const date = new Date();
    date.setTime(date.getTime() + 1000 * 60 * 60 * 9); // JSTに変換

    console.log('TOKEN', TOKEN);
    console.log('DATABASE_ID', DATABASE_ID);
    console.log('RELEASE_NOTE', RELEASE_NOTE);

    const params = {
      parent: {
        database_id: DATABASE_ID,
      },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: 'PRのタイトルをいれたい',
              },
            },
          ],
        },
        Date: {
          date: {
            start: date,
            time_zone: 'Asia/Tokyo',
          },
        },
        'Pull requests': {
          url: 'PRのURLをいれたい',
        },
      },
      children: markdownToBlocks(release_status.body),
    };

    console.log('params', params);
    // @ts-ignore
    await notion.pages.create(params);
  } catch (e) {
    console.error('error内容', e);
  }
}

main();
