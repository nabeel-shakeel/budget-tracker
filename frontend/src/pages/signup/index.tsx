import { AuthLayout } from '@layouts/auth';
import { SignupForm } from '@features/auth/components';
import { SignupIcon } from '@assets/icons';

export function SignupPage() {
  return (
    <AuthLayout
      leftSection={<SignupForm />}
      rightSection={<SignupIcon style={{ flex: 1 }} />}
    />
  );
}
