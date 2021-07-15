import React, { Component, useState, useEffect } from 'react'
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Pressable,
  Keyboard,
  ScrollView,
  ImageBackground,
  AsyncStorage,
  Clipboard,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import componentProps from '../../constant/componentProps'
import { useNavigation } from '@react-navigation/native'
import screenName from '../../constant/screenName'
import Colors from '../../../native-base-theme/variables/commonColor'
import Constants from 'expo-constants'
import { Button, Item, Input, Container, Content, Header, Left, Body, Right } from 'native-base'
import { StatusBar } from 'expo-status-bar'
import Spacer from '../UI/Spacer'
import { FONT_WEIGHT } from '../../constant/componentProps/typography'
import config from '../../constant/config'
import { Feather, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'

const INPUT_FIELD = {
  account: 'account',
  password: 'password',
}

const iconSize = 18

const SUCCESS_CODE = 200

const PHONE_TYPE = {
  tw: '886',
  cn: '86'
}

function Login(props) {
  const { token, logIn, logOut, isWaiting, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()
  const [accountValue, setAccountValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)
  const [activeSubmit, setActiveSubmit] = useState(false)
  const [isPhoneAccount, setIsPhoneAccount] = useState(true)
  const [selectedValue, setSelectedValue] = useState(PHONE_TYPE.tw)

  const storeLogout = async () => {
    try {
      const data = {
        isPhoneAccount: true,
        account_prefix: '',
        account: '',
        password: '',
      }
      await AsyncStorage.setItem(config.ASYNC_STORAGE.LOGIN_INFO, JSON.stringify(data))
    } catch (error) {
      console.log('[components/MyAccount] Set store error', error)
    }
  }

  const logout = async () => {
    storeLogout()
    logOut()
  }

  const storeLogin = async () => {
    try {
      const data = {
        isPhoneAccount: isPhoneAccount,
        account_prefix: selectedValue,
        account: accountValue,
        password: passwordValue,
      }
      await AsyncStorage.setItem(config.ASYNC_STORAGE.LOGIN_INFO, JSON.stringify(data))
    } catch (error) {
      console.log('[components/MyAccount] Set store error', error)
    }
  }

  const handleSubmit = async () => {
    const body = {
      account: accountValue,
      password: passwordValue,
    }
    if (isPhoneAccount) body.account_prefix = selectedValue
    const result = await logIn(body)
    if (result.status === SUCCESS_CODE) {
      setErrorMsg(null)
      storeLogin()
      setAccountValue('')
      setPasswordValue('')
      navigation.reset(screenName.Home)
    }
  }

  useEffect(() => {
    if (accountValue === '' || passwordValue === '') {
      setActiveSubmit(false)
    } else {
      setActiveSubmit(true)
    }
  }, [accountValue, passwordValue])

  useEffect(() => {
    if (errorMsg !== null) {
      console.log('errorMsg', errorMsg)
      Alert.alert('錯誤訊息', errorMsg, [
        {
          text: '確定',
          onPress: () => { },
        },
      ])
      setErrorMsg(null)
    }
  }, [errorMsg])

  useEffect(() => {
    ; (async () => {
      try {
        const result = await AsyncStorage.getItem(config.ASYNC_STORAGE.LOGIN_INFO)
        const parsedResult = result ? JSON.parse(result) : {}
        if (result && parsedResult.account && parsedResult.password) {
          const body = {
            account: parsedResult.account,
            password: parsedResult.password,
          }
          if (parsedResult.isPhoneAccount) body.account_prefix = parsedResult.account_prefix
          const result = await logIn(body)
          if (!result.message) {
            setErrorMsg(null)
            navigation.navigate(screenName.Home)
          }
        }
      } catch (error) {
        console.log('[components/MyAccount] get store length Error', error)
      }
    })()
  }, [])

  return (
    <Container style={{}}>
      <Header transparent>
        <StatusBar style="dark" backgroundColor="transparent" />
        <Left style={{ flex: 1 }}></Left>
        <Body></Body>
        <Right></Right>
      </Header>
      <Content
        bounces={false}
        contentContainerStyle={[{ flex: 1, paddingHorizontal: componentProps.defaultPadding }]}
      >
        <ScrollView
          style={{
            backgroundColor: 'white',
            flex: 1,
            paddingHorizontal: 33,
          }}
        >
          <Text style={[componentProps.fontBodyBold3, { color: Colors.brandText }]}>登入</Text>
          <Spacer size={20} flex={0} />
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              onPress={() => setIsPhoneAccount(true)}
              style={{
                borderColor: Colors.mainColor,
                borderWidth: 1,
                borderRightWidth: 0,
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: isPhoneAccount ? Colors.mainBgColor : 'white',
              }}
            >
              <Text style={[componentProps.fontBodySmall6, { color: Colors.mainColor }]}>手機</Text>
            </Pressable>
            <Pressable
              onPress={() => setIsPhoneAccount(false)}
              style={{
                borderColor: Colors.mainColor,
                borderWidth: 1,
                borderLeftWidth: 0,
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: isPhoneAccount ? 'white' : Colors.mainBgColor,
              }}
            >
              <Text style={[componentProps.fontBodySmall6, { color: Colors.mainColor }]}>Email</Text>
            </Pressable>
          </View>
          <Spacer size={16} flex={0} />
          {isPhoneAccount && (
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.brandPrimary,
              }}
            >
              <Picker
                note
                mode="dropdown"
                style={{ width: '100%' }}
                selectedValue={selectedValue}
                onValueChange={(value) => setSelectedValue(value)}
              >
                <Picker.Item label="+886" value={PHONE_TYPE.tw} />
                <Picker.Item label="+86" value={PHONE_TYPE.cn} />
              </Picker>
            </View>
          )}
          <Spacer size={9} flex={0} />

          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.account}>
            <MaterialCommunityIcons
              name="account-outline"
              size={iconSize}
              color={Colors.mainColor}
              style={{ marginLeft: 16 }}
            />
            <Input
              style={{ marginLeft: componentProps.mediumPadding, color: Colors.mainColor }}
              placeholder={isPhoneAccount ? '請輸入手機' : '請輸入Email'}
              placeholderTextColor={Colors.placeholderTColor}
              value={accountValue}
              onChangeText={setAccountValue}
              onFocus={() => setFocusedInput(INPUT_FIELD.account)}
              onBlur={() => setFocusedInput(null)}
            />
          </Item>
          <Spacer size={22} flex={0} />
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.passwordValue}>
            <AntDesign name="lock" size={iconSize} color={Colors.mainColor} style={{ marginLeft: 16 }} />
            <Input
              style={{ marginLeft: componentProps.mediumPadding, color: Colors.mainColor }}
              placeholder="請輸入密碼"
              placeholderTextColor={Colors.placeholderTColor}
              value={passwordValue}
              onChangeText={setPasswordValue}
              onFocus={() => setFocusedInput(INPUT_FIELD.passwordValue)}
              onBlur={() => setFocusedInput(null)}
              secureTextEntry={true}
            />
          </Item>
          <Spacer size={7} flex={0} />
          <Pressable style={{ paddingVertical: 8 }} onPress={() => navigation.navigate(screenName.ForgetPassword)}>
            <Text style={[componentProps.fontBodySmall6, { color: Colors.redText, textAlign: 'right' }]}>
              忘記密碼?
            </Text>
          </Pressable>
          <Spacer size={30} flex={0} />
          <Button
            full
            disabled={!activeSubmit}
            style={{
              borderRadius: componentProps.borderRadius,
              borderColor: Colors.mainColor,
              borderWidth: 1,
              //backgroundColor: Colors.brandPrimary,
            }}
            onPress={handleSubmit}
          >
            <Text
              style={[componentProps.fontBodySmall, { color: activeSubmit ? 'white' : Colors.brandText }]}
            >
              登入
            </Text>
          </Button>
          <Spacer size={24} flex={0} />
          <Pressable style={{ paddingVertical: 8 }} onPress={() => navigation.navigate('SignIn')}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={[componentProps.fontBodySmall, { color: Colors.mainColor }]}>
                還沒有帳號，趕快{' '}
              </Text>
              <Text
                style={[componentProps.fontBodySmall, { color: 'white', backgroundColor: Colors.mainColor }]}
              >
                註冊
              </Text>
              <Text style={[componentProps.fontBodySmall, { color: Colors.mainColor }]}> !</Text>
            </View>
          </Pressable>
          <Spacer size={100} flex={0} />
        </ScrollView>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  itemStyle: {
    position: 'relative',
    borderBottomColor: 'transparent',
    backgroundColor: Colors.inputBgColor,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mainColor,
  },
})

export default Login
