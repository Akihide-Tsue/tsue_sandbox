import { members } from '@components/features/zennRss/constants';
import { ZennPostItem } from '@components/features/zennRss/types';
import posts from '@rss/zenn-posts.json';

export function getMemberByName(name: string) {
  return members.find((member) => member.name === name);
}

export function getMemberById(id: string) {
  return members.find((member) => member.id === id);
}

export function getMemberPostsById(id: string) {
  return (posts as ZennPostItem[]).filter((item) => item.authorId === id);
}

export function getFaviconSrcFromOrigin(hostname: string) {
  return `https://www.google.com/s2/favicons?sz=32&domain_url=${hostname}`;
}
export function getMemberPath(id: string) {
  return `/members/${encodeURIComponent(id)}`;
}
