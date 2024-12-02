import { AuthLayout } from '@layouts/auth';
import { ResetPasswordForm } from '@features/auth/components';
import { ResetPasswordIcon } from '@assets/icons';

export function ResetPasswordPage() {
  return (
    <AuthLayout
      leftSection={<ResetPasswordForm />}
      rightSection={<ResetPasswordIcon style={{ flex: 1 }} />}
    />
  );
}
