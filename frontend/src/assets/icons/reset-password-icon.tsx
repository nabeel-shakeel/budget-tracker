import React from 'react';
import Icon from '@ant-design/icons';
import { ResetPasswordSvg } from '../svgs';

export const ResetPasswordIcon = (props: React.ComponentProps<typeof Icon>) => (
  <Icon component={ResetPasswordSvg} {...props} />
);
