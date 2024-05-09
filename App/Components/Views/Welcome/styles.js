import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
    },
    image: {
      height: 200,
      width: width * 0.8,
      marginTop: height * 0.05,
      marginBottom: height * 0.05,
      alignSelf: 'center'
    },
    button: {
      margin: 10,
      paddingHorizontal: 25,
      paddingVertical: 10,
      backgroundColor: 'aqua',
      borderRadius: 10
    }
  });

export default useStyles;
