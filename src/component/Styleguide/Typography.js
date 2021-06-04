import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, Pressable } from 'react-native'
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
} from 'native-base'
import Colors from '../../../native-base-theme/variables/commonColor'
import componentProps from '../../constant/componentProps'
import Spacer from '../UI/Spacer'

// eslint-disable-next-line import/prefer-default-export
export default function StyleguideTypography() {
  const navigation = useNavigation()

  return (
    <Container>
      <Header>
        <Left>
          <Pressable transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Pressable>
        </Left>
        <Body>
          <Title>Typography</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <View>
          <Text style={[componentProps.fontH1]}>h1. Heading</Text>
          <Spacer flex={0} size={8} />
          <Text style={[componentProps.fontH2]}>h2. Heading</Text>
          <Spacer flex={0} size={8} />
          <Text style={[componentProps.fontH3]}>h3. Heading</Text>
          <Spacer flex={0} size={8} />
          <Text style={[componentProps.fontH4Bold]}>h4, bold. Heading</Text>
          <Spacer flex={0} size={8} />
          <Text style={[componentProps.fontH4Medium]}>h4, medium. Heading</Text>
          <Spacer flex={0} size={8} />
          <Text style={[componentProps.fontH5Medium]}>h5, medium. Heading</Text>
          <Spacer flex={0} size={8} />
          <Text style={[componentProps.fontH5]}>h5, regular. Heading</Text>
          <Spacer flex={0} size={8} />
          <Text style={[componentProps.fontBody1Medium]}>
            body1, medium. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
            unde suscipit.
          </Text>
          <Spacer flex={0} size={8} />
          <Text style={[componentProps.fontBody1]}>
            body1, regular. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
            unde suscipit.
          </Text>
          <Spacer flex={0} size={8} />
          <Text style={[componentProps.fontOverline]}>
            overline, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
            suscipit.
          </Text>
        </View>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({})

StyleguideTypography.propTypes = {}
