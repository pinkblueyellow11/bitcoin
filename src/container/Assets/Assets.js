import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import Assets from '../../component/Assets/Assets'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

const INVALID_TOKEN = 401002

export default function LoginContainer(props) {
  const {} = props
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  return <Assets setErrorMsg={setErrorMsg} errorMsg={errorMsg} />
}
