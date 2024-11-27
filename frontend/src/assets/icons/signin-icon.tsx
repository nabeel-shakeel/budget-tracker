import React from 'react';
import Icon from '@ant-design/icons';
import { SigninSvg } from '../svgs';

export const SigninIcon = (props: React.ComponentProps<typeof Icon>) => (
  <Icon component={SigninSvg} {...props} />
);
