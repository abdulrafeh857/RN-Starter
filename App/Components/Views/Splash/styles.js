import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    image: {
      height: 200,
      width: width * 0.8,
      marginTop: height * 0.3,
      alignSelf: 'center',
    },
  })

export default useStyles
