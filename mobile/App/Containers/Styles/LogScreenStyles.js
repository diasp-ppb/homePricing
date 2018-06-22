import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
    /*
        Logo stylings on register/login screen
    */
    icon: {
        color: Colors.colors.snow,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },

    /*
        Content layout styling
    */
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

    /*
        Form layout styling
    */
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

    /*
        Specific components' styling
    */
    inputText: {
        backgroundColor: Colors.colors.snow,
    },
    btn: {
        marginTop: 5,
    },
    linkStyle: {
        color: 'blue',
        textAlign: 'center',
        fontSize: 18,
    },
    inputError: {
        borderColor: '#FF0000',
    }
})