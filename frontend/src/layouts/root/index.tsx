import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { Header, SideBar } from '@components';
import { useUserProfile } from '@features/profile/profile.api';
import { useUserStore } from '@store/useUserStore';
import { routes } from '../../routing';
import styles from './root-layout.module.scss';

const { Content } = Layout;

export function RootLayout() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const { setUserDetails } = useUserStore();
  const { data } = useUserProfile();

  useEffect(() => {
    if (data) {
      setUserDetails({
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        role: data.role,
      });
    }
  }, [data]);

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
