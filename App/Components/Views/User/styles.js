import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

const useStyles = () =>
  StyleSheet.create({
    root: {
      flex: 1,
      alignItems: 'center',
      paddingTop: height * 0.05
    },
    button: {
      margin: 10,
      paddingHorizontal: 25,
      paddingVertical: 10,
      backgroundColor: 'aqua',
      borderRadius: 10
    },
    text: {
      fontSize: 20,
      color: 'black',
      textAlign: 'center',
      marginVertical: 5,
      alignSelf: 'center'
    }
  });

export default useStyles;
