import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Button } from 'react-native';
import { Images } from '../Themes';
import ImageSlider from 'react-native-image-slider';
import { baseURL, createFavoriteAPI, deleteFavoriteAPI } from "../Services/Api";
// Native Base

import { Container, Content, Text } from 'native-base';
// Styles
import styles from './Styles/HouseInfScreenStyles';
import HouseInfScreenStyles from './Styles/HouseInfScreenStyles';

export default class LaunchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Informação da casa',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.handleClick()}>
            <Image source={navigation.state.params.favorite ? Images.greenStar : Images.greenStarLines}  style={styles.star} />
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props)
    this.state = {
      favorite: false
    }
  }

  componentDidMount() {
    let id = "5ae75668eb94fe001dfc20da",
        token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjY2NDUyMTIsImlhdCI6MTUyNjY0MTYxMiwic3ViIjoiNWFlNzU2NjhlYjk0ZmUwMDFkZmMyMGRhIn0.8cWrJXkdTwqSmGtEi08XYqH6vh9zgVT4A6rYVOQ3tWI",
        houseId = this.props.navigation.state.params.house.id;
    this.props.navigation.setParams({handleClick: this.changeFavorite});
    this.isFavorite(id, token, houseId);
  }

  changeFavorite = () => {
    let id = "5ae75668eb94fe001dfc20da",
        token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjY2NDUyMTIsImlhdCI6MTUyNjY0MTYxMiwic3ViIjoiNWFlNzU2NjhlYjk0ZmUwMDFkZmMyMGRhIn0.8cWrJXkdTwqSmGtEi08XYqH6vh9zgVT4A6rYVOQ3tWI",
        houseId = this.props.navigation.state.params.house.id;
    let aux = false;
    if (this.state.favorite) {
      aux = false;
      deleteFavoriteAPI(id, houseId,token);
    } else {
      aux = true;
      createFavoriteAPI(id, houseId,token);
    }
    this.props.navigation.setParams({favorite: aux});
    this.setState({ favorite : aux , handleClick: this.changeFavorite});
  }

  async isFavorite(id, token, houseId) {
    var auth = 'Bearer ' + token;
    try {
      let response = await fetch(baseURL + "/v1/favorites", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': auth
        },
        body: JSON.stringify({
          userId: id
        }),
      });
      let responseJson = await response.json();      
      for(let i = 0; i < responseJson.length; i++){
        if(responseJson[i].houseId == houseId){
          this.setState({ favorite: true });
          this.props.navigation.setParams({favorite: true, handleClick: this.changeFavorite});
          return;
        }
        this.props.navigation.setParams({favorite: false, handleClick: this.changeFavorite});
      }
      return;
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { navigation } = this.props;
    const house = navigation.state.params.house;
    const undefined = "Não definido";
    const images = (house.images.length > 0) ? house.images : ["https://www.glassyconnections.com/images/no-image-available-lrg.jpg"];
    return (
      <Container>
        <Content>

          <ImageSlider style={{ width: '100%', height: 200 }} images={images} />

          <View style={styles.infTab}>
            <Text style={styles.priceText}> {house.price}€ </Text>
            <Text style={styles.typeText}>House Rent</Text>
          </View>

          <View style={styles.box1}>
            <View style={{ flex: 0.8 }}>
              <Text style={styles.streetText}>
                {house.address.zipcode}, {" "}
                {house.address.town}, {" "}
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
                return <Text key={index} style={styles.descriptionText}> {item} </Text>
              })}
              {house.characteristics.length == 0 && <Text style={styles.descriptionText}> {undefined} </Text>}
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
