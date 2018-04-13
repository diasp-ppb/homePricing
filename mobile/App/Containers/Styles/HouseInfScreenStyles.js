import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  // ...ApplicationStyles.screen,
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

  headerPrice:{
    paddingLeft: 10, 
    paddingTop: 10, 
    marginTop: -10, 
    height:52, 
    opacity:0.55, 
    backgroundColor: 'blue' 
  },

  headerName:{
      paddingLeft:10,
      paddingTop: 8,
      marginTop: -90,
      height:38,
      opacity:0.55,
      backgroundColor: 'red'
  }

})
