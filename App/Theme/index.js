import { DefaultTheme } from 'react-native-paper';
import { MD3LightTheme as PaperDefaultTheme } from 'react-native-paper'; // ✅ Better for RN Paper v5+

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

/*  FONT CONFIG FOR RN PAPER (MD3)  */
const fontConfig = {
  displayLarge: {
    fontFamily: FontFamily.Bold,
    fontWeight: '700',
    letterSpacing: 0.5
  },
  displayMedium: {
    fontFamily: FontFamily.SemiBold,
    fontWeight: '600',
    letterSpacing: 0.25
  },
  displaySmall: {
    fontFamily: FontFamily.Regular,
    fontWeight: '500'
  },
  headlineLarge: {
    fontFamily: FontFamily.Bold,
    fontWeight: '700'
  },
  headlineMedium: {
    fontFamily: FontFamily.SemiBold,
    fontWeight: '600'
  },
  headlineSmall: {
    fontFamily: FontFamily.Regular,
    fontWeight: '500'
  },
  bodyLarge: {
    fontFamily: FontFamily.Regular,
    fontWeight: '400'
  },
  bodyMedium: {
    fontFamily: FontFamily.Regular,
    fontWeight: '400'
  },
  bodySmall: {
    fontFamily: FontFamily.Light,
    fontWeight: '300'
  },
  labelLarge: {
    fontFamily: FontFamily.SemiBold,
    fontWeight: '600'
  },
  labelMedium: {
    fontFamily: FontFamily.Regular,
    fontWeight: '400'
  },
  labelSmall: {
    fontFamily: FontFamily.ExtraLight,
    fontWeight: '200'
  },
  titleLarge: {
    fontFamily: FontFamily.SemiBold,
    fontWeight: '600'
  },
  titleMedium: {
    fontFamily: FontFamily.Regular,
    fontWeight: '500'
  },
  titleSmall: {
    fontFamily: FontFamily.Light,
    fontWeight: '300'
  }
};

/*  SHADOWS  */
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

/*  FINAL CUSTOM THEME  */
const colorsConfig = {
  ...PaperDefaultTheme.colors,
  primary: Colors.primary,
  secondary: Colors.secondary,
  text: Colors.text,
  background: Colors.background
};

export const theme = {
  ...PaperDefaultTheme,
  roundness: 22,
  colors: colorsConfig,
  fonts: fontConfig // ✅ Must follow MD3 keys
};
