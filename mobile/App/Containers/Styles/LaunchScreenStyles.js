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
    color: 'white',
    marginBottom: 10
  },
  icon: {
    color: 'white',
    marginHorizontal: 5,
    paddingHorizontal: 5
  },
  btn: {
    elevation: 60,
    opacity: 0.92,
    marginBottom: 15,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#046A38'
  },
  homePricing: {
    width: '70%',
    height: '22%',
    marginTop: -40
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
