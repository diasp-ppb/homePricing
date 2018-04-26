import React, { Component } from 'react';
import { StyleSheet , View} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import {Button, Container, Content, Picker, Icon, Input, Item} from 'native-base'


export default class GpsScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      region: {
        latitude: 41.1743667,
        longitude:-8.58457610000005,
        latitudeDelta: 0.0050,
        longitudeDelta: 0.0025,
      }
    }

  }

  componentDidMount() {

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.setState()
      },
      (error) => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }


  focusOnLocation() {
    let region = {... this.state.region};
    region.latitude = this.state.latitude;
    region.longitude = this.state.longitude

    this.setState({region});

  }



  render() {
    return (
      <Container>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={this.state.region}
        showsUserLocation={true}
        showsScale={true}
      />
        <View>
          <Button onPress={() => this.focusOnLocation()}>
            <Icon android={"md-locate"}/>
          </Button>
        </View>
      </Container>




    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }

});
