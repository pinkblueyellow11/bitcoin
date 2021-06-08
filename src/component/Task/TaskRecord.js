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

const BOX_INDEX = {
  one: 'one',
  two: 'two',
  three: 'three',
}

export default function TaskRecord(props) {
  const { isWaiting, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()

  const [boxIndex, setBoxIndex] = useState(BOX_INDEX.one)

  const handleRegister = async () => {}

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
          <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>交易紀錄</Text>
        </Body>
        <Right></Right>
      </Header>
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <Pressable
              onPress={() => setBoxIndex(BOX_INDEX.one)}
              style={[
                styles.typeBoxOne,
                {
                  backgroundColor: boxIndex === BOX_INDEX.one ? Colors.mainBgColor : 'white',
                },
              ]}
            >
              <Text style={styles.typeBoxText}>全部</Text>
            </Pressable>
            <Pressable
              onPress={() => setBoxIndex(BOX_INDEX.two)}
              style={[
                styles.typeBoxTwo,
                {
                  backgroundColor: boxIndex === BOX_INDEX.two ? Colors.mainBgColor : 'white',
                },
              ]}
            >
              <Text style={styles.typeBoxText}>買入交易</Text>
            </Pressable>
            <Pressable
              onPress={() => setBoxIndex(BOX_INDEX.three)}
              style={[
                styles.typeBoxThree,
                {
                  backgroundColor: boxIndex === BOX_INDEX.three ? Colors.mainBgColor : 'white',
                },
              ]}
            >
              <Text style={styles.typeBoxText}>賣出交易</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Spinner visible={isWaiting} color={Colors.mainColor} />
    </Container>
  )
}

const styles = StyleSheet.create({
  typeBoxOne: {
    borderColor: Colors.mainColor,
    borderWidth: 1,
    borderRightWidth: 0,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flex: 1,
  },
  typeBoxTwo: {
    borderColor: Colors.mainColor,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flex: 1,
  },
  typeBoxThree: {
    borderColor: Colors.mainColor,
    borderWidth: 1,
    borderLeftWidth: 0,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flex: 1,
  },
  typeBoxText: {
    ...componentProps.fontBodySmall6,
    color: Colors.mainColor,
    textAlign: 'center',
  },
})
