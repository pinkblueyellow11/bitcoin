import React, { useState, useEffect } from 'react'
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
import Toast from 'react-native-toast-message'
import Colors from '../../../native-base-theme/variables/commonColor'
import componentProps from '../../constant/componentProps'
import Spacer from '../UI/Spacer'

// eslint-disable-next-line import/prefer-default-export
export default function StyleguideToast() {
  const navigation = useNavigation()

  const handleShowToast = (type) => {
    Toast.show({
      type: type, // 'success' | 'error'
      text1: type === 'success' ? 'Success Toast.' : 'Error Toast.',
      position: 'bottom',
      bottomOffset: 60,
      visibilityTime: 3000,
      onPress: () => Toast.hide(),
    })
  }

  return (
    <Container>
      <Header>
        <Left>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Pressable>
        </Left>
        <Body>
          <Title>Toast</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <Button block onPress={() => handleShowToast('success')}>
          <Text>Show Success Toast</Text>
        </Button>
        <Spacer size={20} />
        <Button block onPress={() => handleShowToast('error')}>
          <Text>Show Error Toast</Text>
        </Button>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({})

StyleguideToast.propTypes = {}
