import { FC } from 'react';

import styles from './PageFooter.module.scss';

const PageFooter: FC = ({}) => {
  return (
    <div className={styles.footer}>
      <p>{"© Tsue's sandbox"}</p>
    </div>
  );
};

export default PageFooter;
