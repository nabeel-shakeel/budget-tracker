import { Typography } from 'antd';
import styles from './auth-form-header.module.scss';

const { Title } = Typography;

interface AuthFormHeaderProps {
  title: string;
  subtitle: string;
}

export function AuthFormHeader({ title, subtitle }: AuthFormHeaderProps) {
  return (
    <div>
      <Title level={1}>{title}</Title>
      <Title level={2} className={styles.subtitle}>
        {subtitle}
      </Title>
    </div>
  );
}
