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
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons'

const initialLayout = { width: Dimensions.get('window').width }

const INPUT_FIELD = {
  orderCount: 'orderCount',
  firstOrderAmount: 'firstOrderAmount',
  enterTheFirstOrder: 'enterTheFirstOrder',
  takeProfitRatio: 'takeProfitRatio',
  decreasePlusOrder: 'decreasePlusOrder',
  increaseInOrder: 'increaseInOrder',
  fallBackToRise: 'fallBackToRise',
  riseAndFall: 'riseAndFall',
}

function NewTask(props) {
  const { chooseCoinTypeValue, newRobot, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()
  const [orderCount, setOrderCount] = useState('')
  const [firstOrderAmount, setFirstOrderAmount] = useState('')
  const [enterTheFirstOrder, setEnterTheFirstOrder] = useState('')
  const [takeProfitRatio, setTakeProfitRatio] = useState('')
  const [decreasePlusOrder, setDecreasePlusOrder] = useState('')
  const [increaseInOrder, setIncreaseInOrder] = useState('')
  const [fallBackToRise, setFallBackToRise] = useState('')
  const [riseAndFall, setRiseAndFall] = useState('')
  const [focusedInput, setFocusedInput] = useState(null)
  const [onceType, setOnceType] = useState(true)
  const [activeSubmit, setActiveSubmit] = useState(false)

  const windowWidth = useWindowDimensions().width

  useEffect(() => {
    if (
      orderCount === '' ||
      firstOrderAmount === '' ||
      enterTheFirstOrder === '' ||
      riseAndFall === '' ||
      increaseInOrder === '' ||
      fallBackToRise === '' ||
      fallBackToRise === ''
    ) {
      setActiveSubmit(false)
    } else {
      setActiveSubmit(true)
    }
  }, [
    orderCount,
    firstOrderAmount,
    enterTheFirstOrder,
    takeProfitRatio,
    decreasePlusOrder,
    increaseInOrder,
    fallBackToRise,
    riseAndFall,
  ])

  const handleSubmit = async () => {
    const body = {
      coin_code: chooseCoinTypeValue.toLowerCase() + 'usdt',
      purchase_target_times: orderCount,
      first_purchase_cost: firstOrderAmount,
      first_purchase_target: enterTheFirstOrder, //首進單跌幅%數
      sell_target: takeProfitRatio, //止盈 (出單漲幅%數)
      purchase_target: decreasePlusOrder, //跌幅 (進單跌幅%數)
      purchase_addition_target: increaseInOrder, //增幅 (進單追加跌幅%數)
      purchase_bounce_target: fallBackToRise, //下跌回漲 (進單回漲%數)
      sell_bounce_target: riseAndFall, //上漲回跌 (出單回跌%數)
    }
    console.log('body', body)
    const result = await newRobot(body)
    if (!result.message) {
      setErrorMsg(null)
      Alert.alert('成功', '新建任務成功', [
        {
          text: '確定',
          onPress: () => {
            navigation.navigate(screenName.TaskHome)
          },
        },
      ])
    }
  }

  useEffect(() => {
    if (errorMsg === null) return
    Alert.alert('錯誤', errorMsg, [
      {
        text: '好',
        onPress: () => {},
      },
    ])
    setErrorMsg(null)
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
          <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>新建任務</Text>
        </Body>
        <Right></Right>
      </Header>
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding + 10 }]}>
        <Text style={[componentProps.fontBodyBold, { color: Colors.redText, textAlign: 'center' }]}>
          {chooseCoinTypeValue}/USDT
        </Text>
        <Spacer size={32} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>做單數量</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.orderCount}>
            <Input
              style={styles.itemInput}
              placeholderTextColor={Colors.placeholderTColor}
              value={orderCount}
              keyboardType="number-pad"
              onChangeText={setOrderCount}
              onFocus={() => setFocusedInput(INPUT_FIELD.orderCount)}
              onBlur={() => {
                setFocusedInput(null)
              }}
            />
          </Item>
          <Text style={styles.itemEndText}>單</Text>
        </View>
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>首單金額</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.firstOrderAmount}>
            <Input
              style={styles.itemInput}
              placeholderTextColor={Colors.placeholderTColor}
              value={firstOrderAmount}
              keyboardType="number-pad"
              onChangeText={setFirstOrderAmount}
              onFocus={() => setFocusedInput(INPUT_FIELD.firstOrderAmount)}
              onBlur={() => {
                setFocusedInput(null)
              }}
            />
          </Item>
        </View>
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>進第一單</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.enterTheFirstOrder}>
            <Input
              style={styles.itemInput}
              placeholderTextColor={Colors.placeholderTColor}
              value={enterTheFirstOrder}
              keyboardType="number-pad"
              onChangeText={setEnterTheFirstOrder}
              onFocus={() => setFocusedInput(INPUT_FIELD.enterTheFirstOrder)}
              onBlur={() => {
                setFocusedInput(null)
              }}
            />
          </Item>
          <Text style={styles.itemEndText}>%</Text>
        </View>
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>止盈比例</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.takeProfitRatio}>
            <Input
              style={styles.itemInput}
              placeholderTextColor={Colors.placeholderTColor}
              value={takeProfitRatio}
              keyboardType="number-pad"
              onChangeText={setTakeProfitRatio}
              onFocus={() => setFocusedInput(INPUT_FIELD.takeProfitRatio)}
              onBlur={() => {
                setFocusedInput(null)
              }}
            />
          </Item>
          <Text style={styles.itemEndText}>%</Text>
        </View>
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>跌幅加單</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.decreasePlusOrder}>
            <Input
              style={styles.itemInput}
              placeholderTextColor={Colors.placeholderTColor}
              value={decreasePlusOrder}
              keyboardType="number-pad"
              onChangeText={setDecreasePlusOrder}
              onFocus={() => setFocusedInput(INPUT_FIELD.decreasePlusOrder)}
              onBlur={() => {
                setFocusedInput(null)
              }}
            />
          </Item>
          <Text style={styles.itemEndText}>%</Text>
        </View>
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>加單增幅</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.increaseInOrder}>
            <Input
              style={styles.itemInput}
              placeholderTextColor={Colors.placeholderTColor}
              value={increaseInOrder}
              keyboardType="number-pad"
              onChangeText={setIncreaseInOrder}
              onFocus={() => setFocusedInput(INPUT_FIELD.increaseInOrder)}
              onBlur={() => {
                setFocusedInput(null)
              }}
            />
          </Item>
          <Text style={styles.itemEndText}>%</Text>
        </View>
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>下跌回漲</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.fallBackToRise}>
            <Input
              style={styles.itemInput}
              placeholderTextColor={Colors.placeholderTColor}
              value={fallBackToRise}
              keyboardType="number-pad"
              onChangeText={setFallBackToRise}
              onFocus={() => setFocusedInput(INPUT_FIELD.fallBackToRise)}
              onBlur={() => {
                setFocusedInput(null)
              }}
            />
          </Item>
          <Text style={styles.itemEndText}>%</Text>
        </View>
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>上漲回降</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.riseAndFall}>
            <Input
              style={styles.itemInput}
              placeholderTextColor={Colors.placeholderTColor}
              value={riseAndFall}
              keyboardType="number-pad"
              onChangeText={setRiseAndFall}
              onFocus={() => setFocusedInput(INPUT_FIELD.riseAndFall)}
              onBlur={() => {
                setFocusedInput(null)
              }}
            />
          </Item>
          <Text style={styles.itemEndText}>%</Text>
        </View>
        <Spacer size={16} flex={0} />
        {/* <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>策略類型</Text>
          <View style={{ flexDirection: 'row', width: '70%' }}>
            <Pressable
              onPress={() => setOnceType(true)}
              style={[
                styles.typeBoxOne,
                {
                  backgroundColor: onceType ? Colors.mainBgColor : 'white',
                },
              ]}
            >
              <Text style={styles.typeBoxText}>單次策略</Text>
            </Pressable>
            <Pressable
              onPress={() => setOnceType(false)}
              style={[
                styles.typeBoxTwo,
                {
                  backgroundColor: onceType ? 'white' : Colors.mainBgColor,
                },
              ]}
            >
              <Text style={styles.typeBoxText}>循環策略</Text>
            </Pressable>
          </View>
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
            確認
          </Text>
        </Button>
        <Spacer size={100} flex={0} />
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  itemStyle: {
    position: 'relative',
    borderBottomColor: 'transparent',
    backgroundColor: Colors.inputBgColor,
    width: '70%',
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

export default NewTask
