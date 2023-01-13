/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import { Dimensions } from 'react-native';

const ratio = Dimensions.get('screen').height / 667;

/**
 * Colors
 */
export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  // Example colors:
  text: '#3f3f3f',
  primary: '#45bee2',
  primaryDark: '#1fa7ca',
  secondary: '#96be16',
  tertiary: '#e87300',
  tintGrey: '#7779',
  foreground: '#FFFFFF',
  background: '#f5f5f5',
  success: '#28a745',
  error: '#dc3545',
  redsoft: '#f77777'
};

/**
 * FontSize
 */
export const FontSize = {
  heading: ratio * 28,
  title: ratio * 24,
  subTitle: ratio * 19,
  body: ratio * 15,
  caption: ratio * 12
};
