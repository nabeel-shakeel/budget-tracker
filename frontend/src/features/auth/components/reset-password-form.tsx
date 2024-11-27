import { Link } from 'react-router-dom';
import { Flex, Form, Input, Button, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const { Title } = Typography;

export function ResetPasswordForm() {
  return (
    <Flex gap="20px" style={{ flexGrow: 1 }} justify="center" vertical>
      <div>
        <Title
          level={1}
          style={{
            margin: 0,
          }}
        >
          Reset Password
        </Title>
        <Title
          level={2}
          style={{
            margin: 0,
            color: '#878A99',
            fontWeight: 400,
          }}
        >
          Enter your email for a reset link.
        </Title>
      </div>

      <Form layout="vertical" size="large">
        <Form.Item label="Email" name="email" style={{ marginBottom: 10 }}>
          <Input
            placeholder="test@gmail.com"
            suffix={<MailOutlined style={{ color: '#98A2B3' }} />}
            style={{
              borderRadius: '4px',
            }}
          />
        </Form.Item>
      </Form>
      <Flex gap="small" vertical>
        <Button type="primary" block size="large">
          Send Reset Password Link
        </Button>

        <Flex justify="center" align="center" gap="2px">
          <Title level={5} style={{ margin: 0, fontWeight: 400 }}>
            Don't have an account?
          </Title>
          <Link to="/reset-password">
            <Title level={5} style={{ margin: 0, color: '#7C3AED' }}>
              Log in
            </Title>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
