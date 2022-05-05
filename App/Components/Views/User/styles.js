import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    root: {
      flex: 1,
      alignItems: 'center',
      paddingTop: height * 0.05,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: width * 0.8,
      marginTop: height * 0.05,
    },
    button: {
      marginTop: height * 0.1,
      paddingHorizontal: 25,
    },
  })

export default useStyles
