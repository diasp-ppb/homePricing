import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  address: {
    color: 'gray',
    fontSize: 13.5
  },
  info: {
    fontSize: 15,
    color: 'black'
  },
  segment: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a'
  },
  btn: {
    opacity: 0.92,
    borderRadius: 5,
    backgroundColor: '#046A38'
  },
  btnSlct: {
    opacity: 0.92,
    borderRadius: 5,
    backgroundColor: '#43B02A'
  },
  headerStyle: {
    top: 0,
    left: 0,
    right: 0,
    elevation: 0,
    position: 'absolute',
    backgroundColor: 'transparent'
  }
})
