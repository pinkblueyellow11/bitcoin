import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import Community from '../../component/Home/Community'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

export default function LoginContainer(props) {
  const { } = props
  const [currentProfit, setCurrentProfit] = useState(null)
  const [lastProfit, setLastProfit] = useState(null)
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

  const getProfitGroupThisMonth = async () => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.getProfitGroupThisMonth()
      setIsWaiting(false)
      console.log('getProfitGroupThisMonth result', result)
      setCurrentProfit(result?.data?.profit)
      //return result
    } catch (error) {
      console.log('[container/Home] getProfitGroupThisMonth error', error)
      //setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  const getProfitGroupLastMonth = async () => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.getProfitGroupLastMonth()
      setIsWaiting(false)
      console.log('getProfitGroupLastMonth result', result)
      setLastProfit(result?.data?.profit)
      //return result
    } catch (error) {
      console.log('[container/Home] getProfitGroupLastMonth error', error)
      //setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  useEffect(() => {
    getProfitGroup()
    getProfitGroupThisMonth()
    getProfitGroupLastMonth()
  }, [])

  return <Community lastProfit={lastProfit} currentProfit={currentProfit} profitGroupArray={profitGroupArray} isWaiting={isWaiting} setErrorMsg={setErrorMsg} errorMsg={errorMsg} />
}
