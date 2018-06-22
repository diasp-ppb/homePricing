import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  title: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 10
  },
  pkr: {
    margin: 15,
    backgroundColor: 'white'
  },
  halfPkr: {
    flex: 0.5,
    backgroundColor: 'white'
  },
  pkrGrp: {
    flex: 1,
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    opacity: 0.92,
    borderRadius: 20,
    backgroundColor: '#046A38'
  },
  btnSlct: {
    opacity: 0.92,
    borderRadius: 20,
    backgroundColor: '#43B02A'
  },
  halfBtn: {
    flex: 0.5
  },
  btnGrp: {
    flex: 1,
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ipt: {
    margin: 15,
    backgroundColor: 'white'
  },
  halfIpt: {
    flex: 0.5,
    backgroundColor: 'white'
  },
  iptGrp: {
    flex: 1,
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chc: {
    height: 70,
    opacity: 0.92,
    borderRadius: 50,
    flexDirection: 'column',
    backgroundColor: '#046A38'
  },
  chcSlct: {
    height: 70,
    opacity: 0.92,
    borderRadius: 50,
    flexDirection: 'column',
    backgroundColor: '#43B02A'
  },
  chcLbl: {
    fontSize: 12,
    textAlign: 'center'
  },
  qrtChc: {
    flex: 0.5
  },
  chcGrp: {
    flex: 1,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  chcRow: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  done: {
    marginTop: 15,
    marginBottom: 25,
    marginHorizontal: 15,
    alignSelf: 'center'
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  headerStyle: {
    top: 0,
    left: 0,
    right: 0,
    elevation: 0,
    position: 'absolute',
    backgroundColor: 'transparent'
  }
})
