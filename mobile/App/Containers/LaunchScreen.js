import React, { Component } from 'react'
import { Image, View, TouchableHighlight } from 'react-native'
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
     headerStyle: { backgroundColor: 'transparent', marginTop:-100 },
    headerTitleStyle: {
        fontSize: 12,
        marginLeft: '38%',
        marginTop:0,
      }
  });

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <View style={styles.container}>
          <View style={styles.row}>
            <Image source={Images.logo1} style={styles.homePricing} resizeMode='contain' />
          </View>
          <View style={styles.row}>
            <Text style={styles.txt}>To Start Exploring</Text>
            <View style={{ width: '70%' }}>
              <Button primary block style={styles.btn} onPress={() => navigate('HouseSearch')}>
                <Text>Pesquisar</Text>
              </Button>
              <Button primary block style={styles.btn} onPress={() => navigate('HouseSearch')}>
                <Text>GPS</Text>
              </Button>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.txt}>Go Further</Text>
            <View style={{ width: '70%', flexDirection: 'row', justifyContent: 'center' }}>
              <Icon ios={'ios-person'} android={'md-person'} style={styles.icon} onPress={() => navigate('Login')} />
              <Icon ios={'ios-camera'} android={'md-camera'} style={styles.icon} onPress={() => navigate('UserProfile')}/>
            </View>
          </View>
        </View>
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
