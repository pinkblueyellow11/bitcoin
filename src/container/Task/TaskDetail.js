import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import TaskDetail from '../../component/Task/TaskDetail'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

export default function LoginContainer(props) {
  const { } = props
  const { taskInfo } = props.route.params
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
      setTaskDetail(result.data[0])
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
      getRobotDetail(taskInfo.robot_id)
      return result
    } catch (error) {
      console.log('[container/Task/TaskDetail] closeRobot error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  useEffect(() => {
    console.log('taskInfo', taskInfo)
    if (taskInfo) getRobotDetail(taskInfo.robot_id)
  }, [taskInfo])

  return (
    <TaskDetail closeRobot={closeRobot} taskDetail={taskDetail} taskInfo={taskInfo} setErrorMsg={setErrorMsg} errorMsg={errorMsg} isWaiting={isWaiting} setIsWaiting={setIsWaiting} />
  )
}
