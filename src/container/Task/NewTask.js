import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import NewTask from '../../component/Task/NewTask'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

export default function LoginContainer(props) {
  const {} = props
  const { chooseCoinTypeValue } = props.route.params
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  // redux
  const dispatch = useDispatch()
  const setRefreshBot = (value) => dispatch.bot.setRefreshBot(value)

  const newRobot = async (body) => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.newRobot(body)
      setIsWaiting(false)
      setRefreshBot(true)
      return result
    } catch (error) {
      console.log('[container/Task/NewTask] newRobot error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  return (
    <NewTask
      chooseCoinTypeValue={chooseCoinTypeValue}
      newRobot={newRobot}
      setErrorMsg={setErrorMsg}
      errorMsg={errorMsg}
    />
  )
}
