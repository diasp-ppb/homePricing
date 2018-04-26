import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  icon: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'contain',
    width: Metrics.images.logo,
    height: Metrics.images.logo
  },
  listItem: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: 'whitesmoke',
    padding: 10,
    marginBottom: 5
  },
  listIcons: {
      marginLeft: 20,
      width: 15,
      height: 15
  },
  text: {
      marginLeft: 20
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 10
  }

})