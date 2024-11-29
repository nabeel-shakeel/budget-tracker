import { Input as AntInput, InputProps } from 'antd';
import styles from './input.module.scss';

export function Input(props: InputProps) {
  return <AntInput className={styles['bt-input']} {...props} />;
}
