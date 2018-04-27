import React from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

const propTypes = {
  amount: PropTypes.number.isRequired,
  fontSize: PropTypes.number,
};

const defaultProps = {
  fontSize: 13,
};

class GpsMarker extends React.Component {



  render() {
    const { fontSize, amount, moreInfo } = this.props;

    const renderSelector = moreInfo ?
      (
        <View style={styles.container}>
          <View style={styles.bubble}>
            <Image
              style={styles.image}
              source={{uri: "https://upload.wikimedia.org/wikipedia/commons/3/33/F-Am%C3%A9ricas.png"}}
            />
          </View>
        </View>
      )
      :
      (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <Text style={styles.dollar}>€</Text>
          <Text style={[styles.amount, { fontSize }]}>{amount}</Text>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
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
    backgroundColor: '#FF5A5F',
    padding: 2,
    borderRadius: 3,
    borderColor: '#D23F44',
    borderWidth: 0.5,
  },
  dollar: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#FF5A5F',
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#D23F44',
    alignSelf: 'center',
    marginTop: -0.5,
  },
  image: {
    width: 100,
    height: 120,
  }
});

export default GpsMarker;
