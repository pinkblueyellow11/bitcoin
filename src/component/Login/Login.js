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
  AsyncStorage,
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
import { FONT_WEIGHT } from '../../constant/componentProps/typography'
import config from '../../constant/config'
import ForgetPasswordModal from '../ForgetPassword/ForgetPassword'
import { askPermissionOriginal } from '../../lib/appSetting'
import * as Permissions from 'expo-permissions'

const { isDevEnv } = config
const INPUT_FIELD = {
  account: 'account',
  password: 'password',
}

export default function Login(props) {
  const { logIn, sendForgetPasswordEmail, isWaiting, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()
  const [accountValue, setAccountValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)
  const [activeSubmit, setActiveSubmit] = useState(false)
  // Forget Password Modal
  const [showModal, setShowModal] = useState(false)

  const storeLogin = async () => {
    try {
      const data = {
        email: accountValue,
        password: passwordValue,
      }
      console.log('data', data)
      await AsyncStorage.setItem(config.ASYNC_STORAGE.LOGIN_INFO, JSON.stringify(data))
    } catch (error) {
      console.log('[components/Login] Set store error', error)
    }
  }

  const handleSubmit = async () => {
    const body = {
      email: accountValue,
      password: passwordValue,
    }
    console.log('body', body)
    const result = await logIn(body)
    console.log('result', result)
    if (result.data !== null) {
      setErrorMsg(null)
      storeLogin()
      navigation.navigate(screenName.Home)
    }
  }

  const handleForgetPasswordSubmit = async (email) => {
    const body = {
      email: email,
    }
    console.log('body', body)
    const result = await sendForgetPasswordEmail(body)
    console.log('result', result)
    if (result.message === null) {
      setErrorMsg(null)
      navigation.navigate('TabHome')
    }
  }
  console.log('accountValue', accountValue)

  useEffect(() => {
    if (accountValue === '' || passwordValue === '') {
      setActiveSubmit(false)
    } else {
      setActiveSubmit(true)
    }
  }, [accountValue, passwordValue])

  useEffect(() => {
    if (errorMsg === null) return
    Alert.alert('錯誤訊息', errorMsg, [
      {
        text: '確定',
        onPress: () => {},
      },
    ])
    setErrorMsg(null)
  }, [errorMsg])

  useEffect(() => {
    ;(async () => {
      try {
        const result = await AsyncStorage.getItem(config.ASYNC_STORAGE.LOGIN_INFO)
        const parsedResult = result ? JSON.parse(result) : {}
        if (result && parsedResult.email !== '' && parsedResult.password !== '') {
          const body = {
            email: parsedResult.email,
            password: parsedResult.password,
          }
          const result = await logIn(body)
          console.log('result', result)
          if (result.data !== null) {
            setErrorMsg(null)
            navigation.navigate('TabHome')
          }
        }
      } catch (error) {
        console.log('[components/Login] get store length Error', error)
      }
    })()
  }, [])

  return (
    <Container style={{ paddingTop: Constants.statusBarHeight, backgroundColor: Colors.mainBgColor }}>
      <StatusBar style="light" backgroundColor="transparent" />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <ScrollView style={[{ paddingHorizontal: componentProps.contentPadding }]}>
            <Spacer size={24} flex={0} />
            <Text style={[componentProps.fontH1, { color: Colors.brandText }]}>登入</Text>
            <Spacer size={24} flex={0} />
            <Item
              style={{ position: 'relative', borderBottomColor: 'transparent' }}
              focus={focusedInput === INPUT_FIELD.account}
            >
              <Image
                style={{ marginLeft: componentProps.mediumPadding }}
                source={require('../../assets/icon/userBlue.png')}
              ></Image>
              <Input
                style={{ marginLeft: componentProps.mediumPadding, color: 'white' }}
                placeholder="請輸入Email"
                placeholderTextColor={Colors.placeholderTColor}
                value={accountValue}
                onChangeText={setAccountValue}
                onFocus={() => setFocusedInput(INPUT_FIELD.account)}
                onBlur={() => setFocusedInput(null)}
              />
              <View style={{ position: 'absolute', top: 38, width: '100%' }}>
                <Image style={{ width: '100%' }} source={require('../../assets/images/path.png')}></Image>
              </View>
            </Item>
            <Spacer size={24} flex={0} />
            <Item
              style={{ position: 'relative', borderBottomColor: 'transparent' }}
              focus={focusedInput === INPUT_FIELD.password}
            >
              <Image
                style={{ marginLeft: componentProps.mediumPadding }}
                source={require('../../assets/icon/passwordBlue.png')}
              ></Image>
              <Input
                style={{ marginLeft: componentProps.mediumPadding, color: 'white' }}
                placeholder="請輸入密碼"
                placeholderTextColor={Colors.placeholderTColor}
                value={passwordValue}
                onChangeText={setPasswordValue}
                onFocus={() => setFocusedInput(INPUT_FIELD.password)}
                onBlur={() => setFocusedInput(null)}
                secureTextEntry={true}
              />
              <View style={{ position: 'absolute', top: 38, width: '100%' }}>
                <Image style={{ width: '100%' }} source={require('../../assets/images/path.png')}></Image>
              </View>
            </Item>
            <Spacer size={24} flex={0} />
            <Pressable style={{ paddingVertical: 8 }} onPress={() => setShowModal(true)}>
              <Text style={[componentProps.fontBodySmall, { color: Colors.grayText, textAlign: 'right' }]}>
                忘記密碼?
              </Text>
            </Pressable>
            <Spacer size={32} flex={0} />
            <Button
              full
              disabled={!activeSubmit}
              style={{
                borderRadius: componentProps.borderRadius,
                borderColor: Colors.brandText,
                borderWidth: 2,
              }}
              onPress={handleSubmit}
            >
              <Text style={[componentProps.fontBodyMedium1, { color: 'white' }]}>登入</Text>
            </Button>
            <Spacer size={24} flex={0} />
            <Pressable style={{ paddingVertical: 8 }} onPress={() => navigation.navigate('SignIn')}>
              <Text
                style={[componentProps.fontBodySmall, { color: Colors.brandDanger, textAlign: 'center' }]}
              >
                <Text style={{ color: 'white' }}>還沒有帳號，趕快 </Text>註冊
                <Text style={{ color: 'white' }}> !</Text>
              </Text>
            </Pressable>
            <Spacer size={12} flex={0} />
            <Text style={styles.version}>Version {Constants.nativeAppVersion}</Text>
            {isDevEnv && (
              <Pressable transparent onPress={() => navigation.push(screenName.styleguideHome)}>
                <Text style={{ fontSize: 10, color: 'white' }}>styleguide</Text>
              </Pressable>
            )}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
      <ForgetPasswordModal isOpen={showModal} onClose={() => setShowModal(false)}></ForgetPasswordModal>
    </Container>
  )
}

const styles = StyleSheet.create({
  version: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: FONT_WEIGHT.regular,
    color: 'white',
    textAlign: 'center',
  },
})
