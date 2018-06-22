import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'

export default StyleSheet.create({
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
    elevation: 3,
    opacity: 0.55,
    paddingLeft: 18,
    paddingVertical: 8,
    flexDirection: 'row',
    backgroundColor: 'white',
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
    flex:1,
    flexDirection:'row',
    padding: 15,
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
     backgroundColor: 'white',
     elevation: 2,
     borderRadius: 2
  },
  box2:{
    flexDirection:'row',
    marginTop: 10,
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
  },
  imgModal: {
    zIndex: 5,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'black'
  },
  sv: {
    width: '100%',
    height: '100%'
  },
  closeImg: {
    top: 20,
    right: 20,
    zIndex: 6,
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute'
  },
  pressImg: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain'
  }
})
