import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Flex, Form, Input, Button, Typography, theme } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { routes } from '@routing';
import { useNotification } from '@providers/notification-provider';
import { AuthFormHeader } from '@features/auth/components/auth-form-header';
import { useForgotPassword } from '@features/auth/auth.api';
import { forgotPasswordSchema } from '@features/auth/auth.schema';
import { IForgotPassword } from '@features/auth/auth.types';
import styles from './forgot-password-form.module.scss';

const { useToken } = theme;
const { Title } = Typography;

export function ForgotPasswordForm() {
  const { token } = useToken();
  const { notify } = useNotification();
  const navigate = useNavigate();
  const mutation = useForgotPassword();

  const formik = useFormik<IForgotPassword>({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        await mutation.mutateAsync(values);
        notify({
          type: 'success',
          message: 'Forgot Password',
          description: 'Forgot password link sent successfully',
        });
        navigate(routes.SIGN_IN);
      } catch (error: any) {
        const errorMsg = error?.data?.error || error.message;
        console.error('forgot password failed:', errorMsg);
        notify({
          type: 'error',
          message: 'Forgot Password',
          description: errorMsg,
        });
      }
    },
  });

  return (
    <Flex justify="center" className={styles.container} vertical>
      <AuthFormHeader
        title="Forgot Password"
        subtitle="Enter your email for a reset link."
      />
      <Form layout="vertical" size="large" onFinish={formik.handleSubmit}>
        <Form.Item
          label="Email"
          name="email"
          className={styles.formItem}
          validateStatus={
            formik.touched.email && formik.errors.email ? 'error' : undefined
          }
          help={formik.touched.email && formik.errors.email}
        >
          <Input
            placeholder="test@gmail.com"
            suffix={<MailOutlined className={styles.formIcon} />}
            {...formik.getFieldProps('email')}
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
            Send Reset Password Link
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
