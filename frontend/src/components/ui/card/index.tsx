import { Card as AntCard, CardProps } from 'antd';
import styles from './card.module.scss';

interface CustomCardProps extends CardProps {
  children: React.ReactNode;
}

export function Card(props: CustomCardProps) {
  const { title, children, ...rest } = props;
  return (
    <AntCard size="small" title={title} className={styles.btCard} {...rest}>
      {children}
    </AntCard>
  );
}
