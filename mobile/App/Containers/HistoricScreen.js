import { Images } from '../Themes'
import React, { Component } from 'react'
import { View, Image,Alert, TouchableOpacity, StyleSheet } from 'react-native'
import Grid from 'react-native-grid-list'


// Native Base
import { Container, Header, Left, Right, Body, Title, Content, Button, Text, Icon, Item, Input, Segment, Card, CardItem } from 'native-base'

// Styles
import temp from './Styles/HistoricScreenStyles'
import {baseURL} from "../Services/Api";

// Component
export default class LaunchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Historic',
  });

  // This component's constructor
  constructor (props) {
    super(props)
    this.state = {
      houses: [],
      data: [ 1, 2, 3,6 ]
    }
  }

  // Fetch data here
  componentDidMount () {
    fetch(baseURL + "/v1/houses")
      .then(function (response) {
        return response.json();
      })
      .then(responseJson => {
        this.setState({ houses: responseJson });
        Alert.alert(JSON.stringify(responseJson) )
      })
      .catch(function (json) {
        console.error(json)
      })
  }

  // Clear data here
  componentWillUnmount () {
    this.setState({ houses: [] })
  }

  renderItem ({ item, index }) {
    return (
      <View  style={styles.item}> </View>

    )
  }

  render () {
    return (
      <Container>
        <Content padder>
          <View style={styles.container}>
            <Grid
              showSeparator
              data={this.state.data}
              numColumns={2}
              renderItem={this.renderItem}
            />


          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    flex: 1,
    height: 160,
    margin: 1
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
