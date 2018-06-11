import React, { Component } from 'react';
import GpsMap from '../Components/GPSMap';
import { baseURL } from '../Services/Api';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Fab, Container, Icon, View, Text } from 'native-base';

import styles from './Styles/GpsScreenStyles'

export default class GpsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Mapa'
  });

  constructor(props) {
    super(props);

    this.state = {
      getAvgData: false,
      avgPrice: null,
      latitude: null,
      longitude: null,
      error: null,
      region: {
        latitude:  41.1743667,
        longitude: -8.58457610000005,
        latitudeDelta: 0.0050,
        longitudeDelta: 0.0025,
      },
      houses: [],
      activeModal: '',
      modalVisible: false,
      description: 'Local com criminalidade reduzida'
                  + '\nTemperatura média: 22ºC'
                  + '\nShopping e Hospitais na zona'
                  + '\nTransportes e Metro'
    };

    this.addMoreMarkers = this.addMoreMarkers.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
    this.focusOnLocation = this.focusOnLocation.bind(this);
    this.getMarkerOnLocation = this.getMarkerOnLocation.bind(this);
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.focusOnLocation();
        this.getMarkerOnLocation(this.state.latitude, this.state.longitude);
      },
      (error) => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  getMarkerOnLocation() {
    fetch(`${baseURL}/v1/houses/findbygps`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: this.state.region.latitude,
        longitude: this.state.region.longitude,
        latitudeDelta: this.state.region.latitudeDelta,
        longitudeDelta: this.state.region.longitudeDelta,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((houses) => {
        const newhouses = houses;
        for (let i = 0; i < newhouses.length; i++) {
          const house = newhouses[i];
          house.moreInfo = false;
        }
        this.setState({ houses: newhouses });
      })
      .catch((json) => {
        console.error(json);
      });
  }


  focusOnLocation() {
    if (this.state.latitude != null || this.state.latitude != null) {
      const region = { ...this.state.region };
      region.latitude = this.state.latitude;
      region.longitude = this.state.longitude;
      this.setState({ region });
    }
  }

  addMoreMarkers(region) {
    this.setState({ region });
    this.getMarkerOnLocation();
  }


  moreInfo(house) {
    const houses = this.state.houses;
    houses[house].moreInfo = !houses[house].moreInfo;
    this.setState({ houses });
  }

  activateModal(modal) {
    this.setState({ activeModal: modal })
    this.setState({ modalVisible: true })

    if (modal === 'avg') {
      this.getAvgPrice('Porto', 'Porto');
    }
  }

  deactivateModal() {
    this.setState({ activeModal: '' })
    this.setState({ modalVisible: false })
  }

  handleModal(modal) {
    if (this.state.modalVisible === true && this.state.activeModal === modal) {
      this.deactivateModal()
    } else if (this.state.modalVisible === true && this.state.activeModal !== modal) {
      this.setState({ activeModal: modal })
    } else if (this.state.modalVisible === false) {
      this.activateModal(modal)
    }
  }

  async getAvgPrice(district, county) {
    let url = `${baseURL}/v1/houses/average/${district}&${county}`;
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      params: {
        district: district,
        county: county
      },
    });
    let responseJson = await response.json();
    let avgPrice = Math.round(responseJson[0].avgAmount * 100) / 100;
    this.setState({ avgPrice : avgPrice});
  }

  renderModal() {
    return (
      <TouchableWithoutFeedback onPress={() => this.deactivateModal()}>
        <View style={StyleSheet.absoluteFill}>
          <View style={styles.overlay}></View>
          <View style={styles.modal}>
            <Text style={styles.title}>
              {(this.state.activeModal === 'info') ? 'Informação da Área' : 'Preço Médio'}
            </Text>
            <View style={styles.separator}></View>
            {(this.state.activeModal === 'info') ?
              <Icon ios={'ios-information'} android={'md-information'} style={styles.icon} />
              :
              <Icon ios={'ios-bulb'} android={'md-bulb'} style={styles.icon} />
            }
            <Text style={styles.location}>
              <Icon ios={'ios-pin'} android={'md-pin'} style={{ color: 'white', fontSize: 20 }} /> Porto, Porto
          </Text>
            {(this.state.activeModal === 'info') ?
              <Text style={styles.description}>{this.state.description}</Text>
              :
              <Text style={styles.price}>{this.state.avgPrice} €/m²</Text>
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <GpsMap
          region={this.state.region}
          showUserLocation={true}
          addMoreMarkers={this.addMoreMarkers}
          navigate={navigate}
          moreInfo={this.moreInfo}
          focusOnLocation={this.focusOnLocation}
          houses={this.state.houses}
        />
        <Fab
          position="bottomLeft"
          style={{ backgroundColor: '#046A38' }}
          onPress={() => this.activateModal('info')}>
          <Icon ios={'ios-information'} android={'md-information'} />
        </Fab>
        <Fab
          position="bottomRight"
          style={{ backgroundColor: '#046A38' }}
          onPress={() => this.activateModal('avg')}>
          <Icon ios={'ios-bulb'} android={'md-bulb'} />
        </Fab>
        {(this.state.modalVisible === true) ? this.renderModal() : null}
      </Container>
    );
  }
}

