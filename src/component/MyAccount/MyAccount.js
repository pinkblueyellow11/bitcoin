import React, { Component, useState, useEffect } from 'react'
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Pressable,
  Keyboard,
  ScrollView,
  ImageBackground,
  AsyncStorage,
  Clipboard,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import componentProps from '../../constant/componentProps'
import { useNavigation } from '@react-navigation/native'
import screenName from '../../constant/screenName'
import Colors from '../../../native-base-theme/variables/commonColor'
import Constants from 'expo-constants'
import { Button, Item, Input, Container, Content, Header, Left, Body, Right } from 'native-base'
import { StatusBar } from 'expo-status-bar'
import Spacer from '../UI/Spacer'
import { FONT_WEIGHT } from '../../constant/componentProps/typography'
import config from '../../constant/config'
import { Feather, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'

const iconSize = 18

function MyAccount(props) {
  const { token, logIn, logOut, account, recommend_code, isWaiting, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()

  const writeToClipboard = async () => {
    await Clipboard.setString(recommend_code && recommend_code)
    Alert.alert('複製成功！')
  }

  const storeLogout = async () => {
    try {
      const data = {
        isPhoneAccount: true,
        account_prefix: '',
        account: '',
        password: '',
      }
      await AsyncStorage.setItem(config.ASYNC_STORAGE.LOGIN_INFO, JSON.stringify(data))
    } catch (error) {
      console.log('[components/MyAccount] Set store error', error)
    }
  }

  const logout = async () => {
    storeLogout()
    logOut()
  }

  return (
    <Container style={{}}>
      <Header transparent>
        <StatusBar style="dark" backgroundColor="transparent" />
        <Left style={{ flex: 1 }}></Left>
        <Body></Body>
        <Right></Right>
      </Header>
      <Content
        bounces={false}
        contentContainerStyle={[{ flex: 1, paddingHorizontal: componentProps.defaultPadding }]}
      >
        <ScrollView
          style={{
            backgroundColor: 'white',
            flex: 1,
            paddingHorizontal: 33,
          }}
        >
          <Text style={[componentProps.fontError, { color: Colors.mainColor }]}>帳號</Text>
          <Pressable
            style={{
              flexDirection: 'row',
              paddingVertical: componentProps.defaultPadding,
              borderBottomWidth: 0.25,
              borderBottomColor: Colors.grayLine,
              paddingBottom: 16,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
              }}
            >
              <View style={{ justifyContent: 'center' }}>
                <Text style={[componentProps.fontBodySmall2, { color: Colors.grayText }]}>
                  {account && account}
                </Text>
              </View>
            </View>
          </Pressable>
          <Spacer size={16} flex={0} />
          <Text style={[componentProps.fontError, { color: Colors.mainColor }]}>推薦碼</Text>
          <Pressable
            style={{
              flexDirection: 'row',
              paddingVertical: componentProps.defaultPadding,
              borderBottomWidth: 0.25,
              borderBottomColor: Colors.grayLine,
            }}
            onPress={() => writeToClipboard()}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <View style={{ justifyContent: 'center' }}>
                <Text style={[componentProps.fontBodySmall2, { color: Colors.grayText }]}>
                  {recommend_code && recommend_code}
                </Text>
              </View>
              <Button
                style={{ backgroundColor: 'transparent', borderColor: 'white', borderWidth: 0 }}
                onPress={() => writeToClipboard()}
              >
                <Feather name="copy" size={20} color={Colors.mainColor} />
              </Button>
            </View>
          </Pressable>
          <Spacer size={16} flex={0} />
          <Text style={{ color: Colors.brandText }}>
            版本 v {Constants.nativeAppVersion}
          </Text>
          <Spacer size={60} flex={0} />
          <Pressable
            style={{
              flexDirection: 'row',
              paddingVertical: componentProps.defaultPadding,
              alignSelf: 'center',
            }}
            onPress={() => logout()}
          >
            <Text style={[componentProps.fontBodySmall2, { color: Colors.redText }]}>登出</Text>
          </Pressable>
        </ScrollView>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  itemStyle: {
    position: 'relative',
    borderBottomColor: 'transparent',
    backgroundColor: Colors.inputBgColor,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mainColor,
  },
})

export default MyAccount
