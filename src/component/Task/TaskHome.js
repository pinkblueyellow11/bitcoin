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
  const { errorMsg, setErrorMsg } = props
  const navigation = useNavigation()

  const windowWidth = useWindowDimensions().width

  const handleSubmit = async () => {}

  return (
    <Container style={{}}>
      <Header transparent style={{ backgroundColor: Colors.brandRed80 }}>
        <StatusBar style="dark" backgroundColor="transparent" />
        <Left style={{ flex: 1 }}></Left>
        <Body>
          <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>任務</Text>
        </Body>
        <Right>
          <Pressable onPress={() => {}}>
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
            <Text style={styles.boxText1}>今日盈利</Text>
            <Spacer size={10} flex={0} />
            <Text style={styles.boxText2}>0</Text>
          </View>
          <View style={[styles.boxView, { marginLeft: 12 }]}>
            <Text style={styles.boxText1}>總盈利</Text>
            <Spacer size={10} flex={0} />
            <Text style={styles.boxText2}>0</Text>
          </View>
        </View>
        <Spacer size={24} flex={0} />
        <View style={{ backgroundColor: Colors.grayBgColor, flexDirection: 'row' }}>
          <Pressable onPress={() => {}} style={{ flexDirection: 'row', paddingHorizontal: 4 }}>
            <Text style={[componentProps.fontBodySmall, { color: Colors.grayText3 }]}>買進時間</Text>
            <MaterialCommunityIcons name="menu-down-outline" size={18} color={Colors.mainBgColor} />
          </Pressable>
          <Pressable onPress={() => {}} style={{ flexDirection: 'row', paddingHorizontal: 4 }}>
            <Text style={[componentProps.fontBodySmall, { color: Colors.grayText3 }]}>買進數量</Text>
            <MaterialCommunityIcons name="menu-down-outline" size={18} color={Colors.mainBgColor} />
          </Pressable>
          <Pressable onPress={() => {}} style={{ flexDirection: 'row', paddingHorizontal: 4 }}>
            <Text style={[componentProps.fontBodySmall, { color: Colors.grayText3 }]}>買進收益</Text>
            <MaterialCommunityIcons name="menu-down-outline" size={18} color={Colors.mainBgColor} />
          </Pressable>
          <Pressable onPress={() => {}} style={{ flexDirection: 'row', paddingHorizontal: 4 }}>
            <Text style={[componentProps.fontBodySmall, { color: Colors.grayText3 }]}>收益率</Text>
            <MaterialCommunityIcons name="menu-down-outline" size={18} color={Colors.mainBgColor} />
          </Pressable>
        </View>
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
})

export default TaskHome
