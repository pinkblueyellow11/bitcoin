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
import moment from 'moment'
import TransferModal from './Transfer'

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

const BONUS_TYPE = {
  recommend_bonus: 'recommend_bonus',
  lv5_bonus: 'lv5_bonus',
  team_bouns: 'team_bouns',
  global_bonus: 'global_bonus',
}

const FORMAT_DATA = 'YYYY/MM'

function Assets(props) {
  const { transformFuelCost, bonusInfo, getBonusDetail, getUser, getWalletHistory, usdtAmount, bonusTotal, walletHistory, errorMsg, setErrorMsg, isWaiting } = props
  const navigation = useNavigation()

  const [boxIndex, setBoxIndex] = useState(BOX_INDEX.one)
  const [oneDataArrayList, setOneDataArrayList] = useState(null)
  const [twoDataArrayList, setTwoDataArrayList] = useState(null)
  const [threeDataArrayList, setThreeDataArrayList] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const handleTransfer = async (total) => {
    const body = {
      bonus: total,
    }
    try {
      const result = await transformFuelCost(body)
      if (result.result === "success") {
        setErrorMsg(null)
        Alert.alert('成功', '', [
          {
            text: '確定',
            onPress: () => { setModalVisible(false) },
          },
        ])
        return true
      }
    } catch (error) {
      Alert.alert('失敗', '', [
        {
          text: '確定',
          onPress: () => { },
        },
      ])
      return false
    }
  }

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
    await getBonusDetail()
    getUser()
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      handleRefresh()
    }, 300000)
    return () => clearInterval(timerId);
  }, [])

  useEffect(() => {
    if (!Array.isArray(bonusInfo)) return
    let bonusInfoFilter = [] //[{date:'',total:'',time:''}]

    for (const value of bonusInfo) {
      if (bonusInfoFilter.length === 0) {
        if (value.bonus_type === BONUS_TYPE.global_bonus) {
          const endOfMonth = moment(value.created_at).endOf('month').format("YYYY/MM/DD HH:mm:ss")
          const obj = { ...value, date: endOfMonth, total: parseFloat(item.total_bonus) }
          bonusInfoFilter.push(obj)
        } else {
          bonusInfoFilter.push({ ...value, date: moment(value.created_at).format('YYYY/MM/DD HH:mm:ss') })
        }
      } else {
        if (value.bonus_type === BONUS_TYPE.global_bonus) {
          const valueDate = dayjs(value.created_at).format(FORMAT_DATA)
          const index = bonusInfoFilter.findIndex(item => dayjs(item.created_at).format(FORMAT_DATA) === valueDate && item.bonus_type === BONUS_TYPE.global_bonus)
          //如果之前有紀錄就加總，沒有就新增
          if (index < 0) {
            const endOfMonth = moment(value.created_at).endOf('month').format("YYYY/MM/DD HH:mm:ss")
            // console.log('moment(dayjs(value.created_at).format(FORMAT_DATA))１１１', moment(dayjs(value.created_at).format(FORMAT_DATA)))
            // console.log('moment(dayjs(value.created_at).format(FORMAT_DATA)).endOf', moment(dayjs(value.created_at).format(FORMAT_DATA)).endOf('month'))
            console.log('endOfMonth', endOfMonth)

            const obj = { ...value, date: endOfMonth, total: parseFloat(value.total_bonus) }
            bonusInfoFilter.push(obj)
          } else {
            bonusInfoFilter[index].total += parseFloat(value.total_bonus)
          }
        } else {
          bonusInfoFilter.push({ ...value, date: moment(value.created_at).format('YYYY/MM/DD HH:mm:ss') })
        }
      }
    }
    const bonusInfoFilterSort = bonusInfoFilter.sort((a, b) => moment(b.date).format('YYYY/MM/DD HH:mm:ss') < moment(a.date).format('YYYY/MM/DD HH:mm:ss') ? 1 : -1)
    console.log('bonusInfoFilterSort', bonusInfoFilterSort)
    setThreeDataArrayList(bonusInfoFilterSort)

  }, [bonusInfo])

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
            style={[styles.boxButton, { marginRight: 12 }]}
          >
            <Text style={styles.boxButtonText}>充值</Text>
          </Pressable>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={[styles.boxButton]}
          >
            <Text style={styles.boxButtonText}>劃轉</Text>
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
              const createdAtDate = dayjs(item.created_at).format('YYYY/MM/DD')
              const createdAtTime = dayjs(item.created_at).format('HH:mm:ss')
              return (
                <View key={`${createdAtDate + createdAtTime}`} style={[styles.rowStyle, { paddingVertical: 16 }]}>
                  <View style={styles.rowItem}>
                    <Text>{createdAtDate}</Text>
                    <Text>{createdAtTime}</Text>
                  </View>
                  <View style={styles.rowItem}>
                    <Text>{parseFloat(item.amount)}</Text>
                  </View>
                  <View style={styles.rowItem}>
                    <Text>{item.type === RECORD_TYPE.pickUp ? '提領' : '充值'}</Text>
                  </View>
                </View>
              )
            })
          }
          {
            boxIndex === BOX_INDEX.two && twoDataArrayList && twoDataArrayList.map((item, index) => {
              const createdAtDate = dayjs(item.created_at).format('YYYY/MM/DD')
              const createdAtTime = dayjs(item.created_at).format('HH:mm:ss')
              return (
                <View key={`${createdAtDate + createdAtTime}`} style={[styles.rowStyle, , { paddingVertical: 16 }]}>
                  <View style={styles.rowItem}>
                    <Text>{createdAtDate}</Text>
                    <Text>{createdAtTime}</Text>
                  </View>
                  <View style={styles.rowItem} >
                    <Text>{parseFloat(item.amount)}</Text>
                  </View>
                  <View style={styles.rowItem}>
                    <Text>機器人使用費</Text>
                  </View>
                </View>
              )
            })
          }
          {
            boxIndex === BOX_INDEX.three && Array.isArray(threeDataArrayList) && threeDataArrayList.length !== 0 && threeDataArrayList.reverse().map((item, index) => {
              // const formatDate = 'YYYY/MM/DD HH:mm:ss'
              // const createdAt = dayjs(item.created_at).format(formatDate)
              let str = ''
              const account = item?.form_user_account
              const pAccount = account.replace(account.slice(3, account.length - 3), '******')

              switch (item?.bonus_type) {
                case BONUS_TYPE.recommend_bonus:
                  if (item.to_depth === 1) str = '(1)'
                  else str = '(2)'
                  break
                case BONUS_TYPE.lv5_bonus:
                  str = '團隊獎金'
                  break
                case BONUS_TYPE.team_bouns:
                  str = '團對獎勵'
                  break
                case BONUS_TYPE.global_bonus:
                  str = '全球分紅'
                  break
                default:
                  break
              }

              return (
                <View key={`${index}`} style={[styles.rowStyle, , { paddingVertical: 16, flexWrap: 'wrap' }]}>
                  <View style={styles.rowItem}>
                    <Text>{item?.date.toString()}</Text>
                  </View>
                  <View style={styles.rowItem}>
                    <Text>{item?.bonus_type === BONUS_TYPE.global_bonus ? parseFloat(parseFloat(item.total).toFixed(8)) : parseFloat(parseFloat(item.total_bonus).toFixed(8))}</Text>
                  </View>
                  <View style={styles.rowItem}>
                    <Text>{str}{(item?.bonus_type === BONUS_TYPE.recommend_bonus) && pAccount}</Text>
                  </View>
                </View>
              )
            })
          }
          <Spacer size={500} flex={0} />
        </ScrollView>
        <View >
          <TransferModal handleSubmit={handleTransfer} transparent={true} modalVisible={modalVisible} setModalVisible={setModalVisible}></TransferModal>
        </View>
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
