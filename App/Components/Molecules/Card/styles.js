import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'Theme';
import {p} from '@Atoms';

const {height} = Dimensions.get('window');

const styles = (props) =>
  StyleSheet.create({
    container: {
      height: height * 0.33,
      alignItems: 'center',
      alignSelf: 'center',
      paddingVertical: props.vPad ? p.vPad : 0,
      paddingHorizontal: props.hPad ? p.hPad : 0,
      width: '100%',
      backgroundColor: Colors.foreground,
      borderRadius: 10,
      ...props.style,
    },
  });

export default styles;
