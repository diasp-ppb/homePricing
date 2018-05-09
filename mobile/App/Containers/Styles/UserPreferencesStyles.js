import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  mainTitle: {
    textAlign: 'center',
    color: Colors.blue6,
    fontSize: Fonts.size.h5,
    fontWeight: 'bold',
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.baseMargin
  },
  alignInput: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: Metrics.baseMargin
  },
  labelFlex1: {
    flex:.4,
    marginLeft: Metrics.baseMargin
  },
  labelFlex2: {
    flex: .3,
    marginLeft: Metrics.baseMargin
  },
  label: {
    color: Colors.coolGray12,
    fontSize: Fonts.size.h6,
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.baseMargin
  },
  pickerFlex: {
    flex: .6,
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    backgroundColor: Colors.white
  },
  serviceFlex: {
    flex: 0.7, 
    marginTop: Metrics.baseMargin, 
    marginLeft: Metrics.baseMargin, 
    marginRight: Metrics.baseMargin
  },
  workDistFlex: {
    flex: 0.6, 
    marginTop: Metrics.baseMargin, 
    marginLeft: Metrics.baseMargin, 
    marginRight: Metrics.baseMargin
  },
  SideBySide: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: Metrics.baseMargin
  },
  input: {
    width: 200,
    backgroundColor: Colors.white
  },
  separator: {
    marginTop: Metrics.baseMargin,
    borderBottomColor: Colors.coolGray2,
    borderBottomWidth: 5,
  },

  buttonStyle: {
    marginRight: Metrics.baseMargin / 2,
    backgroundColor: Colors.blue5,
    borderWidth: 0,
    borderColor: Colors.transparent,
    height: 85,
    width: 85,
    flexDirection: 'column',
    alignSelf: 'center', 
    width: Metrics.screenWidth * 0.5, 
    height: 50
  },
  buttonTextStyle: {
    margin: Metrics.baseMargin,
    color: Colors.white,
    fontSize: 15
  }

})
