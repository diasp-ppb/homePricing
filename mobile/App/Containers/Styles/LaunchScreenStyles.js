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
    padding: 15,
    fontSize: 15,
    elevation: 3,
    color: '#fff',
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: 'blue'
  },
  topBtn: {
    margin: 5,
    width: 210,
    padding: 15,
    fontSize: 15,
    elevation: 3,
    color: '#fff',
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: 'blue'
  }
})
