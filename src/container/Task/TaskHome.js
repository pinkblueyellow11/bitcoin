import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import TaskHome from '../../component/Task/TaskHome'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

export default function LoginContainer(props) {
  const { } = props
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [robotArray, setRobotArray] = useState(null)
  // redux
  const api_key_setted = useSelector((state) => state.auth.api_key_setted)
  const coinCurrentPrice = useSelector((state) => state.bot.coinCurrentPrice)
  const refreshBot = useSelector((state) => state.bot.refreshBot)
  const dispatch = useDispatch()
  const setRefreshBot = (value) => dispatch.bot.setRefreshBot(value)

  const getRobot = async () => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.getRobot()
      setIsWaiting(false)
      setRobotArray(result.data)
      return result
    } catch (error) {
      console.log('[container/Task/TaskHome] getRobot error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  const closeRobot = async (id, body) => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.closeRobot(id, body)
      setIsWaiting(false)
      getRobot()
      return result
    } catch (error) {
      console.log('[container/Task/TaskHome] closeRobot error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  const closeRobotPurchase = async (id, body) => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.closeRobotPurchase(id, body)
      setIsWaiting(false)
      getRobot()
      return result
    } catch (error) {
      console.log('[container/Task/TaskHome] closeRobotPurchase error', error)
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
      closeRobot={closeRobot}
      closeRobotPurchase={closeRobotPurchase}
      robotArray={robotArray}
      api_key_setted={api_key_setted}
      coinCurrentPrice={coinCurrentPrice}
      setErrorMsg={setErrorMsg}
      errorMsg={errorMsg}
      isWaiting={isWaiting}
      setIsWaiting={setIsWaiting}
    />
  )
}
