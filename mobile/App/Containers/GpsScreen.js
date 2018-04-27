import React, { Component } from 'react';
import GpsMap from '../Components/GPSMap';

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
      markers: [{
        latlong: {
          latitude: 41.1743668,
          longitude: -8.58457610000005,
        },
        amount: 40000,
        moreInfo: false,
      }],
    };

    this.addMoreMarkers = this.addMoreMarkers.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
    this.focusOnLocation = this.focusOnLocation.bind(this);
  }

  componentDidMount() {

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.setState();
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


  focusOnLocation() {
    if (this.state.latitude != null || this.state.latitude != null) {
      const region = { ...this.state.region };
      region.latitude = this.state.latitude;
      region.longitude = this.state.longitude;
      this.setState({ region });
    }
  }

  addMoreMarkers() {
    // Query to request more markers
  }


  moreInfo(marker) {
    const markers = this.state.markers;
    markers[marker].moreInfo = !markers[marker].moreInfo;
    this.setState({
      markers,
    });
  }


  render() {

    const { navigate } = this.props.navigation;

    return (
      <GpsMap
        region={this.state.region}
        showsUserLocation={true}
        addMoreMarkers={this.addMoreMarkers}
        markers={this.state.markers}
        navigate={navigate}
        moreInfo={this.moreInfo}
        focusOnLocation={this.focusOnLocation}
      />
    );
  }
}

