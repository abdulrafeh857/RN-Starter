import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')

const useStyles = () =>
  StyleSheet.create({
    titleStyle: {
      position: 'absolute',
      left: width * 0.25,
      right: width * 0.25,
      alignItems: 'center',
    },
  })

export default useStyles
