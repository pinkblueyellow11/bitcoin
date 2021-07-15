import React, { Component, useState, useEffect } from 'react'
import ForgetPassword from '../../component/Login/ForgetPassword'
import { ERROR_STATUS } from '../../constant/signIn'
import { connect, useSelector, useDispatch } from 'react-redux'
import agent, { setAxiosTokens, clearAxiosTokens } from '../../lib/agent'

export default function LoginContainer(props) {
  const { } = props
  //const { params } = props.navigation.state
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const sendVerify = async (body) => {
    setIsWaiting(true)
    try {
      const result = await agent.Auth.forgetPasswordEmail(body)
      setIsWaiting(false)
      console.log('sendVerify body', body)
      console.log('sendVerify', result)
      return result
    } catch (error) {
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  const sendRePassword = async (body) => {
    setIsWaiting(true)
    try {
      const result = await agent.Auth.rePassword(body)
      setIsWaiting(false)
      return result
    } catch (error) {
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  return (
    <ForgetPassword
      sendRePassword={sendRePassword}
      sendVerify={sendVerify}
      isWaiting={isWaiting}
      errorMsg={errorMsg}
      setErrorMsg={setErrorMsg}
    />
  )
}
