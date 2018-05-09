import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Images } from '../Themes';
import ImageSlider from 'react-native-image-slider';
// Native Base

import { Container, Content, Text } from 'native-base';
// Styles
import styles from './Styles/HouseInfScreenStyles';
import HouseInfScreenStyles from './Styles/HouseInfScreenStyles';

export default class LaunchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Informação da casa',
  });

  render() {
    const { navigation } = this.props;
    const house = navigation.state.params.house;
    const undefined = "Não definido";

    return (
      <Container>
        <Content>

          <ImageSlider style={{ width: '100%', height: 200 }} images={house.images} />

          <View style={styles.infTab}>
            <Text style={styles.priceText}> {house.price}€ </Text>
            <Text style={styles.typeText}>House Rent</Text>
          </View>

          <View style={styles.box1}>
            <View style={{ flex: 0.8 }}>
              <Text style={styles.streetText}>
                {house.address.zipcode},
                {house.address.town},
                {house.address.county} </Text>
            </View>
            <View style={{ flex: 0.1 }}>
              <Image source={Images.gps} style={{ marginLeft: 8, width: 32, height: 30 }} />
            </View>
          </View>

          <View style={styles.box1}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.properties}>Área: </Text>
              <Text style={styles.properties}>WCs: </Text>
              <Text style={styles.properties}>Certificado Ener: </Text>
              <Text style={styles.properties}>Tipologia: </Text>
              <Text style={styles.properties}>Condições: </Text>
            </View>

            <View style={{ flex: 0.5 }}>
              <Text style={styles.data}>{house.area || undefined} </Text>
              <Text style={styles.data}>{house.bathrooms || undefined}</Text>
              <Text style={styles.data}>{house.energyCertificate || undefined}</Text>
              <Text style={styles.data}>{house.tipology || undefined}</Text>
              <Text style={styles.data}>{house.condition || undefined}</Text>
            </View>
          </View>

          <View style={styles.box2}>
            <View>
              <Text style={styles.descriptionTitle}> Descrição </Text>
              <Text style={styles.descriptionText}> {house.description} </Text>
            </View>
          </View>

          <View style={styles.box2}>
            <View>
              <Text style={styles.descriptionTitle}> Caraterísticas </Text>
              {house.characteristics.length != 0 && house.characteristics.map(function (item, index) {
                return <Text  key={index} style={styles.descriptionText}> {item} </Text>
              })}
              {house.characteristics.length == 0 && <Text style={styles.descriptionText}> {undefined} </Text>}
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
