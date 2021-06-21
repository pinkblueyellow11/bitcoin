import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import TaskHome from '../../component/Task/TaskHome'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

export default function LoginContainer(props) {
  const {} = props
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [robotArray, setRobotArray] = useState(null)
  // redux
  const api_key_setted = useSelector((state) => state.auth.api_key_setted)
  const refreshBot = useSelector((state) => state.bot.refreshBot)
  const dispatch = useDispatch()
  const setRefreshBot = (value) => dispatch.bot.setRefreshBot(value)

  const getRobot = async (body) => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.getRobot(body)
      setIsWaiting(false)
      console.log('result', result)
      setRobotArray(result.data)
      return result
    } catch (error) {
      console.log('[container/Task/TaskHome] getRobot error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  useEffect(() => {
    getRobot()
    if (refreshBot) setRefreshBot(false)
  }, [refreshBot])

  return (
    <TaskHome
      robotArray={robotArray}
      api_key_setted={api_key_setted}
      setErrorMsg={setErrorMsg}
      errorMsg={errorMsg}
    />
  )
}
