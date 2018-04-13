import { Images } from '../Themes'
import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'

// Native Base
import { Container, Header, Body, Title, Text, Fab, Icon, ActionSheet } from 'native-base'

// Styles
import styles from './Styles/LaunchScreenStyles'

// TODO: Fill in ActionSheet
let OPTIONS = [];
let CANCEL_INDEX = 10;
let DESTRUCTIVE_INDEX = 11;

OPTIONS[CANCEL_INDEX] = 'Cancel'
OPTIONS[DESTRUCTIVE_INDEX] = 'Delete'
for (let i = 0; i < 10; i++) {
  OPTIONS[i] = 'Localização #' + i;
}

// Component
export default class LaunchScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Header>
          <Body>
            <Title>Home Pricing</Title>
          </Body>
        </Header>
        <View style={styles.content}>
          <View style={styles.halfRow}>
            <Image source={Images.logo} style={styles.logo} />
          </View>
          <View style={styles.halfRow}>
            <TouchableOpacity onPress={() =>
              ActionSheet.show(
                {
                  options: OPTIONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  destructiveButtonIndex: DESTRUCTIVE_INDEX,
                  title: "Localizações Disponíveis"
                },
                buttonIndex => {
                  this.setState({ clicked: OPTIONS[buttonIndex] })
                }
              )}>
              <Text style={styles.topBtn}>Pesquisar</Text>
            </TouchableOpacity>
            <View style={styles.btnGroup}>
              <TouchableOpacity onPress={() =>
                  navigate('SearchResults')
                }>
                <Text style={styles.btn}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.btn}>GPS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Fab><Icon name="camera" /></Fab>
      </Container>
    )
  }
}
