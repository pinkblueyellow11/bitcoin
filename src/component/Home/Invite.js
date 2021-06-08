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
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import QRCode from 'react-native-qrcode-svg'

const initialLayout = { width: Dimensions.get('window').width }

function Invite(props) {
  const { token, errorMsg, setErrorMsg } = props
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
          <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>邀請</Text>
        </Body>
        <Right></Right>
      </Header>
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View>
            <Text style={styles.circleBox}>步驟一</Text>
            <Pressable style={styles.circleBoxButton}>
              <Text style={styles.circleBoxButtonText}>推薦好友</Text>
            </Pressable>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <MaterialCommunityIcons name="arrow-right" size={24} color={Colors.mainColor} />
          </View>
          <View>
            <Text style={styles.circleBox}>步驟二</Text>
            <Pressable style={styles.circleBoxButton}>
              <Text style={styles.circleBoxButtonText}>邀請註冊</Text>
            </Pressable>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <MaterialCommunityIcons name="arrow-right" size={24} color={Colors.mainColor} />
          </View>
          <View>
            <Text style={styles.circleBox}>步驟三</Text>
            <Pressable style={styles.circleBoxButton}>
              <Text style={styles.circleBoxButtonText}>獲取獎勵</Text>
            </Pressable>
          </View>
        </View>
        <Spacer size={50} flex={0} />
        <View style={{ alignItems: 'center' }}>
          <QRCode size={300} value="http://awesome.link.qr" />
        </View>
        <Spacer size={32} flex={0} />
        <Button
          full
          disabled={!token}
          style={{
            borderRadius: componentProps.borderRadius,
            borderColor: Colors.mainColor,
            borderWidth: 1,
            //backgroundColor: Colors.brandPrimary,
          }}
          onPress={() => {}}
        >
          <Text style={[componentProps.fontBodySmall, { color: token ? 'white' : Colors.brandText }]}>
            複製QRcode
          </Text>
        </Button>
        <Spacer size={100} flex={0} />
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  circleBox: {
    ...componentProps.fontError,
    color: '#A298AE',
    textAlign: 'center',
    marginBottom: 4,
  },
  circleBoxButton: {
    backgroundColor: Colors.circleBgColor,
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  circleBoxButtonText: {
    ...componentProps.fontOverline,
    color: 'white',
    textAlign: 'center',
  },
})

export default Invite
