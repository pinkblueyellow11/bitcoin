import React, { Component, useState } from 'react'
import CoverUp from '../../component/Task/CoverUp'
import agent from '../../lib/agent'
import { ERROR_STATUS } from '../../constant/signIn'
import { useDispatch, useSelector } from 'react-redux'

export default function LoginContainer(props) {
  const { robot_id } = props.route.params
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  // redux
  const dispatch = useDispatch()
  const setRefreshBot = (value) => dispatch.bot.setRefreshBot(value)

  const manualPurchase = async (body) => {
    setIsWaiting(true)
    try {
      console.log('robot_id', robot_id)
      console.log('body', body)
      const result = await agent.bot.manualPurchase(robot_id, body)
      setIsWaiting(false)
      setRefreshBot(true)
      return result
    } catch (error) {
      console.log('[container/Task/CoverUp] closeRobotPurchase error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }


  return (
    <CoverUp
      isWaiting={isWaiting}
      errorMsg={errorMsg}
      setErrorMsg={setErrorMsg}
      manualPurchase={manualPurchase}
    />
  )
}
