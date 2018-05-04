import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Images } from '../Themes';
import ImageSlider from 'react-native-image-slider';
// Native Base

import { Container, Content, Text } from 'native-base';
// Styles
import styles from './Styles/HouseInfScreenStyles';

export default class LaunchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Informação da casa',
  });


  render() {
    const { navigation } = this.props;

    const house = navigation.state.params.house;

    return (house !== undefined) ? (
          <Container>
            <Content>

              <ImageSlider style={{ width: '100%', height: 200 }} images={house.images} />

              <View style={styles.infTab}>
                <Text style={styles.priceText}> {house.price} </Text>
                <Text style={styles.typeText} >House Rent</Text>
              </View>

              <View style={styles.box1}>
                <View style={{ flex: 0.8 }}>
                  <Text style={styles.streetText}> {house.zone} </Text>
                </View>
                <View style={{ flex: 0.1 }}>
                  <Image source={Images.gps} style={{ marginLeft: 8, width: 32, height: 30 }} />
                </View>
              </View>

              <View style={styles.box1}>
                <View style={{ flex: 0.5 }}>
                  <Text style={styles.properties}>Area: </Text>
                  <Text style={styles.properties}>Bathrooms: </Text>
                  <Text style={styles.properties}>Certificado Ener: </Text>
                  <Text style={styles.properties}>Tipologia: </Text>
                  <Text style={styles.properties}>Condições: </Text>
                </View>

                <View style={{ flex: 0.5 }}>
                  <Text style={styles.data}> {house.area} </Text>
                  <Text style={styles.data}>{house.bathrooms}</Text>
                  <Text style={styles.data}>{house.energy}</Text>
                  <Text style={styles.data}>{house.tipology}</Text>
                  <Text style={styles.data}>{house.condition}</Text>
                </View>
              </View>

              <View style={styles.box2}>
                <View>
                  <Text style={styles.descriptionTitle}> Description </Text>
                  <Text style={styles.descriptionText}> {house.description} </Text>
                </View>
              </View>
            </Content>
          </Container>
    ) : (null);
  }
}
