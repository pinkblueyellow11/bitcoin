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
import dayjs from 'dayjs'
import componentProps from '../../constant/componentProps'
import { useNavigation } from '@react-navigation/native'
import screenName from '../../constant/screenName'
import Colors from '../../../native-base-theme/variables/commonColor'
import { Button, Item, Input, Container, Content, Label, Header, Left, Body, Right } from 'native-base'
import { StatusBar } from 'expo-status-bar'
import Spacer from '../UI/Spacer'
import config from '../../constant/config'
import Spinner from 'react-native-loading-spinner-overlay'
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons'

const { isDevEnv } = config

const BOX_INDEX = {
  one: 'one',
  two: 'two',
  three: 'three',
}

export default function TaskRecord(props) {
  const { robotArray, groupRobotId, groupRobotsTransList, isWaiting, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()

  const [coinType, setCoinType] = useState('')

  useEffect(() => {
    if (!groupRobotsTransList) return
    setCoinType(groupRobotsTransList[0]?.coin_code.replace('usdt', '').toUpperCase())
  }, [groupRobotsTransList])



  return (
    <Container>
      <Header transparent style={{ backgroundColor: Colors.brandRed80 }}>
        <StatusBar style="dark" backgroundColor="transparent" />
        <Left style={{ flex: 1 }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color={Colors.mainColor} />
          </Pressable>
        </Left>
        <Body>
          <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>交易紀錄</Text>
        </Body>
        <Right></Right>
      </Header>
      <View style={{ flexDirection: 'row', paddingHorizontal: componentProps.defaultPadding }}>
        <View style={styles.rowItem}></View>
        <View style={styles.rowItem}>
          {!!coinType && <Text style={{ textAlign: 'center', color: Colors.brandText }}>{coinType}/USDT</Text>}
        </View>
        <View style={styles.rowItem}>
          {groupRobotId && <Text style={{ textAlign: 'right', color: Colors.brandText }} >任務編號： {groupRobotId}</Text>}
        </View>
      </View>
      <Spacer size={32} flex={0} />
      <View style={styles.rowStyle}>
        <View style={{ flex: 1.5, alignItems: 'center' }}>
          <Text style={{ color: Colors.grayText3 }}>時間</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={{ color: Colors.grayText3 }}>排程編號</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={{ color: Colors.grayText3 }}>說明</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={{ color: Colors.grayText3 }}>成交額(USDT)</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={{ color: Colors.grayText3 }}>成交價</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={{ color: Colors.grayText3 }}>盈利</Text>
        </View>
      </View>
      <Spacer size={16} flex={0} />
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        {Array.isArray(groupRobotsTransList) && groupRobotsTransList.length !== 0 && groupRobotsTransList.map((item, index) => {
          const createdAtDate = dayjs(item.created_at).format('YYYY/MM/DD')
          const createdAtTime = dayjs(item.created_at).format('HH:mm:ss')
          let statusStr = ''
          let profit = '-'
          switch (item.type) {
            case 'buy-market':
              statusStr = '買進'
              break
            case 'sell-market':
              statusStr = '賣出'
              if (Array.isArray(robotArray)) {
                profit = robotArray.flat().filter(i => i.robot_id === item.robot_id)
              }
              break
            default:
              statusStr = '-'
              break
          }
          console.log('index', index)
          console.log('profit', profit)
          console.log('1111', item.type === 'sell-market' && !!profit)

          return (
            <View key={`{${item.created_at}}`} style={[styles.rowStyle, { paddingVertical: 16 }]}>
              <View style={{ flex: 1.5, alignItems: 'center' }}>
                <Text>{createdAtDate}</Text>
                <Text>{createdAtTime}</Text>
              </View>
              <View style={styles.rowItem}>
                <Text>{item.robot_id}</Text>
              </View>
              <View style={styles.rowItem}>
                <Text>{statusStr}</Text>
              </View>
              <View style={styles.rowItem}>
                <Text>{parseFloat(parseFloat(item.cash_amount).toFixed(4))}</Text>
              </View>
              <View style={styles.rowItem}>
                <Text>{parseFloat(parseFloat(item.coin_cost).toFixed(4))}</Text>
              </View>
              <View style={styles.rowItem}>
                <Text style={{ color: 'green' }}>{item.type === 'sell-market' && !!profit ? parseFloat(parseFloat(profit[0].profit).toFixed(2)) : ' '}</Text>
              </View>
            </View>
          )
        })}
        <Spacer size={500} flex={0} />
      </ScrollView>
      <Spinner visible={isWaiting} color={Colors.mainColor} />
    </Container>
  )
}

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
  },
  rowItem: {
    flex: 1,
    alignItems: 'center',
  },
})
