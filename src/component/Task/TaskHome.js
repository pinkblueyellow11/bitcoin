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
import Spinner from 'react-native-loading-spinner-overlay'
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
import { Feather } from '@expo/vector-icons'

const initialLayout = { width: Dimensions.get('window').width }

function TaskHome(props) {
  const { getUsdtBalance, usdtAmount, profitToday, getProfitToday, profitMonth, getProfitMonth, usdtBalance, getRobot, closeRobot, closeRobotPurchase, outOfWarehouse, robotArray, api_key_setted, coinCurrentPrice, errorMsg, setErrorMsg, isWaiting, setIsWaiting } = props
  const navigation = useNavigation()

  const [totalPosition, setTotalPosition] = useState(null)
  const [totalProfitArrayList, setTotalProfitArrayList] = useState(null)

  const handleRefresh = async () => {
    await getRobot()
    await getProfitToday()
    await getProfitMonth()
    await getUsdtBalance()
  }

  const handleCloseRobot = async (id, enabled) => {
    const body = {
      enabled: enabled ? 0 : 1,
    }
    const result = await closeRobot(id, body)
    if (result.message) {
      setErrorMsg(null)
      Alert.alert('更改失敗', '', [
        {
          text: '確定',
          onPress: () => { },
        },
      ])
    }
  }

  const handleCloseRobotPurchase = async (id, enabled) => {
    const body = {
      purchase_enabled: enabled ? 0 : 1,
    }
    const result = await closeRobotPurchase(id, body)
    if (result.message) {
      setErrorMsg(null)
      Alert.alert('更改失敗', '', [
        {
          text: '確定',
          onPress: () => { },
        },
      ])
    }
  }

  const handleOutOfWarehouse = async (id) => {
    const result = await outOfWarehouse(id)
  }

  useEffect(() => {
    if (errorMsg !== null) {
      console.log('errorMsg', errorMsg)
      if (errorMsg === undefined) errorMsg = '系統錯誤'
      Alert.alert(errorMsg, '', [
        {
          text: '確定',
          onPress: () => { },
        },
      ])
      setErrorMsg(null)
    }
  }, [errorMsg])

  useEffect(() => {
    if (!robotArray) return
    let total = 0
    let totalProfitArray = []
    for (const item of robotArray) {
      if (item[0].enabled) total += parseFloat(item[0]?.usdt_purchase_amount)
      let totalProfit = 0
      item.map((value) => {
        if (parseFloat(value.profit) > 0)
          totalProfit += parseFloat(value.profit)
      })
      totalProfitArray.push(totalProfit.toFixed(2))
    }
    setTotalPosition(parseFloat(total).toFixed(0))
    setTotalProfitArrayList(totalProfitArray)
  }, [robotArray])

  useEffect(() => {
    const timerId = setInterval(() => {
      getRobot()
    }, 300000)
    return () => clearInterval(timerId);
  }, [])

  return (
    <Container style={{}}>
      <Header transparent style={{ backgroundColor: Colors.brandRed80 }}>
        <StatusBar style="dark" backgroundColor="transparent" />
        <Left style={{ flex: 1 }}></Left>
        <Body>
          <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>任務</Text>
        </Body>
        <Right>
          <Pressable
            onPress={() => {
              if (!api_key_setted) {
                Alert.alert('請先至主頁設定API KEY', '', [
                  {
                    text: '確定',
                    onPress: () => { },
                  },
                ])
                return
              }
              if (parseFloat(usdtAmount) <= 0) {
                Alert.alert('燃料費不足，無法新建任務，請先充值', '', [
                  {
                    text: '確定',
                    onPress: () => { },
                  },
                ])
                return
              }
              navigation.navigate(screenName.ChooseCoinType)
            }}
          >
            <Text style={{ color: Colors.mainColor }}>新建任務</Text>
          </Pressable>
        </Right>
      </Header>
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding + 10 }]}>
        <View style={{ flexDirection: 'row' }}>
          <Pressable onPress={() => navigation.navigate(screenName.TaskProfitRecord)} style={[styles.boxView, { marginRight: 16 }]}>
            <Text style={styles.boxText1}>今日總盈利</Text>
            <Spacer size={10} flex={0} />
            {profitToday !== null && <Text style={styles.boxText2}>{parseFloat(parseFloat(profitToday).toFixed(2)).toString() || '-'}</Text>}
          </Pressable>
          <Pressable onPress={() => navigation.navigate(screenName.TaskProfitRecord)} style={[styles.boxView, { marginLeft: 12 }]}>
            <Text style={styles.boxText1}>歷史總盈利</Text>
            <Spacer size={10} flex={0} />
            {profitMonth !== null && <Text style={styles.boxText2}>{parseFloat(parseFloat(profitMonth).toFixed(2)).toString() || '-'}</Text>}
          </Pressable>
        </View>
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.boxView, { marginRight: 16 }]}>
            <Text style={styles.boxText1}>USDT餘額</Text>
            <Spacer size={10} flex={0} />
            {usdtBalance !== null ? <Text style={styles.boxText2}>{parseFloat(usdtBalance).toString()}</Text> : <Text style={styles.boxText2}>-</Text>}
          </View>
          <View style={[styles.boxView, { marginLeft: 12 }]}>
            <Text style={styles.boxText1}>總持倉</Text>
            <Spacer size={10} flex={0} />
            {!!totalPosition && <Text style={styles.boxText2}>{totalPosition}</Text>}
          </View>
        </View>
        <Spacer size={32} flex={0} />
        <Pressable onPress={handleRefresh} style={{ alignItems: 'flex-end' }}>
          <Feather name="refresh-ccw" size={20} color={Colors.brandText} />
        </Pressable>
        <Spacer size={8} flex={0} />
        {robotArray && robotArray.length > 0 &&
          robotArray.map((value, index) => {
            const catchIndex = value.length - 1
            const coinType = value[0]?.coin_code.replace('usdt', '').toUpperCase()
            const currentPriceFilter = coinCurrentPrice.filter((res) => res.coin_code === value[0]?.coin_code)
            //持倉量
            const purchaseAmount = value[0]?.purchase_amount ? parseFloat(parseFloat(value[0]?.purchase_amount).toFixed(4)) : null
            //當前價格
            const currentPrice = currentPriceFilter[0]?.cost ? parseFloat(parseFloat(currentPriceFilter[0]?.cost).toFixed(4)) : null
            //持倉均價
            const averagePositionPrice = value[0]?.robot_trans_info?.purchase_average ? parseFloat(value[0].robot_trans_info.purchase_average).toFixed(4) : null
            //持倉總額
            const usdtPurchaseAmount = value[0]?.usdt_purchase_amount ? parseFloat(value[0]?.usdt_purchase_amount).toFixed(0) : null
            // 盈虧幅 = (當前價格-持倉均價)/持倉均價 ， 用百分比顯示
            const profitAndLossPeasant = currentPrice && averagePositionPrice ? (((currentPrice - averagePositionPrice) / averagePositionPrice) * 100).toFixed(2) : null
            // 盈虧 ＝ 持倉總額*盈虧幅
            const profitAndLoss = usdtPurchaseAmount && profitAndLossPeasant ? (usdtPurchaseAmount * (profitAndLossPeasant / 100)).toFixed(2) : null
            return (
              <View key={index}>
                <Spacer size={12} flex={0} />
                <View style={styles.listTitleBox} >
                  <Pressable onPress={() => navigation.navigate(screenName.TaskDetail, { id: value[0].robot_id, profitAndLossPeasant, currentPrice, totalProfit: totalProfitArrayList[index] })}>
                    <Text style={styles.listTitle}>{coinType}/USDT</Text>
                  </Pressable>
                  <Pressable onPress={() => {
                    const str = !!value[0]?.enabled ? '關閉' : '開啟'
                    Alert.alert('確定要' + str, '', [
                      {
                        text: '取消',
                        onPress: () => { },
                      },
                      {
                        text: '確定',
                        onPress: () => { handleCloseRobot(value[0].robot_id, value[0]?.enabled) },
                      },
                    ])
                  }}>
                    <Text style={{ color: value[0]?.enabled ? '#11AB2C' : '#FF3B30' }}>
                      <Text style={{ color: Colors.grayText3 }}>狀態：</Text>
                      {value[0]?.enabled ? '開啟' : '關閉'}
                    </Text>
                  </Pressable>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text >循環次數 {value?.length}</Text>
                  <Text >任務編號 {value[0].group_robot_id}</Text>
                  <Text >排程編號 {value[0].robot_id}</Text>
                </View>
                <Spacer size={12} flex={0} />
                <Pressable style={styles.listBox} onPress={() => navigation.navigate(screenName.TaskDetail, { id: value[0].robot_id, profitAndLossPeasant, currentPrice, totalProfit: totalProfitArrayList[index] })}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.litBoxRow}>
                      <Text style={styles.listBoxTitle}>持倉量</Text>
                      <Text style={[styles.listNumber]}>
                        {!!purchaseAmount && <Text >{purchaseAmount}</Text>}
                      </Text>
                    </View>
                    <View style={styles.litBoxRow}>
                      <Text style={styles.listBoxTitle}>持倉均價</Text>
                      <Text style={styles.listNumber}>
                        {!!averagePositionPrice && (
                          <Text >{parseFloat(averagePositionPrice)}</Text>
                        )}
                      </Text>
                    </View>
                    <View style={styles.litBoxRow}>
                      <Text style={styles.listBoxTitle}>持倉總額</Text>
                      <Text style={styles.listNumber}>
                        {!!usdtPurchaseAmount && (
                          <Text >{parseFloat(usdtPurchaseAmount)}</Text>
                        )}
                      </Text>
                    </View>
                    <View style={styles.litBoxRow}>
                      <Text style={styles.listBoxTitle}>總盈利</Text>
                      {totalProfitArrayList && <Text style={[styles.listNumber, { color: totalProfitArrayList[index] >= 0 ? 'green' : 'red' }]}>{parseFloat(totalProfitArrayList[index])}</Text>}
                    </View>
                  </View>
                  <Spacer size={20} flex={0} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.litBoxRow}>
                      <Text style={styles.listBoxTitle}>當前價格</Text>
                      {!!currentPrice && <Text style={styles.listNumber}>{currentPrice}</Text>}
                    </View>
                    <View style={styles.litBoxRow}>
                      <Text style={styles.listBoxTitle}>持倉單數</Text>
                      <Text style={styles.listNumber}>{value[0]?.robot_trans_info && (
                        <Text>{parseInt(value[0]?.robot_trans_info.purchase_count)}</Text>
                      )}</Text>
                    </View>
                    <View style={styles.litBoxRow}>
                      <Text style={styles.listBoxTitle}>盈虧幅</Text>
                      {!!profitAndLossPeasant && <Text style={[styles.listNumber, { color: profitAndLossPeasant > 0 ? 'green' : 'red' }]}>{parseFloat(profitAndLossPeasant)}%</Text>}
                    </View>
                    <View style={styles.litBoxRow}>
                      <Text style={styles.listBoxTitle}>盈虧</Text>
                      {!!profitAndLoss && <Text style={[styles.listNumber, { color: profitAndLoss >= 0 ? 'green' : 'red' }]}>{parseFloat(profitAndLoss)}</Text>}
                    </View>
                  </View>
                </Pressable>
                <Spacer size={8} flex={0} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Pressable onPress={() => {
                    const str = !!value[0]?.purchase_enabled ? '暫停買入' : '恢復買入'
                    Alert.alert('確定要' + str, '', [
                      {
                        text: '取消',
                        onPress: () => { },
                      },
                      {
                        text: '確定',
                        onPress: () => { handleCloseRobotPurchase(value[0].robot_id, value[0]?.purchase_enabled) },
                      },
                    ])
                  }}>
                    <Text style={styles.listButtonText}>{value[0].purchase_enabled ? '暫停買入' : '恢復買入'}</Text>
                  </Pressable>
                  <Pressable onPress={() => navigation.navigate(screenName.CoverUp, { robot_id: value[0]?.robot_id })}>
                    <Text style={styles.listButtonText}>一鍵加倉</Text>
                  </Pressable>
                  <Pressable onPress={() => {
                    Alert.alert('確定要一鍵平倉', '', [
                      {
                        text: '取消',
                        onPress: () => { },
                      },
                      {
                        text: '確定',
                        onPress: () => { handleOutOfWarehouse(value[0].robot_id) },
                      },
                    ])
                  }}>
                    <Text style={styles.listButtonText}>一鍵平倉</Text>
                  </Pressable>
                </View>
                {/* <Pressable
                  onPress={() => navigation.navigate(screenName.TaskDetail, { taskInfo: value })}
                  style={{ alignSelf: 'flex-end', flexDirection: 'row' }}
                >
                  <Text style={[styles.listNumber, { color: Colors.mainColor }]}>查看詳情</Text>
                  <View style={{ alignSelf: 'flex-end' }}>
                    <AntDesign name="arrowright" size={24} color={Colors.mainColor} />
                  </View>
                </Pressable> */}
                <Spacer size={30} flex={0} />
                <View style={{ height: 0.5, backgroundColor: Colors.grayText2 }} />
              </View>
            )
          })}
        {/* <View style={styles.rowBox}>
          <Pressable onPress={() => {}} style={styles.rowBoxButton}>
            <Text style={styles.rowBoxText}>買進時間</Text>
            <MaterialCommunityIcons name="menu-down-outline" size={18} color={Colors.mainBgColor} />
          </Pressable>
          <Pressable onPress={() => {}} style={styles.rowBoxButton}>
            <Text style={styles.rowBoxText}>買進數量</Text>
            <MaterialCommunityIcons name="menu-down-outline" size={18} color={Colors.mainBgColor} />
          </Pressable>
          <Pressable onPress={() => {}} style={styles.rowBoxButton}>
            <Text style={styles.rowBoxText}>買進收益</Text>
            <MaterialCommunityIcons name="menu-down-outline" size={18} color={Colors.mainBgColor} />
          </Pressable>
          <Pressable onPress={() => {}} style={styles.rowBoxButton}>
            <Text style={styles.rowBoxText}>收益率</Text>
            <MaterialCommunityIcons name="menu-down-outline" size={18} color={Colors.mainBgColor} />
          </Pressable>
        </View> */}

        <Spacer size={100} flex={0} />
      </ScrollView>
      <Spinner visible={isWaiting} />
    </Container>
  )
}

const styles = StyleSheet.create({
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
  rowBox: {
    backgroundColor: Colors.grayBgColor,
    flexDirection: 'row',
    paddingVertical: 8,
  },
  rowBoxButton: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  rowBoxText: {
    ...componentProps.fontBodySmall,
    color: Colors.grayText3,
  },
  listTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  listTitle: {
    ...componentProps.fontBody1Medium,
    color: Colors.mainColor,
  },
  listBox: {
    backgroundColor: Colors.inputBgColor,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  litBoxRow: {
    flex: 1,
    alignItems: 'center',
  },
  listBoxTitle: {
    ...componentProps.fontBodySmall6,
    color: Colors.grayText3,
  },
  listNumber: {
    ...componentProps.fontBody1Medium,
    marginTop: 8,
  },
  listButtonText: {
    ...componentProps.fontBody1Medium,
    color: Colors.brandText,
  },
})

export default TaskHome
