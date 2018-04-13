import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  root: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },

  text: {
    color: Colors.blue6
  },

  serviceButton: {
    marginRight: Metrics.baseMargin / 2,
    backgroundColor: Colors.white,
    borderWidth: 0,
    borderColor: Colors.transparent
  },

  servicesPanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: Metrics.screenWidth
  },

  obectivePanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin
  },

  title: {
    color: Colors.blue6,
    fontSize: Fonts.size.h6,
    alignSelf: 'center',
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.baseMargin
  },

  objectiveButton: {
    marginRight: Metrics.baseMargin / 2,
    backgroundColor: Colors.white,
    borderWidth: 0,
    borderColor: Colors.transparent,
    alignSelf: 'stretch',
    flex: 1
  },

  icon: {
    fontSize: Metrics.icons.medium,
    color: Colors.blue2
  },
  buttonText: {
    alignSelf: 'center'
  },
  SideBySide: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  input: {
    width: 200
  }

})
