import React from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Text,
  ImageBackground
} from 'react-native';

import { Icon }  from 'native-base';
import Colors from '../Themes/Colors';


const propTypes = {
  amount: PropTypes.number.isRequired,
  fontSize: PropTypes.number,
};

const defaultProps = {
  fontSize: 13,
};

class GpsMarker extends React.Component {



  render() {
    const { fontSize, amount, moreInfo, image } = this.props;

    const renderSelector = moreInfo ?
      (
        <View style={styles.container}>
          <View style={styles.bubble}>
            <ImageBackground
              style={styles.image}
              source={{uri: image}}
            >
              <View style={styles.textcontainer}>
                <Text style={styles.streetText}>{amount} €</Text>
                <Text style={styles.streetText}>Escritorio, Vila Do Conde</Text>
              </View>
            </ImageBackground>

          </View>
        </View>
      )
      :
      (
      <View style={styles.container}>
        <Icon
          ios='ios-pin'
          android="md-pin"
          style={{color: Colors.green4}}
        />
      </View>
    )
    return renderSelector;
  }
}

GpsMarker.propTypes = propTypes;
GpsMarker.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 2,
    borderRadius: 3,
    borderWidth: 0.5,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  image: {
    width: 120,
    height: 80,
  },
  textcontainer: {
    marginTop: 30,
    backgroundColor: Colors.white,
    opacity:0.80
  },
  streetText:{
    fontSize:13 ,
    color: Colors.black
  }
});

export default GpsMarker;
