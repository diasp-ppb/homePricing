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

  box1: {
    flex: 1, flexDirection: 'row',
    padding: 6,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: '#f2f2f2',
    elevation: 2,
    opacity: 0.9,
    borderRadius: 2
  },
  arrow: {
    fontSize: 30.2,
    color: 'black',
  },
  address: {
    padding: 15,
    fontSize: 12.5,
    color: '#595959'
  },

  date: {
    fontSize: 11.5,
    marginLeft: 14,
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
    }
})
