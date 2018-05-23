import React, { Component } from 'react';
import GpsMap from '../Components/GPSMap';
import { baseURL } from '../Services/Api';

export default class GpsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Mapa',
  });
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      region: {
        latitude: 41.1743667,
        longitude: -8.58457610000005,
        latitudeDelta: 0.0050,
        longitudeDelta: 0.0025,
      },
      houses: [],
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


  render() {
    const { navigate } = this.props.navigation;

    return (
      <GpsMap
        region={this.state.region}
        showsUserLocation
        addMoreMarkers={this.addMoreMarkers}
        navigate={navigate}
        moreInfo={this.moreInfo}
        focusOnLocation={this.focusOnLocation}
        houses={this.state.houses}
      />
    );
  }
}

