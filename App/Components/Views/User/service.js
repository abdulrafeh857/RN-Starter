import {} from 'react-native'
import { StackScreenProps } from '@Navigation/Stack/types'
import { fetchUsers, selectUserById } from '@Redux/Users'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { RootState } from '@Redux'

const useService = (props) => {
  const [userID, setUserID] = useState('')

  const dispatch = useDispatch()


  useEffect(() => {
  }, [])

  

  useEffect(() => {

  }, [])

  return { }
}

export default useService
