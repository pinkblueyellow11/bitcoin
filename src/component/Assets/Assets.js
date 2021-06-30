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
import config from '../../constant/config'
import Carousel from 'react-native-snap-carousel'
import Spinner from 'react-native-loading-spinner-overlay'

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
  const { walletHistory, errorMsg, setErrorMsg, isWaiting } = props
  const navigation = useNavigation()

  const [boxIndex, setBoxIndex] = useState(BOX_INDEX.one)
  const [oneDataArrayList, setOneDataArrayList] = useState(null)
  const [twoDataArrayList, setTwoDataArrayList] = useState(null)

  useEffect(() => {
    if (!walletHistory) return
    const oneData = walletHistory.filter(value => value.type !== RECORD_TYPE.robotFee)
    const twoData = walletHistory.filter(value => value.type === RECORD_TYPE.robotFee)
    console.log('oneData', oneData)
    console.log('twoData', twoData)
    setOneDataArrayList(oneData)
    setTwoDataArrayList(twoData)

  }, [walletHistory])

  const handleSubmit = async () => { }

  return (
    <Container style={{}}>
      <Header transparent style={{ backgroundColor: Colors.brandRed80 }}>
        <StatusBar style="dark" backgroundColor="transparent" />
        <Left style={{ flex: 1 }}></Left>
        <Body>
          <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>資金</Text>
        </Body>
        <Right></Right>
      </Header>
      <View style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        <View style={{ backgroundColor: '#F3EAFF', borderRadius: componentProps.borderRadius }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              justifyContent: 'space-between',
              paddingTop: 32,
            }}
          >
            <Text style={[componentProps.fontBodySmall3, { color: Colors.grayText3, alignSelf: 'center' }]}>
              燃料餘額
            </Text>
            <Text style={[componentProps.fontH1, { color: Colors.redText, alignSelf: 'center' }]}>0</Text>
          </View>
          <Spacer size={24} flex={0} />
          <View style={styles.boxButtonView}>
            <Pressable
              onPress={() => navigation.navigate(screenName.ReCharge)}
              style={[styles.boxButton, { marginRight: 12 }]}
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
    paddingHorizontal: 16,
    justifyContent: 'space-around',
  },
  boxButton: {
    paddingVertical: 8,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: componentProps.borderRadius,
  },
  boxButtonText: {
    ...componentProps.fontBodyBold2,
    color: Colors.brandText,
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
})

export default Assets
