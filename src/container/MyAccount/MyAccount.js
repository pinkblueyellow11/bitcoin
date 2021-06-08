import React, { Component, useState, useEffect } from 'react'
import MyAccount from '../../component/MyAccount/MyAccount'
import { ERROR_STATUS } from '../../constant/signIn'
import { connect, useSelector, useDispatch } from 'react-redux'
import agent, { setAxiosTokens, clearAxiosTokens } from '../../lib/agent'

export default function LoginContainer(props) {
  const {} = props
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  // redux
  const account = useSelector((state) => state.auth.account)
  const recommend_code = useSelector((state) => state.auth.recommend_code)
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch.register.setToken(null)
  }

  return (
    <MyAccount
      account={account}
      recommend_code={recommend_code}
      logOut={logOut}
      userInfo={userInfo}
      isWaiting={isWaiting}
      errorMsg={errorMsg}
      setErrorMsg={setErrorMsg}
    />
  )
}
