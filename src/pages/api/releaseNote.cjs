import { Client } from '@notionhq/client';
import { markdownToBlocks } from '@tryfabric/martian';

const MemberList = {
  'Akihide-Tsue': '津江',
  octcat: '適宜追加する',
};

async function main() {
  const RELEASE_NOTE = process.env.RELEASE_NOTE || '{"body": "中身"}';
  const ASSIGNEE = process.env.ASSIGNEE;
  const PREFIX_LABEL = process.env.PREFIX_LABEL;
  const emoji = () => {
    switch (PREFIX_LABEL) {
      case 'enhancement':
        return '🚀';
      case 'bug':
        return '💊';
      default:
        return '🔧';
    }
  };

  try {
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    const release_status = JSON.parse(RELEASE_NOTE);
    const date = new Date();
    date.setTime(date.getTime() + 1000 * 60 * 60 * 9); // JSTに変換

    const params = {
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      icon: {
        type: 'emoji',
        emoji: emoji(),
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
                content: MemberList[ASSIGNEE] || ASSIGNEE,
              },
            },
          ],
        },
        // Product: {
        //   rich_text: [
        //     {
        //       text: {
        //         content: process.env.REPOSITORY_NAME,
        //       },
        //     },
        //   ],
        // },
        URL: {
          url: `https://github.com/Akihide-Tsue/tsue_sandbox/pull/${process.env.PR_NUMBER}`,
        },
      },
      children: markdownToBlocks(release_status.body),
    };

    // @ts-ignore
    await notion.pages.create(params);
  } catch (e) {
    console.error('error:', e);
  }
}

main();
