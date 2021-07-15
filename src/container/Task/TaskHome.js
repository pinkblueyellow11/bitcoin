import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import TaskHome from '../../component/Task/TaskHome'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

const SUCCESS_CODE = 200

export default function LoginContainer(props) {
  const { } = props
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [robotArray, setRobotArray] = useState(null)
  const [profitToday, setProfitToday] = useState(null)
  const [profitMonth, setProfitMonth] = useState(null)
  const [usdtBalance, setUsdtBalance] = useState(null)
  // redux
  const api_key_setted = useSelector((state) => state.auth.api_key_setted)
  const coinCurrentPrice = useSelector((state) => state.bot.coinCurrentPrice)
  const refreshBot = useSelector((state) => state.bot.refreshBot)
  const usdtAmount = useSelector((state) => state.auth.usdt_amount)
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
      console.log('closeRobot result', result)
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

  const outOfWarehouse = async (id) => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.outOfWarehouse(id)
      setIsWaiting(false)
      getRobot()
      return result
    } catch (error) {
      console.log('[container/Task/TaskHome] outOfWarehouse error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  const getProfitToday = async () => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.getProfitToday()
      setIsWaiting(false)
      if (result.status === SUCCESS_CODE) setProfitToday(result?.data?.profit)
      else setProfitToday(null)
    } catch (error) {
      console.log('[container/Task/TaskHome] getProfitToday error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      setProfitToday(null)
    }
  }

  const getProfitMonth = async () => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.getProfitMonth()
      setIsWaiting(false)
      if (result.status === SUCCESS_CODE) setProfitMonth(result?.data?.profit)
      else setProfitMonth(null)
    } catch (error) {
      console.log('[container/Task/TaskHome] getProfitMonth error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      setProfitMonth(null)
    }
  }

  const getUsdtBalance = async () => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.getUsdtBalance()
      setIsWaiting(false)
      if (result.status === SUCCESS_CODE) setUsdtBalance(parseFloat(result?.data?.balance).toFixed(0))
      else setUsdtBalance(null)
      console.log('getUsdtBalance result', result)
    } catch (error) {
      console.log('[container/Task/TaskHome] getUsdtBalance error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      setUsdtBalance(null)
    }
  }

  useEffect(() => {
    getProfitToday()
    getProfitMonth()
    getUsdtBalance()
  }, [])

  useEffect(() => {
    getRobot()
    if (refreshBot) setRefreshBot(false)
  }, [refreshBot])

  return (
    <TaskHome
      getRobot={getRobot}
      closeRobot={closeRobot}
      closeRobotPurchase={closeRobotPurchase}
      outOfWarehouse={outOfWarehouse}
      robotArray={robotArray}
      api_key_setted={api_key_setted}
      coinCurrentPrice={coinCurrentPrice}
      profitToday={profitToday}
      getProfitToday={getProfitToday}
      profitMonth={profitMonth}
      getProfitMonth={getProfitMonth}
      usdtBalance={usdtBalance}
      usdtAmount={usdtAmount}
      getUsdtBalance={getUsdtBalance}
      setErrorMsg={setErrorMsg}
      errorMsg={errorMsg}
      isWaiting={isWaiting}
      setIsWaiting={setIsWaiting}
    />
  )
}
