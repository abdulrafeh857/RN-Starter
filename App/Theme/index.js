import { DefaultTheme } from 'react-native-paper';

/*  APP SPECIFIC COLORS  */
export const Colors = {
  // Common
  transparent: 'rgba(0,0,0,0)',
  text: '#3f3f3f',
  tintGrey: '#777b',
  foreground: '#FFFFFF',
  background: '#f5f5f5',
  success: '#28a745',
  error: '#dc3545',

  primary: 'teal',
  secondary: 'green'
};

/*  APP SPECIFIC FONTS  */
export const FontFamily = {
  Bold: 'SofiaPro-Bold',
  SemiBold: 'SofiaPro-SemiBold',
  Medium: 'SofiaPro-Medium',
  Regular: 'SofiaPro',
  Light: 'SofiaPro-Light'
};

/*  REACT NATIVE PAPER THEME  */
const fontConfig = {
  regular: { fontFamily: FontFamily.Regular },
  medium: { fontFamily: FontFamily.Medium },
  light: { fontFamily: FontFamily.Light },
  thin: { fontFamily: FontFamily.Light }
};

const colorsConfig = {
  ...DefaultTheme.colors,
  primary: Colors.primary,
  accent: Colors.secondary,
  text: Colors.text
};

export const theme = {
  ...DefaultTheme,
  roundness: 6,
  fonts: fontConfig,
  colors: colorsConfig
};
