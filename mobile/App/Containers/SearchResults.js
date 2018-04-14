import { Images } from '../Themes'
import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'

// Native Base
import { Container, Header, Left, Right, Body, Title, Content, Button, Text, Icon, Item, Input, Segment, Card, CardItem } from 'native-base'

// Styles
import styles from './Styles/SearchResultsStyles'

// TODO: Fill in data array
let res = []
for (let i = 0; i < 10; i++) {
  res[i] = {
    numComm: 125 + i,
    price: '10.000€',
    address: 'Address #' + i,
    description: 'House #' + i,
    imageURL: 'https://appsisecommerces3.s3.amazonaws.com/clientes/cliente7884/produtos/17230/Z21454090411.jpg'
  }
}

// Component
export default class LaunchScreen extends Component {
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
              res.map((item, index)=>{
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
