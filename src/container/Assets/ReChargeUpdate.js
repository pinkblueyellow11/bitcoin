import React, { Component, useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking } from 'react-native'
import ReChargeUpdate from '../../component/Assets/ReChargeUpdate'
import agent from '../../lib/agent'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR_STATUS } from '../../constant/signIn'
import Constants from 'expo-constants'

const INVALID_TOKEN = 401002

export default function LoginContainer(props) {
  const { } = props
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const upReceipt = async (formData) => {
    setIsWaiting(true)
    try {
      const result = await agent.bot.upReceipt(formData)
      setIsWaiting(false)
      return result
    } catch (error) {
      console.log('error', error)
      //setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  return <ReChargeUpdate upReceipt={upReceipt} isWaiting={isWaiting} setErrorMsg={setErrorMsg} errorMsg={errorMsg} />
}
