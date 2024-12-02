import { useNavigate, useLocation } from 'react-router-dom';
import { Flex, Layout, Menu } from 'antd';
import {
  LineChartOutlined,
  DollarOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { AppLogoIcon, AppLogoNameIcon } from '@assets/icons';
import { routes } from '@routing';
import styles from './side-bar.module.scss';

const { Sider } = Layout;

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

interface SideBarProps {
  isCollapsed: boolean;
}

export function SideBar({ isCollapsed }: SideBarProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const selectedItem = menuItems.find((item) => item.key === pathname.slice(1));

  const handleMenuItemChange = (item: any) => {
    if (item.key === 'logout') {
      navigate(routes.SIGN_IN);
      return;
    }
    navigate('/' + item.key);
  };

  return (
    <Sider trigger={null} collapsible collapsed={isCollapsed} width={300}>
      {isCollapsed ? (
        <Flex align="center" justify="center" className={styles.siderCollapsed}>
          <AppLogoIcon className={styles.appLogoIcon} />
        </Flex>
      ) : (
        <Flex
          align="center"
          justify="flex-start"
          className={styles.siderExpanded}
        >
          <AppLogoNameIcon className={styles.appLogoNameIcon} />
        </Flex>
      )}
      <Menu
        className={styles.menu}
        selectedKeys={[selectedItem?.key || 'analysis']}
        mode="inline"
        items={menuItems}
        onClick={(item) => handleMenuItemChange(item)}
      />
    </Sider>
  );
}
