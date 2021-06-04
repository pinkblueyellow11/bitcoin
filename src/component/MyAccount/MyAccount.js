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

function MyAccount(props) {
  const { token, logIn, logOut, userInfo, isWaiting, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()
  const [accountValue, setAccountValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)
  const [activeSubmit, setActiveSubmit] = useState(false)
  const [isPhoneAccount, setIsPhoneAccount] = useState(true)
  const [selectedValue, setSelectedValue] = useState('+886')

  const writeToClipboard = async () => {
    await Clipboard.setString(userInfo && userInfo.recommend_code)
    Alert.alert('複製成功！')
  }

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
      console.log('data', data)
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
    console.log('body', body)
    console.log('result', result)
    if (!result.message) {
      setErrorMsg(null)
      storeLogin()
      setAccountValue('')
      setPasswordValue('')
      navigation.navigate(screenName.Home)
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
      Alert.alert('錯誤訊息', errorMsg, [
        {
          text: '確定',
          onPress: () => {},
        },
      ])
      setErrorMsg(null)
    }
  }, [errorMsg])

  useEffect(() => {
    ;(async () => {
      try {
        const result = await AsyncStorage.getItem(config.ASYNC_STORAGE.LOGIN_INFO)
        const parsedResult = result ? JSON.parse(result) : {}
        if (result && parsedResult.account !== '' && parsedResult.password !== '') {
          const body = {
            account: parsedResult.email,
            password: parsedResult.password,
          }
          if (parsedResult.isPhoneAccount) body.account_prefix = parsedResult.account_prefix
          const result = await logIn(body)
          console.log('getItem body', body)
          console.log('result', result)
          if (result.data !== null) {
            //setErrorMsg(null)
            navigation.navigate(screenName.Home)
          }
        }
      } catch (error) {
        console.log('[components/MyAccount] get store length Error', error)
      }
    })()
  }, [])

  useEffect(() => {
    console.log('userInfo', userInfo)
  }, [userInfo])

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
          {token && (
            <>
              <Text style={[componentProps.fontError, { color: Colors.mainColor }]}>帳號</Text>
              <Pressable
                style={{
                  flexDirection: 'row',
                  paddingVertical: componentProps.defaultPadding,
                  borderBottomWidth: 0.25,
                  borderBottomColor: Colors.grayLine,
                  paddingBottom: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                  }}
                >
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={[componentProps.fontBodySmall2, { color: Colors.grayText }]}>
                      {userInfo && userInfo.account}
                    </Text>
                  </View>
                </View>
              </Pressable>
              <Spacer size={16} flex={0} />
              <Text style={[componentProps.fontError, { color: Colors.mainColor }]}>推薦碼</Text>
              <Pressable
                style={{
                  flexDirection: 'row',
                  paddingVertical: componentProps.defaultPadding,
                  borderBottomWidth: 0.25,
                  borderBottomColor: Colors.grayLine,
                }}
                onPress={() => {}}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={[componentProps.fontBodySmall2, { color: Colors.grayText }]}>
                      {userInfo && userInfo.recommend_code}
                    </Text>
                  </View>
                  <Button
                    style={{ backgroundColor: 'transparent', borderColor: 'white', borderWidth: 10 }}
                    onPress={() => writeToClipboard()}
                  >
                    <Feather name="copy" size={20} color={Colors.mainColor} />
                  </Button>
                </View>
              </Pressable>
              <Spacer size={60} flex={0} />
              <Pressable
                style={{
                  flexDirection: 'row',
                  paddingVertical: componentProps.defaultPadding,
                  alignSelf: 'center',
                }}
                onPress={() => logout()}
              >
                <Text style={[componentProps.fontBodySmall2, { color: Colors.redText }]}>登出</Text>
              </Pressable>
            </>
          )}
          {!token && (
            <>
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
                    <Picker.Item label="+886" value="+886" />
                    <Picker.Item label="+86" value="+86" />
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
                  placeholder="請輸入帳號"
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
              <Pressable style={{ paddingVertical: 8 }} onPress={() => {}}>
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
                    style={[
                      componentProps.fontBodySmall,
                      { color: 'white', backgroundColor: Colors.mainColor },
                    ]}
                  >
                    註冊
                  </Text>
                  <Text style={[componentProps.fontBodySmall, { color: Colors.mainColor }]}> !</Text>
                </View>
              </Pressable>
              <Spacer size={100} flex={0} />
            </>
          )}
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

export default MyAccount
