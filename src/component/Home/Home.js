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
  Dimensions,
  useWindowDimensions,
  Alert,
  PermissionsAndroid,
  Linking,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import componentProps from '../../constant/componentProps'
import { useNavigation } from '@react-navigation/native'
import screenName from '../../constant/screenName'
import Colors from '../../../native-base-theme/variables/commonColor'
import Constants from 'expo-constants'
import { Button, Item, Input, Container, Content, Label, Header, Left, Body, Right, Col } from 'native-base'
import { StatusBar } from 'expo-status-bar'
import Spacer from '../UI/Spacer'
import { FONT_WEIGHT } from '../../constant/componentProps/typography'
import config from '../../constant/config'
import Carousel from 'react-native-snap-carousel'
import { MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useInterval } from '../../lib/react'

const showCoinType = [
  'BTC',
  'ETH',
  'ADA',
  'DOT',
  'LINK',
  'UNI',
  'BNB',
  'XRP',
  'BCH',
  'LTC',
  'DOGE',
  'SOL',
  'FTT',
  'AAVE',
  'TRX'
]
const arrayIndex = {
  'BTC': 0,
  'ETH': 1,
  'ADA': 2,
  'DOT': 3,
  'LINK': 4,
  'UNI': 5,
  'BNB': 6,
  'XRP': 7,
  'BCH': 8,
  'LTC': 9,
  'DOGE': 10,
  'SOL': 11,
  'FTT': 12,
  'AAVE': 13,
  'TRX': 14
}

function Home(props) {
  const { coinCost, getCoinCost, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()

  const [showCoinListArray, setShowCoinListArray] = useState(null)
  const [showCoinListArray2, setShowCoinListArray2] = useState(null)

  useEffect(() => {
    if (!coinCost || !Array.isArray(coinCost)) return
    const filterCoin = ['', '', '', '', '', '', '', '', '', '', '', '']

    for (const item of coinCost) {
      const coinType = item.coin_code.replace('usdt', '').toUpperCase()
      const isShowCoin = showCoinType.find((coin) => coin == coinType)
      if (isShowCoin) {
        filterCoin[arrayIndex[coinType]] = item
      }
    }
    //console.log('filterCoin2', filterCoin2)
    setShowCoinListArray(filterCoin)
  }, [coinCost])

  useEffect(() => {
    const timerId = setInterval(() => {
      getCoinCost();
    }, 300000)
    return () => clearInterval(timerId);
  }, [])

  const handleSubmit = async () => { }

  return (
    <Container style={{}}>
      <Header transparent style={{ backgroundColor: Colors.brandRed80 }}>
        <StatusBar style="dark" backgroundColor="transparent" />
        <Left style={{ flex: 1 }}></Left>
        <Body>
        </Body>
        <Right>
          <Pressable onPress={() => navigation.navigate(screenName.Notification)}>
            <AntDesign name="bells" size={22} color={Colors.mainColor} />
          </Pressable>
        </Right>
      </Header>
      <View style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        <View style={{ height: 200, width: '100%' }}>
          <Image style={{ height: '100%', width: '100%', resizeMode: 'contain' }} source={require('../../assets/images/googlepaly1.png')} />
        </View>
        <Spacer size={32} flex={0} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View>
            <Pressable
              style={{ backgroundColor: Colors.circleBgColor, padding: 20, borderRadius: 100 }}
              onPress={() => navigation.navigate(screenName.Invite)}
            >
              <AntDesign name="smileo" size={24} color="white" />
            </Pressable>
            <Text style={[componentProps.fontError, { color: '#A298AE', textAlign: 'center', marginTop: 4 }]}>
              邀請
            </Text>
          </View>
          <View>
            <Pressable
              style={{ backgroundColor: Colors.circleBgColor, padding: 20, borderRadius: 100 }}
              onPress={() => navigation.navigate(screenName.Community)}
            >
              <MaterialIcons name="groups" size={24} color="white" />
            </Pressable>
            <Text style={[componentProps.fontError, { color: '#A298AE', textAlign: 'center', marginTop: 4 }]}>
              社區
            </Text>
          </View>
          <View>
            <Pressable
              style={{ backgroundColor: Colors.circleBgColor, padding: 20, borderRadius: 100 }}
              onPress={() => navigation.navigate(screenName.ApiScreen)}
            >
              <MaterialCommunityIcons name="api" size={24} color="white" />
            </Pressable>
            <Text style={[componentProps.fontError, { color: '#A298AE', textAlign: 'center', marginTop: 4 }]}>
              API
            </Text>
          </View>
        </View>
        <Spacer size={64} flex={0} />
        <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
          <Text style={[componentProps.fontH3, { color: Colors.mainColor }]}>行情</Text>
          <Spacer size={16} flex={0} />
          {Array.isArray(showCoinListArray) && showCoinListArray.length > 0 &&
            showCoinListArray.map((item, index) => {
              let coinType = null
              if (item !== '') coinType = item.coin_code.replace('usdt', '').toUpperCase()
              return (item === '' ? <View></View>
                : (
                  <View
                    key={index}
                    style={{
                      paddingVertical: 12,
                      paddingTop: 24,
                      borderBottomColor: Colors.grayText,
                      borderBottomWidth: 0.5,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={componentProps.fontBodySmall6}>
                      <Text style={[componentProps.fontH4Medium, { color: Colors.brandText }]}>
                        {coinType}{' '}
                      </Text>
                      / USDT
                    </Text>
                    <Text style={componentProps.fontH5}>{parseFloat(item.cost).toFixed(4)}</Text>
                  </View>
                ))
            })}
          <Spacer size={600} flex={0} />
        </ScrollView>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({})

export default Home
