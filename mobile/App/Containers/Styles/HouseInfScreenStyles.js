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
    backgroundColor:'#53565A'
  }, 

  arrow:{
    fontSize:18.2,
    marginTop:8,
    color:'white'
  },
  infTab:{
     marginTop:-61,
     paddingLeft:18,
     paddingBottom:8,
     paddingTop:8,
     backgroundColor: 'white',
     opacity:0.55, 
     elevation: 3,
     flexDirection: 'row'
  },
  priceText:{
    paddingBottom:6,
    fontWeight:'bold',
    color:'black'
  },
  typeText:{
    fontSize:12,
    color:'#262626'
  },
  box1:{
     flex:1, flexDirection:'row',
     padding: 15,
     marginTop: 10,
     marginHorizontal: 10,
     backgroundColor: 'white',
     elevation: 2,
     borderRadius: 2
  },
  box2:{
    flexDirection:'row',
    marginBottom: 15,
    flex:1,
    padding: 15,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 2
  },
  streetText:{
    fontSize:13 ,
    color: '#262626'
  },
  properties:{
    fontSize:13,
    padding:2,
    fontWeight:'bold',
    color: '#262626'
  },
  data:{
    fontSize:13 ,
    padding:2 , 
    color:'#8c8c8c'
  },
  descriptionTitle:{
    marginBottom: 6,
    fontWeight: 'bold',
    color: '#262626'
  },
  descriptionText:{
    fontSize:13 ,
    padding:2 , 
    color:'#8c8c8c'
  },
  star:{
    width: Metrics.images.normal,
    height: Metrics.images.normal,
    marginRight: 20,
    marginTop:10
  },
  data:{
    flex:1,
    flexDirection :'column'
  }

})
