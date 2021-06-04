import React, { Component, useState, useEffect } from 'react'
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Pressable,
  Keyboard,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import componentProps from '../../constant/componentProps'
import { useNavigation } from '@react-navigation/native'
import screenName from '../../constant/screenName'
import Colors from '../../../native-base-theme/variables/commonColor'
import Constants from 'expo-constants'
import { Button, Item, Input, Container, Content, Label, Header, Left, Body, Right } from 'native-base'
import { StatusBar } from 'expo-status-bar'
import Spacer from '../UI/Spacer'
import config from '../../constant/config'
import Modal from 'react-native-modal'
import { isValidTaiwanPhone } from '../../lib/string'
import agent, { setAxiosTokens, clearAxiosTokens } from '../../lib/agent'
import { ERROR_STATUS } from '../../constant/signIn'

const INPUT_FIELD = {
  email: 'email',
  verifyCode: 'verifyCode',
  passwordValue: 'passwordValue',
}

function ForgetPasswordModal(props) {
  const { isOpen, onClose } = props
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)
  const [activeSubmit, setActiveSubmit] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    if (email === '' || verifyCode === '' || passwordValue === '') setActiveSubmit(false)
    else {
      setActiveSubmit(true)
    }
  }, [email, verifyCode, passwordValue])

  const sendForgetPasswordEmail = async () => {
    setIsWaiting(true)
    try {
      const body = {
        email: email,
      }
      const result = await agent.Auth.forgetPasswordEmail(body)
      console.log('result', result)
      setIsWaiting(false)
      return result
    } catch (error) {
      console.log('error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      return error
    }
  }

  const sendRePassword = async () => {
    setIsWaiting(true)
    try {
      const body = {
        email: email,
        verify_code: verifyCode,
        new_password: passwordValue,
      }
      console.log('body', body)
      const result = await agent.Auth.rePassword(body)
      console.log('result', result)
      if (result.message === null) {
        Alert.alert('成功', '成功更新密碼', [
          {
            text: '確定',
            onPress: () => onClose(),
          },
        ])
      }
      setIsWaiting(false)
      return result
    } catch (error) {
      console.log('error', error)
      setErrorMsg(ERROR_STATUS[error.status])
      setIsWaiting(false)
      Alert.alert('失敗', errorMsg, [
        {
          text: '確定',
          onPress: () => setVerifyCode(''),
        },
      ])
      return error
    }
  }

  return (
    <View>
      <Modal
        isVisible={isOpen}
        backdropOpacity={0}
        style={[componentProps.RNModal.bottom, { marginTop: Constants.statusBarHeight }]}
      >
        <ScrollView
          style={[
            styles.empty,
            {
              backgroundColor: Colors.mainBgColor,
              borderRadius: componentProps.borderRadius,
              borderWidth: 0.5,
              borderTopColor: 'white',
            },
          ]}
        >
          <View style={styles.modalHeader}>
            <Pressable transparent onPress={onClose} style={styles.empty}>
              <Image source={require('../../assets/icon/closeWhite.png')} />
            </Pressable>
            <View style={styles.empty}>
              <Text style={[componentProps.fontBodySmall2, { color: 'white', alignSelf: 'center' }]}>
                忘記密碼
              </Text>
            </View>
            <View style={styles.empty}></View>
          </View>
          <View style={{ paddingHorizontal: componentProps.contentPadding, paddingTop: 20 }}>
            <Item
              style={{ position: 'relative', borderBottomColor: 'transparent' }}
              focus={focusedInput === INPUT_FIELD.email}
            >
              {/* <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.brandPrimary,
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                  marginLeft: 16,
                }}
              >
                <Text style={{ color: 'white' }}>+886</Text>
              </View> */}
              <Input
                style={{ marginLeft: componentProps.mediumPadding, color: 'white' }}
                placeholder="請輸入Email"
                placeholderTextColor={Colors.placeholderTColor}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedInput(INPUT_FIELD.email)}
                onBlur={() => setFocusedInput(null)}
              />
              <View style={{ position: 'absolute', top: 38, width: '100%' }}>
                <Image style={{ width: '100%' }} source={require('../../assets/images/path.png')}></Image>
              </View>
            </Item>
            <Spacer size={8} flex={0} />
            {errorMsg && (
              <Text style={[componentProps.fontError, { color: Colors.brandDanger }]}>{errorMsg}</Text>
            )}
            <Spacer size={32} flex={0} />
            <Item
              style={{ borderBottomColor: Colors.brandPrimary }}
              focus={focusedInput === INPUT_FIELD.phoneNumber}
            >
              <Button
                style={{
                  borderWidth: 1,
                  borderColor: Colors.brandPrimary,
                  paddingHorizontal: 6,
                }}
                onPress={sendForgetPasswordEmail}
              >
                <Text style={{ color: 'white' }}>寄送驗證碼</Text>
              </Button>
              <Input
                style={{ marginLeft: componentProps.mediumPadding, color: 'white' }}
                placeholder="請輸入email驗證碼"
                placeholderTextColor={Colors.placeholderTColor}
                value={verifyCode}
                onChangeText={setVerifyCode}
                onFocus={() => setFocusedInput(INPUT_FIELD.verifyCode)}
                onBlur={() => {
                  setFocusedInput(null)
                }}
              />
            </Item>
            <Spacer size={32} flex={0} />
            <Item
              style={{ borderBottomColor: Colors.brandPrimary }}
              focus={focusedInput === INPUT_FIELD.password}
            >
              <Image
                style={{ marginLeft: componentProps.mediumPadding }}
                source={require('../../assets/icon/passwordBlue.png')}
              ></Image>
              <Input
                style={{ marginLeft: componentProps.mediumPadding, color: 'white' }}
                placeholder="請輸入密碼(8~20碼,限英數或_)"
                placeholderTextColor={Colors.placeholderTColor}
                placeholderTextFo
                value={passwordValue}
                onChangeText={setPasswordValue}
                onFocus={() => setFocusedInput(INPUT_FIELD.password)}
                onBlur={() => setFocusedInput(null)}
                secureTextEntry={!isShowPassword}
              />
              <Pressable
                style={[componentProps.inputEndAdornment]}
                onPress={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? (
                  <Image source={require('../../assets/icon/openEye.png')} />
                ) : (
                  <Image source={require('../../assets/icon/closeEye.png')} />
                )}
              </Pressable>
            </Item>
            <Spacer size={32} flex={0} />
            <Button
              full
              disabled={!activeSubmit}
              style={{
                borderRadius: componentProps.borderRadius,
                borderColor: Colors.brandText,
                borderWidth: 2,
              }}
              onPress={sendRePassword}
            >
              <Text style={[componentProps.fontBodyMedium1, { color: 'white' }]}>送出</Text>
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
})
export default ForgetPasswordModal
