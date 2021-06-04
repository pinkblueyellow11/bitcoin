import React, { Component, useState } from 'react'
import SignIn from '../../component/SignIn/SignIn'
import agent from '../../lib/agent'
import { ERROR_STATUS } from '../../constant/signIn'

export default function LoginContainer(props) {
  const {} = props
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const sendEmail = async (body) => {
    setIsWaiting(true)
    try {
      console.log('body', body)
      const result = await agent.Auth.registerVerifyEmail(body)
      console.log('result', result)
      setIsWaiting(false)
      // if (result.data.success) getRiderInfo()
      return result.data
    } catch (error) {
      console.log('error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  return <SignIn sendEmail={sendEmail} isWaiting={isWaiting} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
}