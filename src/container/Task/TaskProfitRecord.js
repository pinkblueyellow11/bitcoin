import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import TaskProfitRecord from '../../component/Task/TaskProfitRecord'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'
import dayjs from 'dayjs'
import moment from 'moment'

const SUCCESS_CODE = 200

export default function LoginContainer(props) {
  const { } = props
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [historyArrayList, setHistoryArrayList] = useState(null)

  const getProfitDaily = async () => {
    setIsWaiting(true)
    try {
      const today = dayjs().format('YYYY-MM-DD')
      const twoMonthAgo = moment().subtract(61, 'days').format('YYYY-MM-DD')
      const params = { start_date: twoMonthAgo, end_date: today }
      const result = await agent.bot.getProfitDaily(params)
      if (result.status === SUCCESS_CODE) setHistoryArrayList(result?.data.reverse())
      else setHistoryArrayList(null)
      setIsWaiting(false)
    } catch (error) {
      console.log('[container/Task/TaskHome] getProfitDaily error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      setHistoryArrayList(null)
    }
  }

  useEffect(() => {
    getProfitDaily()
  }, [])

  return <TaskProfitRecord historyArrayList={historyArrayList} isWaiting={isWaiting} setErrorMsg={setErrorMsg} errorMsg={errorMsg} />
}
