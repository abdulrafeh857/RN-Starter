import { Platform, StyleSheet } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Colors } from 'Theme';

const useStyles = () =>
  StyleSheet.create({
    rootScroll: {
      flex: 1,
      backgroundColor: Colors.foreground
    },
    root: {
      flex: 1,
      backgroundColor: Colors.foreground,
      marginTop: Platform.OS == 'android' ? 10 : 0
      // width: '100%'
    }
  });

export default useStyles;
