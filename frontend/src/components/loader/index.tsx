import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const Loader = () => (
  <Spin
    fullscreen
    indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
  />
);
