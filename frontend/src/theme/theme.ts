import { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#7539FF',
    colorBgBase: '#FFFFFF',
    colorError: '#EF4435',
    colorTextLabel: '#9E9E9E',
    colorTextSecondary: '#667085',
    colorText: '#2B2B2B',
    colorBorder: '#DDE4F0',

    fontFamily: 'Poppins, sans-serif',
    fontSize: 14, // Base font size
    fontSizeLG: 16, // Large font size

    // typography
    fontSizeHeading1: 32,
    fontSizeHeading2: 24,
  },
  components: {
    Typography: {
      titleMarginBottom: 0,
    },
    Input: {
      inputFontSize: 14,
      inputFontSizeLG: 14,
    },
    Layout: {
      bodyBg: '#ECF1F2',
      headerBg: '#FFFFFF',
      siderBg: '#FFFFFF',
      headerHeight: 90,
    },
    Menu: {
      itemActiveBg: '#7539FF',
      itemSelectedBg: '#7539FF',
      itemSelectedColor: '#FFFFFF',
      iconSize: 19,
    },
    Table: {
      headerSplitColor: 'transparent',
      borderColor: '#F7F7F7',
    },
    Select: {
      activeOutlineColor: 'transparent',
      activeBorderColor: '#DDE4F0',
      hoverBorderColor: '#DDE4F0',
      optionSelectedBg: '#E1E8F2',
    },
    Card: {
      headerBg: '#F7F7F7',
    },
  },
};
