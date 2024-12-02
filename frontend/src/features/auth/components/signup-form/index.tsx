import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Flex, Form, Input, Button, Typography, theme } from 'antd';
import { MailOutlined, EyeOutlined } from '@ant-design/icons';
import { routes } from '@routing';
import { useNotification } from '@providers/notification-provider';
import { AuthFormHeader } from '@features/auth/components/auth-form-header';
import { useSignup } from '@features/auth/auth.api';
import { signupSchema } from '@features/auth/auth.schema';
import { ISignup } from '@features/auth/auth.types';
import styles from './signup-form.module.scss';

const { useToken } = theme;
const { Title } = Typography;

export function SignupForm() {
  const { token } = useToken();
  const { notify } = useNotification();
  const navigate = useNavigate();
  const mutation = useSignup();

  const formik = useFormik<ISignup>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      budgetLimit: 0,
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const { confirmPassword, ...rest } = values;
        await mutation.mutateAsync(rest);
        notify({
          type: 'success',
          message: 'Signup',
          description: 'User signup successfully',
        });
        navigate(routes.SIGN_IN);
      } catch (error: any) {
        const errorMsg = error?.data?.error || error.message;
        console.error('signup failed:', errorMsg);
        notify({
          type: 'error',
          message: 'Signup',
          description: errorMsg,
        });
      }
    },
  });

  return (
    <Flex justify="center" className={styles.container} vertical>
      <AuthFormHeader title="Sign Up" subtitle="Welcome to our community" />
      <Form layout="vertical" size="large" onFinish={formik.handleSubmit}>
        <Flex gap="small" justify="space-between">
          <Form.Item
            label="First Name"
            name="firstName"
            className={styles.formItemRow}
            validateStatus={
              formik.touched.firstName && formik.errors.firstName
                ? 'error'
                : undefined
            }
            help={formik.touched.firstName && formik.errors.firstName}
          >
            <Input
              placeholder="Enter your first name"
              {...formik.getFieldProps('firstName')}
            />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            className={styles.formItemRow}
            validateStatus={
              formik.touched.lastName && formik.errors.lastName
                ? 'error'
                : undefined
            }
            help={formik.touched.lastName && formik.errors.lastName}
          >
            <Input
              placeholder="Enter your last name"
              {...formik.getFieldProps('lastName')}
            />
          </Form.Item>
        </Flex>
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
            iconRender={() => <EyeOutlined className={styles.formIcon} />}
            {...formik.getFieldProps('password')}
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          className={styles.formItem}
          validateStatus={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? 'error'
              : undefined
          }
          help={formik.touched.confirmPassword && formik.errors.confirmPassword}
        >
          <Input.Password
            placeholder="Confirm your password"
            iconRender={() => <EyeOutlined className={styles.formIcon} />}
            {...formik.getFieldProps('confirmPassword')}
          />
        </Form.Item>
        <Form.Item
          label="Budget Limit"
          name="budgetLimit"
          className={styles.formItem}
          validateStatus={
            formik.touched.budgetLimit && formik.errors.budgetLimit
              ? 'error'
              : undefined
          }
          help={formik.touched.budgetLimit && formik.errors.budgetLimit}
        >
          <Input
            type="number"
            placeholder="Enter your budget limit"
            {...formik.getFieldProps('budgetLimit')}
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
            SIGN UP
          </Button>

          <Flex justify="center" align="center" gap="2px">
            <Title level={5} style={{ fontWeight: 400 }}>
              Already have an account?
            </Title>
            <Link to={routes.SIGN_IN}>
              <Title level={5} style={{ color: token.colorPrimary }}>
                Log in
              </Title>
            </Link>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  );
}
