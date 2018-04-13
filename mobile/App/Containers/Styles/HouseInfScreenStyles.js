import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  house: {
    marginTop: 2,
    marginBottom: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'contain',
    width: Metrics.images.logo,
    height: Metrics.images.logo
  },
  btns: {
    flex: 1,
    flexDirection: 'row'
  },

  headerBody:{
    paddingLeft:10, 
    paddingTop: 10, 
    marginTop: -70, 
    height:32, 
    opacity:0.55, 
    backgroundColor: 'white' 
  }

})
