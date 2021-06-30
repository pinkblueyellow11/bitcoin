import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import Home from '../../component/Home/Home'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

export default function LoginContainer(props) {
  const { } = props
  const [coinCost, setCoinCost] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  // redux
  const dispatch = useDispatch()
  const getUser = () => dispatch.auth.getUser()
  const setCoinCurrentPrice = (value) => dispatch.bot.setCoinCurrentPrice(value)


  const getCoinCost = async () => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.getCoinCost()
      setIsWaiting(false)
      console.log('result', result)
      setCoinCost(result.data)
      setCoinCurrentPrice(result.data)
      //return result
    } catch (error) {
      console.log('[container/Home] getCoinCost error', error)
      //setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      //return error
    }
  }

  useEffect(() => {
    getUser()
    getCoinCost()
  }, [])

  return <Home coinCost={coinCost} getCoinCost={getCoinCost} setErrorMsg={setErrorMsg} errorMsg={errorMsg} />
}
