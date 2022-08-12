import { FC } from 'react';

import PageFooter from '@components/page_footer/PageFooter';
import PageHeader from '@components/page_header/PageHeader';

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
