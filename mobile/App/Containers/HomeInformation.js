import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Images } from '../Themes'

// Native Base
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Body, Title, Content, Text, Button, Fab, Icon, ActionSheet } from 'native-base'

// Styles
import styles from './Styles/LaunchScreenStyles'



export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Container>
        <Header>
          <Body>
            <Title>House Information:</Title>
          </Body>
        </Header>
        
        <View>
         
        </View>
       
      </Container>
    )
  }
}
