import React, { useState } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Button,
  Text,
} from 'native-base'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import CheckBox from '../UI/Checkbox'
import Switch from '../UI/Switch'
import Colors from '../../../native-base-theme/variables/commonColor'
import componentProps from '../../constant/componentProps'
import Spacer from '../UI/Spacer'

const radioProps = [
  { label: 'actived', value: 1 },
  { label: 'inactivated', value: 0 },
]

const checkboxProps = [
  { label: 'checked', value: 1 },
  { label: 'unchecked', value: 0 },
]

// eslint-disable-next-line import/prefer-default-export
export default function StyleguideButton() {
  const navigation = useNavigation()
  const [radioButtonValue, setRadioButtonValue] = useState(0)
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false)

  return (
    <Container>
      <Header>
        <Left>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Pressable>
        </Left>
        <Body>
          <Title>Button</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <View>
          <Text style={[componentProps.fontH3]}>Button</Text>
          <Spacer size={8} />
          <Button primary full>
            <Text>Primary</Text>
          </Button>
          <Spacer size={16} />
          <Button full disabled rounded>
            <Text>Primary Disabled</Text>
          </Button>
          <Spacer size={16} />
          <Button primary full bordered>
            <Text>Secondary</Text>
          </Button>
          <Spacer size={16} />
          <Button disabled full bordered>
            <Text>Secondary Disabled</Text>
          </Button>
          <Spacer size={24} />
          <Button bordered style={{ borderRadius: 10 }}>
            <Image
              style={{ marginLeft: componentProps.mediumPadding }}
              source={require('../../assets/icon/copyBlue.png')}
            ></Image>
            <Text>short text icon</Text>
          </Button>
          <Spacer size={24} />
          <TouchableOpacity
            style={{
              backgroundColor: Colors.brandDark,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: componentProps.defaultPadding,
              paddingLeft: 10,
              paddingRight: 22,
            }}
          >
            <View style={{ justifyContent: 'center' }}>
              <Text style={{ color: 'white' }}>USTD</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: 'white' }}>300 USDT</Text>
              <Text style={[componentProps.fontError, { color: 'white' }]}>90000 TWD</Text>
            </View>
          </TouchableOpacity>
          <Spacer size={24} />
        </View>
        <View>
          <Text style={[componentProps.fontH3]}>Radio Button</Text>
          <Spacer size={16} />
          <RadioForm formHorizontal={true} animation={true}>
            {/* To create radio buttons, loop through your array of options */}
            {radioProps.map((obj, i) => {
              const isSelected = radioButtonValue === i
              return (
                <RadioButton
                  labelHorizontal={true}
                  key={`radio-button-${obj.value}`}
                  style={{ marginRight: 8 }}
                >
                  {/*  You can set RadioButtonLabel before RadioButtonInput */}
                  <RadioButtonInput
                    {...componentProps.radioButtonInput(isSelected)}
                    obj={obj}
                    index={i}
                    isSelected={isSelected}
                    onPress={() => setRadioButtonValue(i)}
                  />
                  <RadioButtonLabel
                    {...componentProps.radioButtonLabel}
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={() => setRadioButtonValue(i)}
                  />
                </RadioButton>
              )
            })}
          </RadioForm>
          <Spacer size={16} />
        </View>
        <View>
          <Text style={[componentProps.fontH3]}>Checkbox</Text>
          <Spacer size={16} />
          {checkboxProps.map((item, i) => (
            <View key={`checkbox2-${item.value}`}>
              <CheckBox
                onClick={() => setRadioButtonValue(i)}
                isChecked={radioButtonValue === i}
                rightText={item.label}
                checkBoxColor={Colors.brandPrimary}
              />
              <Spacer size={8} />
            </View>
          ))}
          <CheckBox disabled rightText={'disabled'} />
          <Spacer size={16} />
        </View>
        <View>
          <Text style={[componentProps.fontH3]}>Switch</Text>
          <Spacer size={8} />
          <Switch
            {...componentProps.switch}
            value={isSwitchEnabled}
            onValueChange={() => setIsSwitchEnabled(!isSwitchEnabled)}
            disabled={false}
          />
        </View>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({})

StyleguideButton.propTypes = {}
