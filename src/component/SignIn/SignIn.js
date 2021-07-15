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
import { Button, Item, Input, Container, Label, Header, Left, Body, Right } from 'native-base'
import { StatusBar } from 'expo-status-bar'
import Spacer from '../UI/Spacer'
import { FONT_WEIGHT } from '../../constant/componentProps/typography'
import config from '../../constant/config'
import CheckBox from '../UI/Checkbox'
import Spinner from 'react-native-loading-spinner-overlay'
import { isValidTaiwanPhone, isValidChainPhone } from '../../lib/string'
import { MaterialIcons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import dayjs from 'dayjs'

const { isDevEnv } = config

const iconSize = 18
const rules = /^[a-zA-Z\d_]{8,20}$/

const INPUT_FIELD = {
  emailAccount: 'emailAccount',
  password: 'password',
  twoPasswordValue: 'twoPasswordValue',
  verifyCode: 'verifyCode',
  coinPasswordValue: 'coinPasswordValue',
  secondCoinPasswordValue: 'secondCoinPasswordValue',
  introducCode: 'introducCode',
}

const PHONE_TYPE = {
  tw: '886',
  cn: '86'
}

export default function SignIn(props) {
  const { id, register, sendEmail, isWaiting, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()
  const [emailAccount, setEmailAccount] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [twoPasswordValue, setTwoPasswordValue] = useState('')
  const [introducCode, setIntroducCode] = useState('')
  const [isCheckedOne, setIsCheckedOne] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)
  const [activeSubmit, setActiveSubmit] = useState(false)
  const [isShowErrorPhone, setIsShowErrorPhone] = useState(false)
  const [isShowErrorPassword, setIsShowErrorPassword] = useState(false)
  const [isShowErrorIntroducCode, setIsShowErrorIntroducCode] = useState(true)
  const [isPhoneAccount, setIsPhoneAccount] = useState(true)
  const [selectedValue, setSelectedValue] = useState(PHONE_TYPE.tw)
  const [isTimer, setIsTimer] = useState(false)
  const [count, setCount] = useState(config.VERIFICATION_COUNTDOWN_TIME)

  useEffect(() => {
    if (
      emailAccount === '' ||
      passwordValue === '' ||
      twoPasswordValue === '' ||
      verifyCode === '' ||
      introducCode === '' ||
      !isCheckedOne
    ) {
      setActiveSubmit(false)
    } else {
      setActiveSubmit(true)
    }
    if (introducCode === '') {
      setIsShowErrorIntroducCode(true)
    } else {
      setIsShowErrorIntroducCode(false)
    }
  }, [emailAccount, passwordValue, twoPasswordValue, verifyCode, isCheckedOne, introducCode])

  useEffect(() => {
    if (!isTimer) return
    const startTime = dayjs().toISOString()
    //倒數計時器，useInterval(每1秒會呼叫callback,如果倒數秒數>0則，delay 1秒)
    const timerId = setInterval(() => {
      const duration = dayjs().unix() - dayjs(startTime).unix()
      const countTime = config.VERIFICATION_COUNTDOWN_TIME - duration
      if (countTime >= 0) setCount(countTime)
      else {
        setIsTimer(false)
        setCount(config.VERIFICATION_COUNTDOWN_TIME)
        clearInterval(timerId)
      }
    }, count >= 0 ? 1000 : null)
    return () => clearInterval(timerId);
  }, [isTimer])

  const handlePhoneBlur = () => {
    setIsShowErrorPhone(false)
    if (selectedValue === PHONE_TYPE.tw) setIsShowErrorPhone(!isValidTaiwanPhone(emailAccount))
    else if (selectedValue === PHONE_TYPE.cn) setIsShowErrorPhone(!isValidChainPhone(emailAccount))

  }

  const handlePasswordBlur = () => {
    setIsShowErrorPassword(!rules.test(passwordValue))
  }

  const handleSubmit = async () => {
    if (passwordValue !== twoPasswordValue) {
      Alert.alert('密碼不相同', '', [
        {
          text: '確定',
          onPress: () => { },
        },
      ])
    } else {
      const body = {
        account: emailAccount,
        password: passwordValue,
        verify_code: verifyCode,
        recommend_code: introducCode,
      }

      if (isPhoneAccount) body.account_prefix = account_prefix
      const result = await register(body)
      if (!result.message) {
        setErrorMsg(null)
        Alert.alert('註冊成功', '', [
          {
            text: '確定',
            onPress: () => {
              navigation.navigate(screenName.Login)
            },
          },
        ])
      }
    }
  }

  const registerVerify = async () => {
    console.log('emailAccount', emailAccount)
    console.log('isShowErrorPhone', isShowErrorPhone)
    if (emailAccount === '' || isShowErrorPhone) {
      Alert.alert('請先填寫登入帳號，再寄驗證碼', '', [
        {
          text: '確定',
          onPress: () => { },
        },
      ])
      return
    }
    const body = {
      account: emailAccount,
    }

    if (isPhoneAccount) body.account_prefix = selectedValue
    const result = await sendEmail(body)
    if (!result.message) {
      setErrorMsg(null)
      setIsTimer(true)
      Alert.alert('驗證碼已寄出，請查看', '', [
        {
          text: '確定',
          onPress: () => { },
        },
      ])
    } else {
      setIsTimer(false)
    }
  }

  useEffect(() => {
    if (errorMsg === null) return
    Alert.alert('錯誤訊息', errorMsg, [
      // {
      //   text: '去輸入驗證碼',
      //   onPress: () => {
      //     if (emailAccount !== '' && passwordValue !== '') {
      //       navigation.navigate(screenName.VerifyPhone, {
      //         isPhoneAccount: isPhoneAccount,
      //         emailAccount: emailAccount,
      //         passwordValue: passwordValue,
      //         introducCode: introducCode,
      //         account_prefix: selectedValue,
      //       })
      //     }
      //   },
      // },
      {
        text: '好',
        onPress: () => { },
      },
    ])
    setErrorMsg(null)
  }, [errorMsg])

  useEffect(() => {
    if (!id) return
    setIntroducCode(id)
  }, [id])

  return (
    <Container>
      <Header transparent>
        <StatusBar style="dark" backgroundColor="transparent" />
        <Left style={{ flex: 1 }}></Left>
        <Body></Body>
        <Right></Right>
      </Header>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <ScrollView style={[{ paddingHorizontal: componentProps.contentPadding }]}>
            <Text style={[componentProps.fontBodyBold3, { color: Colors.brandText }]}>註冊</Text>
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
                  style={{}}
                  selectedValue={selectedValue}
                  onValueChange={(value) => setSelectedValue(value)}
                >
                  <Picker.Item label="+886" value={PHONE_TYPE.tw} />
                  <Picker.Item label="+86" value={PHONE_TYPE.cn} />
                </Picker>
              </View>
            )}
            <Spacer size={9} flex={0} />
            <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.emailAccount}>
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
                value={emailAccount}
                onChangeText={setEmailAccount}
                onFocus={() => setFocusedInput(INPUT_FIELD.emailAccount)}
                onBlur={() => {
                  if (isPhoneAccount) handlePhoneBlur()
                  else setIsShowErrorPhone(false)
                  setFocusedInput(null)
                }}
              />
            </Item>
            <Spacer size={24} flex={0} />
            <Pressable disabled={count === config.VERIFICATION_COUNTDOWN_TIME ? false : true} onPress={registerVerify} style={{ borderColor: Colors.mainColor, borderWidth: 1, padding: 12, alignItems: 'center' }}>
              <Text style={{ color: Colors.mainColor }}>{count === config.VERIFICATION_COUNTDOWN_TIME ? '寄送驗證碼' : count + '後可重新獲取驗證碼'}</Text>
            </Pressable>
            <Spacer size={24} flex={0} />
            <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.verifyCode}>
              <MaterialIcons name="domain-verification" size={iconSize} color={Colors.mainColor} style={{ marginLeft: 16 }} />
              <Input
                style={{ marginLeft: componentProps.mediumPadding, color: Colors.mainColor }}
                placeholder={'請輸入驗證碼'}
                placeholderTextColor={Colors.placeholderTColor}
                value={verifyCode}
                keyboardType="number-pad"
                onChangeText={setVerifyCode}
                onFocus={() => setFocusedInput(INPUT_FIELD.verifyCode)}
                onBlur={() => {
                  if (isShowErrorPhone) setFocusedInput(null)
                  handlePhoneBlur()
                }}
              />
            </Item>
            {isShowErrorPhone && isPhoneAccount && (
              <Text style={[componentProps.inputHelperText, { color: Colors.redText }]}>格式錯誤</Text>
            )}
            <Spacer size={24} flex={0} />
            <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.passwordValue}>
              <AntDesign name="lock" size={iconSize} color={Colors.mainColor} style={{ marginLeft: 16 }} />
              <Input
                style={{ marginLeft: componentProps.mediumPadding, color: Colors.mainColor }}
                placeholder="請輸入密碼"
                placeholderTextColor={Colors.placeholderTColor}
                value={passwordValue}
                onChangeText={setPasswordValue}
                onFocus={() => setFocusedInput(INPUT_FIELD.passwordValue)}
                onBlur={() => {
                  if (isShowErrorPassword) setFocusedInput(null)
                  handlePasswordBlur()
                }}
                secureTextEntry={true}
              />
            </Item>
            <Spacer size={4} flex={0} />
            {isShowErrorPassword && (
              <Text style={[componentProps.errorMsg, { color: Colors.redText }]}>8~20碼, 只能是英數或_</Text>
            )}
            <Spacer size={20} flex={0} />
            <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.twoPasswordValue}>
              <AntDesign name="lock" size={iconSize} color={Colors.mainColor} style={{ marginLeft: 16 }} />
              <Input
                style={{ marginLeft: componentProps.mediumPadding, color: Colors.mainColor }}
                placeholder="請再次輸入密碼"
                placeholderTextColor={Colors.placeholderTColor}
                value={twoPasswordValue}
                onChangeText={setTwoPasswordValue}
                onFocus={() => setFocusedInput(INPUT_FIELD.twoPasswordValue)}
                onBlur={() => setFocusedInput(null)}
                secureTextEntry={true}
              />
            </Item>
            <Spacer size={24} flex={0} />
            <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.introducCode}>
              <AntDesign
                name="addusergroup"
                size={iconSize}
                color={Colors.mainColor}
                style={{ marginLeft: 16 }}
              />
              <Input
                style={{ marginLeft: componentProps.mediumPadding, color: Colors.mainColor }}
                placeholder="請輸入推薦碼"
                placeholderTextColor={Colors.placeholderTColor}
                value={introducCode}
                onChangeText={setIntroducCode}
                onFocus={() => setFocusedInput(INPUT_FIELD.introducCode)}
                onBlur={() => setFocusedInput(null)}
              />
            </Item>
            <Spacer size={4} flex={0} />
            {isShowErrorIntroducCode && (
              <Text style={[componentProps.errorMsg, { color: Colors.redText }]}>推薦碼為必填欄位</Text>
            )}
            <Spacer size={24} flex={0} />
            <View>
              <CheckBox
                onClick={() => setIsCheckedOne(!isCheckedOne)}
                isChecked={isCheckedOne}
                rightText={'我已閱讀並同意 隱私權政策 及 用戶聲明書'}
                rightTextStyle={[componentProps.fontBodySmall6, { color: Colors.mainColor }]}
                checkBoxColor={Colors.brandPrimary}
              />
              <Spacer size={22} />
            </View>
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
                註冊
              </Text>
            </Button>
            <Spacer size={24} flex={0} />
            <Pressable style={{ paddingVertical: 8 }} onPress={() => navigation.goBack()}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={[componentProps.fontBodySmall, { color: Colors.mainColor }]}>已有帳號，去 </Text>
                <Text
                  style={[
                    componentProps.fontBodySmall,
                    { color: 'white', backgroundColor: Colors.mainColor },
                  ]}
                >
                  登入
                </Text>
                <Text style={[componentProps.fontBodySmall, { color: Colors.mainColor }]}> !</Text>
              </View>
            </Pressable>
            <Spacer size={100} flex={0} />
          </ScrollView>
          <Spinner visible={isWaiting} color={Colors.mainColor} />
        </View>
      </TouchableWithoutFeedback>
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
