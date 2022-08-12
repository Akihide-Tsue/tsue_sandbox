import { FC } from 'react';

import PageHeader from '@components/page_header/PageHeader';

import styles from './Layout.module.scss';

type Props = {
  children?: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.page_container}>
      <PageHeader />
      <div className={styles.container_inner}>{children}</div>
    </div>
  );
};

export default Layout;
