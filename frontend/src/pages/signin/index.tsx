import { Flex, Divider } from 'antd';
import { AppLogoNameIcon, SigninIcon } from '../../assets/icons';
import { SigninForm } from '../../features/auth/components';

export function SigninPage() {
  return (
    <Flex
      gap="120px"
      style={{ height: '100vh', padding: '40px 80px' }}
      justify="flex-start"
    >
      <Flex vertical style={{ flex: '1 0 0%' }}>
        <AppLogoNameIcon />
        <SigninForm />
      </Flex>
      <Divider type="vertical" style={{ height: '100%', color: '#DDE4F0' }} />
      <SigninIcon style={{ flex: 1 }} />
    </Flex>
  );
}
