import React, { Component } from 'react'
import { Image, View, AppRegistry, ListView, StyleSheet, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux';

// Native Base
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Body, Title, Content, Text, Button, Fab, Icon, ActionSheet } from 'native-base'

// Styles
import styles from './Styles/FavoriteStyle'

//TODO: Get rows by database query
const rows = [
  {id: 0, text: 'T2 com duas casas de banho, vista para o rio', location:'Foz do Douro, Porto', price: 15000, icon: Images.houseImage },
  {id: 2, text: 'T0 centro da cidade',location:'Boavista, Porto', price: 25000, icon: Images.houseImage }
]

// Row comparison function
const rowHasChanged = (r1, r2) => r1.id !== r2.id

// DataSource template object
const ds = new ListView.DataSource({rowHasChanged})

  
export default class FavoritesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Favoritos',
  });

  constructor(props) {
    super(props);

    this.state ={
      //user: this.props.navigation.state.params.user,
      dataSource: ds.cloneWithRows(rows)
    }

  }

  renderRow = (rowData) => {
    return (  
        <TouchableOpacity key = {rowData.id}>
            <View style={styles.listItem}>
                <Image source = {rowData.icon} style = {styles.image}/>
                <View style={styles.data}>
                  <Text style= {styles.title} > 
                    {rowData.text}
                  </Text>
                  <Text style={styles.info}>
                    {rowData.location}
                  </Text>
                  <View style={styles.price}>
                    <Text style={styles.info}>
                      Preço: {rowData.price}
                    </Text>
                  </View>
                </View>
                <Image source={Images.fullStarIcon} style= {styles.star}/>
            </View>
        </TouchableOpacity>
        
    )
  }

  render () {
    
    return (
      <Container>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            />
      </Container>
    )
  }
}


