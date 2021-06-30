import React, { Component, useState } from 'react'
import SignIn from '../../component/SignIn/SignIn'
import agent from '../../lib/agent'
import { ERROR_STATUS } from '../../constant/signIn'

export default function LoginContainer(props) {
  const { } = props
  const id = props?.route?.params?.id // id from deepLink
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const sendEmail = async (body) => {
    setIsWaiting(true)
    try {
      const result = await agent.Auth.registerVerifyEmail(body)
      setIsWaiting(false)
      console.log('result', result)
      return result.data
    } catch (error) {
      console.log('[container/SignIn] sendEmail error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  return <SignIn id={id} sendEmail={sendEmail} isWaiting={isWaiting} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
}
