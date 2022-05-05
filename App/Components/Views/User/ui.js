import React from 'react'
import useService from './service'
import useStyles from './styles'
import { View } from 'react-native'
import { Text } from '@Atoms'
import { Button } from '@Molecules'
import { Screen } from '@Templates'

const User = props => {
  const {} = useService(props)
  const { container, row, button, root } = useStyles()
const [userId,setUserId]=useState(0)
  return (
    <Screen>
      <View style={root}>
        <Text h3 w4>
          Random User:
        </Text>

        <View>{userId.toString()}</View>

        <Button style={button} onPress={() => {setUserId(Math.random())}}>
          Get Random User
        </Button>
      </View>
    </Screen>
  )
}

export default User
