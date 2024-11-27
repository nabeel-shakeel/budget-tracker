import React from 'react';
import Icon from '@ant-design/icons';
import { AppLogoSvg } from '../svgs';

export const AppLogoIcon = (props: React.ComponentProps<typeof Icon>) => (
  <Icon component={AppLogoSvg} {...props} />
);
