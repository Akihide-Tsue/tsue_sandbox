import { Client } from '@notionhq/client';
import { markdownToBlocks } from '@tryfabric/martian';

async function main() {
  const TOKEN = process.env.NEXT_PUBLIC_NOTION_TOKEN;
  const DATABASE_ID = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;
  const RELEASE_NOTE = process.env.NEXT_PUBLIC_RELEASE_NOTE || '{"body": "中身"}';
  const PR_NUMBER = process.env.NEXT_PUBLIC_PR_NUMBER;
  const ASSIGNEE = process.env.NEXT_PUBLIC_ASSIGNEE;
  console.log('process.env.NEXT_PUBLIC_REPOSITORY_NAME', process.env.NEXT_PUBLIC_REPOSITORY_NAME);

  try {
    const notion = new Client({ auth: TOKEN });
    const release_status = JSON.parse(RELEASE_NOTE);
    const date = new Date();
    date.setTime(date.getTime() + 1000 * 60 * 60 * 9); // JSTに変換

    console.log('tag_name', release_status.tag_name);
    console.log('release_status====', release_status);

    const params = {
      parent: {
        database_id: DATABASE_ID,
      },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: release_status.name,
              },
            },
          ],
        },
        'Release date': {
          date: {
            start: date,
            time_zone: 'Asia/Tokyo',
          },
        },
        Assignee: {
          rich_text: [
            {
              text: {
                content: ASSIGNEE,
              },
            },
          ],
        },
        URL: {
          url: `https://github.com/Akihide-Tsue/tsue_sandbox/pull/${PR_NUMBER}`,
        },
      },
      children: markdownToBlocks(release_status.body),
    };

    // @ts-ignore
    await notion.pages.create(params);
  } catch (e) {
    console.error('error内容', e);
  }
}

main();
