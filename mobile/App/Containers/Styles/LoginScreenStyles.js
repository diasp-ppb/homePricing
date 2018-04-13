import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
    inputText: {
        backgroundColor: Colors.colors.snow,
        marginRight: 'auto',
        marginLeft: 'auto',
        margin: 5,
      },
    btn: {
        marginTop: 5,
    },
    horizontalLine: {
        borderBottomColor: Colors.colors.steel,
        borderBottomWidth: 2,
        marginTop: 10,
    },
    logo: {
        marginBottom: 70,
        marginLeft: 'auto',
        marginRight: 'auto',
        resizeMode: 'contain',
        width: Metrics.images.logo,
        height: Metrics.images.logo
    },
    registerText: {
        color: 'blue',
        textAlign: 'center',
        marginTop: 70
    },
    recoverPassword: {
        color: 'blue',
        textAlign: 'center',
    }

})