import React from 'react';
import {
  Text as RNText,
  TextStyle,
  TextProps as RNTextProps
} from 'react-native';
import { scaleFont } from '@Utils';
import { Colors, FontFamily } from '@Theme';

const Text = props => {
  const {
    children,
    h1,
    h2,
    h3,
    h4,
    h5 = true,
    w1,
    w2,
    w3,
    w4 = true,
    w5,
    p,
    bold,
    italic,
    center,
    justify,
    selfCenter,
    style,
    ...rest
  } = props;

  let textStyle = {
    color: Colors.text
  };

  if (h1) {
    textStyle.fontSize = scaleFont(48);
    textStyle.lineHeight = scaleFont(48);
  } else if (h2) {
    textStyle.fontSize = scaleFont(34);
    textStyle.lineHeight = scaleFont(34);
  } else if (h3) {
    textStyle.fontSize = scaleFont(24);
    textStyle.lineHeight = scaleFont(24);
  } else if (h4) {
    textStyle.fontSize = scaleFont(20);
    textStyle.lineHeight = scaleFont(20);
  } else if (p) {
    textStyle.fontSize = scaleFont(14);
    textStyle.lineHeight = scaleFont(14);
  } else if (h5) {
    textStyle.fontSize = scaleFont(16);
    textStyle.lineHeight = scaleFont(16);
  }

  if (w1) textStyle.fontFamily = FontFamily.Bold;
  else if (w2) textStyle.fontFamily = FontFamily.SemiBold;
  else if (w3) textStyle.fontFamily = FontFamily.Medium;
  else if (w5) textStyle.fontFamily = FontFamily.Light;
  else if (w4) textStyle.fontFamily = FontFamily.Regular;

  if (bold) textStyle.fontWeight = 'bold';
  if (italic) textStyle.fontStyle = 'italic';
  if (center) textStyle.textAlign = 'center';
  if (justify) textStyle.textAlign = 'justify';
  if (selfCenter) textStyle.alignSelf = 'center';

  if (style) textStyle = { ...textStyle, ...style };

  return (
    <RNText style={textStyle} {...rest}>
      {children}
    </RNText>
  );
};

export default Text;
