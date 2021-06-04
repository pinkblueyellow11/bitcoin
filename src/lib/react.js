import { useEffect, useRef } from 'react'
import { BackHandler } from 'react-native'

/**
 * @param {*} callback
 * @param {*} delay
 */
export function useInterval(callback, delay) {
  const savedCallback = useRef()

  // 保存新回调
  useEffect(() => {
    savedCallback.current = callback
  })

  // 建立 interval
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef()

  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current
}

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
