import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flex: 0.33,
    alignItems: 'center',
    justifyContent: 'center'
  },
  txt: {
    fontSize: 13,
    color: 'white',
    elevation: 3,
    padding: 15,
    textShadowColor: 'black',
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 10
  },
  icon: {
    color: 'white',
    marginHorizontal: 5,
    paddingHorizontal: 5
  },
  btn: {
    height: 60,
    elevation: 60,
    opacity: 0.92,
    marginBottom: 10,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: '#046A38'
  },
  homePricing: {
    width: '70%',
    height: '22%'
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})