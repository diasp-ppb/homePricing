import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Images } from '../Themes'

// Native Base
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Body, Title, Content, Text, Button, Fab, Icon, ActionSheet } from 'native-base'

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
      
        <View>
          {/*<Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />*/} 
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

      </Container>
    )
  }
}
