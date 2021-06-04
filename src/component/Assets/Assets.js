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

const initialLayout = { width: Dimensions.get('window').width }

function Assets(props) {
  const { errorMsg, setErrorMsg } = props
  const navigation = useNavigation()

  const windowWidth = useWindowDimensions().width

  const handleSubmit = async () => {}

  return (
    <Container style={{}}>
      <Header transparent style={{ backgroundColor: Colors.brandRed80 }}>
        <StatusBar style="dark" backgroundColor="transparent" />
        <Left style={{ flex: 1 }}></Left>
        <Body>
          <Text style={{ color: Colors.mainColor, alignSelf: 'center' }}>資產</Text>
        </Body>
        <Right></Right>
      </Header>
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        <View style={{ backgroundColor: '#F3EAFF', borderRadius: componentProps.borderRadius }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 16, justifyContent: 'space-between' }}>
            <Text style={[componentProps.fontBodySmall3, { color: Colors.grayText3, alignSelf: 'center' }]}>
              帳戶總資產
            </Text>
            <Text style={[componentProps.fontH1, { color: Colors.redText, alignSelf: 'center' }]}>0</Text>
          </View>
          <Spacer size={24} flex={0} />
          <View style={styles.boxButtonView}>
            <Pressable onPress={() => {}} style={[styles.boxButton, { marginRight: 12 }]}>
              <Text style={styles.boxButtonText}>充值</Text>
            </Pressable>
            <Pressable onPress={() => {}} style={[styles.boxButton, { marginLeft: 12 }]}>
              <Text style={styles.boxButtonText}>提幣</Text>
            </Pressable>
          </View>
          <Spacer size={24} flex={0} />
        </View>
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  boxButtonView: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-around',
  },
  boxButton: {
    paddingVertical: 8,
    backgroundColor: 'white',
    flex: 1,
    ...componentProps.borderRadius,
  },
  boxButtonText: {
    ...componentProps.fontBodySmall2,
    color: Colors.mainColor,
    alignSelf: 'center',
  },
})

export default Assets
