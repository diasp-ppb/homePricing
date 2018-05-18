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
    fontSize:30.2,
    color:'black',
  },
  address:{
    padding:15,
    fontSize:12 ,
    color: '#595959'
  },

  money:{
    fontSize:14,
    marginLeft: 14,
    color: '#262626'
  }

})
