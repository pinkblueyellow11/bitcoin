import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import ReChargeRecord from '../../component/Assets/ReChargeRecord'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'


export default function LoginContainer(props) {
  const { } = props
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [usdtTrans, setUsdtTrans] = useState(null)

  const getUsdtTrans = async () => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.getUsdtTrans()
      setIsWaiting(false)
      setUsdtTrans(result.data)
    } catch (error) {
      console.log('[container/Assets/Withdrawal] getUsdtTrans error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  useEffect(() => {
    console.log('執行 getUsdtTrans')
    getUsdtTrans()
  }, [])

  return <ReChargeRecord usdtTrans={usdtTrans} isWaiting={isWaiting} setErrorMsg={setErrorMsg} errorMsg={errorMsg} />
}
