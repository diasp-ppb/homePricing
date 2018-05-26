import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Container, Icon, Text } from 'native-base';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import GpsMarker from './GpsMarker';

import { Metrics } from '../Themes';
import Colors from '../Themes/Colors';


export default class GpsMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      region, showUserLocation, addMoreMarkers, navigate, houses, moreInfo, focusOnLocation,
    } = this.props;
    return (
      <Container>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
          showsUserLocation={showUserLocation}
          onRegionChangeComplete={(newRegion) => addMoreMarkers(newRegion)}
          loadingEnabled
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
        >
          {
            houses.map((house, i) => (
              <Marker
                coordinate={{
                  latitude: parseFloat(house.coordinates[0]),
                  longitude: parseFloat(house.coordinates[1]),
                }}
                key={i}
                onPress={() => moreInfo(i)}
              >
                <GpsMarker
                  title={house.title}
                  amount={house.price}
                  moreInfo={house.moreInfo}
                  image={house.images[0]}
                />
                <Callout style={styles.callout} onPress={() => navigate('HouseInformation', { house })}>
                  <Text style={{ fontSize: 13 }}>Mais detalhes</Text>
                </Callout>


              </Marker>
            ))
          }
        </MapView>
          <View>
            <TouchableOpacity
              style={{
                borderWidth: 0,
                marginTop: '90%',
                marginLeft: 10,
                backgroundColor: Colors.colors.transparent,
                borderColor: Colors.transparent,
                width: 50,
              }}
              onPress={() => focusOnLocation()}
            >
              <Icon
                ios="ios-menu"
                android="md-locate"
                style={{ color: Colors.blue6, borderColor: Colors.transparent }}
                size={Metrics.icons.medium}
              />
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
    width: 90,
    height: 25,
  },
});
