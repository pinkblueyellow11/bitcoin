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
  total: 'total',
}

export default function Transfer(props) {
  const {
    modalVisible,
    setModalVisible,
    handleSubmit,
  } = props
  const navigation = useNavigation()

  const [totalError, setTotalError] = useState(false)
  const [total, setTotal] = useState('')
  const [focusedInput, setFocusedInput] = useState(null)
  const [activeSubmit, setActiveSubmit] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  const handleClose = async () => {
    setIsWaiting(true)
    const res = await handleSubmit(total)
    if (res) setTotal('')
    setIsWaiting(false)
  }

  useEffect(() => {
    if (total === '' || totalError) {
      setActiveSubmit(false)
    } else {
      setActiveSubmit(true)
    }
  }, [total, totalError])

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
                setTotal('')
                setModalVisible(false)
                setIsWaiting(false)

              }}>
                <AntDesign name="close" size={24} color="black" />
              </Pressable>
              <Spacer size={16} flex={0} />
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.itemTitle}>獎金轉換燃料費</Text>
                <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.total}>
                  <Input
                    style={styles.itemInput}
                    placeholder={'大於等於20'}
                    placeholderTextColor={Colors.placeholderTColor}
                    value={total}
                    keyboardType="number-pad"
                    onChangeText={(text) => {
                      setTotal(text)
                      if (text >= 20) setTotalError(false)
                      else setTotalError(true)
                    }}
                    onFocus={() => setFocusedInput(INPUT_FIELD.total)}
                    onBlur={() => { setFocusedInput(null) }}
                  />
                </Item>
              </View>
              {totalError && (
                <Text style={[componentProps.inputHelperText, { color: Colors.redText }]}>
                  輸入範圍大於等於20的正整數
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
    width: '60%',
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


