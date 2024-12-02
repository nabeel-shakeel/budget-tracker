import { Flex, Divider } from 'antd';
import { AppLogoNameIcon } from '@assets/icons';
import styles from './auth-layout.module.scss';

interface AuthLayoutProps {
  leftSection: React.ReactNode;
  rightSection: React.ReactNode;
}

export function AuthLayout(props: AuthLayoutProps) {
  const { leftSection, rightSection } = props;

  return (
    <Flex className={styles.authLayout} justify="flex-start">
      <Flex vertical className={styles.leftSection}>
        <AppLogoNameIcon className={styles.appLogo} />
        {leftSection}
      </Flex>
      <Divider type="vertical" className={styles.divider} />
      {rightSection}
    </Flex>
  );
}
