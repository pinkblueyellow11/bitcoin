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
import { Ionicons, AntDesign, Feather, MaterialIcons } from '@expo/vector-icons'

const initialLayout = { width: Dimensions.get('window').width }

function TaskDetail(props) {
  const { botRepeat, getRobotDetail, taskDetail, closeRobot, outOfWarehouse, profitAndLossPeasant, currentPrice, totalProfit, errorMsg, setErrorMsg, isWaiting, setIsWaiting } = props
  const navigation = useNavigation()

  const [coinType, setCoinType] = useState('')
  const [isOpen, setIsOpen] = useState(null)
  const [profitAndLossInfo, setProfitAndLossInfo] = useState(null)

  useEffect(() => {
    if (!taskDetail) return
    setIsWaiting(true)
    setCoinType(taskDetail.coin_code.replace('usdt', '').toUpperCase())
    setIsOpen(!!taskDetail.enabled)
    setIsWaiting(false)
    //持倉均價
    const purchaseAverage = parseFloat(taskDetail.robot_trans_info.purchase_average)
    //持倉總額
    const usdtPurchaseAmount = parseFloat(taskDetail?.usdt_purchase_amount)
    // 盈虧 =  (當前價格-持倉均價 ) * 持倉總額  持倉總額*盈虧幅
    const profitAndLoss = profitAndLossPeasant && usdtPurchaseAmount ? parseFloat(((profitAndLossPeasant * usdtPurchaseAmount) / 100).toFixed(4)) : null
    setProfitAndLossInfo(profitAndLoss)
  }, [taskDetail])

  const handleSubmit = async () => { }

  const handleCloseRobot = async () => {
    const body = {
      enabled: isOpen ? 0 : 1,
    }
    const result = await closeRobot(taskDetail.robot_id, body)
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

  const handleBotRepeat = async () => {
    const body = {
      auto_repeat: taskDetail.auto_repeat ? 0 : 1,
    }
    const result = await botRepeat(taskDetail?.robot_id, body)
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

  useEffect(() => {
    if (errorMsg !== null) {
      Alert.alert(errorMsg, '', [
        {
          text: '確定',
          onPress: () => { },
        },
      ])
      setErrorMsg(null)
    }
  }, [errorMsg])

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
          <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>{coinType}/USDT 詳情</Text>
        </Body>
        <Right>
          <Pressable onPress={() => navigation.navigate(screenName.TaskRecord)}>
            <Text style={{ color: Colors.mainColor }}>交易紀錄</Text>
          </Pressable>
        </Right>
      </Header>
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding + 10 }]}>
        <Pressable onPress={() => { getRobotDetail(taskDetail?.robot_id) }} style={{ alignItems: 'flex-end' }}>
          <Feather name="refresh-ccw" size={20} color={Colors.brandText} />
        </Pressable>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>任務編號</Text>
          {taskDetail && <Text style={styles.itemTitle}>{taskDetail.group_robot_id}</Text>}
        </View>
        <Spacer size={20} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>排程編號</Text>
          {taskDetail && <Text style={styles.itemTitle}>{taskDetail.robot_id}</Text>}
        </View>

        <Spacer size={20} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>狀態</Text>
          {taskDetail && <Text style={[styles.itemTitle, { color: !!taskDetail.enabled ? Colors.greenText : Colors.redText }]}>{!!taskDetail.enabled ? '開啟' : '關閉'}</Text>}
          {/* <View style={{ flexDirection: 'row', width: '85%' }}>
            <Pressable
              onPress={handleCloseRobot}
              style={[
                styles.typeBoxOne,
                {
                  backgroundColor: isOpen ? 'white' : Colors.redText,
                },
              ]}
            >
              <Text style={[styles.typeBoxText, { color: isOpen ? Colors.grayText3 : 'white' }]}>關閉</Text>
            </Pressable>
            <Pressable
              onPress={handleCloseRobot}
              style={[
                styles.typeBoxTwo,
                {
                  backgroundColor: isOpen ? Colors.redText : 'white',
                },
              ]}
            >
              <Text style={[styles.typeBoxText, { color: isOpen ? 'white' : Colors.grayText3 }]}>開啟</Text>
            </Pressable>
          </View> */}
        </View>
        <Spacer size={20} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>機器人進單狀態</Text>
          {taskDetail && <Text style={styles.itemTitle}>{taskDetail.purchase_enabled ? '持續買入' : '暫停買入'}</Text>}
        </View>
        <Spacer size={20} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>機器人自動循環</Text>
          {taskDetail && <Text style={styles.itemTitle}>{taskDetail.auto_repeat ? '開啟' : '關閉'}</Text>}
        </View>
        <Spacer size={20} flex={0} />
        <View style={styles.listBox}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.litBoxRow}>
              <Text style={styles.listBoxTitle}>持倉總額</Text>
              <Text style={styles.listNumber}>
                {taskDetail && <Text >{parseFloat(parseFloat(taskDetail?.usdt_purchase_amount).toFixed(2))}</Text>}
              </Text>
            </View>
            <View style={styles.litBoxRow}>
              <Text style={styles.listBoxTitle}>持倉量</Text>
              <Text style={styles.listNumber}>
                {taskDetail && <Text >{parseFloat(parseFloat(taskDetail?.purchase_amount).toFixed(4))}</Text>}
              </Text>
            </View>
            <View style={styles.litBoxRow}>
              <Text style={styles.listBoxTitle}>持倉均價</Text>
              <Text style={styles.listNumber}>
                {taskDetail && taskDetail?.robot_trans_info?.purchase_average && (
                  <Text style={{ color: parseFloat(taskDetail?.robot_trans_info?.purchase_average) > 0 ? 'green' : 'red' }}>{parseFloat(parseFloat(taskDetail?.robot_trans_info?.purchase_average).toFixed(4))}</Text>
                )}
              </Text>
            </View>
          </View>
          <Spacer size={20} flex={0} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.litBoxRow}>
              <Text style={styles.listBoxTitle}>當前價格</Text>
              <Text style={styles.listNumber}>
                {currentPrice && <Text >{currentPrice}</Text>}
              </Text>
            </View>
            <View style={styles.litBoxRow}>
              <Text style={styles.listBoxTitle}>當前補倉</Text>
              <Text style={styles.listNumber}>-</Text>
            </View>
            <View style={styles.litBoxRow}>
              <Text style={styles.listBoxTitle}>交易次數</Text>
              <Text style={styles.listNumber}>
                {taskDetail && <Text>{parseFloat(taskDetail?.robot_trans_info?.purchase_count)}</Text>}
              </Text>
            </View>
          </View>
          <Spacer size={20} flex={0} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.litBoxRow}>
              <Text style={styles.listBoxTitle}>總盈利</Text>
              <Text style={[styles.listNumber, { color: Colors.redText }]}>
                {totalProfit && <Text style={{ color: parseFloat(taskDetail?.profit) > 0 ? 'green' : 'red' }}>{parseFloat(totalProfit)}</Text>}
              </Text>
            </View>
            <View style={styles.litBoxRow}>
              <Text style={styles.listBoxTitle}>盈虧幅</Text>
              {!!profitAndLossPeasant && <Text style={[styles.listNumber, { color: profitAndLossPeasant > 0 ? 'green' : 'red' }]}>{profitAndLossPeasant}%</Text>}
            </View>
            <View style={styles.litBoxRow}>
              <Text style={styles.listBoxTitle}>當前盈虧</Text>
              {!!profitAndLossInfo && <Text style={[styles.listNumber, { color: profitAndLossInfo > 0 ? 'green' : 'red' }]}>{profitAndLossInfo}</Text>}
            </View>
          </View>
        </View>
        <Spacer size={32} flex={0} />
        <Text style={[componentProps.fontBodySmall2, { color: Colors.mainColor }]}>策略</Text>
        <Spacer size={16} flex={0} />
        <View style={styles.listBox}>
          <View style={styles.listBox2Row}>
            <View style={styles.listBox2RowBox}>
              <Text style={styles.listBox2RowBoxText}>做單數量</Text>
              {taskDetail && <Text>{taskDetail?.robot_setting?.purchase_target_times}</Text>}
            </View>
            <View style={styles.listBox2RowBox}>
              <Text style={styles.listBox2RowBoxText}>首單金額</Text>
              {taskDetail && <Text>{taskDetail.robot_setting.first_purchase_cost}</Text>}
            </View>
          </View>
          <Spacer size={16} flex={0} />
          <View style={styles.listBox2Row}>
            <View style={styles.listBox2RowBox}>
              <Text style={styles.listBox2RowBoxText}>進第一單</Text>
              {taskDetail && <Text>{taskDetail.robot_setting.first_purchase_target}</Text>}
            </View>
            <View style={styles.listBox2RowBox}>
              <Text style={styles.listBox2RowBoxText}>止盈比例</Text>
              {taskDetail && <Text>{taskDetail.robot_setting.sell_target}</Text>}
            </View>
          </View>
          <Spacer size={16} flex={0} />
          <View style={styles.listBox2Row}>
            <View style={styles.listBox2RowBox}>
              <Text style={styles.listBox2RowBoxText}>跌幅加單</Text>
              {taskDetail && <Text>{taskDetail.robot_setting.purchase_target}</Text>}
            </View>
            <View style={styles.listBox2RowBox}>
              <Text style={styles.listBox2RowBoxText}>加單增幅</Text>
              {taskDetail && <Text>{taskDetail.robot_setting.purchase_addition_target}</Text>}
            </View>
          </View>
          <Spacer size={16} flex={0} />
          <View style={styles.listBox2Row}>
            <View style={styles.listBox2RowBox}>
              <Text style={styles.listBox2RowBoxText}>下跌回漲</Text>
              {taskDetail && <Text>{taskDetail.robot_setting.purchase_bounce_target}</Text>}
            </View>
            <View style={styles.listBox2RowBox}>
              <Text style={styles.listBox2RowBoxText}>上漲回降</Text>
              {taskDetail && <Text>{taskDetail.robot_setting.sell_bounce_target}</Text>}
            </View>
          </View>
        </View>
        <Spacer size={32} flex={0} />
        <Text style={[componentProps.fontBodySmall2, { color: Colors.mainColor }]}>操作</Text>
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          {taskDetail && <View style={{ marginRight: 24, alignItems: 'center' }}>
            <Pressable style={styles.circleButton} onPress={handleBotRepeat}>
              <AntDesign name="edit" size={24} color="white" />
            </Pressable>
            <Text style={styles.circleButtonText}>{taskDetail.auto_repeat ? '關閉' : '開啟'}機器人自動循環</Text>
          </View>}
          <View style={{ marginRight: 24, alignItems: 'center' }}>
            <Pressable style={styles.circleButton} onPress={() => { }}>
              <AntDesign name="edit" size={24} color="white" />
            </Pressable>
            <Text style={styles.circleButtonText}>調整策略</Text>
          </View>
          {/* <View>
            <Pressable style={styles.circleButton} onPress={() => outOfWarehouse(taskDetail?.robot_id)}>
              <FontAwesome5 name="grip-lines" size={24} color="white" />
            </Pressable>
            <Text style={styles.circleButtonText}>一鍵平倉</Text>
          </View>
          <View>
            <Pressable style={styles.circleButton} onPress={() => navigation.navigate(screenName.CoverUp, { robot_id: taskDetail.robot_id })}>
              <MaterialIcons name="attach-money" size={24} color="white" />
            </Pressable>
            <Text style={styles.circleButtonText}>一鍵補倉</Text>
          </View> */}
        </View>
        <Spacer size={64} flex={0} />
        <Pressable
          style={{
            borderRadius: componentProps.borderRadius,
            borderColor: Colors.redText,
            borderWidth: 2,
            paddingVertical: 16,
          }}
          onPress={handleSubmit}
        >
          <Text style={[componentProps.fontH5Medium, { color: Colors.redText, textAlign: 'center' }]}>
            刪除任務
          </Text>
        </Pressable>
        <Spacer size={100} flex={0} />
      </ScrollView>
      <Spinner visible={isWaiting} />
    </Container>
  )
}

const styles = StyleSheet.create({
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
  itemTitle: {
    color: Colors.grayText3,
    alignSelf: 'center',
    marginRight: 8,
  },
  typeBoxOne: {
    borderColor: Colors.redText,
    borderWidth: 1,
    borderRightWidth: 0,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flex: 1,
  },
  typeBoxTwo: {
    borderColor: Colors.redText,
    borderWidth: 1,
    borderLeftWidth: 0,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flex: 1,
  },
  typeBoxText: {
    ...componentProps.fontOverline,
    textAlign: 'center',
  },
  listBox2Row: {
    flexDirection: 'row',
  },
  listBox2RowBox: {
    flex: 1,
    flexDirection: 'row',
  },
  listBox2RowBoxText: {
    paddingRight: 16,
    color: Colors.grayText3,
  },
  circleButton: {
    width: 70,
    height: 70,
    backgroundColor: Colors.circleBgColor,
    padding: 20,
    borderRadius: 70 / 2,
    alignItems: 'center',
  },
  circleButtonText: {
    ...componentProps.fontBody1Medium,
    color: '#A298AE',
    textAlign: 'center',
    marginTop: 4,
  },
})

export default TaskDetail
