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
import config from '../../constant/config'
import Carousel from 'react-native-snap-carousel'
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'
import QRCode from 'react-native-qrcode-svg'

const address = 'TBzkyvvKqXuVTmBwxoFa8LkxkbT5izfEvK'

function ReCharge(props) {
  const { errorMsg, setErrorMsg } = props
  const navigation = useNavigation()

  const writeToClipboard = async () => {
    await Clipboard.setString(address)
    Alert.alert('複製成功！')
  }

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
          <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>充值</Text>
        </Body>
        <Right>
          <Pressable onPress={() => navigation.navigate(screenName.ReChargeRecord)}>
            <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>充值紀錄</Text>
          </Pressable>
        </Right>
      </Header>
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        <Spacer size={50} flex={0} />
        <View style={{ alignItems: 'center' }}>
          <Image style={{ width: 300, height: 300 }} source={require('../../assets/images/ReChargeQR.png')} />
        </View>
        <Spacer size={32} flex={0} />
        <Text style={{ color: Colors.grayText3, textAlign: 'center' }}>充值地址( TRC20 ):</Text>
        <Spacer size={8} flex={0} />
        <View style={{ flexDirection: 'row', alignSelf: 'center', flex: 1, flexWrap: 'wrap' }}>
          <View>
            <Text style={{ color: Colors.grayText3 }}>{address}</Text>
          </View>
          <Pressable
            style={[{
              backgroundColor: 'transparent',
              borderWidth: 0,
              paddingLeft: 12,
              alignItems: 'flex-start',
            }]}
            onPress={() => writeToClipboard()}
          >
            <Feather name="copy" size={20} color={Colors.mainColor} />
          </Pressable>
        </View>

        <Spacer size={42} flex={0} />
        <Pressable
          style={{
            borderRadius: componentProps.borderRadius,
            borderColor: Colors.mainColor,
            borderWidth: 1,
            paddingVertical: 16,
            backgroundColor: Colors.mainColor,
          }}
          onPress={() => navigation.navigate(screenName.ReChargeUpdate)}
        >
          <Text style={[componentProps.fontBodyBold2, { color: 'white', textAlign: 'center' }]}>
            上傳付款憑證
          </Text>
        </Pressable>
        <Spacer size={24} flex={0} />
        <Text style={[componentProps.errorMsg, { color: Colors.redText, paddingHorizontal: 16, lineHeight: 22, }]}>說明：{'\n'}
          －將您欲充值的USDT轉入此地址，並上傳付款憑證{'\n'}
          －只支持轉入USDT(TRC20)，若轉入其他類型而導致幣未到帳或遺失不見，自行負責{'\n'}
          －區塊鏈轉帳有手續費，以實際到帳金額為主</Text>
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  boxButtonView: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-around',
  },
  boxButton: {
    paddingVertical: 8,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: componentProps.borderRadius,
  },
  boxButtonText: {
    ...componentProps.fontBodyBold2,
    color: Colors.brandText,
    alignSelf: 'center',
  },
})

export default ReCharge
