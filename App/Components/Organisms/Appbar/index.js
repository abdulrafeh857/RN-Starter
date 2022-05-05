import * as React from 'react'
import { Appbar as PaperAppbar } from 'react-native-paper'
import useStyles from './styles'


const Appbar = (props) => {
  const { titleStyle } = useStyles()

  let hasPreviousScreen = props.back || false
  let title = props.route.name || ''

  let onBackPress = () => props.navigation.goBack() || undefined

  return (
    <PaperAppbar.Header>
      {hasPreviousScreen && (
        <PaperAppbar.Action icon="arrow-left" onPress={onBackPress} />
      )}
      <PaperAppbar.Content style={titleStyle} title={title} />
    </PaperAppbar.Header>
  )
}

export default Appbar
