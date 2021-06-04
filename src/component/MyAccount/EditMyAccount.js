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
import config from '../../constant/config'
import Modal from 'react-native-modal'

const INPUT_FIELD = {
  textValue: 'textValue',
}

function EditMyAccountModal(props) {
  const { isOpen, onClose } = props
  const navigation = useNavigation()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [focusedInput, setFocusedInput] = useState(null)
  const [activeSubmit, setActiveSubmit] = useState(false)

  useEffect(() => {
    if (phoneNumber === '') setActiveSubmit(false)
    else setActiveSubmit(true)
  }, [phoneNumber])

  handleSubmit = () => {}

  return (
    <View>
      <Modal
        isVisible={isOpen}
        backdropOpacity={0}
        style={[componentProps.RNModal.bottom, { marginTop: Constants.statusBarHeight }]}
      >
        <View
          style={[
            styles.empty,
            { backgroundColor: Colors.brandDark, borderRadius: componentProps.borderRadius },
          ]}
        >
          <View style={styles.modalHeader}>
            <Pressable transparent onPress={onClose} style={styles.empty}>
              <Image source={require('../../assets/icon/closeWhite.png')} />
            </Pressable>
            <View style={styles.empty}>
              <Text style={[componentProps.fontBodySmall2, { color: 'white', alignSelf: 'center' }]}>
                修改
              </Text>
            </View>
            <View style={styles.empty}>
              <Text style={[componentProps.fontBodySmall2, { color: 'white', alignSelf: 'flex-end' }]}>
                確認
              </Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: componentProps.contentPadding, paddingTop: 30 }}>
            <Item
              style={{
                borderBottomColor: 'transparent',
                backgroundColor: Colors.mainBgColor,
                borderRadius: componentProps.borderRadius,
              }}
              focus={focusedInput === INPUT_FIELD.textValue}
            >
              <Input
                style={{ marginLeft: componentProps.mediumPadding, color: 'white' }}
                placeholder="請輸入"
                placeholderTextColor={Colors.placeholderTColor}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                onFocus={() => setFocusedInput(INPUT_FIELD.textValue)}
                onBlur={() => setFocusedInput(null)}
              />
            </Item>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
})
export default EditMyAccountModal
