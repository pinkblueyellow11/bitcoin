import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import TaskDetail from '../../component/Task/TaskDetail'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

export default function LoginContainer(props) {
  const { } = props
  const { id, profitAndLossPeasant, currentPrice, totalProfit } = props.route.params
  const [taskDetail, setTaskDetail] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  // redux
  const refreshBot = useSelector((state) => state.bot.refreshBot)
  const dispatch = useDispatch()
  const setRefreshBot = (value) => dispatch.bot.setRefreshBot(value)

  const getRobotDetail = async (params) => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.getRobotDetail(params)
      setIsWaiting(false)
      const index = result.data.length - 1
      console.log('getRobotDetail', result.data)
      console.log('getRobotDetail2', result.data[index])
      setTaskDetail(result.data[index])
      setRefreshBot(true)
    } catch (error) {
      console.log('[container/Task/TaskDetail] getRobotDetail error', error)
      //setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      //return error
    }
  }

  const closeRobot = async (id, body) => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.closeRobot(id, body)
      setIsWaiting(false)
      getRobotDetail(id)
      return result
    } catch (error) {
      console.log('[container/Task/TaskDetail] closeRobot error', error)
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
      getRobotDetail(id)
      return result
    } catch (error) {
      console.log('[container/Task/TaskDetail] outOfWarehouse error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  useEffect(() => {
    console.log('id', id)
    if (id) getRobotDetail(id)
  }, [id])

  return (
    <TaskDetail getRobotDetail={getRobotDetail} outOfWarehouse={outOfWarehouse} closeRobot={closeRobot} taskDetail={taskDetail} profitAndLossPeasant={profitAndLossPeasant} currentPrice={currentPrice} totalProfit={totalProfit} setErrorMsg={setErrorMsg} errorMsg={errorMsg} isWaiting={isWaiting} setIsWaiting={setIsWaiting} />
  )
}
