import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoBox: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBox: {
        flex: 2,
        flexDirection:'row',
    },
    registerBox: {
        flex: 3,
        flexDirection:'row',
    },      
    linkBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        flex:0.8,
        justifyContent: 'center',
    },
    inputRegisterBox: {
        flex:0.8,
    },
    spaceBox: {
        flex:0.1,
    },
    inputText: {
        backgroundColor: Colors.colors.snow,
        margin: 2,
    },
    btn: {
        marginTop: 5,
    },
    linkStyle: {
        color: 'blue',
        textAlign: 'center',
        fontSize: 18,
    },
})