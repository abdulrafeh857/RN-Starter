import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'Theme';

const {width, height} = Dimensions.get('window');

const styles = (props) =>
  StyleSheet.create({
    container: {
      backgroundColor:
        props.loading || props.disabled ? '#bbb' : Colors.primary,
      borderRadius: 6,
      height: height * 0.08,
      width: width - 36,
      alignSelf: 'center',
      ...props.style,
    },
    text: {
      fontFamily: 'SofiaPro-SemiBold',
      color: 'white',
      fontSize: 17,
      lineHeight: 17,
      ...props.textStyle,
    },
  });

export default styles;
