import * as React from 'react'
import { Button as PaperButton } from 'react-native-paper'


const Button = (props) => {
  const { children, onPress, icon } = props

  return (
    <PaperButton {...props} icon={icon} mode="contained" onPress={onPress}>
      {children}
    </PaperButton>
  )
}

export default Button
