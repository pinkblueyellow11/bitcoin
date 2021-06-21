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
import { Button, Item, Input, Container, Content, Label, Header, Left, Body, Right } from 'native-base'
import { StatusBar } from 'expo-status-bar'
import Spacer from '../UI/Spacer'
import { FONT_WEIGHT } from '../../constant/componentProps/typography'
import config from '../../constant/config'
import Carousel from 'react-native-snap-carousel'
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons'
import QRCode from 'react-native-qrcode-svg'

const INPUT_FIELD = {
  requestAddress: 'requestAddress',
  count: 'count',
  handlingFee: 'handlingFee',
}

function Withdrawal(props) {
  const { drawCoin, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()

  const [requestAddress, setRequestAddress] = useState('')
  const [count, setCount] = useState('')
  const [handlingFee, setHandlingFee] = useState('')
  const [focusedInput, setFocusedInput] = useState(null)
  const [activeSubmit, setActiveSubmit] = useState(false)

  const handleSubmit = async () => {
    const body = {
      amount: count,
      withdraw_address: requestAddress,
    }
    const result = await drawCoin(body)
    // if (!result.message) {
    //   setErrorMsg(null)
    // }
  }

  useEffect(() => {
    if (requestAddress === '' || count === '') {
      setActiveSubmit(false)
    } else {
      setActiveSubmit(true)
    }
  }, [requestAddress, count])

  useEffect(() => {
    if (errorMsg !== null) {
      console.log('errorMsg', errorMsg)
      Alert.alert('錯誤訊息', errorMsg, [
        {
          text: '確定',
          onPress: () => {},
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
          <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>提幣</Text>
        </Body>
        <Right></Right>
      </Header>
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>提需地址</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.requestAddress}>
            <Input
              style={styles.itemInput}
              placeholderTextColor={Colors.placeholderTColor}
              value={requestAddress}
              onChangeText={setRequestAddress}
              onFocus={() => setFocusedInput(INPUT_FIELD.requestAddress)}
              onBlur={() => setFocusedInput(null)}
            />
          </Item>
        </View>
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>金額{'       '}</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.count}>
            <Input
              style={styles.itemInput}
              placeholderTextColor={Colors.placeholderTColor}
              value={count}
              keyboardType="number-pad"
              onChangeText={setCount}
              onFocus={() => setFocusedInput(INPUT_FIELD.count)}
              onBlur={() => setFocusedInput(null)}
            />
          </Item>
        </View>
        {/* <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>手續費{'    '}</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.handlingFee}>
            <Input
              style={styles.itemInput}
              placeholderTextColor={Colors.placeholderTColor}
              value={handlingFee}
              keyboardType="number-pad"
              onChangeText={setHandlingFee}
              onFocus={() => setFocusedInput(INPUT_FIELD.handlingFee)}
              onBlur={() => setFocusedInput(null)}
            />
          </Item>
        </View> */}
        <Spacer size={32} flex={0} />
        <Button
          full
          disabled={!activeSubmit}
          style={{
            borderRadius: componentProps.borderRadius,
            borderColor: Colors.mainColor,
            borderWidth: 1,
            //backgroundColor: Colors.brandPrimary,
          }}
          onPress={handleSubmit}
        >
          <Text style={[componentProps.fontBodySmall, { color: activeSubmit ? 'white' : Colors.brandText }]}>
            確認提幣
          </Text>
        </Button>
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  itemStyle: {
    position: 'relative',
    borderBottomColor: 'transparent',
    backgroundColor: Colors.inputBgColor,
    width: '80%',
  },
  itemTitle: {
    color: Colors.mainColor,
    alignSelf: 'center',
    marginRight: 8,
  },
  itemInput: {
    marginLeft: componentProps.mediumPadding,
    color: Colors.mainColor,
  },
  itemEndText: {
    color: Colors.mainColor,
    alignSelf: 'center',
    marginLeft: 8,
  },
})

export default Withdrawal
