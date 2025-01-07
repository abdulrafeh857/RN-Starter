import { StyleSheet } from 'react-native';
import { Colors } from 'Theme';

const useStyles = () =>
  StyleSheet.create({
    rootScroll: {
      flexGrow: 1,
      backgroundColor: Colors.foreground
    },
    root: {
      flex: 1
    }
  });

export default useStyles;
