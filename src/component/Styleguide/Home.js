import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Right, Icon, Body, Title } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import Colors from '../../../native-base-theme/variables/commonColor'
import componentProps from '../../constant/componentProps'
import Spacer from '../UI/Spacer'
import screenName from '../../constant/screenName'

const DEMO_PAGE = [
  {
    title: 'Typography',
    screenName: screenName.styleguideTypography,
  },
  {
    title: 'Button',
    screenName: screenName.styleguideButton,
  },
  {
    title: 'Input',
    screenName: screenName.styleguideInput,
  },
  {
    title: 'Toast',
    screenName: screenName.styleguideToast,
  },
]

export default function Home(props) {
  const navigation = useNavigation()

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Styleguide</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>
          {DEMO_PAGE.map((page) => (
            <ListItem key={page.title} selected onPress={() => navigation.push(page.screenName)}>
              <Left>
                <Text>{page.title}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({})

Home.propTypes = {}
