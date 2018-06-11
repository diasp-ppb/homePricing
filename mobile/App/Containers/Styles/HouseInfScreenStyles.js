import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  // ...ApplicationStyles.screen,
  pageTitle:{
    fontSize:15,
    marginLeft:-40,
    fontFamily: 'tahoma'
  },
  btn: {
    opacity: 0.92,
    borderRadius: 20,
    backgroundColor: '#046A38',
  },
  btns: {
    flex: 1,
    flexDirection: 'row'
  },

  headerBG:{
    backgroundColor:'#53565A'
  },
  title: {
    color: 'black',
    marginBottom: 5
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
  mainBox:{
    flex:1, flexDirection:'column',
    padding: 15,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 2
  },
  mainBoxAux:{
    flex:1, flexDirection:'row',
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
    marginTop: 10,
    marginHorizontal: 10,
    flex:1,
    padding: 15,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 2
  },
  streetText:{
    fontSize:13,
    color: '#505050'
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
    fontSize: 17,
    marginBottom: 6,
    fontWeight: 'bold',
    color: '#262626'
  },
  descriptionText:{
    fontSize:15,
    padding:2,
    color:'#505050'
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
