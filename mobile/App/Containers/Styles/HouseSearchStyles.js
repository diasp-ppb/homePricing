import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  root: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },

  text: {
    color: Colors.blue6,
    alignContent: 'center'
  },

  serviceButton: {
    marginRight: Metrics.baseMargin / 2,
    backgroundColor: Colors.white,
    borderWidth: 0,
    borderColor: Colors.transparent,
    height: 85,
    width: 85,
    flexDirection: 'column'
  },

  serviceButtonSelected: {
    marginRight: Metrics.baseMargin / 2,
    backgroundColor: Colors.blue5,
    borderWidth: 0,
    borderColor: Colors.transparent,
    height: 85,
    width: 85,
    flexDirection: 'column'
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
    marginLeft: Metrics.baseMargin,
    width: Metrics.screenWidth - 2 * Metrics.baseMargin ,
  },

  title: {
    color: Colors.blue6,
    fontSize: Fonts.size.h6,
    alignSelf: 'center',
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.baseMargin
  },

  objectiveButton: {
    backgroundColor: Colors.white,
    borderWidth: 0,
    borderColor: Colors.transparent,
    alignSelf: 'stretch',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },

  objectiveButtonSelected: {
    backgroundColor: Colors.blue5,
    borderWidth: 0,
    borderColor: Colors.transparent,
    alignSelf: 'stretch',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },

  objectiveButtonSelectedText: {
    color: Colors.white
  },
  icon: {
    fontSize: Metrics.icons.medium,
    color: Colors.blue2,
    marginTop: Metrics.baseMargin
  },

  iconSelected: {
    fontSize: Metrics.icons.medium,
    color: Colors.white,
    marginTop: Metrics.baseMargin
  },



  buttonText: {
    alignSelf: 'center'
  },
  SideBySide: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  input: {
    width: 200,
    color: Colors.blue6,
    backgroundColor: Colors.white
  },
  pickerFinalidade: {
  color: Colors.blue6
  },

  pickerBackground: {
    backgroundColor: Colors.white
  },

  serviceButtonText: {
    margin: Metrics.baseMargin,
    color: Colors.blue4,
    fontSize: 10
  },
  serviceButtonTextSelected: {
    margin: Metrics.baseMargin,
    color: Colors.white,
    fontSize: 10
  },

})
