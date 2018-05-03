import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  serviceButtonSelected: {
    marginRight: Metrics.baseMargin / 2,
    backgroundColor: Colors.blue5,
    borderWidth: 0,
    borderColor: Colors.transparent,
    height: 85,
    width: 85,
    flexDirection: 'column'
  },
  mainTitle: {
    textAlign: 'center',
    color: Colors.blue6,
    fontSize: Fonts.size.h5,
    fontWeight: 'bold',
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.baseMargin
  },
  title: {
    color: Colors.coolGray12,
    fontSize: Fonts.size.h6,
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.baseMargin
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
  separator: {
    marginTop: Metrics.baseMargin,
    borderBottomColor: Colors.coolGray2,
    borderBottomWidth: 5,
  }

})
