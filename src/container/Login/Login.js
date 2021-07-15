import React, { Component, useState, useEffect } from 'react'
import Login from '../../component/Login/Login'
import { ERROR_STATUS } from '../../constant/signIn'
import { connect, useSelector, useDispatch } from 'react-redux'
import agent, { setAxiosTokens, clearAxiosTokens } from '../../lib/agent'

export default function LoginContainer(props) {
  const { } = props
  //const { params } = props.navigation.state
  //console.log('LoginContainer params', params)
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  // redux
  const token = useSelector((state) => state.register.token)
  const dispatch = useDispatch()
  const setToken = (token) => dispatch.register.setToken(token)
  const setrefreshToken = (token) => dispatch.register.setRefreshToken(token)

  const logOut = () => {
    dispatch.register.setToken(null)
  }

  const logIn = async (body) => {
    setIsWaiting(true)
    try {
      const result = await agent.Auth.logIn(body)
      console.log('logIn result', result)
      setIsWaiting(false)
      setToken(result.data.token)
      setrefreshToken(result.data.refresh_token)
      setAxiosTokens(result.data.token)
      return result
    } catch (error) {
      console.log('[container/MyAccount] logIn error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  return (
    <Login
      token={token}
      logIn={logIn}
      logOut={logOut}
      isWaiting={isWaiting}
      errorMsg={errorMsg}
      setErrorMsg={setErrorMsg}
    />
  )
}
