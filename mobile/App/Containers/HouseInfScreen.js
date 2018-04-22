import React, { Component } from 'react'
import { Image, View, Alert } from 'react-native'
import { Images } from '../Themes'

// Native Base
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Container,Segment, Header, Left, Right, Body, Title, Content, Text, Button, Fab, Icon, ActionSheet } from 'native-base'

// Styles
import styles from './Styles/HouseInfScreenStyles'

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
          area: "",
          price: "",
          tipology: "",
          energy: "none",
          adress: "",
          zone: "",
          condition: "",
          description: "",
   };
  }

  /*
  ------------ Start RN communication with /server/api/src/api/routes/v1/index.js ------------
  */
  componentDidMount(id) {  

    fetch("http://192.168.1.6:3000/v1/house/5add15005f9c61552a848bfc")
    .then(function(response){
       return response.json();
   })
   .then(responseJson => {
      
       this.setState({
            area: responseJson.area,
            price: responseJson.price,
            tipology: responseJson.tipology,
            energy: responseJson.energyCertificate,
            adress: responseJson.adress,
            bathrooms: responseJson.bathrooms,
            zone: responseJson.zone,
            condition: responseJson.condition,
            description: responseJson.description
       });
      
   })
   .catch(function(json) {
       Alert.alert("DEU ERRO");
   })
  }

  render () {
    return (
      <Container>
        <Header style={styles.headerBG}>
          <Left>
            <Button transparent onPress={this.componentDidMount}>
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
            <Text style={styles.priceText}> {this.state.price} </Text>
            <Text  style={styles.typeText} >House Rent</Text>
          </View>

          <View style={styles.box1}>
            <View style={{flex:0.8}}>
                <Text style={styles.streetText}> {this.state.zone} </Text>
            </View>
            <View style={{flex:0.1}}> 
              <Image  source={Images.gps} style={{ marginLeft:8, width:32,height:30}}/>
            </View>      
          </View>

          <View style={styles.box1}>
            <View style={{ flex:0.5}}> 
              <Text style={styles.properties}>Area: </Text>
              <Text style={styles.properties}>Bathrooms: </Text>
              <Text style={styles.properties}>Certificado Ener: </Text>
              <Text style={styles.properties}>Tipologia: </Text>
              <Text style={styles.properties}>Condições: </Text>
            </View>

            <View style={{ flex:0.5}}> 
              <Text style={styles.data}> {this.state.area} </Text>
              <Text style={styles.data}>{this.state.bathrooms}</Text>
              <Text style={styles.data}>{this.state.energy}</Text>
              <Text style={styles.data}>{this.state.tipology}</Text>
              <Text style={styles.data}>{this.state.condition}</Text>
            </View>
          </View>

          <View style={styles.box2}>
            <View>
              <Text style={styles.descriptionTitle}> Description </Text>
              <Text style={styles.descriptionText}> {this.state.description} </Text>
            </View> 
          </View>

        </Content>
      </Container>
    )
  }
}
