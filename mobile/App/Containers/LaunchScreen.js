import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { connect } from 'react-redux';
import { Images } from '../Themes'

// Native Base
import { Container, Button, Text, Fab, Icon } from 'native-base'

// Styles
import styles from './Styles/LaunchScreenStyles'

// Component
export default class LaunchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home Pricing',
  });

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { navigate } = this.props.navigation

    return (
      <Container>
        <View style={styles.content}>
          <View style={styles.halfRow}>
            <Image source={Images.logo} style={styles.logo} />
          </View>
          <View style={styles.halfRow}>
            <View style={{ justifyContent: 'center' }}>
              <Button style={styles.topBtn} onPress={() => navigate('HouseSearch')}>
                <Text>Pesquisar</Text>
              </Button>
            </View>
            <View style={styles.btnGroup}>
              <Button style={styles.btn} onPress={() => navigate('Login')}>
                <Text>Login</Text>
              </Button>
              <Button style={styles.btn} onPress={() => navigate('Gps')}>
                <Text>GPS</Text>
              </Button>
            </View>
          </View>
        </View>
        <Fab
          onPress={ () =>navigate("Camera") }>
          <Icon name="camera" style={{color: "#ffffff"}} />
        </Fab>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.login
  };
}

const connectedLaunch = connect(mapStateToProps)(LaunchScreen);
export { connectedLaunch as LaunchScreen };
