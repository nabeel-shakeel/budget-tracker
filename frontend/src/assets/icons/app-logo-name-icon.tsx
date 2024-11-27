import React from 'react';
import Icon from '@ant-design/icons';
import { AppLogoNameSvg } from '../svgs';

export const AppLogoNameIcon = (props: React.ComponentProps<typeof Icon>) => (
  <Icon component={AppLogoNameSvg} {...props} />
);
