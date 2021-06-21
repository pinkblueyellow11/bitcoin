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

const showCoinType = [
  'TC',
  'ETH',
  'BCH',
  'LTC',
  'ADA',
  'XRP',
  'DOGE',
  'DOT',
  'LINK',
  'UNI',
  'SOL',
  'ETC',
  'TRX',
  'AAVE',
  'FTT',
]

function Home(props) {
  const { coinCost, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()

  const [showCoinListArray, setShowCoinListArray] = useState(null)

  useEffect(() => {
    if (!coinCost || !Array.isArray(coinCost)) return
    const filterCoin = []
    for (const item of coinCost) {
      const coinType = item.coin_code.replace('usdt', '').toUpperCase()
      const isShowCoin = showCoinType.find((coin) => coin == coinType)
      if (isShowCoin) {
        filterCoin.push(item)
      }
    }
    setShowCoinListArray(filterCoin)
  }, [coinCost])

  const handleSubmit = async () => {}

  return (
    <Container style={{}}>
      <Header transparent style={{ backgroundColor: Colors.brandRed80 }}>
        <StatusBar style="dark" backgroundColor="transparent" />
        <Left style={{ flex: 1 }}></Left>
        <Body>
          <Text style={{ color: 'white', alignSelf: 'center' }}>MAA</Text>
        </Body>
        <Right>
          <Pressable onPress={() => navigation.navigate(screenName.Notification)}>
            <AntDesign name="bells" size={22} color={Colors.mainColor} />
          </Pressable>
        </Right>
      </Header>
      <View style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
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
          {showCoinListArray &&
            showCoinListArray.map((item, index) => {
              const coinType = item.coin_code.replace('usdt', '').toUpperCase()
              return (
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
              )
            })}
          <Spacer size={350} flex={0} />
        </ScrollView>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({})

export default Home
