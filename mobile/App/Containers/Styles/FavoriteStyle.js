import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'

export default StyleSheet.create({
    image: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        width: Metrics.images.prof,
        height: Metrics.images.prof
    },
    listItem: {
        flex: 1,
        margin:5,
        flexDirection: 'row',
        backgroundColor: 'whitesmoke',
    },
    data:{
        marginTop:10,
        flex:1,
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    title:{
        color: '#00331A'
    },
    info:{
        marginTop: 5,
        fontSize:13
    },
    star:{
        width: Metrics.images.normal,
        height: Metrics.images.normal,
        marginRight: 20,
        marginTop:10,
        marginLeft:5,
        marginRight:5
    },
    noFav: {
        marginTop: 18,
    },
    price:{
        flex:1,
        justifyContent: 'flex-end',
        marginBottom:15
    }

})