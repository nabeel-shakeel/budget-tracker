import { Flex, Divider } from 'antd';
import { AppLogoNameIcon, SignupIcon } from '../../assets/icons';
import { SignupForm } from '../../features/auth/components';

export function SignupPage() {
  return (
    <Flex
      gap="120px"
      style={{ height: '100vh', padding: '40px 80px' }}
      justify="flex-start"
    >
      <Flex vertical style={{ flex: '1 0 0%' }}>
        <AppLogoNameIcon />
        <SignupForm />
      </Flex>
      <Divider type="vertical" style={{ height: '100%', color: '#DDE4F0' }} />
      <SignupIcon style={{ flex: 1 }} />
    </Flex>
  );
}
