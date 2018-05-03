import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
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