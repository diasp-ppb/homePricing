import React, { Component } from 'react';

import {
  View,
  Image,
  ListView,
  TouchableOpacity,
} from 'react-native';


import { Images } from '../../Themes';
import { connect } from 'react-redux';

// Native Base
import { Container, Text, Button } from 'native-base';
import { logoutAPI } from '../../Services/Api';
import { logout } from '../../Redux/LoginRedux';

// Styles
import styles from '../Styles/UserProfileScreenStyles'

//List Rows
const rows = [
  {id: 0, text: 'Home', icon: Images.homeIcon },
  {id: 1, text: 'Recomendações', icon: Images.homeIcon},
  {id: 2, text: 'Histórico', icon: Images.historyIcon},
  {id: 3, text: 'Preferências do utilizador', icon: Images.userIcon},
  {id: 4, text: 'Favoritos', icon: Images.favouriteIcon},
  {id: 5, text: 'Configurações de conta', icon: Images.settingsIcon},
  {id: 6, text: 'Ajuda', icon: Images.helpIcon},
];

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  navPath(RowId){

    switch(RowId){
      case 0: //Return Home
        return 'LaunchScreen';
      case 1:
        return 'PreferenceScreen';
      case 2:
        return 'HistoricScreen';
      case 3:
        return 'UserPreferences';
      case 4:  //Favorites
        return 'Favorites';
      case 5:  //Profile Settngs
        break;
      case 6:  //Help page
        return 'HelpScreen';
      default:
        break;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    logoutAPI(this.props);
  }

  renderRow (rowData) {
    return (
      <TouchableOpacity key = {rowData.id} onPress={() => this.props.navigation.navigate(this.navPath(rowData.id))}>
        <View style={styles.listItem}>
          <Image source = {rowData.icon} style = {styles.listIcons}/>
          <Text style= {styles.text}>
            {rowData.text}
          </Text>
        </View>
      </TouchableOpacity>

    )
  };

  render () {

    return (
      <Container>
        <View style={styles.userInfo}>
          <Image source={Images.profileIcon} style={styles.icon} />
          <Text>{this.props.user.user.email}</Text>
        </View>
        {
          rows.map((item) => {
            return this.renderRow(item);
          })
        }

        <View style={styles.wrapper}>
          <View style={styles.spaceBox}/>

          <View style={styles.logoutBox}>
            <Button primary block
                    title={"Logout"}
                    style={styles.btn}
                    onPress = {this.handleSubmit}
            >
              <Text>Logout</Text>
            </Button>
          </View>

          <View style={styles.spaceBox}/>
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


function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}


const connectedRegister = connect(mapStateToProps, mapDispatchToProps)(ControlPanel);

export { connectedRegister as ControlPanel};
