import React, { Component, useState } from 'react'
import VerifyPhone from '../../component/SignIn/VerifyPhone'
import agent from '../../lib/agent'
import { ERROR_STATUS } from '../../constant/signIn'

export default function LoginContainer(props) {
  const { isPhoneAccount, emailAccount, passwordValue, introducCode, selectedValue } = props.route.params
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const register = async (body) => {
    setIsWaiting(true)
    try {
      const result = await agent.Auth.register(body)
      console.log('result', result)
      setIsWaiting(false)
      return result
    } catch (error) {
      console.log('error', error)
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
      selectedValue={selectedValue}
      isWaiting={isWaiting}
      errorMsg={errorMsg}
      setErrorMsg={setErrorMsg}
    />
  )
}