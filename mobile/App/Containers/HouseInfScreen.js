import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Images } from '../Themes'

// Native Base
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Left, Right, Body, Title, Content, Text, Button, Fab, Icon, ActionSheet } from 'native-base'

// Styles
import styles from './Styles/LaunchScreenStyles'
import stylesHouse from './Styles/HouseInfScreenStyles'


export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Text>back</Text>
            </Button>
          </Left>
          <Body>
            <Title>Home Pricing</Title>
          </Body>
        </Header>
        <Content>
          <Image  source={Images.house} style={styles.house}/>

           <View style={{ marginTop:-61, paddingLeft:18, paddingBottom:8, paddingTop:8, backgroundColor: 'white',opacity:0.55, elevation: 3 }}>
            <Text style={{paddingBottom:6, fontWeight:'bold', color:'black'}} > 655$</Text>
            <Text  style={{fontSize:12, color:'#262626'}} >House Rent</Text>
          </View>

          <View style={{ flex:1, flexDirection:'row', padding: 15, marginTop: 10, marginHorizontal: 10, backgroundColor: 'white', elevation: 3 }}>
            <View style={{flex:0.8}}>
                <Text style={{fontSize:14 , color: '#262626'}}> Rua Margarida, 1234-234, Porto </Text>
            </View>
            <View style={{flex:0.1}}> 
              <Image  source={Images.gps} style={{ marginLeft:8, width:32,height:30}}/>
            </View>      
          </View>

          <View style={{flexDirection:'row',  marginBottom: 15, flex:1, padding: 15, marginTop: 10, marginHorizontal: 10, backgroundColor: 'white', elevation: 3 }}>
            <View style={{ flex:0.5}}> 
              <Text style={{padding:2,fontWeight:'bold' , color: '#262626'}}>Area: </Text>
              <Text style={{padding:2,fontWeight:'bold', color: '#262626'}}>Certificado Ener: </Text>
              <Text style={{padding:2,fontWeight:'bold', color: '#262626'}}>Bathrooms: </Text>
              <Text style={{padding:2,fontWeight:'bold', color: '#262626'}}>Condições: </Text>
            </View>

            <View style={{ flex:0.5}}> 
              <Text style={{padding:2 , color:'#8c8c8c'}}>45m² </Text>
              <Text style={{padding:2, color:'#8c8c8c'}}>A</Text>
              <Text style={{padding:2, color:'#8c8c8c'}}>3</Text>
              <Text style={{padding:2, color:'#8c8c8c'}}>Rented</Text>
            </View>
          </View>
        </Content>
        {/*<View>
          <Image  source={Images.house} style={styles.house}/>
        </View>
        
        <Row style={{ paddingLeft:10, paddingTop: 10, marginTop: -70, height:32, opacity:0.55,  backgroundColor: 'white' }}>
          <Col size={48}>
            <Text> 70 228€ </Text>
          </Col>
        </Row>

         <Row style={{ paddingLeft:10, paddingTop: 8, marginTop: 0, height:38, opacity:0.55,  backgroundColor: 'white' }}>
          <Col size={48}>
            <Text> Property</Text>
          </Col>
        </Row>

        <Row style={{ marginTop: 8, alignItems:'center', width:'90%', height:30, backgroundColor: 'red'  }}>
            <Col size={48}>    
              <Text>Login</Text>
            </Col>
        </Row>*/}
      </Container>
    )
  }
}
