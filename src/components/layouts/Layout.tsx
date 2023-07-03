import PageFooter from '@components/layouts/page_footer/PageFooter';
import PageHeader from '@components/layouts/page_header/PageHeader';
import type { FC } from 'react';

import styles from './Layout.module.scss';

type Props = {
  children?: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <PageHeader />
      <div className={styles.container_inner}>{children}</div>
      <PageFooter />
    </>
  );
};

export default Layout;
