import React, { Component } from 'react'
import { View, Image } from 'react-native'

// Native Base
import { Container, Content, Card, CardItem, Body, Button, Text, Icon, Left } from 'native-base'

// Styles
import styles from './Styles/PreferencesScreenStyles'
import {baseURL} from "../Services/Api";

// Component
export default class LaunchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  // This component's constructor
  constructor (props) {
    super(props);
    this.state = {
      houses: [],
    };
  }

  // Fetch data here
  componentDidMount () {
    fetch(baseURL + "/v1/houses")
      .then(function (response) {
        return response.json();
      })
      .then(responseJson => {
        this.setState({ houses: responseJson });
      })
      .catch(function (json) {
        console.error(json)
      })
  }

  // Clear data here
  componentWillUnmount () {
    this.setState({ houses: [] })
  }

  // Render the screen
  render () {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content padder>
          <View style={{ marginBottom: 20 }}>
            {
              this.state.houses.map((item, index) => {
                return (
                  <Card key={index} style={{ flex: 1 }}>
                    <CardItem button onPress={() => navigate('HouseInformation', { house: item })}>
                      <Left>
                        <Body>
                          <Text>{item.title}</Text>
                          <Text style={styles.address}>
                            <Icon ios="ios-pin" android="md-pin" style={styles.address} /> {item.address.zipcode}, {item.address.town}, {item.address.county}
                          </Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      <Image
                        source={{ uri: item.images[0] }}
                        style={{ height: 200, width: null, flex: 1 }}
                      />
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Text style={styles.info}>
                          <Icon ios="ios-cash" android="md-cash" style={styles.info} /> {item.price} €
                        </Text>
                      </Left>
                    </CardItem>
                  </Card>
                )
              })
            }
          </View>
        </Content>
      </Container>
    )
  }
}
