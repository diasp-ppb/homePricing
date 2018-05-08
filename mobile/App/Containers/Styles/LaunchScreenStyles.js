import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  content: {
    flex: 1
  },
  halfRow: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'

  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btn: {
    margin: 3,
    width: 100,
    justifyContent: 'center'
  },
  topBtn: {
    margin: 2,
    width: 170,
    justifyContent: 'center',
    elevation: 60,
    backgroundColor:'#046A38',
    borderRadius:20,
    opacity:0.92,
    marginBottom: 3
  },
  backgroundImage: {
      position: 'absolute',
      width:'100%',
      height:'100%',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    homePricing: {
      width:'70%',
      height:'22%',
      marginTop:-40
    },

    otherImage: {
      width:'72%',
      height:'68.5%'
    }

})
