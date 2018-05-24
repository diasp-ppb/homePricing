import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  // ...ApplicationStyles.screen,
  pageTitle:{
    fontSize:15,
    marginLeft:-40,
    fontFamily: 'tahoma'
  },

  btns: {
    flex: 1,
    flexDirection: 'row'
  },

  headerBG:{
    backgroundColor:'#f2f2f2'
  }, 

  box1:{
    flex:1, flexDirection:'row',
    padding: 6,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    elevation: 1,
    borderRadius: 2
  },
  arrow:{
    fontSize:20,
    color:'#046A38',
    margin: 0,
    padding: 0
  },
  address:{
    paddingLeft:10,
    fontSize:15,
    color: '#595959'
  },
  icon: {
    paddingLeft:10,
    fontSize:15,
    color: '#046A38'
  },
  money:{
    marginTop: 10,
    fontSize:14,
    marginLeft: 10,
    color: '#262626'
  },
  noFav: {
      marginTop: 18,
  }
})
