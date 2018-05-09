import { Images } from '../Themes'
import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'


// Native Base
import { Container, Header, Left, Right, Body, Title, Content, Button, Text, Icon, Item, Input, Segment, Card, CardItem } from 'native-base'

// Styles
import styles from './Styles/PreferencesScreenStyles'
import {baseURL} from "../Services/Api";
// Component
export default class LaunchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Preferences:',
  });

  // This component's constructor
  constructor (props) {
    super(props)
    this.state = {
      houses: []
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
                  /*<Card key={index}>
                    <CardItem button onPress={() => navigate('HouseInfScreen',{id: item.id })}>
                      <Left>
                        <Body>
                          <Text style={styles.address}>
                            <Icon ios={'ios-pin'} android={'md-pin'} style={styles.address} /> {item.address}
                          </Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      <Image source={{ uri: 'http://cdn.bracioroom.com/2016/05/18/indian-house-images-download-new-design-indian-house-hd-wallpapers-s-f561c74472fc5f74.jpg' }} style={{ height: 200, width: null, flex: 1 }}/>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Text style={styles.info}>
                          <Icon ios={'ios-cash'} android={'md-cash'} style={styles.info} /> {item.price}
                        </Text>
                      </Left>
                      <Right>
                        <Text style={styles.info}>
                          <Icon ios={'ios-chatbubbles'} android={'md-chatbubbles'} style={styles.info} /> {item.numComm}
                        </Text>
                      </Right>
                    </CardItem>
                  </Card>*/

                <View style={styles.box1} key={index} >
                  <View style={{ flex:0.5 , width:'90%' , height:100}} >
                    <Image source={{ uri: 'http://cdn.bracioroom.com/2016/05/18/indian-house-images-download-new-design-indian-house-hd-wallpapers-s-f561c74472fc5f74.jpg' }} style={{ height: 200, width: null, flex: 1 }}/>
                  </View>

                  <View style={{ flex:0.4}}>
                    <View style={{ flex:0.5}}>
                      <Text style={styles.address}>
                          <Icon ios={'ios-pin'} android={'md-pin'} style={styles.address} /> {item.address}
                      </Text>
                      <Text style={styles.money}> 
                          {item.price}
                      </Text>
                    </View>
                  </View>

                  <View style={{flex:0.18, marginTop: 22}} >      
                      <Button transparent onPress={() => navigate('HouseInfScreen',{id: item.id })}>
                        <Text>
                          <Icon style={{fontSize:20, color:'black'}} ios={'ion-ios-arrow-forward'} android={'md-arrow-forward'} />
                        </Text>
                      </Button>
                  </View>

                </View>


                )
              })
            }
          </View>
        </Content>
      </Container>
    )
  }
}
