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
const iconSize = 18

const INPUT_FIELD = {
  apiKeyText: 'apiKeyText',
  secretKeyText: 'secretKeyText',
}

function ApiScreen(props) {
  const { api_key_setted, postApiKey, errorMsg, setErrorMsg } = props
  const [apiKeyText, setApiKeyText] = useState('')
  const [secretKeyText, setSecretKeyText] = useState('')
  const [focusedInput, setFocusedInput] = useState(null)
  const [activeSubmit, setActiveSubmit] = useState(false)

  const navigation = useNavigation()

  const windowWidth = useWindowDimensions().width

  useEffect(() => {
    if (api_key_setted) {
      setApiKeyText('* * * * * * * * * * *')
      setSecretKeyText('* * * * * * * * * * *')
    }
  }, [api_key_setted])

  useEffect(() => {
    if (apiKeyText === '' || secretKeyText === '') {
      setActiveSubmit(false)
    } else {
      setActiveSubmit(true)
    }
  }, [apiKeyText, secretKeyText])

  const handleSubmit = async () => {
    const body = {
      api_key: apiKeyText,
      secret_key: secretKeyText,
    }
    console.log('body', body)
    const result = await postApiKey(body)
    if (!result.message) {
      Alert.alert('成功', '', [
        {
          text: '好',
          onPress: () => {},
        },
      ])
    } else {
      Alert.alert('系統繁忙', '請多試幾次', [
        {
          text: '好',
          onPress: () => {},
        },
      ])
    }
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
          <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>API授權</Text>
        </Body>
        <Right>
          <Pressable onPress={() => {}}>
            <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>查看教程</Text>
          </Pressable>
        </Right>
      </Header>
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.apiKeyText}>
          <AntDesign name="lock" size={iconSize} color={Colors.mainColor} style={{ marginLeft: 16 }} />
          <Input
            style={{ marginLeft: componentProps.mediumPadding, color: Colors.mainColor }}
            placeholder="請輸入API KEY"
            placeholderTextColor={Colors.placeholderTColor}
            value={apiKeyText}
            onChangeText={setApiKeyText}
            onFocus={() => setFocusedInput(INPUT_FIELD.apiKeyText)}
            onBlur={() => setFocusedInput(null)}
          />
        </Item>
        <Spacer size={16} flex={0} />
        <Item style={styles.itemStyle} focus={focusedInput === INPUT_FIELD.secretKeyText}>
          <AntDesign name="lock" size={iconSize} color={Colors.mainColor} style={{ marginLeft: 16 }} />
          <Input
            style={{ marginLeft: componentProps.mediumPadding, color: Colors.mainColor }}
            placeholder="請輸入SECRET KEY"
            placeholderTextColor={Colors.placeholderTColor}
            value={secretKeyText}
            onChangeText={setSecretKeyText}
            onFocus={() => setFocusedInput(INPUT_FIELD.secretKeyText)}
            onBlur={() => setFocusedInput(null)}
          />
        </Item>
        <Spacer size={24} flex={0} />
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
            儲存
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.mainColor,
  },
})

export default ApiScreen
