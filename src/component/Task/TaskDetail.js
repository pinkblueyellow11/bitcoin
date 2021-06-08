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
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons'

const initialLayout = { width: Dimensions.get('window').width }

function TaskDetail(props) {
  const { taskInfo, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()

  const [coinType, setCoinType] = useState('')
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    console.log('taskInfo', taskInfo)
    if (!taskInfo) return
    setCoinType(taskInfo.coin_code.replace('usdt', '').toUpperCase())
    if (!taskInfo.enabled) setIsOpen(false)
  }, [taskInfo])

  const handleSubmit = async () => {}

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
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>狀態</Text>
          <View style={{ flexDirection: 'row', width: '85%' }}>
            <Pressable
              onPress={() => setIsOpen(false)}
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
              onPress={() => setIsOpen(true)}
              style={[
                styles.typeBoxTwo,
                {
                  backgroundColor: isOpen ? Colors.redText : 'white',
                },
              ]}
            >
              <Text style={[styles.typeBoxText, { color: isOpen ? 'white' : Colors.grayText3 }]}>開啟</Text>
            </Pressable>
          </View>
        </View>
        <Spacer size={20} flex={0} />
        <View style={styles.listBox}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.litBoxRow}>
              <Text style={styles.listBoxTitle}>持倉總額</Text>
              <Text style={styles.listNumber}>0</Text>
            </View>
            <View style={styles.litBoxRow}>
              <Text style={styles.listBoxTitle}>持倉量</Text>
              <Text style={styles.listNumber}>0</Text>
            </View>
            <View style={styles.litBoxRow}>
              <Text style={styles.listBoxTitle}>持倉均價</Text>
              <Text style={styles.listNumber}>0</Text>
            </View>
          </View>
          <Spacer size={20} flex={0} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.litBoxRow}>
              <Text style={styles.listBoxTitle}>當前價格</Text>
              <Text style={styles.listNumber}>0</Text>
            </View>
            <View style={styles.litBoxRow}>
              <Text style={styles.listBoxTitle}>當前補倉</Text>
              <Text style={styles.listNumber}>0</Text>
            </View>
            <View style={styles.litBoxRow}>
              <Text style={styles.listBoxTitle}>交易次數</Text>
              <Text style={styles.listNumber}>0%</Text>
            </View>
          </View>
          <Spacer size={20} flex={0} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.litBoxRow}>
              <Text style={styles.listBoxTitle}>總收益</Text>
              <Text style={[styles.listNumber, { color: Colors.redText }]}>0</Text>
            </View>
            <View style={styles.litBoxRow}>
              <Text style={styles.listBoxTitle}>盈虧幅</Text>
              <Text style={[styles.listNumber, { color: Colors.redText }]}>0%</Text>
            </View>
            <View style={styles.litBoxRow}>
              <Text style={styles.listBoxTitle}>當前盈虧</Text>
              <Text style={[styles.listNumber, { color: Colors.redText }]}>0</Text>
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
              {taskInfo && <Text>{taskInfo.robot_setting.purchase_target_times}</Text>}
            </View>
            <View style={styles.listBox2RowBox}>
              <Text style={styles.listBox2RowBoxText}>首單金額</Text>
              {taskInfo && <Text>{taskInfo.robot_setting.first_purchase_cost}</Text>}
            </View>
          </View>
          <Spacer size={16} flex={0} />
          <View style={styles.listBox2Row}>
            <View style={styles.listBox2RowBox}>
              <Text style={styles.listBox2RowBoxText}>進第一單</Text>
              {taskInfo && <Text>{taskInfo.robot_setting.first_purchase_target}</Text>}
            </View>
            <View style={styles.listBox2RowBox}>
              <Text style={styles.listBox2RowBoxText}>止盈比例</Text>
              {taskInfo && <Text>{taskInfo.robot_setting.sell_target}</Text>}
            </View>
          </View>
          <Spacer size={16} flex={0} />
          <View style={styles.listBox2Row}>
            <View style={styles.listBox2RowBox}>
              <Text style={styles.listBox2RowBoxText}>跌幅加單</Text>
              {taskInfo && <Text>{taskInfo.robot_setting.purchase_target}</Text>}
            </View>
            <View style={styles.listBox2RowBox}>
              <Text style={styles.listBox2RowBoxText}>加單增幅</Text>
              {taskInfo && <Text>{taskInfo.robot_setting.purchase_addition_target}</Text>}
            </View>
          </View>
          <Spacer size={16} flex={0} />
          <View style={styles.listBox2Row}>
            <View style={styles.listBox2RowBox}>
              <Text style={styles.listBox2RowBoxText}>下跌回漲</Text>
              {taskInfo && <Text>{taskInfo.robot_setting.purchase_bounce_target}</Text>}
            </View>
            <View style={styles.listBox2RowBox}>
              <Text style={styles.listBox2RowBoxText}>上漲回降</Text>
              {taskInfo && <Text>{taskInfo.robot_setting.sell_bounce_target}</Text>}
            </View>
          </View>
        </View>
        <Spacer size={32} flex={0} />
        <Text style={[componentProps.fontBodySmall2, { color: Colors.mainColor }]}>操作</Text>
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View>
            <Pressable style={styles.circleButton} onPress={() => {}}>
              <AntDesign name="edit" size={24} color="white" />
            </Pressable>
            <Text style={styles.circleButtonText}>調整策略</Text>
          </View>
          <View>
            <Pressable style={styles.circleButton} onPress={() => {}}>
              <FontAwesome5 name="grip-lines" size={24} color="white" />
            </Pressable>
            <Text style={styles.circleButtonText}>一建平倉</Text>
          </View>
          <View>
            <Pressable style={styles.circleButton} onPress={() => {}}>
              <MaterialIcons name="attach-money" size={24} color="white" />
            </Pressable>
            <Text style={styles.circleButtonText}>一建補倉</Text>
          </View>
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
    backgroundColor: Colors.circleBgColor,
    padding: 20,
    borderRadius: 100,
  },
  circleButtonText: {
    ...componentProps.fontBody1Medium,
    color: '#A298AE',
    textAlign: 'center',
    marginTop: 4,
  },
})

export default TaskDetail
