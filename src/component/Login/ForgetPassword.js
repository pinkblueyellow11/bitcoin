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
import componentProps from '../../constant/componentProps'
import { useNavigation } from '@react-navigation/native'
import screenName from '../../constant/screenName'
import Colors from '../../../native-base-theme/variables/commonColor'
import { Button, Item, Input, Container, Content, Label, Header, Left, Body, Right } from 'native-base'
import { StatusBar } from 'expo-status-bar'
import Spacer from '../UI/Spacer'
import config from '../../constant/config'
import Spinner from 'react-native-loading-spinner-overlay'
import { useInterval } from '../../lib/react'
import { MaterialIcons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { isValidTaiwanPhone } from '../../lib/string'
import dayjs from 'dayjs'

const iconSize = 18
const rules = /^[a-zA-Z\d_]{8,20}$/
const successCode = 200

const INPUT_FIELD = {
  emailAccount: 'emailAccount',
  password: 'password',
  twoPasswordValue: 'twoPasswordValue',
  verifyCode: 'verifyCode',
}

const PHONE_TYPE = {
  tw: '886',
  cn: '86'
}

export default function ForgetPassword(props) {
  const { sendRePassword, sendVerify, isWaiting, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()

  const [emailAccount, setEmailAccount] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [twoPasswordValue, setTwoPasswordValue] = useState('')
  const [focusedInput, setFocusedInput] = useState(null)
  const [isShowErrorPassword, setIsShowErrorPassword] = useState(false)
  const [isPhoneAccount, setIsPhoneAccount] = useState(true)
  const [selectedValue, setSelectedValue] = useState(PHONE_TYPE.tw)
  const [activeSubmit, setActiveSubmit] = useState(false)
  const [isShowErrorPhone, setIsShowErrorPhone] = useState(false)
  const [isTimer, setIsTimer] = useState(false)
  const [count, setCount] = useState(config.VERIFICATION_COUNTDOWN_TIME)

  const handlePasswordBlur = () => {
    setIsShowErrorPassword(!rules.test(passwordValue))
  }

  const handlePhoneBlur = () => {
    setIsShowErrorPhone(!isValidTaiwanPhone(emailAccount))
  }

  const handleSendVerify = async () => {
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
    const result = await sendVerify(body)
    console.log('sendVerify result', result)
    if (result.status === successCode) {
      setErrorMsg(null)
      setIsTimer(true)
      const str = isPhoneAccount ? '簡訊' : 'Email'
      Alert.alert('寄送成功', '請到' + str + '收取驗證碼', [
        {
          text: '確定',
          onPress: () => { },
        },
      ])
    } else {
      setIsTimer(false)
    }
  }

  const handleSubmit = async () => {
    if (passwordValue !== twoPasswordValue) {
      Alert.alert('密碼不相同', '', [
        {
          text: '確定',
          onPress: () => { },
        },
      ])
      return
    }
    const body = {
      account: emailAccount,
      verify_code: verifyCode,
      new_password: passwordValue,
    }
    if (isPhoneAccount) body.account_prefix = selectedValue
    const result = await sendRePassword(body)
    if (result.status === successCode) {
      Alert.alert('更改密碼成功', '', [
        {
          text: '確定',
          onPress: () => navigation.goBack(),
        },
      ])
    }
  }

  useEffect(() => {
    if (
      emailAccount === '' ||
      passwordValue === '' ||
      twoPasswordValue === '' ||
      verifyCode === ''
    ) {
      setActiveSubmit(false)
    } else {
      setActiveSubmit(true)
    }
  }, [emailAccount, passwordValue, twoPasswordValue, verifyCode])

  useEffect(() => {
    if (!!errorMsg) {
      Alert.alert(errorMsg, '', [
        {
          text: '確定',
          onPress: () => { },
        },
      ])
      setErrorMsg(null)
    }
  }, [errorMsg])

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

  return (
    <Container>
      <Header
        style={{
          backgroundColor: Colors.mainColor,
          marginTop: 16,
        }}
      >
        <StatusBar style="light" backgroundColor="transparent" />
        <Left style={{ flex: 1 }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={{ color: 'white' }}>取消</Text>
          </Pressable>
        </Left>
        <Body>
          <Text style={{ color: 'white', alignSelf: 'center' }}>忘記密碼</Text>
        </Body>
        <Right>
          <Pressable
            onPress={handleSendVerify}
          >
            <Text style={{ color: 'white' }}>{count === config.VERIFICATION_COUNTDOWN_TIME ? '寄送驗證碼' : count + '後可重新獲取驗證碼'}</Text>
          </Pressable>
        </Right>
      </Header>
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        <Spacer size={16} flex={0} />
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
        <Spacer size={16} flex={0} />
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
        {isShowErrorPhone && isPhoneAccount && (
          <Text style={[componentProps.inputHelperText, { color: Colors.redText }]}>格式錯誤</Text>
        )}
        <Spacer size={16} flex={0} />
        <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.verifyCode}>
          <MaterialIcons name="domain-verification" size={iconSize} color={Colors.mainColor} style={{ marginLeft: 16 }} />
          <Input
            style={{ marginLeft: componentProps.mediumPadding, color: Colors.mainColor }}
            placeholder="請輸入驗證碼"
            keyboardType="number-pad"
            placeholderTextColor={Colors.placeholderTColor}
            value={verifyCode}
            onChangeText={setVerifyCode}
            onFocus={() => setFocusedInput(INPUT_FIELD.verifyCode)}
            onBlur={() => setFocusedInput(null)}
          />
        </Item>
        <Spacer size={16} flex={0} />
        <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.passwordValue}>
          <AntDesign name="lock" size={iconSize} color={Colors.mainColor} style={{ marginLeft: 16 }} />
          <Input
            style={{ marginLeft: componentProps.mediumPadding, color: Colors.mainColor }}
            placeholder="請輸入新密碼"
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
            placeholder="請再次輸入新密碼"
            placeholderTextColor={Colors.placeholderTColor}
            value={twoPasswordValue}
            onChangeText={setTwoPasswordValue}
            onFocus={() => setFocusedInput(INPUT_FIELD.twoPasswordValue)}
            onBlur={() => setFocusedInput(null)}
            secureTextEntry={true}
          />
        </Item>
        <Spacer size={24} flex={0} />
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
            送出
          </Text>
        </Button>
        <Spacer size={50} flex={0} />

      </ScrollView>
      <Spinner visible={isWaiting} color={Colors.mainColor} />
    </Container>
  )
}

const styles = StyleSheet.create({

})
