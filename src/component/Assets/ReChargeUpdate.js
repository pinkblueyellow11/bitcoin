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
import ImagePicker from 'react-native-image-crop-picker'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { askPermissionOriginal } from '../../lib/appSetting'
import * as Permissions from 'expo-permissions'

const INPUT_FIELD = {
  amount: 'amount',
  blocktrainTransId: 'blocktrainTransId',
}

function ReChargeUpdate(props) {
  const { upReceipt, errorMsg, setErrorMsg } = props
  const navigation = useNavigation()

  const { showActionSheetWithOptions } = useActionSheet()

  const [amount, setAmount] = useState('')
  const [blocktrainTransId, setBlocktrainTransId] = useState('')
  const [profilePicBase64, setProfilePicBase64] = useState('')
  const [focusedInput, setFocusedInput] = useState(null)
  const [activeSubmit, setActiveSubmit] = useState(false)
  const [amountError, setAmountError] = useState(false)
  const [blocktrainTransIdError, setBlocktrainTransIdError] = useState(false)

  useEffect(() => {
    askPermissionOriginal(Permissions.CAMERA)
  }, [])

  useEffect(() => {
    if (amount === '' || blocktrainTransId === '' || !profilePicBase64) {
      setActiveSubmit(false)
      setAmountError(false)
      setBlocktrainTransIdError(false)
      if (amount <= 0 || (amount.toString()).indexOf(".") !== -1) {
        setAmountError(true)
      }
      if ((blocktrainTransId.toString()).indexOf(".") !== -1) {
        setBlocktrainTransIdError(true)
      }
    } else {
      setActiveSubmit(true)
      setAmountError(false)
    }
  }, [amount, blocktrainTransId, profilePicBase64])

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('amount', amount)
    formData.append('blocktrain_trans_id', blocktrainTransId)
    formData.append('attachment', profilePicBase64)
    const result = await upReceipt(formData)
    if (!result.message) {
      Alert.alert('上傳成功', '', [
        {
          text: 'ok',
          onPress: () => navigation.goBack(),
        },
      ])
    } else {
      Alert.alert('上傳失敗')
    }
  }

  const handleSelectImage = async (image) => {
    console.log('image', image)
    setProfilePicBase64(image.data)
  }

  const openActionSheet = () => {
    const options = ['從相機拍照', '從相簿選擇', 'Cancel']
    const cancelButtonIndex = 2
    const actionSheetTitle = '上傳收據'
    const imagePickerOptions = { width: 400, height: 400, cropping: false, includeBase64: true, compressImageQuality: 0.3 }
    showActionSheetWithOptions({ options, cancelButtonIndex, title: actionSheetTitle }, (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          ImagePicker.openCamera(imagePickerOptions).then((image) => {
            handleSelectImage(image)
          })
          break
        case 1:
          ImagePicker.openPicker(imagePickerOptions).then((image) => {
            handleSelectImage(image)
          })
          break
        default:
          break
      }
    })
  }

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
          <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>充值收據</Text>
        </Body>
        <Right></Right>
      </Header>
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>充值金額</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.amount}>
            <Input
              style={styles.itemInput}
              placeholderTextColor={Colors.placeholderTColor}
              value={amount}
              keyboardType="number-pad"
              onChangeText={setAmount}
              onFocus={() => setFocusedInput(INPUT_FIELD.amount)}
              onBlur={() => setFocusedInput(null)}
            />
          </Item>
        </View>
        <Spacer size={4} flex={0} />
        {amountError && (
          <Text style={[componentProps.inputHelperText, { color: Colors.redText }]}>
            請輸入正整數
          </Text>
        )}
        <Spacer size={16} flex={0} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemTitle}>區塊鏈交易ID</Text>
          <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.blocktrainTransId}>
            <Input
              style={styles.itemInput}
              placeholderTextColor={Colors.placeholderTColor}
              value={blocktrainTransId}
              onChangeText={setBlocktrainTransId}
              onFocus={() => setFocusedInput(INPUT_FIELD.blocktrainTransId)}
              onBlur={() => setFocusedInput(null)}
            />
          </Item>
        </View>
        <Spacer size={4} flex={0} />
        {blocktrainTransIdError && (
          <Text style={[componentProps.inputHelperText, { color: Colors.redText }]}>
            請輸入64個字元
          </Text>
        )}
        <Spacer size={16} flex={0} />
        <Pressable
          onPress={openActionSheet}
          style={{ height: 300, borderColor: Colors.mainColor, borderWidth: 1, justifyContent: 'center' }}
        >
          {profilePicBase64 ? (
            <Image
              source={{ uri: 'data:image/png;base64,' + profilePicBase64 }}
              style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            />
          ) : (
            <Text style={[componentProps.fontH4Medium, { textAlign: 'center', color: Colors.brandText }]}>
              點選上傳圖片
            </Text>
          )}
        </Pressable>
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
            上傳收據
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

export default ReChargeUpdate
