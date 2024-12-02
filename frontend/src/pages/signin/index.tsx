import { AuthLayout } from '@layouts/auth';
import { SigninForm } from '@features/auth/components';
import { SigninIcon } from '@assets/icons';

export function SigninPage() {
  return (
    <AuthLayout
      leftSection={<SigninForm />}
      rightSection={<SigninIcon style={{ flex: 1 }} />}
    />
  );
}
