import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import TaskRecord from '../../component/Task/TaskRecord'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

export default function LoginContainer(props) {
  const { } = props
  const { groupRobotId, robotArray } = props.route.params
  const [groupRobotsTransList, setGroupRobotsTransList] = useState(null)
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const getGroupRobotsTrans = async () => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.getGroupRobotsTrans(groupRobotId)
      setIsWaiting(false)
      console.log('getGroupRobotsTrans result', result)
      setGroupRobotsTransList(result?.data)
      //return result
    } catch (error) {
      console.log('[container/Task/TaskRecord] getGroupRobotsTrans error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  useEffect(() => {
    if (!groupRobotId) return
    getGroupRobotsTrans()
  }, [groupRobotId])


  return <TaskRecord robotArray={robotArray} groupRobotId={groupRobotId} groupRobotsTransList={groupRobotsTransList} setErrorMsg={setErrorMsg} errorMsg={errorMsg} isWaiting={isWaiting} />
}
