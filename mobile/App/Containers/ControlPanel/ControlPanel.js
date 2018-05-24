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
import { Container, Text, Button, Icon } from 'native-base';
import { logoutAPI } from '../../Services/Api';
import { logout } from '../../Redux/LoginRedux';

// Styles
import styles from './ControlPanelStyles'

//List Rows
const rows = [
  {id: 0, text: 'Home', ios: 'ios-home', android: 'md-home' },
  {id: 1, text: 'Recomendações', ios: 'ios-bulb', android: 'md-bulb' },
  {id: 2, text: 'Histórico', ios: 'ios-timer-outline', android: 'md-timer' },
  {id: 3, text: 'Preferências do utilizador', ios: 'ios-person', android: 'md-person' },
  {id: 4, text: 'Favoritos', ios: 'ios-star', android: 'md-star' },
  {id: 5, text: 'Configurações de conta', ios: 'ios-settings', android: 'md-settings' },
  {id: 6, text: 'Ajuda', ios: 'ios-information-circle', android: 'md-information-circle'},
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
        return 'RecommendationScreen';
      case 2:
        return 'HistoricScreen';
      case 3:
        return 'UserPreferences';
      case 4:  //Favorites
        return 'Favorites';
      case 5:  //Profile Settngs
        return 'UserSettings';
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
    if (rowData.id == 1) {
      return (
        <TouchableOpacity style={styles.option} key={rowData.id} onPress={() => this.props.navigation.navigate(this.navPath(rowData.id), { id: this.props.user.user.id })}>
          <Icon style={styles.optionIcon} ios={rowData.ios} android={rowData.android}/>
          <Text style={styles.text}>
            {rowData.text}
          </Text>
        </TouchableOpacity>
      )
    } else return (
      <TouchableOpacity style={styles.option} key={rowData.id} onPress={() => this.props.navigation.navigate(this.navPath(rowData.id))}>
        <Icon style={styles.optionIcon} ios={rowData.ios} android={rowData.android}/>
        <Text style={styles.text}>
          {rowData.text}
        </Text>
      </TouchableOpacity>
    )
  };

  render () {

    return (
      <Container style={styles.root}>
        <View style={styles.userInfo}>
          <View style={{ elevation: 1 }}>
          <Image source={Images.profileIcon} style={[styles.profileImage, styles.center]} />
          </View>
          <Text style={[styles.text, styles.center, { marginLeft: 0 }]}>{this.props.user.user ? this.props.user.user.email : null }</Text>
        </View>
        <View style={styles.options}>
          {
            rows.map((item) => {
              return this.renderRow(item);
            })
          }
          <TouchableOpacity
                  style={styles.option}
                  onPress={this.handleSubmit}
          >
            <Icon style={styles.optionIcon} ios={'ios-power'} android={'md-power'}/>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
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
