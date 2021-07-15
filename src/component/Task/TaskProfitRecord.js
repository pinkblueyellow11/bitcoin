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
  Dimensions,
  Alert,
} from 'react-native'
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

const initialLayout = { width: Dimensions.get('window').width }

export default function TaskProfitRecord(props) {
  const { historyArrayList, isWaiting, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()


  const handleRegister = async () => { }

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
          <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>歷史盈利紀錄</Text>
        </Body>
        <Right></Right>
      </Header>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24 }}>
        <Text style={{ color: Colors.brandText }}>日期</Text>
        <Text style={{ color: Colors.brandText }}>盈利</Text>
      </View>
      <Spacer size={16} flex={0} />
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        {Array.isArray(historyArrayList) && historyArrayList.length !== 0 && historyArrayList.map((item, index) => {
          return (
            <>
              <View key={`${item.date}-${item.profit}`} style={styles.rowList}>
                <Text >{item.date}</Text>
                <Text>{parseFloat(parseFloat(item?.profit).toFixed(4))}</Text>
              </View>
              <View style={styles.rowLine} />
            </>
          )
        })}
      </ScrollView>
      <Spinner visible={isWaiting} color={Colors.mainColor} />
    </Container>
  )
}

const styles = StyleSheet.create({
  rowList: {
    flexDirection: 'row',
    paddingTop: 28,
    paddingBottom: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  rowLine: {
    backgroundColor:
      Colors.grayText, height: 0.5,
    width: initialLayout.width - 32,
    alignSelf: 'center',
  },
})
