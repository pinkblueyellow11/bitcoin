import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import Withdrawal from '../../component/Assets/Withdrawal'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

const INVALID_TOKEN = 401002

export default function LoginContainer(props) {
  const { } = props
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [usdtTrans, setUsdtTrans] = useState(null)

  //燃料提幣
  const drawCoin = async (body) => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.drawCoin(body)
      setIsWaiting(false)
      return result
    } catch (error) {
      console.log('[container/Home] getCoinCost error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  //獎金提幣
  const bonusApplyWithdrawal = async (body) => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.bonusApplyWithdrawal(body)
      setIsWaiting(false)
      return result
    } catch (error) {
      console.log('[container/Home] bonusApplyWithdrawal error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  //燃料提幣紀錄
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

  //獎金提幣紀錄
  const getBonusRecord = async () => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.getBonusRecord()
      setIsWaiting(false)
      console.log('getBonusRecord result', result)
      setUsdtTrans(result.data)
    } catch (error) {
      console.log('[container/Assets/Withdrawal] getBonusRecord error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }


  useEffect(() => {
    console.log('執行 getBonusRecord')
    getBonusRecord()
  }, [])

  return <Withdrawal usdtTrans={usdtTrans} getBonusRecord={getBonusRecord} bonusApplyWithdrawal={bonusApplyWithdrawal} drawCoin={drawCoin} getUsdtTrans={getUsdtTrans} setErrorMsg={setErrorMsg} errorMsg={errorMsg} isWaiting={isWaiting} />
}
