import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import Assets from '../../component/Assets/Assets'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

const INVALID_TOKEN = 401002

export default function LoginContainer(props) {
  const { } = props
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [walletHistory, setWalletHistory] = useState(null)

  const getWalletHistory = async () => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.getWalletHistory()
      setIsWaiting(false)
      setWalletHistory(result.data)
    } catch (error) {
      console.log('[container/Assets] getWalletHistory error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  useEffect(() => {
    console.log('執行 getWalletHistory')
    getWalletHistory()
  }, [])

  return <Assets walletHistory={walletHistory} setErrorMsg={setErrorMsg} errorMsg={errorMsg} isWaiting={isWaiting} />
}
