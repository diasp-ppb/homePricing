import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  // ...ApplicationStyles.screen,
  pageTitle: {
    fontSize: 15,
    marginLeft: -40,
    fontFamily: 'tahoma'
  },

  btns: {
    flex: 1,
    flexDirection: 'row'
  },

  headerBG: {
    backgroundColor: '#f2f2f2'
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
  address: {
    padding: 10,
    fontSize: 15,
    color: '#595959'
  },
  icon: {
    paddingLeft:10,
    fontSize:15,
    color: '#046A38'
  },
  date: {
    fontSize: 13,
    marginLeft: 10,
    marginTop: 10,
    color: '#262626'
  },
  container: {
    flex: 1,
    marginBottom: 20,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  cell: {
    margin: '2%',
    width: '46%',
    elevation: 7,
    opacity: 0.85,
    backgroundColor: 'white'
  },
  img:{
      height: 100,
      width: undefined
  },
  header:{
      padding: 0
  },
  footer:{
      padding: 5
  },
  place:{
    fontSize: 11,
    color: 'black',
    marginBottom: -7
  },
  price:{
    fontSize:7,
    color: '#666666'
  },
  noFav: {
      marginTop: 18,
  }
})
