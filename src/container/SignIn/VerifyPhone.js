import React, { Component, useState } from 'react'
import VerifyPhone from '../../component/SignIn/VerifyPhone'
import agent from '../../lib/agent'
import { ERROR_STATUS } from '../../constant/signIn'

export default function LoginContainer(props) {
  const { isPhoneAccount, emailAccount, passwordValue, introducCode, account_prefix } = props.route.params
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const register = async (body) => {
    setIsWaiting(true)
    console.log('register body', body)
    try {
      const result = await agent.Auth.register(body)
      console.log('register result', result)
      setIsWaiting(false)
      return result
    } catch (error) {
      console.log('register error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  return (
    <VerifyPhone
      register={register}
      isPhoneAccount={isPhoneAccount}
      emailAccount={emailAccount}
      passwordValue={passwordValue}
      introducCode={introducCode}
      account_prefix={account_prefix}
      isWaiting={isWaiting}
      errorMsg={errorMsg}
      setErrorMsg={setErrorMsg}
    />
  )
}
