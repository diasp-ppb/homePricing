import React, { Component } from 'react'
import { Image, View,TouchableHighlight } from 'react-native'
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
      <Container >
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />

        <View style={styles.content}>

          <View style={styles.halfRow}>
            <Image source={Images.logo1} style={styles.homePricing} resizeMode='stretch' />
          </View>

          <View style={styles.halfRow}>
            <Text style={{fontSize:11, color:'white', elevation: 3, padding:15}}>To   S t a r t     E x p l o r i n g</Text>
            <View style={{ justifyContent: 'center' , marginTop:0 }}>
              <Button style={styles.topBtn} onPress={() => navigate('HouseSearch')}>
                <Text style={{fontSize:12}}>Pesquisar</Text>
              </Button>

              <Button style={styles.topBtn} onPress={() => navigate('Gps')}>
                <Text style={{fontSize:12}}>GPS</Text>
              </Button>
            </View>
          </View>

          <View style={styles.halfRow}>

            <Text style={{fontSize:8, color:'white', marginTop:90, padding:12}}> G o   F u r t h e r </Text>
            <View style={{flexDirection: 'row',flex: 1}}>
              <View style={{flex: 0.1}} >
                <TouchableHighlight onPress={() => navigate('Login')}>
                  <Icon ios={'ios-person'} android={'md-person'} style={{ color: 'white' }} />
                </TouchableHighlight>
              </View>
              <View style={{flex: 0.1}}>
                <TouchableHighlight onPress={() => navigate('Camera')}>
                  <Icon ios={'ios-camera'} android={'md-camera'} style={{ color: 'white' }} />
                </TouchableHighlight>
              </View>
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
