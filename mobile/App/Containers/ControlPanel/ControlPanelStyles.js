import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  optionIcon: {
    color: Colors.green6,
    marginLeft: 2 * Metrics.doubleBaseMargin,
  },
  root: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  userInfo: {
    flex: 3,
    marginTop: Metrics.baseMargin,
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: Metrics.baseMargin,
    marginLeft: Metrics.doubleBaseMargin,
  },
  text: {
    color: Colors.white,
    marginLeft: Metrics.doubleBaseMargin,
  },
  options: {
    flex: 7,
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  optionInUsage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: Colors.green7,
  },
  profileImage: {
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 64,
    width: 2 * Metrics.images.large,
    height: 2 * Metrics.images.large,
  },
  center: {
    alignSelf: 'center',
  },
});
