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
import dayjs from 'dayjs'
import { SafeAreaView } from 'react-native-safe-area-context'
import componentProps from '../../constant/componentProps'
import { useNavigation } from '@react-navigation/native'
import screenName from '../../constant/screenName'
import Colors from '../../../native-base-theme/variables/commonColor'
import Constants from 'expo-constants'
import { Button, Item, Input, Container, Content, Label, Header, Left, Body, Right } from 'native-base'
import { StatusBar } from 'expo-status-bar'
import Spacer from '../UI/Spacer'
import { FONT_WEIGHT } from '../../constant/componentProps/typography'
import Spinner from 'react-native-loading-spinner-overlay'
import { Feather } from '@expo/vector-icons'

const initialLayout = { width: Dimensions.get('window').width }

const RECORD_TYPE = {
  pickUp: '1',
  recharge: '2',
  robotFee: '3',
}

const BOX_INDEX = {
  one: 'one',
  two: 'two',
  three: 'three',
}

function Assets(props) {
  const { getUser, getWalletHistory, getBonusOrder, usdtAmount, bonusTotal, walletHistory, errorMsg, setErrorMsg, isWaiting } = props
  const navigation = useNavigation()

  const [boxIndex, setBoxIndex] = useState(BOX_INDEX.one)
  const [oneDataArrayList, setOneDataArrayList] = useState(null)
  const [twoDataArrayList, setTwoDataArrayList] = useState(null)

  useEffect(() => {
    if (!walletHistory) return
    const oneData = walletHistory.filter(value => value.type !== RECORD_TYPE.robotFee)
    const twoData = walletHistory.filter(value => value.type === RECORD_TYPE.robotFee)
    setOneDataArrayList(oneData)
    setTwoDataArrayList(twoData)

  }, [walletHistory])

  const handleSubmit = async () => { }

  const handleRefresh = async () => {
    await getWalletHistory()
    await getBonusOrder()
    getUser()
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      handleRefresh()
    }, 300000)
    return () => clearInterval(timerId);
  }, [])

  return (
    <Container style={{}}>
      <Header transparent style={{ backgroundColor: Colors.brandRed80 }}>
        <StatusBar style="dark" backgroundColor="transparent" />
        <Left style={{ flex: 1 }}></Left>
        <Body>
          <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>資金</Text>
        </Body>
        <Right>
          <Pressable onPress={handleRefresh} style={{ alignItems: 'flex-end' }}>
            <Feather name="refresh-ccw" size={20} color={Colors.brandText} />
          </Pressable>
        </Right>
      </Header>
      <View style={[{ paddingHorizontal: componentProps.defaultPadding + 10 }]}>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.boxView, { marginRight: 16 }]}>
            <Text style={styles.boxText1}>燃料餘額</Text>
            <Spacer size={10} flex={0} />
            {usdtAmount && <Text style={styles.boxText2}>{parseFloat(usdtAmount)}</Text>}
          </View>
          <View style={[styles.boxView, { marginLeft: 12 }]}>
            <Text style={styles.boxText1}>獎金</Text>
            <Spacer size={10} flex={0} />
            {/* {<Text style={styles.boxText2}>{'即將開放'}</Text>} */}
            {bonusTotal !== null && <Text style={styles.boxText2}>{parseFloat(parseFloat(bonusTotal).toFixed(4))}</Text>}
          </View>
        </View>
        {/* <View style={{ backgroundColor: Colors.mainBgColor }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View
              style={{
                paddingHorizontal: 16,
                paddingTop: 32,
              }}
            >
              <Text style={[componentProps.fontBodySmall3, { color: Colors.grayText3, alignSelf: 'center' }]}>
                燃料餘額
              </Text>
              <Text style={[componentProps.fontH1, { color: '#C3639C', alignSelf: 'center' }]}>0</Text>
            </View>
            <View
              style={{
                paddingHorizontal: 16,
                paddingTop: 32,
              }}
            >
              <Text style={[componentProps.fontBodySmall3, { color: Colors.grayText3, alignSelf: 'center' }]}>
                燃料餘額
              </Text>
              <Text style={[componentProps.fontH1, { color: '#C3639C', alignSelf: 'center' }]}>0</Text>
            </View>
          </View>
          <Spacer size={24} flex={0} />
        </View> */}
        <Spacer size={24} flex={0} />
        <View style={styles.boxButtonView}>
          <Pressable
            onPress={() => navigation.navigate(screenName.ReCharge)}
            style={[styles.boxButton, { marginRight: 16 }]}
          >
            <Text style={styles.boxButtonText}>充值</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate(screenName.Withdrawal)}
            style={[styles.boxButton, { marginLeft: 12 }]}
          >
            <Text style={styles.boxButtonText}>提幣</Text>
          </Pressable>
        </View>
        <Spacer size={24} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <Pressable
              onPress={() => setBoxIndex(BOX_INDEX.one)}
              style={[
                styles.typeBoxOne,
                {
                  backgroundColor: boxIndex === BOX_INDEX.one ? Colors.mainBgColor : 'white',
                },
              ]}
            >
              <Text style={styles.typeBoxText}>燃料</Text>
            </Pressable>
            <Pressable
              onPress={() => setBoxIndex(BOX_INDEX.two)}
              style={[
                styles.typeBoxTwo,
                {
                  backgroundColor: boxIndex === BOX_INDEX.two ? Colors.mainBgColor : 'white',
                },
              ]}
            >
              <Text style={styles.typeBoxText}>燃料消耗</Text>
            </Pressable>
            <Pressable
              onPress={() => setBoxIndex(BOX_INDEX.three)}
              style={[
                styles.typeBoxThree,
                {
                  backgroundColor: boxIndex === BOX_INDEX.three ? Colors.mainBgColor : 'white',
                },
              ]}
            >
              <Text style={styles.typeBoxText}>獎金</Text>
            </Pressable>
          </View>
        </View>
        <Spacer size={24} flex={0} />
        <View style={styles.rowStyle}>
          <View style={styles.rowItem}>
            <Text style={{ color: Colors.grayText3 }}>日期</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={{ color: Colors.grayText3 }}>金額</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={{ color: Colors.grayText3 }}>說明</Text>
          </View>
        </View>
        <ScrollView >
          <Spacer size={32} flex={0} />
          {
            boxIndex === BOX_INDEX.one && Array.isArray(oneDataArrayList) && oneDataArrayList.length > 0 && oneDataArrayList.map((item, index) => {
              const formatDate = 'YYYY/MM/DD HH:mm:ss'
              const createdAt = dayjs(item.created_at).format(formatDate)
              return (
                <View key={index} style={[styles.rowStyle, { paddingVertical: 16 }]}>
                  <Text>{createdAt}</Text>
                  <Text>{parseFloat(item.amount)}</Text>
                  <Text>{item.type === RECORD_TYPE.pickUp ? '提領' : '充值'}</Text>
                </View>
              )
            })
          }
          {
            boxIndex === BOX_INDEX.two && twoDataArrayList && twoDataArrayList.map((item, index) => {
              const formatDate = 'YYYY/MM/DD HH:mm:ss'
              const createdAt = dayjs(item.created_at).format(formatDate)
              return (
                <View key={index} style={[styles.rowStyle, , { paddingVertical: 16 }]}>
                  <Text>{createdAt}</Text>
                  <Text>{parseFloat(item.amount)}</Text>
                  <Text>機器人使用費</Text>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
      <Spinner visible={isWaiting} />
    </Container>
  )
}

const styles = StyleSheet.create({
  boxButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  boxButton: {
    paddingVertical: 8,
    flex: 1,
    // borderColor: Colors.mainColor,
    // borderWidth: 1,
    backgroundColor: Colors.mainColor,
  },
  boxButtonText: {
    ...componentProps.fontBodyBold2,
    color: 'white',
    alignSelf: 'center',
  },
  typeBoxOne: {
    borderColor: Colors.mainColor,
    borderWidth: 1,
    borderRightWidth: 0,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flex: 1,
  },
  typeBoxTwo: {
    borderColor: Colors.mainColor,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flex: 1,
  },
  typeBoxThree: {
    borderColor: Colors.mainColor,
    borderWidth: 1,
    borderLeftWidth: 0,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flex: 1,
  },
  typeBoxText: {
    ...componentProps.fontBodySmall6,
    color: Colors.mainColor,
    textAlign: 'center',
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rowItem: {
    flex: 1,
    alignItems: 'center',
  },
  boxView: {
    backgroundColor: Colors.taskBgColor,
    flex: 1,
  },
  boxText1: {
    ...componentProps.fontOverline,
    color: 'white',
    textAlign: 'center',
    paddingTop: 8,
  },
  boxText2: {
    ...componentProps.fontBodyBold,
    color: '#C3639C',
    textAlign: 'center',
    paddingBottom: 10,
  },
})

export default Assets
