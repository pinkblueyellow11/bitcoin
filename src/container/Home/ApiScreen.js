import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import ApiScreen from '../../component/Home/ApiScreen'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

export default function LoginContainer(props) {
  const {} = props
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  // redux
  const api_key_setted = useSelector((state) => state.auth.api_key_setted)

  const postApiKey = async (body) => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.setApiKey(body)
      setIsWaiting(false)
      console.log('result', result)
      return result
    } catch (error) {
      console.log('[container/Home] setApiKey error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  return (
    <ApiScreen
      api_key_setted={api_key_setted}
      postApiKey={postApiKey}
      setErrorMsg={setErrorMsg}
      errorMsg={errorMsg}
    />
  )
}
