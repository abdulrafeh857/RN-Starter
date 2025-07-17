import { DefaultTheme } from 'react-native-paper';

/*  APP SPECIFIC COLORS  */
export const Colors = {
  // Common
  transparent: 'rgba(0,0,0,0)',
  text: '#21252A',
  silver: '#dce0e3',
  greyText: '#4C586A',
  light: '#F3F5F7',
  foreground: '#FFFFFF',
  background: '#FFFFFF',
  white: '#FFFFFF',
  success: '#3CC13B',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  primary: '#FF6908',
  genorange: '#EC6D2C',
  genblue: '#09458B',
  secondary: 'green',
  red: '#ff0000',
  redl: '#ff000022',
  redsoft: '#f75555',
  redsoftl: '#f75555cc',
  statusBack: '#F9FAFB',
  greyTextLight: '#6B728066',
  forgot: '#0A6375'
};

/*  APP SPECIFIC FONTS  */
export const FontFamily = {
  Black: 'TitilliumWeb-Black',
  Bold: 'TitilliumWeb-Bold',
  BoldItalic: 'TitilliumWeb-BoldItalic',
  ExtraLight: 'TitilliumWeb-ExtraLight',
  ExtraLightItalic: 'TitilliumWeb-ExtraLightItalic',
  Italic: 'TitilliumWeb-Italic',
  Light: 'TitilliumWeb-Light',
  LightItalic: 'TitilliumWeb-LightItalic',
  Regular: 'TitilliumWeb-Regular',
  SemiBold: 'TitilliumWeb-SemiBold',
  SemiBoldItalic: 'TitilliumWeb-SemiBoldItalic'
};

/*  REACT NATIVE PAPER THEME  */
const fontConfig = {
  bold: { fontFamily: FontFamily.Bold },
  semibold: { fontFamily: FontFamily.SemiBold },
  regular: { fontFamily: FontFamily.Regular },
  medium: { fontFamily: FontFamily.SemiBold },
  light: { fontFamily: FontFamily.Light },
  thin: { fontFamily: FontFamily.ExtraLight }
};
export const CardShadow = {
  shadowColor: Colors.text,
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,

  elevation: 6
};
export const CardShadowLow = {
  shadowColor: Colors.text,
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,

  elevation: 2
};

const colorsConfig = {
  ...DefaultTheme.colors,
  primary: Colors.primary,
  accent: Colors.secondary,
  text: Colors.text
};

export const theme = {
  ...DefaultTheme,
  roundness: 22,
  fonts: fontConfig,
  colors: colorsConfig
};
