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
import { RadioButton } from 'react-native-paper'

const initialLayout = { width: Dimensions.get('window').width }

/*
保守：
做單數量：5
首單金額：10
進第一單：0.1
止盈比例：2.5
跌幅加單：2
加單增幅：3
下跌回漲：0.2
上漲回跌：0.3

平衡：
做單數量：6
首單金額：10
進第一單：0.1
止盈比例：3
跌幅加單：2
加單增幅：2
下跌回漲：0.1
上漲回跌：0.5

高頻：
做單數量：8
首單金額：10
進第一單：0.1
止盈比例：3
跌幅加單：2
加單增幅：1.5
下跌回漲：0.1
上漲回跌：0.4
*/
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

const RADIO_TYPE = {
  oneRadio: 'oneRadio',
  twoRadio: 'twoRadio',
  threeRadio: 'threeRadio',
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

  const [isOrderCountError, setIsOrderCountError] = useState(false)
  const [isFirstOrderAmountError, setIsFirstOrderAmountError] = useState(false)
  const [isEnterTheFirstOrderError, setIsEnterTheFirstOrderError] = useState(false)
  const [isTakeProfitRatioError, setIsTakeProfitRatioError] = useState(false)
  const [isDecreasePlusOrderError, setIsDecreasePlusOrderError] = useState(false)
  const [isIncreaseInOrderError, setIsIncreaseInOrderError] = useState(false)
  const [isFallBackToRiseError, setIsFallBackToRiseError] = useState(false)
  const [isRiseAndFallError, setIsRiseAndFallError] = useState(false)

  const [focusedInput, setFocusedInput] = useState(null)
  const [onceType, setOnceType] = useState(false)
  const [activeSubmit, setActiveSubmit] = useState(false)
  const [oneRadioChecked, setOneRadioChecked] = useState('');
  const [twoRadioChecked, setTwoRadioChecked] = useState('');
  const [threeRadioChecked, setThreeRadioChecked] = useState('');

  const cleanTextInput = () => {
    setOrderCount('')
    setFirstOrderAmount('')
    setEnterTheFirstOrder('')
    setTakeProfitRatio('')
    setDecreasePlusOrder('')
    setIncreaseInOrder('')
    setFallBackToRise('')
    setRiseAndFall('')
  }

  const setRadioTextInput = (a, b, c, d, e, f, g, h) => {
    setOrderCount(a)
    setFirstOrderAmount(b)
    setEnterTheFirstOrder(c)
    setTakeProfitRatio(d)
    setDecreasePlusOrder(e)
    setIncreaseInOrder(f)
    setFallBackToRise(g)
    setRiseAndFall(h)
  }

  const handleRadioChange = (radio_type) => {
    switch (radio_type) {
      case RADIO_TYPE.oneRadio:
        if (oneRadioChecked === RADIO_TYPE.oneRadio) {
          setOneRadioChecked('')
          cleanTextInput()
        } else {
          setOneRadioChecked(RADIO_TYPE.oneRadio)
          setRadioTextInput('5', '10', '0.1', '2.5', '2', '3', '0.2', '0.3')
          setTwoRadioChecked('')
          setThreeRadioChecked('')
        }
        break
      case RADIO_TYPE.twoRadio:
        if (twoRadioChecked === RADIO_TYPE.twoRadio) {
          setTwoRadioChecked('')
          cleanTextInput()
        } else {
          setTwoRadioChecked(RADIO_TYPE.twoRadio)
          setRadioTextInput('6', '10', '0.1', '3', '2', '2', '0.1', '0.5')
          setOneRadioChecked('')
          setThreeRadioChecked('')
        }
        break
      case RADIO_TYPE.threeRadio:
        if (threeRadioChecked === RADIO_TYPE.threeRadio) {
          setThreeRadioChecked('')
          cleanTextInput()
        } else {
          setThreeRadioChecked(RADIO_TYPE.threeRadio)
          setRadioTextInput('8', '10', '0.1', '3', '2', '1.5', '0.1', '0.4')
          setOneRadioChecked('')
          setTwoRadioChecked('')
        }
        break
      default:
        break
    }
  }

  const checkValue = (value) => {
    //正整數或小數1位。大於0，小於或等於20
    if (value > 0 && value <= 20 && (value % 1 == 0 || value.toString().split('.')[1].length == 1))
      return true
    else return false
  }

  const checkIncreaseInOrderValue = (value) => {
    //正整數或小數1位。大於0，小於或等於20
    if (value >= 0 && value <= 20 && (value % 1 == 0 || value.toString().split('.')[1].length == 1))
      return true
    else return false
  }

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
      auto_repeat: onceType ? 0 : 1
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
    if (
      orderCount === '' ||
      firstOrderAmount === '' ||
      enterTheFirstOrder === '' ||
      riseAndFall === '' ||
      increaseInOrder === '' ||
      fallBackToRise === '' ||
      fallBackToRise === '' ||
      isOrderCountError ||
      isFirstOrderAmountError ||
      isEnterTheFirstOrderError ||
      isTakeProfitRatioError ||
      isDecreasePlusOrderError ||
      isIncreaseInOrderError ||
      isFallBackToRiseError ||
      isRiseAndFallError ||
      focusedInput
    ) {
      setActiveSubmit(false)
    } else {
      setActiveSubmit(true)
    }
  }, [
    focusedInput,
    orderCount,
    firstOrderAmount,
    enterTheFirstOrder,
    takeProfitRatio,
    decreasePlusOrder,
    increaseInOrder,
    fallBackToRise,
    riseAndFall,
    isOrderCountError,
    isFirstOrderAmountError,
    isEnterTheFirstOrderError,
    isTakeProfitRatioError,
    isDecreasePlusOrderError,
    isIncreaseInOrderError,
    isFallBackToRiseError,
    isRiseAndFallError,
  ])

  useEffect(() => {
    if (errorMsg === null) return
    Alert.alert('錯誤', errorMsg, [
      {
        text: '好',
        onPress: () => { },
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value={RADIO_TYPE.oneRadio}
              status={oneRadioChecked === RADIO_TYPE.oneRadio ? 'checked' : 'unchecked'}
              onPress={() => handleRadioChange(RADIO_TYPE.oneRadio)}
            />
            <Text style={{}}>保守</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value={RADIO_TYPE.twoRadio}
              status={twoRadioChecked === RADIO_TYPE.twoRadio ? 'checked' : 'unchecked'}
              onPress={() => handleRadioChange(RADIO_TYPE.twoRadio)}
            />
            <Text style={{}}>平衡</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value={RADIO_TYPE.threeRadio}
              status={threeRadioChecked === RADIO_TYPE.threeRadio ? 'checked' : 'unchecked'}
              onPress={() => handleRadioChange(RADIO_TYPE.threeRadio)}
            />
            <Text style={{}}>高頻</Text>
          </View>
        </View>
        <Spacer size={32} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>做單數量</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.orderCount}>
            <Input
              style={styles.itemInput}
              placeholder={'輸入範圍 5~15 的正整數'}
              placeholderTextColor={Colors.placeholderTColor}
              value={orderCount}
              keyboardType="number-pad"
              onChangeText={setOrderCount}
              onFocus={() => setFocusedInput(INPUT_FIELD.orderCount)}
              onBlur={() => {
                setFocusedInput(null)
                if (orderCount >= 5 && orderCount <= 15 && orderCount % 1 == 0) setIsOrderCountError(false)
                else setIsOrderCountError(true)
              }}
            />
          </Item>
          <Text style={styles.itemEndText}>單</Text>
        </View>
        {isOrderCountError && (
          <Text style={[componentProps.inputHelperText, { color: Colors.redText }]}>
            輸入範圍 5~15 的正整數
          </Text>
        )}
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>首單金額</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.firstOrderAmount}>
            <Input
              style={styles.itemInput}
              placeholder={'輸入範圍 10~10000 的正整數'}
              placeholderTextColor={Colors.placeholderTColor}
              value={firstOrderAmount}
              keyboardType="number-pad"
              onChangeText={setFirstOrderAmount}
              onFocus={() => setFocusedInput(INPUT_FIELD.firstOrderAmount)}
              onBlur={() => {
                setFocusedInput(null)
                if (firstOrderAmount >= 10 && firstOrderAmount <= 10000 && firstOrderAmount % 1 == 0)
                  setIsFirstOrderAmountError(false)
                else setIsFirstOrderAmountError(true)
              }}
            />
          </Item>
          <Text style={styles.itemEndText}>U</Text>
        </View>
        {isFirstOrderAmountError && (
          <Text style={[componentProps.inputHelperText, { color: Colors.redText }]}>
            輸入範圍 10~10000 的正整數
          </Text>
        )}
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>進第一單</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.enterTheFirstOrder}>
            <Input
              style={styles.itemInput}
              placeholder={'輸入範圍 0.1~20 的正整數或小數點一位'}
              placeholderTextColor={Colors.placeholderTColor}
              value={enterTheFirstOrder}
              keyboardType="number-pad"
              onChangeText={setEnterTheFirstOrder}
              onFocus={() => setFocusedInput(INPUT_FIELD.enterTheFirstOrder)}
              onBlur={() => {
                setFocusedInput(null)
                if (checkValue(enterTheFirstOrder)) setIsEnterTheFirstOrderError(false)
                else setIsEnterTheFirstOrderError(true)
              }}
            />
          </Item>
          <Text style={styles.itemEndText}>%</Text>
        </View>
        {isEnterTheFirstOrderError && (
          <Text style={[componentProps.inputHelperText, { color: Colors.redText }]}>
            輸入範圍 大於0 小於等於20 的正整數或小數點一位
          </Text>
        )}
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>止盈比例</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.takeProfitRatio}>
            <Input
              style={styles.itemInput}
              placeholder={'輸入範圍 0.1~20 的正整數或小數點一位'}
              placeholderTextColor={Colors.placeholderTColor}
              value={takeProfitRatio}
              keyboardType="number-pad"
              onChangeText={setTakeProfitRatio}
              onFocus={() => setFocusedInput(INPUT_FIELD.takeProfitRatio)}
              onBlur={() => {
                setFocusedInput(null)
                if (checkValue(takeProfitRatio)) setIsTakeProfitRatioError(false)
                else setIsTakeProfitRatioError(true)
              }}
            />
          </Item>
          <Text style={styles.itemEndText}>%</Text>
        </View>
        {isTakeProfitRatioError && (
          <Text style={[componentProps.inputHelperText, { color: Colors.redText }]}>
            輸入範圍 大於0 小於等於20 的正整數或小數點一位
          </Text>
        )}
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>跌幅加單</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.decreasePlusOrder}>
            <Input
              style={styles.itemInput}
              placeholder={'輸入範圍 0.1~20 的正整數或小數點一位'}
              placeholderTextColor={Colors.placeholderTColor}
              value={decreasePlusOrder}
              keyboardType="number-pad"
              onChangeText={setDecreasePlusOrder}
              onFocus={() => setFocusedInput(INPUT_FIELD.decreasePlusOrder)}
              onBlur={() => {
                setFocusedInput(null)
                if (checkValue(decreasePlusOrder)) setIsDecreasePlusOrderError(false)
                else setIsDecreasePlusOrderError(true)
              }}
            />
          </Item>
          <Text style={styles.itemEndText}>%</Text>
        </View>
        {isDecreasePlusOrderError && (
          <Text style={[componentProps.inputHelperText, { color: Colors.redText }]}>
            輸入範圍 大於0 小於等於20 的正整數或小數點一位
          </Text>
        )}
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>加單增幅</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.increaseInOrder}>
            <Input
              style={styles.itemInput}
              placeholder={'輸入範圍 0~20 的正整數或小數點一位'}
              placeholderTextColor={Colors.placeholderTColor}
              value={increaseInOrder}
              keyboardType="number-pad"
              onChangeText={setIncreaseInOrder}
              onFocus={() => setFocusedInput(INPUT_FIELD.increaseInOrder)}
              onBlur={() => {
                setFocusedInput(null)
                if (checkIncreaseInOrderValue(increaseInOrder)) setIsIncreaseInOrderError(false)
                else setIsIncreaseInOrderError(true)
              }}
            />
          </Item>
          <Text style={styles.itemEndText}>%</Text>
        </View>
        {isIncreaseInOrderError && (
          <Text style={[componentProps.inputHelperText, { color: Colors.redText }]}>
            輸入範圍 大於等於0 小於等於20 的正整數或小數點一位
          </Text>
        )}
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>下跌回漲</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.fallBackToRise}>
            <Input
              style={styles.itemInput}
              placeholder={'輸入範圍 0.1~20 的正整數或小數點一位'}
              placeholderTextColor={Colors.placeholderTColor}
              value={fallBackToRise}
              keyboardType="number-pad"
              onChangeText={setFallBackToRise}
              onFocus={() => setFocusedInput(INPUT_FIELD.fallBackToRise)}
              onBlur={() => {
                setFocusedInput(null)
                if (checkValue(fallBackToRise)) setIsFallBackToRiseError(false)
                else setIsFallBackToRiseError(true)
              }}
            />
          </Item>
          <Text style={styles.itemEndText}>%</Text>
        </View>
        {isFallBackToRiseError && (
          <Text style={[componentProps.inputHelperText, { color: Colors.redText }]}>
            輸入範圍 大於0 小於等於20 的正整數或小數點一位
          </Text>
        )}
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>上漲回降</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.riseAndFall}>
            <Input
              style={styles.itemInput}
              placeholder={'輸入範圍 0.1~20 的正整數或小數點一位'}
              placeholderTextColor={Colors.placeholderTColor}
              value={riseAndFall}
              keyboardType="number-pad"
              onChangeText={setRiseAndFall}
              onFocus={() => setFocusedInput(INPUT_FIELD.riseAndFall)}
              onBlur={() => {
                setFocusedInput(null)
                if (checkValue(riseAndFall)) setIsRiseAndFallError(false)
                else setIsRiseAndFallError(true)
              }}
            />
          </Item>
          <Text style={styles.itemEndText}>%</Text>
        </View>
        {isRiseAndFallError && (
          <Text style={[componentProps.inputHelperText, { color: Colors.redText }]}>
            輸入範圍 大於0 小於等於20 的正整數或小數點一位
          </Text>
        )}
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
