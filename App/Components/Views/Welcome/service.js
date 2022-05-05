import React from 'react'
import {} from 'react-native'


const useService = (props) => {
  const onContinue = () => {
    props.navigation.navigate('User')
  }

  return { onContinue }
}

export default useService
