import { useState } from 'react';

import Link from 'next/link';

// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';

import { format } from 'date-fns';

import styles from '@components/article_link/ArticleLink.module.scss';
import { ZennPostItem } from '@components/features/zennRss/types';
import { getMemberById } from '@components/zenn_posts/helper';

// dayjs.extend(relativeTime);

const ZennPost: React.FC<{ item: ZennPostItem }> = (props) => {
  const { authorId, title, isoDate, link, dateMilliSeconds } = props.item;
  const member = getMemberById(authorId);
  if (!member) return null;

  const { hostname, origin } = new URL(link);

  return (
    <article className="post-link">
      {/* <Link href={getMemberPath(member.id)} passHref>
        <a className="post-link__author">
          <img src={member.avatarSrc} className="post-link__author-img" width={35} height={35} alt={member.name} />
          <div className="post-link__author-name">
            <div className="post-link__author-name">{member.name}</div>
            <time dateTime={isoDate} className="post-link__date">
              {dayjs(isoDate).fromNow()}
            </time>
          </div>
        </a>
      </Link> */}

      {/* <a className={styles.lists}>
        <div className={styles.text_wrapper}>
          <h2 className={styles.lists_title}>{post.frontMatter.title}</h2>
          <div className={styles.lists_flex}>
            <span className={styles.lists_date}>{post.frontMatter.date}</span>
            <span className={styles.tags_wrapper}>{tags}</span>
          </div>
        </div>
      </a> */}

      <Link href={link} passHref>
        <a target="_blank" className={styles.lists}>
          <h2 className={styles.lists_title}> {title}</h2>
          <div className={styles.lists_flex}>
            <span className={styles.lists_date}>{isoDate && format(new Date(isoDate), 'yyyy/MM/dd')}</span>
          </div>
        </a>
      </Link>

      {/* <a href={link} className="post-link__main-link">
        {member.name}
        <h2 className="post-link__title">{title}</h2>
        {hostname && (
          <div className="post-link__site">
            <img src={getFaviconSrcFromOrigin(origin)} width={14} height={14} className="post-link__site-favicon" alt={hostname} />
            {hostname}
          </div>
        )}
      </a> */}
      {dateMilliSeconds && dateMilliSeconds > Date.now() - 86400000 * 3 && <div className="post-link__new-label">NEW</div>}
    </article>
  );
};

export const ZennPostList: React.FC<{ items: ZennPostItem[] }> = (props) => {
  const [displayItemsCount, setDisplayItemsCount] = useState<number>(32);
  const totalItemsCount = props.items?.length || 0;
  const canLoadMore = totalItemsCount - displayItemsCount > 0;

  if (!totalItemsCount) {
    return <div className="post-list-empty">No posts yet</div>;
  }

  return (
    <>
      <div className="post-list">
        {props.items.slice(0, displayItemsCount).map((item, i) => (
          <ZennPost key={`post-item-${i}`} item={item} />
        ))}
      </div>
      {canLoadMore && (
        <div className="post-list-load">
          <button onClick={() => setDisplayItemsCount(displayItemsCount + 32)} className="post-list-load__button">
            LOAD MORE
          </button>
        </div>
      )}
    </>
  );
};
