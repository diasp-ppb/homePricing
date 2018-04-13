import { Images } from '../Themes'
import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'

// Native Base
import { Container, Header, Body, Title, Content, Text, Icon, Item, Input, Segment, Button, List, ListItem } from 'native-base'

// Styles
import styles from './Styles/SearchResultsStyles'

// TODO: Fill in data array
let res = []
for (let i = 0; i < 10; i++) {
  res[i] = {
    address: 'Address #' + i,
    description: 'A house that ... # ' + i,
    imageURL: 'https://ava.epdonline.com.br/_arquivos_fck/escritorio-advogado.jpg'
  }
}

// Component
export default class LaunchScreen extends Component {
  render () {
    return (
      <Container>
        <Header searchBar rounded hasSegment>
          <Item>
            <Icon name="ios-search" />
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
        <Content>
          <List dataArray={res}
            renderRow={(item) =>
              <ListItem>
                <Image source={Images.logo} style={styles.thumbnail} />
                <Body>
                  <Text>{ item.description }</Text>
                  <Text note>{ item.address }</Text>
                </Body>
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    )
  }
}
