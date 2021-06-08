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
import { Button, Item, Input, Container, Content, Label, Header, Left, Body, Right, Col } from 'native-base'
import { StatusBar } from 'expo-status-bar'
import Spacer from '../UI/Spacer'
import config from '../../constant/config'
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons'

const initialLayout = { width: Dimensions.get('window').width }

function Community(props) {
  const { errorMsg, setErrorMsg } = props
  const navigation = useNavigation()

  const windowWidth = useWindowDimensions().width

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
          <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>社區</Text>
        </Body>
        <Right></Right>
      </Header>
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        <View style={styles.box}>
          <Text style={[componentProps.fontBodySmall3, { color: Colors.grayText3, alignSelf: 'center' }]}>
            已獲取獎勵
          </Text>
          <Text style={[componentProps.fontH1, { color: Colors.redText, alignSelf: 'center' }]}>0</Text>
        </View>
        <Spacer size={32} flex={0} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={[componentProps.fontBodySmall6, { color: Colors.mainColor }]}>推薦帳號</Text>
          <Text style={[componentProps.fontBodySmall6, { color: Colors.mainColor }]}>推薦時間</Text>
          <Text style={[componentProps.fontBodySmall6, { color: Colors.mainColor }]}>狀態</Text>
        </View>
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#F3EAFF',
    borderRadius: componentProps.borderRadius,
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
})

export default Community
