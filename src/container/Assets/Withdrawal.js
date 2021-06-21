import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import Withdrawal from '../../component/Assets/Withdrawal'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

const INVALID_TOKEN = 401002

export default function LoginContainer(props) {
  const {} = props
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const drawCoin = async (body) => {
    setIsWaiting(true)
    try {
      console.log('body', body)
      const result = await agent.bot.drawCoin(body)
      setIsWaiting(false)
      console.log('result', result)
      //return result
    } catch (error) {
      console.log('[container/Home] getCoinCost error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      //return error
    }
  }

  return <Withdrawal drawCoin={drawCoin} setErrorMsg={setErrorMsg} errorMsg={errorMsg} />
}
