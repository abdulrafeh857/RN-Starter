import { Colors, FontFamily } from 'Theme';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Button = props => {
  const { children, onPress, icon, mode, loading, disabled, style } = props;

  return (
    <PaperButton
      style={styles.button}
      labelStyle={styles.label}
      loading={loading}
      disabled={disabled}
      dark
      uppercase
      contentStyle={{
        flexDirection: 'row-reverse',
        paddingVertical: 3
      }}
      {...props}
      icon={icon}
      mode={mode || 'contained'}
      onPress={loading ? () => {} : onPress ? onPress : () => console.log('Pressed')}>
      {children}
    </PaperButton>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: responsiveWidth(85),
    alignSelf: 'center',
    position: 'absolute',
    top: responsiveHeight(75)
    // zIndex: 100,

    // ...CardShadow
  },
  label: {
    fontSize: 17,
    fontFamily: FontFamily.SemiBold,
    color: Colors.foreground
  }
});
