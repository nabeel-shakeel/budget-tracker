import { useLocation } from 'react-router-dom';
import { Flex, Button, Layout, Badge } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { UserProfileMenu } from '@components';
import { routes } from '@routing';
import { useUserProfile } from '@features/profile/profile.api';
import { AppLogoNameIcon } from '@assets/icons';
import styles from './header.module.scss';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  onCollapsedChange: () => void;
}

export function Header({ collapsed, onCollapsedChange }: HeaderProps) {
  const { pathname } = useLocation();

  const { data } = useUserProfile();

  return (
    <AntHeader className={styles.header}>
      {pathname === routes.PROFILE ? (
        <AppLogoNameIcon className={styles.appLogoNameIcon} />
      ) : (
        <Button
          type="text"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined className={styles.icon} />
            ) : (
              <MenuFoldOutlined className={styles.icon} />
            )
          }
          onClick={onCollapsedChange}
        />
      )}
      <Flex gap="middle" align="center">
        <Badge dot>
          <BellOutlined className={styles.icon} />
        </Badge>
        {data && (
          <UserProfileMenu
            firstName={data.firstName}
            lastName={data.lastName}
            email={data.email}
          />
        )}
      </Flex>
    </AntHeader>
  );
}
