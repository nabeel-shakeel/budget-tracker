import { Typography } from 'antd';
import styles from './label-prefix.module.scss';

const { Text } = Typography;

interface LabelPrefixProps {
  label: string;
  children: React.ReactNode;
}

export function LabelPrefix({ label, children }: LabelPrefixProps) {
  return (
    <div className={styles['label-prefix']}>
      <Text className={styles['label-prefix-text']}>{label}</Text>
      {children}
    </div>
  );
}
