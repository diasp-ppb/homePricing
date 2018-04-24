import { Images } from '../Themes'
import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'


// Native Base
import { Container, Header, Left, Right, Body, Title, Content, Button, Text, Icon, Item, Input, Segment, Card, CardItem } from 'native-base'

// Styles
import styles from './Styles/SearchResultsStyles'

// Component
export default class LaunchScreen extends Component {
  // This component's constructor
  constructor (props) {
    super(props)
    this.state = {
      houses: []
    }
  }

  // Fetch data here
  componentDidMount () {
    fetch("http://172.30.8.202:3000/v1/houses")
      .then(function (response) {
        return response.json();
      })
      .then(responseJson => {
        this.setState({ houses: responseJson });
      })
      .catch(function (json) {
        //TODO tratar erro
      })
  }

  // Clear data here
  componentWillUnmount () {
    this.setState({ houses: [] })
  }

  // Render the screen
  render () {

    const { navigate } = this.props.navigation


    return (
      <Container>
        <Header searchBar rounded hasSegment>
          <Item>
            <Icon ios={'ios-search'} android={'md-search'} />
            <Input placeholder="Pesquisar Anúncios" />
          </Item>
        </Header>
        <Segment>
          <Button first active>
            <Text>Lista</Text>
          </Button>
          <Button last>
            <Text>Mapa</Text>
          </Button>
        </Segment>
        <Content padder>
          <View style={{ marginBottom: 20 }}>
            {
              this.state.houses.map((item, index) => {
                return (
                  <Card key={index}>
                    <CardItem button onPress={() => navigate('HouseInfScreen',{id: item.id })}>
                      <Left>
                        <Body>
                          <Text>{item.description}</Text>
                          <Text style={styles.address}>
                            <Icon ios={'ios-pin'} android={'md-pin'} style={styles.address} /> {item.address}
                          </Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      <Image source={{ uri: item.imageURL }} style={{ height: 200, width: null, flex: 1 }}/>
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
