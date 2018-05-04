import React, { Component } from 'react'
import { Image, View, AppRegistry, ListView, StyleSheet, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux';

// Native Base
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Body, Title, Content, Text, Button, Fab, Icon, ActionSheet } from 'native-base'
import { logoutAPI } from "../Services/Api";
import { baseURL } from "../Services/Api";
import { logout } from '../Redux/LoginRedux'

// Styles
import styles from './Styles/UserProfileScreenStyles'

//List Rows
const rows = [
    {id: 0, text: 'Home', icon: Images.homeIcon },
    {id: 1, text: 'Histórico', icon: Images.historyIcon},
    {id: 2, text: 'Preferências do utilizador', icon: Images.userIcon},
    {id: 3, text: 'Favoritos', icon: Images.favouriteIcon},
    {id: 4, text: 'Configurações de conta', icon: Images.settingsIcon},
    {id: 5, text: 'Ajuda', icon: Images.helpIcon}
  ]
  
  // Row comparison function
  const rowHasChanged = (r1, r2) => r1.id !== r2.id
  
  // DataSource template object
  const ds = new ListView.DataSource({rowHasChanged})

  
export default class UserProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Perfil',
  });

  state = { 
    user : ''
  }

  constructor(props) {
    super(props);
    this.getUserInfo();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getUserInfo(){
    var url = baseURL + '/v1/users/' + this.props.user.user;
    var auth = 'Bearer ' +this.props.user.token;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : auth
      }
    }).then(
      (response) => response.json()
    ).then(
      (responseJson) => {
        this.setState({user: responseJson.email});
      }
    ).catch((error) => {
      console.error(error);
    });

  }

  
  navPath(RowId){

    switch(RowId){
        case 0:
            return 'LaunchScreen';
            break;
        case 1: 
            break;
        case 2:
            return 'UserPreferences';
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        default:
            break;
    }
  }

  state = {
    dataSource: ds.cloneWithRows(rows)
  }

  handleSubmit(event) {
    event.preventDefault();
    logoutAPI(this.props);
  }

  renderRow = (rowData) => {
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
  }

  render () {
    
    return (
      <Container>
        <View style={styles.userInfo}>
          <Image source={Images.profileIcon} style={styles.icon} />
          <Text>{this.state.user}</Text>
        </View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            />

            <View style={styles.wrapper}>
              <View style={styles.spaceBox}></View>

              <View style={styles.logoutBox}>
                <Button primary block
                  style={styles.btn}
                  onPress = {this.handleSubmit}
                >
                  <Text>Logout</Text>
                </Button>
              </View>

              <View style={styles.spaceBox}></View>
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

const connectedRegister = connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
export { connectedRegister as UserProfileScreen};
