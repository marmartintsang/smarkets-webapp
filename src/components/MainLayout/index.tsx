import React from 'react';
import { Layout } from 'antd';
import { ReactComponent as SmarketsLogo } from '@/assets/smarkets-logo.svg';

import styles from './index.module.scss';

const { Header, Content, Footer } = Layout;

interface IMainLayoutProps {}

const MainLayout: React.FunctionComponent<IMainLayoutProps> = (props) => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <SmarketsLogo className={styles.logosvg} />
        </div>
      </Header>
      <Content className={styles.content}>{props.children}</Content>
    </Layout>
  );
};

export default MainLayout;
