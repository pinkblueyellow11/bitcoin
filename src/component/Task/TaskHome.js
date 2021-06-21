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

const initialLayout = { width: Dimensions.get('window').width }

function TaskHome(props) {
  const { robotArray, api_key_setted, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()

  const windowWidth = useWindowDimensions().width

  const handleSubmit = async () => { }

  console.log('robotArray', robotArray)

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
              if (api_key_setted) navigation.navigate(screenName.ChooseCoinType)
              else
                Alert.alert('請先至主頁設定API KEY', '', [
                  {
                    text: '確定',
                    onPress: () => { },
                  },
                ])
            }}
          >
            <Text style={{ color: Colors.mainColor }}>新建任務</Text>
          </Pressable>
        </Right>
      </Header>
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding + 10 }]}>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.boxView, { marginRight: 16 }]}>
            <Text style={styles.boxText1}>今日總盈利</Text>
            <Spacer size={10} flex={0} />
            <Text style={styles.boxText2}>0</Text>
          </View>
          <View style={[styles.boxView, { marginLeft: 12 }]}>
            <Text style={styles.boxText1}>歷史總盈利</Text>
            <Spacer size={10} flex={0} />
            <Text style={styles.boxText2}>0</Text>
          </View>
        </View>
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.boxView, { marginRight: 16 }]}>
            <Text style={styles.boxText1}>USDT餘額</Text>
            <Spacer size={10} flex={0} />
            <Text style={styles.boxText2}>0</Text>
          </View>
          <View style={[styles.boxView, { marginLeft: 12 }]}>
            <Text style={styles.boxText1}>總持倉</Text>
            <Spacer size={10} flex={0} />
            <Text style={styles.boxText2}>0</Text>
          </View>
        </View>
        <Spacer size={32} flex={0} />
        {robotArray && robotArray.length > 0 &&
          robotArray.map((value, index) => {
            //console.log('value', value)
            const catchIndex = value.length - 1
            const coinType = value[catchIndex]?.coin_code.replace('usdt', '').toUpperCase()
            return (
              <View key={index}>
                <Spacer size={12} flex={0} />
                <View style={styles.listTitleBox} >
                  <Pressable onPress={() => navigation.navigate(screenName.TaskDetail, { taskInfo: value[catchIndex] })}>
                    <Text style={styles.listTitle}>{coinType}/USDT</Text>
                  </Pressable>
                  <Text style={{ color: value[catchIndex]?.enabled ? '#11AB2C' : '#FF3B30' }}>
                    <Text style={{ color: Colors.grayText3 }}>狀態：</Text>
                    {value[0]?.enabled ? '開啟' : '關閉'}
                  </Text>
                </View>
                <View style={styles.listBox}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.litBoxRow}>
                      <Text style={styles.listBoxTitle}>持倉量</Text>
                      <Text style={styles.listNumber}>
                        {value[0]?.purchase_amount && <Text>{parseFloat(value[catchIndex]?.purchase_amount).toFixed(7)}</Text>}
                      </Text>
                    </View>
                    <View style={styles.litBoxRow}>
                      <Text style={styles.listBoxTitle}>持倉均價</Text>
                      <Text style={styles.listNumber}>
                        {value[0]?.robot_trans_info.purchase_average && (
                          <Text>{parseFloat(value[catchIndex]?.robot_trans_info.purchase_average).toFixed(7)}</Text>
                        )}
                      </Text>
                    </View>
                    <View style={styles.litBoxRow}>
                      <Text style={styles.listBoxTitle}>持倉總額</Text>
                      <Text style={styles.listNumber}>
                        {value[0]?.usdt_purchase_amount && (
                          <Text>{parseFloat(value[catchIndex]?.usdt_purchase_amount).toFixed(7)}</Text>
                        )}
                      </Text>
                    </View>
                    <View style={styles.litBoxRow}>
                      <Text style={styles.listBoxTitle}>總盈利</Text>
                      <Text style={styles.listNumber}>-</Text>
                    </View>
                  </View>
                  <Spacer size={20} flex={0} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.litBoxRow}>
                      <Text style={styles.listBoxTitle}>當前價格</Text>
                      <Text style={styles.listNumber}>-</Text>
                    </View>
                    <View style={styles.litBoxRow}>
                      <Text style={styles.listBoxTitle}>持倉單數</Text>
                      <Text style={styles.listNumber}>-</Text>
                    </View>
                    <View style={styles.litBoxRow}>
                      <Text style={styles.listBoxTitle}>盈虧幅</Text>
                      <Text style={styles.listNumber}>-%</Text>
                    </View>
                    <View style={styles.litBoxRow}>
                      <Text style={styles.listBoxTitle}>盈虧</Text>
                      <Text style={styles.listNumber}>-</Text>
                    </View>
                  </View>
                </View>
                <Spacer size={8} flex={0} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Pressable>
                    <Text style={styles.listButtonText}>暫停買入</Text>
                  </Pressable>
                  <Pressable >
                    <Text style={styles.listButtonText}>一鍵加倉</Text>
                  </Pressable>
                  <Pressable>
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
    color: Colors.redText,
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
