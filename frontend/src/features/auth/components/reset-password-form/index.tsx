import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { Flex, Form, Input, Button, Typography, theme } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { routes } from '@routing';
import { useNotification } from '@providers/notification-provider';
import { AuthFormHeader } from '@features/auth/components/auth-form-header';
import { useResetPassword } from '@features/auth/auth.api';
import { resetPasswordSchema } from '@features/auth/auth.schema';
import { IResetPassword } from '@features/auth/auth.types';
import styles from './reset-password-form.module.scss';

const { useToken } = theme;
const { Title } = Typography;

export function ResetPasswordForm() {
  const { token } = useToken();
  const { notify } = useNotification();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mutation = useResetPassword();

  const formik = useFormik<IResetPassword>({
    initialValues: {
      newPassword: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      try {
        const token = searchParams.get('token') || '';
        await mutation.mutateAsync({ ...values, token });
        notify({
          type: 'success',
          message: 'Reset Password',
          description: 'Password reset successfully',
        });
        navigate(routes.SIGN_IN);
      } catch (error: any) {
        const errorMsg = error?.data?.error || error.message;
        console.error('reset password failed:', errorMsg);
        notify({
          type: 'error',
          message: 'Reset Password',
          description: errorMsg,
        });
      }
    },
  });

  return (
    <Flex justify="center" className={styles.container} vertical>
      <AuthFormHeader
        title="Reset Password"
        subtitle="Let's create a new password"
      />
      <Form layout="vertical" size="large" onFinish={formik.handleSubmit}>
        <Form.Item
          label="New Password"
          name="newPassword"
          className={styles.formItem}
          validateStatus={
            formik.touched.newPassword && formik.errors.newPassword
              ? 'error'
              : undefined
          }
          help={formik.touched.newPassword && formik.errors.newPassword}
        >
          <Input.Password
            placeholder="Enter your new password"
            iconRender={() => <EyeOutlined className={styles.formIcon} />}
            {...formik.getFieldProps('newPassword')}
          />
        </Form.Item>

        <Flex gap="small" vertical className={styles.buttonContainer}>
          <Button
            type="primary"
            block
            size="large"
            htmlType="submit"
            loading={mutation.isPending}
          >
            Submit
          </Button>

          <Flex justify="center" align="center" gap="2px">
            <Title level={5} style={{ fontWeight: 400 }}>
              Don't have an account?
            </Title>
            <Link to={routes.SIGN_UP}>
              <Title level={5} style={{ color: token.colorPrimary }}>
                Sign Up
              </Title>
            </Link>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  );
}
