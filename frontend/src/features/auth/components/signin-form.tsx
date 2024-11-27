import { Link } from 'react-router-dom';
import { Flex, Form, Input, Button, Checkbox, Typography } from 'antd';
import { MailOutlined, EyeOutlined } from '@ant-design/icons';

const { Title } = Typography;

export function SigninForm() {
  return (
    <Flex gap="20px" style={{ flexGrow: 1 }} justify="center" vertical>
      <div>
        <Title
          level={1}
          style={{
            margin: 0,
          }}
        >
          Welcome Back!
        </Title>
        <Title
          level={2}
          style={{
            margin: 0,
            color: '#878A99',
            fontWeight: 400,
          }}
        >
          Sign in to continue to Budget Tracker
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
        <Form.Item
          label="Password"
          name="password"
          style={{ marginBottom: 10 }}
        >
          <Input.Password
            placeholder="Enter your password"
            iconRender={(visible) => (
              <EyeOutlined style={{ color: '#98A2B3' }} />
            )}
            style={{
              borderRadius: '4px',
            }}
          />
        </Form.Item>

        <Flex justify="space-between" align="center">
          <Checkbox>
            <Title level={5} style={{ margin: 0, fontWeight: 400 }}>
              Remember me
            </Title>
          </Checkbox>
          <Link to="/reset-password">
            <Title level={5} style={{ margin: 0, color: '#7C3AED' }}>
              Forgot Password?
            </Title>
          </Link>
        </Flex>
      </Form>
      <Flex gap="small" vertical>
        <Button type="primary" block size="large">
          LOG IN
        </Button>

        <Flex justify="center" align="center" gap="2px">
          <Title level={5} style={{ margin: 0, fontWeight: 400 }}>
            Don't have an account?
          </Title>
          <Link to="/reset-password">
            <Title level={5} style={{ margin: 0, color: '#7C3AED' }}>
              Sign Up
            </Title>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
