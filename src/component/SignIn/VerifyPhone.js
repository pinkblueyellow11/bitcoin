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
import { CodeField, Cursor, useClearByFocusCell } from 'react-native-confirmation-code-field'
import dayjs from 'dayjs'

const { isDevEnv } = config

export default function VerifyPhone(props) {
  const {
    register,
    sendEmail,
    isWaiting,
    errorMsg,
    setErrorMsg,
    isPhoneAccount,
    emailAccount,
    passwordValue,
    introducCode,
    account_prefix,
  } = props
  const navigation = useNavigation()
  const [value, setValue] = useState('')
  const [cellProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })
  const [isTimer, setIsTimer] = useState(true)
  const [count, setCount] = useState(config.VERIFICATION_COUNTDOWN_TIME)

  const handleRegister = async () => {
    if (!value) return
    const body = {
      account: emailAccount,
      password: passwordValue,
      verify_code: value,
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

  useEffect(() => {
    if (errorMsg === null) return
    Alert.alert('註冊失敗', errorMsg, [
      {
        text: '好',
        onPress: () => { },
      },
    ])
    setErrorMsg(null)
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
          <Text style={{ color: 'white', alignSelf: 'center' }}>{isPhoneAccount ? '簡訊' : 'Email'}驗證</Text>
        </Body>
        <Right>
          <Pressable onPress={() => handleRegister()}>
            <Text style={{ color: 'white' }}>確認</Text>
          </Pressable>
        </Right>
      </Header>
      <View style={{ flex: 1 }}>
        <CodeField
          {...props}
          value={value}
          autoFocus
          onChangeText={setValue}
          cellCount={config.VERIFICATION_CODE_CELL_COUNT}
          rootStyle={styles.opt}
          keyboardType="number-pad"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              key={index}
              onLayout={getCellOnLayoutHandler(index)}
              style={[styles.optCell, isFocused && styles.focusCell]}
            >
              <Text style={[styles.optCellInput]}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
          )}
        />
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: Colors.brandText }}>
            {count === config.VERIFICATION_COUNTDOWN_TIME ? '寄送驗證碼' : count + '後可重新獲取驗證碼'}
          </Text>
        </View>
      </View>
      <Spinner visible={isWaiting} color={Colors.mainColor} />
    </Container>
  )
}

const styles = StyleSheet.create({
  opt: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 48,
    paddingRight: 48,
    backgroundColor: Colors.brandGray40,
    height: Colors.inputHeightBase + 20,
    borderRadius: 1,
  },
  optCell: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.mainColor,
    marginHorizontal: 4,
  },
  optCellInput: {
    //...componentProps.fontHead,
    width: 24,
    height: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  optError: {
    borderWidth: 1,
    borderColor: Colors.brandDanger,
  },
})
