import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Images } from '../Themes'

// Native Base
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Left, Right, Body, Title, Content, Text, Button, Fab, Icon, ActionSheet } from 'native-base'

// Styles
import styles from './Styles/HouseInfScreenStyles'


export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Container>
        <Header style={styles.headerBG}>
          <Left>
            <Button transparent>
              <Text>
                <Icon style={styles.arrow} ios={'ios-arrow-back'} android={'md-arrow-back'} />
              </Text>
            </Button>
          </Left>
          <Body>
            <Title style={styles.pageTitle}>House Information</Title>
          </Body>
        </Header>
        <Content>
          <Image  source={Images.house}/>

           <View style={styles.infTab}>
            <Text style={styles.priceText}> 655,00$</Text>
            <Text  style={styles.typeText} >House Rent</Text>
          </View>

          <View style={styles.box1}>
            <View style={{flex:0.8}}>
                <Text style={styles.streetText}> Rua Margarida, 1234-234, Porto </Text>
            </View>
            <View style={{flex:0.1}}> 
              <Image  source={Images.gps} style={{ marginLeft:8, width:32,height:30}}/>
            </View>      
          </View>

          <View style={styles.box2}>
            <View style={{ flex:0.5}}> 
              <Text style={styles.properties}>Area: </Text>
              <Text style={styles.properties}>Certificado Ener: </Text>
              <Text style={styles.properties}>Bathrooms: </Text>
              <Text style={styles.properties}>Condições: </Text>
            </View>

            <View style={{ flex:0.5}}> 
              <Text style={styles.data}>45m² </Text>
              <Text style={styles.data}>A</Text>
              <Text style={styles.data}>3</Text>
              <Text style={styles.data}>Rented</Text>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}
