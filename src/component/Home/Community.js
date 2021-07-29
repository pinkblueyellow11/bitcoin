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
import Spinner from 'react-native-loading-spinner-overlay'
import { SafeAreaView } from 'react-native-safe-area-context'
import componentProps from '../../constant/componentProps'
import { useNavigation } from '@react-navigation/native'
import screenName from '../../constant/screenName'
import Colors from '../../../native-base-theme/variables/commonColor'
import { Button, Item, Input, Container, Content, Label, Header, Left, Body, Right, Col } from 'native-base'
import { StatusBar } from 'expo-status-bar'
import Spacer from '../UI/Spacer'
import config from '../../constant/config'
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'

const initialLayout = { width: Dimensions.get('window').width }

function Community(props) {
  const { lastProfit, currentProfit, profitGroupArray, isWaiting, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()

  const windowWidth = useWindowDimensions().width

  const handleSubmit = async () => { }

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
          <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>社區</Text>
        </Body>
        <Right></Right>
      </Header>
      <View style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.boxView, { marginRight: 16 }]}>
            <Text style={styles.boxText1}>本月社區總盈利</Text>
            <Spacer size={10} flex={0} />
            {currentProfit !== null ?
              <Text style={styles.boxText2}>
                {parseFloat(parseFloat(currentProfit).toFixed(2)).toString()}</Text>
              :
              <Text style={styles.boxText2}>-</Text>}
          </View>
          <View style={[styles.boxView, { marginLeft: 12 }]}>
            <Text style={styles.boxText1}>上月社區總盈利</Text>
            <Spacer size={10} flex={0} />
            {lastProfit !== null ?
              <Text style={styles.boxText2}>{parseFloat(parseFloat(lastProfit).toFixed(2)).toString()}</Text>
              :
              <Text style={styles.boxText2}>-</Text>}
          </View>
        </View>
        <Spacer size={32} flex={0} />
        <View style={styles.rowStyle}>
          <View style={styles.rowItem}>
            <Text style={[componentProps.fontBodySmall6, { color: Colors.mainColor }]}>夥伴帳號</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={[componentProps.fontBodySmall6, { color: Colors.mainColor }]}>本月個人盈利</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={[componentProps.fontBodySmall6, { color: Colors.mainColor }]}>本月團隊盈利</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={[componentProps.fontBodySmall6, { color: Colors.mainColor }]}>註冊時間</Text>
          </View>
          {/* <Text style={[componentProps.fontBodySmall6, { color: Colors.mainColor }]}>本月盈利</Text> */}
        </View>
      </View>
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        {
          Array.isArray(profitGroupArray) && profitGroupArray.length !== 0 && profitGroupArray.map((item, index) => {
            const formatDate = 'YYYY-MM-DD'
            const account = item?.account
            const pAccount = account.replace(account.slice(3, account.length - 3), '******')
            return (
              <View key={`${item.account}`} style={[styles.rowStyle, { paddingVertical: 16 }]}>
                <View style={styles.rowItem}>
                  <Text>{pAccount}</Text>
                </View>
                <View style={styles.rowItem}>
                  <Text>{item.current_month_personal_profit}</Text>
                </View>
                <View style={styles.rowItem}>
                  <Text>{item.current_month_profit}</Text>
                </View>
                <View style={styles.rowItem}>
                  <Text>{dayjs(item.registered_at).format(formatDate)}</Text>
                </View>
                {/* <Text>{item.current_month_profit}</Text> */}
              </View>
            )
          })
        }
      </ScrollView>
      <Spinner visible={isWaiting} />
    </Container>
  )
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.mainBgColor,
    borderRadius: componentProps.borderRadius,
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
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

export default Community
