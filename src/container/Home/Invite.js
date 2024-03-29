import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import Invite from '../../component/Home/Invite'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

export default function LoginContainer(props) {
  const { } = props
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  // redux
  const recommend_code = useSelector((state) => state.auth.recommend_code)

  return <Invite recommend_code={recommend_code} setErrorMsg={setErrorMsg} errorMsg={errorMsg} />
}
