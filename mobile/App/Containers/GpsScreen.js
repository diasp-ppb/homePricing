import React, { Component } from 'react';
import { StyleSheet , View, TouchableOpacity} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import {Container, Icon, Text} from 'native-base'
import Colors from '../Themes/Colors'
import {Metrics} from "../Themes";
import GpsMarker from '../Components/GpsMarker'

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
        longitude:-8.58457610000005,
        latitudeDelta: 0.0050,
        longitudeDelta: 0.0025,
      },
      markers: [{
        latlong: {
          latitude: 41.1743668,
          longitude: -8.58457610000005
        },
        amount: 40000,
        moreInfo: false
      }]
    };

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
    if(this.state.latitude != null || this.state.latitude != null) {
      let region = {...this.state.region};
      region.latitude = this.state.latitude;
      region.longitude = this.state.longitude
      this.setState({region});
    }
  }

  addMoreMarkers() {
    //Query to request more markers
  }


  moreInfo(marker) {
    let markers = this.state.markers;
    markers[marker].moreInfo = !markers[marker].moreInfo;
    this.setState({
      markers
    })
  }





  render() {
    const { navigate } = this.props.navigation

    return (
      <Container>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={this.state.region}
          showsUserLocation={true}
          onRegionChange={() => this.addMoreMarkers()}
          loadingEnabled
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
        >
          {
            this.state.markers.map((marker,i) => (
              <Marker
                coordinate={marker.latlong}
                key={i}
                onPress={() => this.moreInfo(i)}
              >
                <GpsMarker
                  amount={marker.amount}
                  moreInfo={marker.moreInfo}
                />

                <Callout style={styles.callout} onPress={()=> navigate('HouseInformation',{id: "asdasdqwdqwdq"})}>
                  <Text>Press me</Text>
                </Callout>

              </Marker>
            ))
          }
        </MapView>
        <View>
          <TouchableOpacity style={{borderWidth: 0,marginTop: 440, marginLeft: 10, backgroundColor: Colors.colors.transparent, borderColor: Colors.transparent} }
                            onPress={() => this.focusOnLocation()}
          >
            <Icon ios='ios-menu' android="md-locate"  style={{color: Colors.blue6, borderColor: Colors.transparent}} size={Metrics.icons.medium}/>
          </TouchableOpacity>
        </View>
      </Container>




    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  callout: {
    width: 60,
    height:20
  }

});
