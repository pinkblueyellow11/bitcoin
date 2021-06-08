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
import { MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons'

const initialLayout = { width: Dimensions.get('window').width }

function Home(props) {
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
          <Text style={{ color: 'white', alignSelf: 'center' }}>MAA</Text>
        </Body>
        <Right>
          <Pressable onPress={() => navigation.navigate(screenName.Notification)}>
            <AntDesign name="bells" size={22} color={Colors.mainColor} />
          </Pressable>
        </Right>
      </Header>
      <ScrollView style={[{ paddingHorizontal: componentProps.defaultPadding }]}>
        <View
          style={{ height: 357, backgroundColor: Colors.bgChart, borderRadius: componentProps.borderRadius }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View>
              <Pressable
                style={{ backgroundColor: Colors.circleBgColor, padding: 20, borderRadius: 100 }}
                onPress={() => navigation.navigate(screenName.Invite)}
              >
                <AntDesign name="smileo" size={24} color="white" />
              </Pressable>
              <Text
                style={[componentProps.fontError, { color: '#A298AE', textAlign: 'center', marginTop: 4 }]}
              >
                邀請
              </Text>
            </View>
            <View>
              <Pressable
                style={{ backgroundColor: Colors.circleBgColor, padding: 20, borderRadius: 100 }}
                onPress={() => navigation.navigate(screenName.Community)}
              >
                <MaterialIcons name="groups" size={24} color="white" />
              </Pressable>
              <Text
                style={[componentProps.fontError, { color: '#A298AE', textAlign: 'center', marginTop: 4 }]}
              >
                社區
              </Text>
            </View>
            <View>
              <Pressable
                style={{ backgroundColor: Colors.circleBgColor, padding: 20, borderRadius: 100 }}
                onPress={() => navigation.navigate(screenName.ApiScreen)}
              >
                <MaterialCommunityIcons name="api" size={24} color="white" />
              </Pressable>
              <Text
                style={[componentProps.fontError, { color: '#A298AE', textAlign: 'center', marginTop: 4 }]}
              >
                API
              </Text>
            </View>
          </View>
          <Spacer size={100} flex={0} />
        </View>
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({})

export default Home
