import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Pressable, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Button,
  Input,
  Item,
  Text,
  Label,
} from 'native-base'
import RNPickerSelect from 'react-native-picker-select'
import Colors from '../../../native-base-theme/variables/commonColor'
import componentProps from '../../constant/componentProps'
import Spacer from '../UI/Spacer'

const INPUT_FIELD = {
  default: 'default',
  focus: 'focus',
  error: 'error',
  selector: 'selector',
  password: 'password',
  login: 'login',
}

const DATA = [
  { label: 'Football', value: 'football' },
  { label: 'Baseball', value: 'baseball' },
  { label: 'Hockey', value: 'hockey' },
]

// eslint-disable-next-line import/prefer-default-export
export default function StyleguideInput() {
  const navigation = useNavigation()
  const [inputValue, setInputValue] = useState('')
  const [selectorValue, setSelectorValue] = useState('')
  const [focusedInput, setFocusedInput] = useState(null)
  const [isShowPassword, setIsShowPassword] = useState(false)

  return (
    <Container>
      <Header>
        <Left>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Pressable>
        </Left>
        <Body>
          <Title>Input</Title>
        </Body>
        <Right />
      </Header>
      <Content enableResetScrollToCoords={false} padder>
        <View>
          <Label style={[componentProps.inputLabel]}>Default</Label>
          <Item regular focus={focusedInput === INPUT_FIELD.default}>
            <Input
              placeholder="Please enter something..."
              value={inputValue}
              onChangeText={setInputValue}
              onFocus={() => setFocusedInput(INPUT_FIELD.default)}
              onBlur={() => setFocusedInput(null)}
            />
            {focusedInput === INPUT_FIELD.default && (
              <Pressable style={[componentProps.inputEndAdornment]} onPress={() => setInputValue('')}>
                <Image source={require('../../assets/icon/clearGray.png')} />
              </Pressable>
            )}
          </Item>
          <Spacer size={24} />
        </View>
        <View>
          <Label style={[componentProps.inputLabel]}>Focus</Label>
          <Item regular focus>
            <Input
              placeholder="Please enter something..."
              value={inputValue}
              onChangeText={setInputValue}
              onFocus={() => setFocusedInput(INPUT_FIELD.focus)}
              onBlur={() => setFocusedInput(null)}
            />
            {focusedInput === INPUT_FIELD.focus && (
              <Pressable style={[componentProps.inputEndAdornment]} onPress={() => setInputValue('')}>
                <Image source={require('../../assets/icon/clearGray.png')} />
              </Pressable>
            )}
          </Item>
          <Spacer size={24} />
        </View>
        <View>
          <Label disabled style={[componentProps.inputLabel]}>
            Disabled (Lock)
          </Label>
          <Item regular disabled>
            <Input disabled value="Please enter something..." />
          </Item>
          <Spacer size={24} />
        </View>
        <View>
          <Label style={[componentProps.inputLabel]}>Error</Label>
          <Item regular error>
            <Input
              placeholder="Please enter something..."
              value={inputValue}
              onChangeText={setInputValue}
              onFocus={() => setFocusedInput(INPUT_FIELD.error)}
              onBlur={() => setFocusedInput(null)}
            />
            {focusedInput === INPUT_FIELD.error && (
              <Pressable style={[componentProps.inputEndAdornment]} onPress={() => setInputValue('')}>
                <Image source={require('../../assets/icon/clearGray.png')} />
              </Pressable>
            )}
          </Item>
          <Text style={[componentProps.inputHelperText, { color: Colors.brandDanger }]}>
            Invalid. Please enter again.
          </Text>
          <Spacer size={24} />
        </View>
        <View>
          <Label style={[componentProps.inputLabel]}>Password</Label>
          <Item regular focus={focusedInput === INPUT_FIELD.password}>
            <Input
              placeholder="Please enter something..."
              value={inputValue}
              onChangeText={setInputValue}
              onFocus={() => setFocusedInput(INPUT_FIELD.password)}
              onBlur={() => setFocusedInput(null)}
              secureTextEntry={!isShowPassword}
            />
            <Pressable
              style={[componentProps.inputEndAdornment]}
              onPress={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? (
                <Image
                  source={
                    focusedInput === INPUT_FIELD.password
                      ? require('../../assets/icon/eyeOpenBlue.png')
                      : require('../../assets/icon/eyeOpenGrey.png')
                  }
                />
              ) : (
                <Image
                  source={
                    focusedInput === INPUT_FIELD.password
                      ? require('../../assets/icon/eyeCloseBlue.png')
                      : require('../../assets/icon/eyeCloseGrey.png')
                  }
                />
              )}
            </Pressable>
          </Item>
          <Spacer size={24} />
        </View>
        <View>
          <Label style={[componentProps.inputLabel]}>Selector</Label>
          <Item regular focus={focusedInput === INPUT_FIELD.selector}>
            <RNPickerSelect
              {...componentProps.selectorProps}
              items={DATA}
              value={selectorValue}
              onValueChange={setSelectorValue}
              onOpen={() => setFocusedInput(INPUT_FIELD.selector)}
              onClose={() => setFocusedInput(null)}
              placeholder={{ label: 'Please select something...', value: '' }}
              Icon={() => componentProps.selectorIcon(focusedInput === INPUT_FIELD.selector)}
            />
          </Item>
          <Spacer size={24} />
        </View>
        <View>
          <Label style={[componentProps.inputLabel]}>Login Input</Label>
          <Item
            style={{ position: 'relative', borderBottomColor: 'transparent' }}
            focus={focusedInput === INPUT_FIELD.login}
          >
            <Image
              style={{ marginLeft: componentProps.mediumPadding }}
              source={require('../../assets/icon/userBlue.png')}
            ></Image>
            <Input
              style={{ marginLeft: componentProps.mediumPadding }}
              placeholder="Please enter something..."
              placeholderTextColor={'white'}
              value={inputValue}
              onChangeText={setInputValue}
              onFocus={() => setFocusedInput(INPUT_FIELD.login)}
              onBlur={() => setFocusedInput(null)}
            />
            <View style={{ position: 'absolute', top: 38 }}>
              <Image source={require('../../assets/images/path.png')}></Image>
            </View>
          </Item>
          <Spacer size={6} />
          <Text
            style={[
              componentProps.fontError,
              { color: Colors.brandDanger, marginLeft: componentProps.mediumPadding },
            ]}
          >
            Invalid. Please enter again.
          </Text>
          <Spacer size={24} />
        </View>
        <View>
          <Label style={[componentProps.inputLabel]}>Sigin Input</Label>
          <Item style={{ borderBottomColor: Colors.brandPrimary }} focus={focusedInput === INPUT_FIELD.login}>
            <Image
              style={{ marginLeft: componentProps.mediumPadding }}
              source={require('../../assets/icon/userBlue.png')}
            ></Image>
            <Input
              style={{ marginLeft: componentProps.mediumPadding }}
              placeholder="Please enter something..."
              placeholderTextColor={'white'}
              value={inputValue}
              onChangeText={setInputValue}
              onFocus={() => setFocusedInput(INPUT_FIELD.login)}
              onBlur={() => setFocusedInput(null)}
            />
          </Item>
          <Spacer size={24} />
        </View>
        <View>
          <Label style={[componentProps.inputLabel]}>Sigin Input password</Label>
          <Item style={{ borderBottomColor: Colors.brandPrimary }} focus={focusedInput === INPUT_FIELD.login}>
            <Image
              style={{ marginLeft: componentProps.mediumPadding }}
              source={require('../../assets/icon/userBlue.png')}
            ></Image>
            <Input
              style={{ marginLeft: componentProps.mediumPadding }}
              placeholder="Please enter something..."
              placeholderTextColor={'white'}
              value={inputValue}
              onChangeText={setInputValue}
              onFocus={() => setFocusedInput(INPUT_FIELD.login)}
              onBlur={() => setFocusedInput(null)}
              secureTextEntry={!isShowPassword}
            />
            <Pressable
              style={[componentProps.inputEndAdornment]}
              onPress={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? (
                <Image source={require('../../assets/icon/openEye.png')} />
              ) : (
                <Image source={require('../../assets/icon/closeEye.png')} />
              )}
            </Pressable>
          </Item>
          <Spacer size={24} />
        </View>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({})

StyleguideInput.propTypes = {}
