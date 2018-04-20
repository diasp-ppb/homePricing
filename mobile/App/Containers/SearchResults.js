import { Images } from '../Themes'
import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'

import Api from '../Services/SauceApi'

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
    // Api.getHouses((res) => this.setState({ houses: res.data }))
  }

  // Clear data here
  componentWillUnmount () {
    this.setState({ houses: [] })
  }

  // Render the screen
  render () {
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
                    <CardItem>
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
