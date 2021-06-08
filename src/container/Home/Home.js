import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import Home from '../../component/Home/Home'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

export default function LoginContainer(props) {
  const {} = props
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  // redux
  const dispatch = useDispatch()
  const getUser = () => dispatch.auth.getUser()

  useEffect(() => {
    getUser()
  }, [])

  return <Home setErrorMsg={setErrorMsg} errorMsg={errorMsg} />
}
