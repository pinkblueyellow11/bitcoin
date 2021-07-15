import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import Community from '../../component/Home/Community'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

export default function LoginContainer(props) {
  const { } = props
  const [profitGroupArray, setProfitGroupArray] = useState(null)
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const getProfitGroup = async () => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.getProfitGroup()
      setIsWaiting(false)
      console.log('getProfitGroup result', result)
      setProfitGroupArray(result?.data?.group)
      //return result
    } catch (error) {
      console.log('[container/Home] getProfitGroup error', error)
      //setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  useEffect(() => {
    getProfitGroup()
  }, [])

  return <Community profitGroupArray={profitGroupArray} isWaiting={isWaiting} setErrorMsg={setErrorMsg} errorMsg={errorMsg} />
}
