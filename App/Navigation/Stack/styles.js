import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const useStyles = () => {
  const headerHidden = {
    options: {
      headerShown: false,
    },
  }

  return { headerHidden }
}

export default useStyles
