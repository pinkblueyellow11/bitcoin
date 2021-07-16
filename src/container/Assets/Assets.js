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


  // const getBonusOrder = async () => {
  //   setIsWaiting(true)
  //   try {
  //     const result = await agent.bot.getBonusOrder()
  //     setIsWaiting(false)
  //     console.log('getBonusOrder result', result)
  //     setBonusTotal(result?.data?.sum_surplus)
  //     setBonusInfo(result?.data)
  //   } catch (error) {
  //     console.log('[container/Assets] getBonusOrder error', error)
  //     setErrorMsg(ERROR_STATUS[error.status])
  //     setIsWaiting(false)
  //   }
  // }

  const getBonusDetail = async () => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.getBonusDetail()
      setIsWaiting(false)
      console.log('getBonusDetail result', result.data)
      setBonusInfo(result?.data?.bonus_details)
    } catch (error) {
      console.log('[container/Assets] getBonusDetail error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
    }
  }


  useEffect(() => {
    getWalletHistory()
    getBonusDetail()
  }, [])


  return <Assets bonusInfo={bonusInfo} getBonusDetail={getBonusDetail} getUser={getUser} getWalletHistory={getWalletHistory} usdtAmount={usdtAmount} bonusTotal={bonusTotal} walletHistory={walletHistory} setErrorMsg={setErrorMsg} errorMsg={errorMsg} isWaiting={isWaiting} />
}
