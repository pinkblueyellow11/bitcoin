import React, { Component, useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import screentName from './constant/screenName'
import Colors from '../native-base-theme/variables/commonColor'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { connect, useSelector, useDispatch } from 'react-redux'
// Page
import Login from './container/Login/Login'
import ForgetPassword from './container/Login/ForgetPassword'
import SignIn from './container/SignIn/SignIn'
import VerifyPhone from './container/SignIn/VerifyPhone'
import Home from './container/Home/Home'
import MyAccount from './container/MyAccount/MyAccount'
import TaskHome from './container/Task/TaskHome'
import NewTask from './container/Task/NewTask'
import TaskDetail from './container/Task/TaskDetail'
import TaskProfitRecord from './container/Task/TaskProfitRecord'
import ChooseCoinType from './container/Task/ChooseCoinType'
import TaskRecord from './container/Task/TaskRecord'
import CoverUp from './container/Task/CoverUp'
import Assets from './container/Assets/Assets'
import ReCharge from './container/Assets/ReCharge'
import ReChargeUpdate from './container/Assets/ReChargeUpdate'
import ReChargeRecord from './container/Assets/ReChargeRecord'
import Withdrawal from './container/Assets/Withdrawal'
import Notification from './container/Notification/Notification'
import Invite from './container/Home/Invite'
import Community from './container/Home/Community'
import ApiScreen from './container/Home/ApiScreen'

// Guidestyle
import StyleguideHome from './component/Styleguide/Home'
import StyleguideButton from './component/Styleguide/Button'
import StyleguideInput from './component/Styleguide/Input'
import StyleguideTypography from './component/Styleguide/Typography'
import StyleguideToast from './component/Styleguide/Toast'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
export default function Navigation(props) {
  console.log('Navigation props', props)
  // redux
  const token = useSelector((state) => state.register.token)
  const [isLogIn, setIsLogIn] = useState(false)

  useEffect(() => {
    setIsLogIn(token === null || token === undefined)
  }, [token])

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
            height: Platform.OS === 'android' ? 60 : 80,
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
            tabBarLabel: '資金',
            tabBarIcon: ({ color, size }) => <Ionicons name="wallet-outline" size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    )
  }

  function MainStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen name={screentName.Login} component={Login} options={{ headerShown: false }} />
        <Stack.Screen name={screentName.SignIn} component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen
          name={screentName.VerifyPhone}
          component={VerifyPhone}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer linking={{
      prefixes: ['yigg://'],
      config: {
        screens: {
          SignIn: 'sigIn/:id',
        },
      },
    }
    } >
      <Stack.Navigator mode="modal">
        {isLogIn ? (
          <>
            <Stack.Screen
              name="Main"
              component={MainStackScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={screentName.ForgetPassword}
              component={ForgetPassword}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={'TabHome'} component={TabHome} options={{ headerShown: false }} />
            <Stack.Screen
              name={screentName.VerifyPhone}
              component={VerifyPhone}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={screentName.Notification}
              component={Notification}
              options={{ headerShown: false }}
            />
            <Stack.Screen name={screentName.Invite} component={Invite} options={{ headerShown: false }} />
            <Stack.Screen
              name={screentName.Community}
              component={Community}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={screentName.ApiScreen}
              component={ApiScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name={screentName.NewTask} component={NewTask} options={{ headerShown: false }} />
            <Stack.Screen name={screentName.ReCharge} component={ReCharge} options={{ headerShown: false }} />
            <Stack.Screen
              name={screentName.ReChargeUpdate}
              component={ReChargeUpdate}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={screentName.ReChargeRecord}
              component={ReChargeRecord}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={screentName.Withdrawal}
              component={Withdrawal}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={screentName.ChooseCoinType}
              component={ChooseCoinType}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={screentName.TaskDetail}
              component={TaskDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={screentName.TaskProfitRecord}
              component={TaskProfitRecord}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={screentName.TaskRecord}
              component={TaskRecord}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={screentName.CoverUp}
              component={CoverUp}
              options={{ headerShown: false }}
            />
          </>
        )}
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
    </ NavigationContainer>
  )
}
