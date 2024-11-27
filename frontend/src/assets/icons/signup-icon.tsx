import React from 'react';
import Icon from '@ant-design/icons';
import { SignupSvg } from '../svgs';

export const SignupIcon = (props: React.ComponentProps<typeof Icon>) => (
  <Icon component={SignupSvg} {...props} />
);
