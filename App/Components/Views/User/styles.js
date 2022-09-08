import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const useStyles = () =>
  StyleSheet.create({
    root: {
      flex: 1,
      alignItems: 'center',
      paddingTop: height * 0.05
    },
    button: {
      marginTop: height * 0.1,
      paddingHorizontal: 25
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
      marginVertical: 5,
      alignSelf: 'center'
    }
  });

export default useStyles;
