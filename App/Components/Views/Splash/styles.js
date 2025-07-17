import { Colors } from 'Theme';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const useStyles = () =>
  StyleSheet.create({
    image: {
      height: 160,
      width: width * 0.6,
      alignSelf: 'center'
    },
    versionText: {
      alignSelf: 'center',
      fontSize: 14,
      color: Colors.greyText,
      marginTop: 20,
      textAlign: 'center'
    }
  });

export default useStyles;
