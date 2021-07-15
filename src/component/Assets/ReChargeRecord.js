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
  Clipboard,
} from 'react-native'
import dayjs from 'dayjs'
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
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'
import Spinner from 'react-native-loading-spinner-overlay'

const RECORD_TYPE = {
  pickUp: '1',
  recharge: '2',
}

const STATUS_TYPE = {
  0: '審核中',
  1: '審核通過',
  2: '審核失敗',
  3: '已撤銷',
}


function ReChargeRecord(props) {
  const { usdtTrans, isWaiting, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()

  const [usdtTransArrayList, setUsdtTransArrayList] = useState(null)

  const handleSubmit = async () => { }

  useEffect(() => {
    if (!usdtTrans) return
    const resArrayList = usdtTrans.filter((value) => value.type === RECORD_TYPE.recharge)
    setUsdtTransArrayList(resArrayList)
  }, [usdtTrans])

  return (
    <Container style={{}}>
      <Header transparent style={{ backgroundColor: Colors.brandRed80 }}>
        <StatusBar style="dark" backgroundColor="transparent" />
        <Left style={{ flex: 1 }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color={Colors.mainColor} />
          </Pressable>
        </Left>
        <Body>
          <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>充值紀錄</Text>
        </Body>
        <Right>
        </Right>
      </Header>
      <Spacer size={32} flex={0} />
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
        <View style={styles.rowItem}>
          <Text style={{ color: Colors.grayText3 }}>狀態</Text>
        </View>
      </View>
      <Spacer size={16} flex={0} />
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        {
          Array.isArray(usdtTransArrayList) && usdtTransArrayList.length !== 0 && usdtTransArrayList.map((item, index) => {
            const formatDate = 'YYYY/MM/DD HH:mm:ss'
            const createdAt = dayjs(item.created_at).format(formatDate)
            return (<View key={index} style={[styles.rowStyle, { paddingVertical: 16 }]}>
              <Text>{createdAt}</Text>
              <Text>{parseFloat(item.amount)}</Text>
              <Text>充值</Text>
              <Text>{STATUS_TYPE[item.status]}</Text>
            </View>)
          })
        }
        <Spacer size={500} flex={0} />

      </ScrollView>
      <Spinner visible={isWaiting} />
    </Container>
  )
}

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rowItem: {
    flex: 1,
    alignItems: 'center',
  },
})

export default ReChargeRecord
