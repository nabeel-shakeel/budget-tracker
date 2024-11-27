import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LineChartOutlined,
  DollarOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Flex, Button, Layout, Menu, Badge, Avatar } from 'antd';
import { routes } from '../../routing';
import { AppLogoIcon, AppLogoNameIcon } from '../../assets/icons';

const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    key: 'analysis',
    icon: <LineChartOutlined />,
    label: 'Analysis',
  },
  {
    key: 'expenses',
    icon: <DollarOutlined />,
    label: 'Expenses',
  },
  {
    key: 'users',
    icon: <UserOutlined />,
    label: 'Users',
  },
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: 'Logout',
  },
];

export function RootLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const selectedItem = menuItems.find((item) => item.key === pathname.slice(1));

  const handleMenuItemChange = (item: any) => {
    if (item.key === 'logout') {
      navigate('/signin');
      return;
    }
    navigate('/' + item.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {pathname !== routes.PROFILE && (
        <Sider trigger={null} collapsible collapsed={collapsed} width={300}>
          {collapsed ? (
            <Flex
              align="center"
              justify="center"
              style={{
                height: '90px',
                border: '1px solid #EEEEEE',
                padding: '10px',
              }}
            >
              <AppLogoIcon />
            </Flex>
          ) : (
            <Flex
              align="center"
              justify="flex-start"
              style={{
                height: '90px',
                border: '1px solid #EEEEEE',
                padding: '10px',
              }}
            >
              <AppLogoNameIcon />
            </Flex>
          )}
          <Menu
            style={{
              padding: '10px',
              backgroundColor: 'white',
              border: 'none',
            }}
            selectedKeys={[selectedItem?.key || 'analysis']}
            mode="inline"
            items={menuItems}
            onClick={(item) => handleMenuItemChange(item)}
          />
        </Sider>
      )}
      <Layout>
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
            boxShadow: '2px 10px 60px 0px #E2ECF980',
          }}
        >
          {pathname === routes.PROFILE ? (
            <AppLogoNameIcon />
          ) : (
            <Button
              type="text"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined style={{ fontSize: '24px' }} />
                ) : (
                  <MenuFoldOutlined style={{ fontSize: '24px' }} />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
            />
          )}
          <Flex gap="middle" align="center">
            <Badge dot>
              <BellOutlined style={{ fontSize: '24px' }} />
            </Badge>
            <Avatar size="large" icon={<UserOutlined />} />
          </Flex>
        </Header>
        <Content
          style={{
            padding: 24,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
