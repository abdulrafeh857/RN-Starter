import {StyleSheet, Dimensions} from 'react-native';
import {Colors, Layout} from 'Theme';

const {width, height} = Dimensions.get('window');

const styles = (props) =>
  StyleSheet.create({
    card: {
      borderRadius: 6,
      height: height * 0.08,
      width: width - 36,
      backgroundColor:
        props.disabled || props.loading ? '#bbb' : Colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 18,
      elevation: props.disabled ? 0 : 2,
      position: 'absolute',
      bottom: 10,
      zIndex: 1,
      ...props.style,
    },
    text: {
      color: 'white',
      ...props.textStyle,
    },
    price: {
      color: 'white',
      ...props.priceStyle,
    },
    right: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 5,
      paddingHorizontal: 10,
      height: height * 0.04,
      ...Layout.center,
    },
    badge: {
      position: 'absolute',
      top: -7.5,
      right: -7.5,
      width: 15,
      height: 15,
      backgroundColor: Colors.tertiary,
      borderRadius: 50,
      ...Layout.center,
    },
    badgeText: {
      color: 'white',
      fontSize: 9,
    },
  });

export default styles;
