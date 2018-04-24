import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { connect } from 'react-redux';
import { Images } from '../Themes'

// Native Base
import { Container, Header, Body, Title, Button, Text, Fab, Icon, Row , Col } from 'native-base'

// Styles
import styles from './Styles/LaunchScreenStyles'



// Component
export default class LaunchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'HomePricing',
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

              <Row style={{ marginTop: 8 }}>
                <Col size={48}>
                  <Button primary block onPress={() =>
                    navigate('Login')
                  }>
                    <Text>Login</Text>
                  </Button>
                </Col>
                <Col size={4} />
                <Col size={48}>
                  <Button primary block>
                    <Text>GPS</Text>
                  </Button>
                </Col>
              </Row>
            </View>
            <Col size={20} />
          </View>
        </View>
        <Fab><Icon name="camera" /></Fab>
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
