import React from 'react'
import useService from './service'
import useStyles from './styles'
import { StatusBar, Image, View } from 'react-native'
import { Text } from '@Atoms'
import { Button } from '@Molecules'
import { Screen } from '@Templates'
import { Colors } from '@Theme'

const Welcome = (props) => {
  const { onContinue } = useService(props)
  const { container, image, button } = useStyles()

  return (
    <>
      <StatusBar backgroundColor={Colors.primary} />
      <Screen>
        <View style={container}>
          <Image
            style={image}
            resizeMethod="resize"
            resizeMode="contain"
            source={require('@Images/logo.png')}
          />
          <Text h3 center>
            Welcome to the React Native Template TS
          </Text>
          <Button style={button} onPress={onContinue}>
            Continue
          </Button>
        </View>
      </Screen>
    </>
  )
}

export default Welcome
