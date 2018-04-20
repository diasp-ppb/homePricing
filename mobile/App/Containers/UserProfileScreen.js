import React, { Component } from 'react'
import { Image, View, AppRegistry, ListView, StyleSheet, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'

// Native Base
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Body, Title, Content, Text, Button, Fab, Icon, ActionSheet } from 'native-base'

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

  state = { 
    user : ''
  }

  constructor(props) {
    super(props);
    this.user;
    this.getUserInfo();
    
  }

  getUserInfo(){
    fetch('http://172.30.27.2:3000/v1/users/5ada124ce6c6b70030e4aba9', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQyNDU3NzQsImlhdCI6MTUyNDI0MjE3NCwic3ViIjoiNWFkYTEyNGNlNmM2YjcwMDMwZTRhYmE5In0.qlaCnFDYiL6S3gOmWRE3i_BnmuzXk0NJ2tny4iGYAPI'
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
        <Header>
          <Body>
            <Title>Perfil</Title>
          </Body>
        </Header>
        <View style={styles.userInfo}>
          <Image source={Images.profileIcon} style={styles.icon} />
          <Text>{this.state.user}</Text>
        </View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            />
      </Container>
    )
  }
}
