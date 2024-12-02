import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Flex, Form, Input, Button, Checkbox, Typography, theme } from 'antd';
import { MailOutlined, EyeOutlined } from '@ant-design/icons';
import { routes } from '@routing';
import { useAuthStore } from '@store/useAuthStore';
import { useNotification } from '@providers/notification-provider';
import { AuthFormHeader } from '@features/auth/components/auth-form-header';
import { useSignin } from '@features/auth/auth.api';
import { signinSchema } from '@features/auth/auth.schema';
import { ISignin } from '@features/auth/auth.types';
import styles from './signin-form.module.scss';

const { useToken } = theme;
const { Title } = Typography;

export function SigninForm() {
  const { token } = useToken();
  const { notify } = useNotification();
  const navigate = useNavigate();
  const { setToken } = useAuthStore();
  const mutation = useSignin();

  const formik = useFormik<ISignin>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signinSchema,
    onSubmit: async (values) => {
      try {
        const response = await mutation.mutateAsync(values);
        notify({
          type: 'success',
          message: 'Signin',
          description: 'User signin successfully',
        });
        setToken(response.token);
        navigate(routes.EXPENSES);
      } catch (error: any) {
        const errorMsg = error?.data?.error || error.message;
        console.error('signin failed:', errorMsg);
        notify({
          type: 'error',
          message: 'Signin',
          description: errorMsg,
        });
      }
    },
  });

  return (
    <Flex justify="center" className={styles.container} vertical>
      <AuthFormHeader
        title="Welcome Back!"
        subtitle="Sign in to continue to Budget Tracker"
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
        <Form.Item
          label="Password"
          name="password"
          className={styles.formItem}
          validateStatus={
            formik.touched.password && formik.errors.password
              ? 'error'
              : undefined
          }
          help={formik.touched.password && formik.errors.password}
        >
          <Input.Password
            placeholder="Enter your password"
            iconRender={(visible) => (
              <EyeOutlined className={styles.formIcon} />
            )}
            {...formik.getFieldProps('password')}
          />
        </Form.Item>

        <Flex justify="space-between" align="center">
          <Checkbox>
            <Title level={5} style={{ fontWeight: 400 }}>
              Remember me
            </Title>
          </Checkbox>
          <Link to={routes.FORGOT_PASSWORD}>
            <Title level={5} style={{ color: token.colorPrimary }}>
              Forgot Password?
            </Title>
          </Link>
        </Flex>

        <Flex gap="small" vertical className={styles.buttonContainer}>
          <Button
            type="primary"
            block
            size="large"
            htmlType="submit"
            loading={mutation.isPending}
          >
            LOG IN
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
