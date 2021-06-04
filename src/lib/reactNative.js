import { useState, useEffect } from 'react'
import { BackHandler, Platform } from 'react-native'
import * as Location from 'expo-location'

/**
 * 監聽 Android 按下返回鍵
 * @param {Function} callback
 */
export function useAndroidBack(callback) {
  useEffect(() => {
    const unsubscribe = BackHandler.addEventListener('hardwareBackPress', () => {
      callback()
      return true
    })
    return () => unsubscribe
  }, [])
}

/** Android 返回 Hook */
export function useDisableAndroidBack() {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => BackHandler.removeEventListener('hardwareBackPress', () => true)
  }, [])
}

/** 取得裝置作業系統與其版號 */
export const getOSAndOSVersion = () => {
  const { OS } = Platform
  let OSVersion
  switch (OS) {
    case 'ios':
    case 'android':
      OSVersion = Platform.Version
      break
    default:
      break
  }
  return { OS, OSVersion }
}

/**
 * 取得當前位置
 * @param {number} accuracy 位置精確度，請使用 Location.Accuracy
 */
export const getCurrentPositionAsync = async (accuracy) => {
  const options = {}
  if (Platform.OS === 'android') options.accuracy = Location.Accuracy.High
  if (Location.Accuracy[accuracy]) options.accuracy = accuracy

  try {
    const location = await Location.getCurrentPositionAsync(options)
    return location
  } catch (error) {
    throw error
  }
}

export const isImageBase64 = (base64) => {
  const imageBase64Type = Platform.OS === 'android' ? 'data:application/octet-stream' : 'data:image'
  return typeof base64 === 'string' && base64.includes(imageBase64Type)
}
