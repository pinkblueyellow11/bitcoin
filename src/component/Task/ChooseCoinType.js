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
import { choose } from 'xstate/lib/actions'

const { isDevEnv } = config
const coinTypeArray = [
  'BTC',
  'ETH',
  'SUSHI',
  'HT',
  'BCH',
  'LTC',
  'XRP',
  'LINK',
  'BSV',
  'EOS',
  'ADA',
  'XMR',
  'IOTA',
  'DASH',
  'TRX',
  'ETC',
  'ZEC',
  'IOST',
  'FIL',
  'CRV',
]

export default function ChooseCoinType(props) {
  const { isWaiting, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()

  const [chooseCoinTypeValue, setChooseCoinTypeValue] = useState(null)

  const handleRegister = async () => {}

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
          <Text style={{ color: 'white', alignSelf: 'center' }}>選擇幣種</Text>
        </Body>
        <Right>
          <Pressable
            onPress={() => {
              if (chooseCoinTypeValue) navigation.navigate(screenName.NewTask, { chooseCoinTypeValue })
            }}
          >
            <Text style={{ color: 'white' }}>下一步</Text>
          </Pressable>
        </Right>
      </Header>
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        {coinTypeArray.map((text, index) => {
          return (
            <Pressable
              onPress={() => {
                setChooseCoinTypeValue(text)
              }}
              style={{
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: Colors.mainBgColor,
              }}
            >
              <Text
                style={[
                  componentProps.fontBodySmall,
                  { color: text === chooseCoinTypeValue ? Colors.redText : Colors.mainColor },
                ]}
              >
                {text}/USDT
              </Text>
            </Pressable>
          )
        })}
      </ScrollView>
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
