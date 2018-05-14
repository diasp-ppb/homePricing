import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  topRow: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomRow: {
    flex: 0.5,
    alignItems: 'center'
  },
  homePricing: {
    width: '70%',
    height: '22%',
    marginTop: -40
  },
  signUp: {
    marginTop: 15,
    color: 'white'
  },
  link: {
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  button: {
    justifyContent: 'center',
    elevation: 60,
    backgroundColor: '#046A38',
    borderRadius: 20,
    opacity: 0.92,
    marginBottom: 10
  },
  headerStyle: {
    elevation: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0
  }
})
