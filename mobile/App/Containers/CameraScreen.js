import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Image,
} from 'react-native';
import { Icon }  from 'native-base';
import { RNCamera } from 'react-native-camera';
import { baseURL } from '../Services/Api';
import Images from "../Themes/Images";


export default class CameraScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avg: 0,
      viewResult: false,
      latitude: null,
      longitude: null,
      ready: false,
      msg: 'A carregar...'
    };
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          ready: true,
        });
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
    if (this.state.latitude == null || this.state.longitude == null)
    {
      console.warn("not yet ready");
      return;
    }

    fetch(`${baseURL}/v1/houses/findbygps`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: 0.0125,
        longitudeDelta: 0.0125,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((houses) => {
        const newhouses = houses;
        let price = 0;
        let area = 0;
        for (let i = 0; i < newhouses.length; i++) {
          price += newhouses[i].price;
          area += newhouses[i].area;
        }
        if (price > 0) {
          price /= area;
          price /= newhouses.length;
        }

        this.setState({ avg: price, viewResult: true, ready: true });
      })
      .catch((json) => {
        console.error(json);
      });
  }



  setModalVisible(visible) {
    this.setState({ viewResult: visible });
  }

  async takePicture() {
    if (this.camera) {
      this.setState({ ready: false, msg: 'A calcular...' })
      setTimeout(() => {this.getMarkerOnLocation()}, 1000)
    }
  }

renderModal() {
  return (
    <TouchableWithoutFeedback onPress={() => this.setModalVisible(false)}>
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.overlay} />
        <Text style={styles.title}> {this.state.avg} €/m² </Text>
        <View style={styles.separator} />
        <Text style={styles.location}>
          Valor aproximado
        </Text>

      </View>

    </TouchableWithoutFeedback>
  );
}


render() {
  return (
    <View style={styles.container}>
      <RNCamera
        ref={(ref) => {
          this.camera = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        permissionDialogTitle="Permission to use camera"
        permissionDialogMessage="We need your permission to use your camera phone"
      />

      {(this.state.ready !== true) ?
        (
          <View style={StyleSheet.absoluteFill}>
            <View style={styles.overlay} />
            <Image source={Images.spinner} style={styles.spinner} />
            <Text style={styles.location}> {this.state.msg} </Text>
          </View>
        )
        :
        (
          (this.state.viewResult === false) ?
            (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity
                  onPress={this.takePicture.bind(this)}
                  style={styles.capture}
                >
                  <Icon ios="ios-camera" android="md-camera" />
                </TouchableOpacity>
              </View>
            )
            :
            (this.renderModal())
        )
      }

    </View>
  );
}
}

const x = (Dimensions.get('window').width - (Dimensions.get('window').width * 0.7)) / 2;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#ffffff',
    borderRadius: 60,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  modal: {
    left: x,
    top: 100,
    width: '70%',
    padding: 45,
    elevation: 40,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.5,
  },
  overlay: {
    top: 0,
    left: 0,
    opacity: 0.5,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'black',
  },
  location: {
    fontSize: 20,
    marginTop: 10,
    color: 'white',
    textAlign: 'center',
  },
  title: {
    marginTop: '30%',
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    opacity: 1,
  },
  spinner: {
    width: '70%',
    padding: 45,
    marginTop: '40%',
    alignSelf: 'center',
  }
});
