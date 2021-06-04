import React, { Component, useState, useEffect } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import screentName from './constant/screenName'
import Colors from '../native-base-theme/variables/commonColor'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { connect, useSelector, useDispatch } from 'react-redux'
// Page
import Login from './container/Login/Login'
import SignIn from './container/SignIn/SignIn'
import VerifyPhone from './container/SignIn/VerifyPhone'
import Home from './container/Home/Home'
import MyAccount from './container/MyAccount/MyAccount'
import TaskHome from './container/Task/TaskHome'
import Assets from './container/Assets/Assets'

// Guidestyle
import StyleguideHome from './component/Styleguide/Home'
import StyleguideButton from './component/Styleguide/Button'
import StyleguideInput from './component/Styleguide/Input'
import StyleguideTypography from './component/Styleguide/Typography'
import StyleguideToast from './component/Styleguide/Toast'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
export default function Navigation() {
  function TabHome() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: Colors.mainColor,
          inactiveTintColor: Colors.mainColor,
          activeBackgroundColor: Colors.mainBgColor,
          //inactiveBackgroundColor: 'white',
          style: {
            height: 100,
            backgroundColor: 'white',
            //paddingBottom: 13,
            // borderTopRightRadius: 13,
            // borderTopLeftRadius: 13,
            borderTopWidth: 1,
            borderTopColor: Colors.mainColor,
            // cover background
            position: 'absolute',
            left: 0,
            bottom: 0,
            right: 0,
            // borderTopWidth: 0,
            height: 60,
            elevation: 0,
          },
          tabStyle: {
            //backgroundColor: 'red',
            //height: 100,
            //paddingBottom: 3,
          },
          labelStyle: {
            fontSize: 10,
            color: Colors.mainColor,
          },
        }}
      >
        <Tab.Screen
          name={screentName.Home}
          component={Home}
          options={{
            tabBarLabel: '主頁',
            tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name={screentName.MyAccount}
          component={MyAccount}
          options={{
            tabBarLabel: '我的',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={screentName.TaskHome}
          component={TaskHome}
          options={{
            tabBarLabel: '任務',
            tabBarIcon: ({ color, size }) => <MaterialIcons name="add-task" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name={screentName.Assets}
          component={Assets}
          options={{
            tabBarLabel: '資產',
            tabBarIcon: ({ color, size }) => <Ionicons name="wallet-outline" size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'TabHome'} component={TabHome} options={{ headerShown: false }} />
        <Stack.Screen name={screentName.SignIn} component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen
          name={screentName.VerifyPhone}
          component={VerifyPhone}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name={screentName.login} component={Login} options={{ headerShown: false }} />
        <Stack.Screen name={screentName.SignIn} component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name={'TabHome'} component={TabHome} options={{ headerShown: false }} /> */}

        <Stack.Screen
          name={screentName.styleguideHome}
          component={StyleguideHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={screentName.styleguideButton}
          component={StyleguideButton}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={screentName.styleguideInput}
          component={StyleguideInput}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={screentName.styleguideTypography}
          component={StyleguideTypography}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={screentName.styleguideToast}
          component={StyleguideToast}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}