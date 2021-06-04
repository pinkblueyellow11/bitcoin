import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import TaskHome from '../../component/Task/TaskHome'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

export default function LoginContainer(props) {
  const {} = props
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  return <TaskHome setErrorMsg={setErrorMsg} errorMsg={errorMsg} />
}
