import { useState } from 'react';

import Link from 'next/link';

import { format } from 'date-fns';

import styles from '@components/article_link/ArticleLink.module.scss';
import { getMemberById } from '@components/features/zennRss/helper';
import { ZennPostItem } from '@components/features/zennRss/types';

const ZennPost: React.FC<{ item: ZennPostItem }> = (props) => {
  const { authorId, title, isoDate, link } = props.item;
  const member = getMemberById(authorId);

  if (!member) return null;

  return (
    <article className="post-link">
      <Link href={link} passHref>
        <a target="_blank" className={styles.lists}>
          <h2 className={styles.lists_title}> {title}</h2>
          <div className={styles.lists_flex}>
            <span className={styles.lists_date}>{isoDate && format(new Date(isoDate), 'yyyy-MM-dd')}</span>
          </div>
        </a>
      </Link>

      {/* TODO style */}
      {/* {dateMilliSeconds && dateMilliSeconds > Date.now() - 86400000 * 3 && <div className="post-link__new-label">NEW</div>} */}
    </article>
  );
};

export const ZennPostList: React.FC<{ items: ZennPostItem[] }> = ({ items }) => {
  const [displayItemsCount, setDisplayItemsCount] = useState<number>(32);
  const totalItemsCount = items?.length || 0;
  const canLoadMore = totalItemsCount - displayItemsCount > 0;

  if (!totalItemsCount) {
    return <div className="post-list-empty">No posts yet</div>;
  }

  return (
    <>
      <div className="post-list">
        {items.slice(0, displayItemsCount).map((item, i) => (
          <ZennPost key={`post-item-${i}`} item={item} />
        ))}
      </div>

      {/* TODO style */}
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
