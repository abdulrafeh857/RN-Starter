import { Dimensions, StyleSheet } from 'react-native'
import { Colors } from 'Theme'

const { width, height } = Dimensions.get('window')

const useStyles = () =>
  StyleSheet.create({
    rootScroll: {
      flexGrow: 1,
      backgroundColor: Colors.foreground,
    },
    root: {
      flex: 1,
    },
  })

export default useStyles
