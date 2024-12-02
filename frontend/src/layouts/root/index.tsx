import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { Header, SideBar } from '@components';
import { routes } from '../../routing';
import styles from './root-layout.module.scss';

const { Content } = Layout;

export function RootLayout() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleChangeCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className={styles.layout}>
      {pathname !== routes.PROFILE && <SideBar isCollapsed={collapsed} />}
      <Layout>
        <Header
          collapsed={collapsed}
          onCollapsedChange={handleChangeCollapsed}
        />
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
