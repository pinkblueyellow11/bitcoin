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
  const [bonusTotal, setBonusTotal] = useState(null)
  const [bonusInfo, setBonusInfo] = useState(null)
  // redux
  const usdtAmount = useSelector((state) => state.auth.usdt_amount)
  const dispatch = useDispatch()
  const getUser = () => dispatch.auth.getUser()

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


  const getBonusOrder = async () => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.getBonusOrder()
      setIsWaiting(false)
      console.log('getBonusOrder result', result)
      setBonusTotal(result?.data?.sum_surplus)
      setBonusInfo(result?.data)
    } catch (error) {
      console.log('[container/Assets] getBonusOrder error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
    }
  }

  const getBonusDetail = async (params) => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.getBonusDetail(params)
      setIsWaiting(false)
      console.log('getBonusDetail result', result.data.bonus_details)
      //setBonusTotal(result?.data?.sum_surplus)
    } catch (error) {
      console.log('[container/Assets] getBonusDetail error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
    }
  }

  useEffect(() => {
    console.log('bonusInfo', bonusInfo)
    if (!Array.isArray(bonusInfo?.bonus_orders) || bonusInfo?.bonus_orders.length === 0) return
    let idArray = []
    bonusInfo.bonus_orders.map((i) => idArray.push(i.bonus_order_id))
    const params = { bonus_order_ids: idArray }
    getBonusDetail(params)
  }, [bonusInfo])

  useEffect(() => {
    console.log('執行 getWalletHistory')
    getWalletHistory()
    getBonusOrder()
  }, [])


  return <Assets getUser={getUser} getBonusOrder={getBonusOrder} getWalletHistory={getWalletHistory} usdtAmount={usdtAmount} bonusTotal={bonusTotal} walletHistory={walletHistory} setErrorMsg={setErrorMsg} errorMsg={errorMsg} isWaiting={isWaiting} />
}
