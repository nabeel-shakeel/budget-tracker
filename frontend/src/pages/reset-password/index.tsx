import { Flex, Divider } from 'antd';
import { AppLogoNameIcon, ResetPasswordIcon } from '../../assets/icons';
import { ResetPasswordForm } from '../../features/auth/components';

export function ResetPasswordPage() {
  return (
    <Flex
      gap="120px"
      style={{ height: '100vh', padding: '40px 80px' }}
      justify="flex-start"
    >
      <Flex vertical style={{ flex: '1 0 0%' }}>
        <AppLogoNameIcon />
        <ResetPasswordForm />
      </Flex>
      <Divider type="vertical" style={{ height: '100%', color: '#DDE4F0' }} />
      <ResetPasswordIcon style={{ flex: 1 }} />
    </Flex>
  );
}
