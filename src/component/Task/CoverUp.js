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

const { isDevEnv } = config

const INPUT_FIELD = {
  amountOfMarginCall: 'amountOfMarginCall',
}

export default function CoverUp(props) {
  const {
    manualPurchase,
    isWaiting,
    errorMsg,
    setErrorMsg,
  } = props
  const navigation = useNavigation()

  const [amountOfMarginCallError, setAmountOfMarginCallError] = useState(false)
  const [amountOfMarginCall, setAmountOfMarginCall] = useState('')
  const [focusedInput, setFocusedInput] = useState(null)

  const handleSubmit = async () => {
    if (!amountOfMarginCall) return
    const body = {
      amount: amountOfMarginCall,
    }
    console.log('body', body)
    const result = await manualPurchase(body)
    if (!result.message) {
      setErrorMsg(null)
      Alert.alert('成功', '', [
        {
          text: '確定',
          onPress: () => {
            navigation.goBack()
          },
        },
      ])
    }
  }

  useEffect(() => {
    if (errorMsg === null) return
    Alert.alert('失敗', errorMsg, [
      {
        text: '好',
        onPress: () => { },
      },
    ])
    setErrorMsg(null)
  }, [errorMsg])

  useEffect(() => {
    console.log('amountOfMarginCallError', amountOfMarginCallError)
  }, [amountOfMarginCallError])

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
          <Text style={{ color: 'white', alignSelf: 'center' }}>補倉</Text>
        </Body>
        <Right>
          <Pressable onPress={handleSubmit}>
            <Text style={{ color: 'white' }}>確認</Text>
          </Pressable>
        </Right>
      </Header>
      <View style={{ flex: 1, paddingHorizontal: componentProps.defaultPadding + 10 }}>
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>補倉金額</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.amountOfMarginCall}>
            <Input
              style={styles.itemInput}
              placeholder={'輸入範圍大於等於10的正整數'}
              placeholderTextColor={Colors.placeholderTColor}
              value={amountOfMarginCall}
              keyboardType="number-pad"
              onChangeText={(text) => {
                setAmountOfMarginCall(text)
                if (text >= 10) setAmountOfMarginCallError(false)
                else setAmountOfMarginCallError(true)
              }}
              onFocus={() => setFocusedInput(INPUT_FIELD.amountOfMarginCall)}
              onBlur={() => { setFocusedInput(null) }}
            />
          </Item>
        </View>
        {amountOfMarginCallError && (
          <Text style={[componentProps.inputHelperText, { color: Colors.redText }]}>
            輸入範圍大於等於10的正整數
          </Text>
        )}
      </View>
      <Spinner visible={isWaiting} color={Colors.mainColor} />
    </Container>
  )
}

const styles = StyleSheet.create({
  itemStyle: {
    position: 'relative',
    borderBottomColor: 'transparent',
    backgroundColor: Colors.inputBgColor,
    width: '70%',
  },
  itemTitle: {
    color: Colors.mainColor,
    alignSelf: 'center',
    marginRight: 8,
  },
  itemInput: {
    marginLeft: componentProps.mediumPadding,
    color: Colors.mainColor,
  },
  itemEndText: {
    color: Colors.mainColor,
    alignSelf: 'center',
    marginLeft: 8,
  },
})
