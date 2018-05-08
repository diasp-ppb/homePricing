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
    margin: 5,
    width: 100,
    justifyContent: 'center'
  },
  topBtn: {
    margin: 5,
    width: 210,
    justifyContent: 'center'
  }
})
