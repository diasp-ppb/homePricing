import React, { Component } from 'react'
import { Image, View,TouchableHighlight } from 'react-native'
import { connect } from 'react-redux';
import { Images } from '../Themes'

// Native Base
import { Container, Header, Body, Title, Button, Text, Fab, Icon, Row, Col } from 'native-base'

// Styles
import styles from './Styles/LaunchScreenStyles'

import { logoutAPI } from '../Services/Api';
import { logout } from '../Redux/LoginRedux';



// Component
class LaunchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  render() {
    const { navigate } = this.props.navigation;

    const menuOption = (this.props.user  &&  this.props.user.user) ? (
          <Button title={"menu"} style={{backgroundColor: 'transparent', elevation: 0}}onPress={() => {
                this.props.navigation.navigate('DrawerToggle');}}>
            <Icon ios={"ios-menu"} android={"md-menu"} style={{color: 'white'}}/>
          </Button>) : (null);

    return (
      <Container>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <View style={styles.container}>
          {menuOption}
          <View style={styles.row}>
            <Image source={Images.logo1} style={styles.homePricing} resizeMode='contain' />
          </View>
          <View style={styles.row}>
            <Text style={styles.txt}>To   S t a r t     E x p l o r i n g</Text>
            <View style={{ width: '50%' }}>
              <Button primary block style={styles.btn} onPress={() => navigate('HouseSearch')}>
                <Text>Pesquisar</Text>
              </Button>
              <Button primary block style={styles.btn} onPress={() => navigate('Gps')}>
                <Text>GPS</Text>
              </Button>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.txt}>G o   F u r t h e r</Text>
            <View style={{ width: '55%', flexDirection: 'row', justifyContent: 'center' }}>
              { !this.props.user.loggedIn ?
                <Icon ios={'ios-person'} android={'md-person'} style={styles.icon} onPress={() => navigate('Login')} />
              :
                <Icon ios={'ios-power'} android={'md-power'} style={styles.icon} onPress={() => logoutAPI(this.props)} />
              }
              <Icon ios={'ios-camera'} android={'md-camera'} style={styles.icon} onPress={() => navigate('Camera')} />
            </View>
          </View>
        </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
    user: state.login
  });

function mapDispatchToProps(dispatch) {
    return {
      logout: () => dispatch(logout())
    };
  }

const connectedLaunch = connect(mapStateToProps, mapDispatchToProps)(LaunchScreen);
export { connectedLaunch as LaunchScreen };