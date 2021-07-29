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
import { AntDesign } from '@expo/vector-icons'

const { isDevEnv } = config
const INPUT_FIELD = {
  searchText: 'searchText',
}

const coinTypeArrayR = [
  'BTC',
  'ETH',
  'LINK',
  'DOT',
  'DOGE',
  'FIL',
  'AXS',
  'MATIC',
  'TRX',
  'XRP',
  'ADA',
  'EOS',
  'LTC',
  'BTT',
  'ICP',
  'UNI',
  'ETC',
  'JST',
  'FLOW',
  'BCH',
  'DASH',
  'SHIB',
  'SUSHI',
  'AAVE',
  'CHR',
  'THETA',
  'LUNA',
  'BSV',
  'FTT',
  'SOL',
  'ZEC',
  'ATOM',
  'COMP',
  'KSM',
  'CHZ',
  'YFI',
  'XLM',
  'CRV',
  'XMR',
  'ALGO',
  'NEO',
  'OMG',
  '1INCH',
  'IOST',
  'QTUM',
  'MASK',
  'BNB',
  'HT',
  'IOTA',
  'AVAX',
]


export default function ChooseCoinType(props) {
  const { coinCurrentPrice, isWaiting, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()

  const [chooseCoinTypeValue, setChooseCoinTypeValue] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [focusedInput, setFocusedInput] = useState(null)
  const [coinTypeArray, setCoinTypeArray] = useState(null)


  useEffect(() => {
    if (!Array.isArray(coinTypeArrayR)) return
    setCoinTypeArray(coinTypeArrayR)
  }, [coinTypeArrayR])

  useEffect(() => {
    if (!chooseCoinTypeValue) return
    navigation.navigate(screenName.NewTask, { chooseCoinTypeValue })
  }, [chooseCoinTypeValue])

  const handleSearch = (t) => {

    const searchT = t.toUpperCase()
    const searchResult = coinTypeArrayR.filter((item) => {
      //const typeStr = item.coin_code.replace('usdt', '').toUpperCase()
      //typeStr.indexOf(searchT)
      item.indexOf(searchT)
      return item.indexOf(searchT) === 0
    })
    setCoinTypeArray(searchResult)
    setSearchText(t)

  }

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
          {/* <Pressable
            onPress={() => {
              if (chooseCoinTypeValue) navigation.navigate(screenName.NewTask, { chooseCoinTypeValue })
            }}
          >
            <Text style={{ color: 'white' }}>下一步</Text>
          </Pressable> */}
        </Right>
      </Header>
      <View style={styles.searchBox}>
        <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.searchText}>
          <AntDesign name="search1" size={24} color={Colors.mainColor} />
          <Input
            style={{ marginLeft: componentProps.mediumPadding, color: Colors.mainColor }}
            placeholder={'搜尋 . . .'}
            placeholderTextColor={Colors.placeholderTColor}
            value={searchText}
            onChangeText={handleSearch}
            onFocus={() => setFocusedInput(INPUT_FIELD.searchText)}
            onBlur={() => setFocusedInput(null)}
          />
          <Pressable onPress={() => {
            setSearchText('')
            setCoinTypeArray(coinCurrentPrice)
          }}>
            <Text style={{ color: Colors.grayText }}>取消</Text>
          </Pressable>
        </Item>
      </View>
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        {Array.isArray(coinTypeArray) && coinTypeArray.length !== 0 && coinTypeArray.map((item, index) => {

          //const text = item.coin_code.replace('usdt', '').toUpperCase()

          return (
            <Pressable
              onPress={() => {
                setChooseCoinTypeValue(item)
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
                  { color: item === chooseCoinTypeValue ? Colors.redText : Colors.mainColor },
                ]}
              >
                {item}/USDT
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
  searchBox: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderColor: Colors.mainColor,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
})
