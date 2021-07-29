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
  Modal,
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
import { CodeField, Cursor, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { AntDesign } from '@expo/vector-icons'

const { isDevEnv } = config

const INPUT_FIELD = {
  amountOfMarginCall: 'amountOfMarginCall',
}

export default function CoverUp(props) {
  const {
    modalVisible,
    setModalVisible,
    handleSubmit,
  } = props
  const navigation = useNavigation()

  const [amountOfMarginCallError, setAmountOfMarginCallError] = useState(false)
  const [amountOfMarginCall, setAmountOfMarginCall] = useState('')
  const [focusedInput, setFocusedInput] = useState(null)
  const [activeSubmit, setActiveSubmit] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  const handleClose = async () => {
    setIsWaiting(true)
    const res = await handleSubmit(amountOfMarginCall)
    if (res) setAmountOfMarginCall('')
    setIsWaiting(false)
  }

  useEffect(() => {
    if (amountOfMarginCall === '' || amountOfMarginCallError) {
      setActiveSubmit(false)
    } else {
      setActiveSubmit(true)
    }
  }, [amountOfMarginCall, amountOfMarginCallError])

  return (
    <View >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View
          style={styles.modalCenteredView}>
          <View style={[styles.modalWrapper]}>
            <View style={{}}>
              <Pressable onPress={() => {
                setAmountOfMarginCall('')
                setModalVisible(false)
                setIsWaiting(false)
              }}>
                <AntDesign name="close" size={24} color="black" />
              </Pressable>
              <Spacer size={16} flex={0} />
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.itemTitle}>補倉金額</Text>
                <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.amountOfMarginCall}>
                  <Input
                    style={styles.itemInput}
                    placeholder={'輸入範圍大於等於10的正整數'}
                    placeholderTextColor={Colors.placeholderTColor}
                    value={amountOfMarginCall}
                    keyboardType="number-pad"
                    onChangeText={(text) => {
                      setAmountOfMarginCall(text)
                      if (text >= 10) setAmountOfMarginCallError(false)
                      else setAmountOfMarginCallError(true)
                    }}
                    onFocus={() => setFocusedInput(INPUT_FIELD.amountOfMarginCall)}
                    onBlur={() => { setFocusedInput(null) }}
                  />
                </Item>
              </View>
              {amountOfMarginCallError && (
                <Text style={[componentProps.inputHelperText, { color: Colors.redText }]}>
                  輸入範圍大於等於10的正整數
                </Text>
              )}
              <Spacer size={32} flex={0} />
              <Button
                full
                disabled={!activeSubmit || isWaiting}
                style={{
                  borderRadius: componentProps.borderRadius,
                  borderColor: Colors.mainColor,
                  borderWidth: 1,
                  //backgroundColor: Colors.brandPrimary,
                }}
                onPress={handleClose}
              >
                <Text
                  style={[componentProps.fontBodySmall, { color: activeSubmit ? 'white' : Colors.brandText }]}
                >
                  {isWaiting ? 'wait...' : '確定'}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View >
  )
}

const styles = StyleSheet.create({
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(8,25,67,0.48)',
  },
  modalWrapper: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  itemStyle: {
    //position: 'relative',
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
})



{/* <Container>
<Header
  style={{
    backgroundColor: Colors.mainColor,
    marginTop: 16,
  }}
>
  <StatusBar style="light" backgroundColor="transparent" />
  <Left style={{ flex: 1 }}>
    <Pressable onPress={() => navigation.goBack()}>
      <Text style={{ color: 'white' }}>取消</Text>
    </Pressable>
  </Left>
  <Body>
    <Text style={{ color: 'white', alignSelf: 'center' }}>補倉</Text>
  </Body>
  <Right>
    <Pressable onPress={handleSubmit}>
      <Text style={{ color: 'white' }}>確認</Text>
    </Pressable>
  </Right>
</Header>
<View style={{ flex: 1, paddingHorizontal: componentProps.defaultPadding + 10 }}>
  <Spacer size={16} flex={0} />
  <View style={{ flexDirection: 'row' }}>
    <Text style={styles.itemTitle}>補倉金額</Text>
    <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.amountOfMarginCall}>
      <Input
        style={styles.itemInput}
        placeholder={'輸入範圍大於等於10的正整數'}
        placeholderTextColor={Colors.placeholderTColor}
        value={amountOfMarginCall}
        keyboardType="number-pad"
        onChangeText={(text) => {
          setAmountOfMarginCall(text)
          if (text >= 10) setAmountOfMarginCallError(false)
          else setAmountOfMarginCallError(true)
        }}
        onFocus={() => setFocusedInput(INPUT_FIELD.amountOfMarginCall)}
        onBlur={() => { setFocusedInput(null) }}
      />
    </Item>
  </View>
  {amountOfMarginCallError && (
    <Text style={[componentProps.inputHelperText, { color: Colors.redText }]}>
      輸入範圍大於等於10的正整數
    </Text>
  )}
</View>
<Spinner visible={isWaiting} color={Colors.mainColor} />
</Container> */}