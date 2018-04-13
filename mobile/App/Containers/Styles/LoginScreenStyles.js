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
        marginTop: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        resizeMode: 'contain',
        width: Metrics.images.logo,
        height: Metrics.images.logo
      },
})