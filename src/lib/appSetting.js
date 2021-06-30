import { Platform, Alert } from 'react-native'
import { Linking } from 'expo'
import * as Permissions from 'expo-permissions'
import * as IntentLauncher from 'expo-intent-launcher'
import { Camera } from 'expo-camera'

export const redirectToAppSetting = (type) => {
  let title = ''
  let onPress

  switch (type) {
    case Permissions.CAMERA:
      title = '神通 要使用你的相機進行拍攝，請至「設定」開啟'
      break
    case Permissions.CAMERA_ROLL:
      title = '神通 要存取你的照片，請至「設定」開啟'
      break
    default:
      title = '「神通」需要開啟權限'
      break
  }

  switch (Platform.OS) {
    case 'ios':
      onPress = () => Linking.openURL('app-settings:')
      break
    case 'android':
      onPress = () => IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APPLICATION_SETTINGS)
      break
    default:
      onPress = () => Alert('系統發生錯誤。')
      break
  }

  Alert.alert(
    title,
    '',
    [
      { text: '取消', style: 'cancel' },
      { text: '確定', onPress: () => onPress() },
    ],
    { cancelable: true },
  )
}

/**
 * 強制性開啟權限，會跳轉裝置 [設定] 頁面
 * @param {string} type expo-permissions type
 */
export const askPermissionForced = async (type) => {
  const logError = (error) => console.log('[lib/appSetting] askPermissionForced error', error)

  let result

  switch (type) {
    case Permissions.CAMERA:
      try {
        result = await Camera.requestPermissionsAsync()
        if (!result.granted && !result.canAskAgain) redirectToAppSetting(Permissions.CAMERA)
      } catch (error) {
        logError(error)
      }
      break
    default:
      break
  }
}

/**
 * 原生詢問權限
 * @param {string} type expo-permissions type
 */
export const askPermissionOriginal = async (type) => {
  const logError = (error) => console.log('[lib/appSetting] askPermissionOriginal error', error)

  let result

  switch (type) {
    case Permissions.CAMERA:
      try {
        result = await Camera.getPermissionsAsync()
        if (!result.granted && result.canAskAgain) await Camera.requestPermissionsAsync()
      } catch (error) {
        logError(error)
      }
      break
    default:
      break
  }
}
