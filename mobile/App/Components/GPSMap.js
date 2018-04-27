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
      region, showUserLocation, addMoreMarkers, navigate, markers, moreInfo, focusOnLocation,
    } = this.props;

    return (
      <Container>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          showsUserLocation={showUserLocation}
          onRegionChange={() => addMoreMarkers()}
          loadingEnabled
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
        >
          {
            this.props.markers.map((marker, i) => (
              <Marker
                coordinate={marker.latlong}
                key={i}
                onPress={() => moreInfo(i)}
              >
                <GpsMarker
                  amount={marker.amount}
                  moreInfo={marker.moreInfo}
                />

                <Callout style={styles.callout} onPress={() => navigate('HouseInformation', { id: 'asdasdqwdqwdq' })}>
                  <Text>Press me</Text>
                </Callout>

              </Marker>
            ))
          }
        </MapView>
        {showUserLocation ? (
          <View>
            <TouchableOpacity
              style={{
            borderWidth: 0,
            marginTop: 440,
            marginLeft: 10,
            backgroundColor: Colors.colors.transparent,
            borderColor: Colors.transparent,
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
        ) : (null)
         }
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
    height: 20,
  },

});
