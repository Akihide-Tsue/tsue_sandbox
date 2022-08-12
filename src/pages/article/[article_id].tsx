import { FC } from 'react';

import { useRouter } from 'next/router';

const Article: FC = ({}) => {
  const router = useRouter();
  let { article_id } = router.query;
  if (article_id instanceof Array) {
    article_id = article_id.join(',');
  }

  return <div>{article_id}です </div>;
};

export default Article;
