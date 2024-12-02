import { AuthLayout } from '@layouts/auth';
import { ForgotPasswordForm } from '@features/auth/components';
import { ResetPasswordIcon } from '@assets/icons';

export function ForgotPasswordPage() {
  return (
    <AuthLayout
      leftSection={<ForgotPasswordForm />}
      rightSection={<ResetPasswordIcon style={{ flex: 1 }} />}
    />
  );
}
