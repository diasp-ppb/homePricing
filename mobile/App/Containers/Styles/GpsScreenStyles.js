import { StyleSheet, Dimensions } from 'react-native'
import { Header } from 'react-navigation'

let x = (Dimensions.get('window').width - (Dimensions.get('window').width * 0.7)) / 2

export default StyleSheet.create({
	title: {
		fontSize: 20,
		color: 'white',
		textAlign: 'center'
	},
	separator: {
		marginVertical: 10,
		borderStyle: 'solid',
		borderColor: 'white',
		borderWidth: 1
	},
	icon: {
		fontSize: 100,
		color: 'white',
		textAlign: 'center'
	},
	price: {
		fontSize: 30,
		marginTop: 10,
		color: 'white',
		textAlign: 'center',
	},
	location: {
		fontSize: 20,
		marginTop: 10,
		color: 'white',
		textAlign: 'center',
	},
	description: {
		fontSize: 12,
		marginTop: 10,
		color: 'white',
		textAlign: 'center',
	},
	modal: {
		left: x,
		top: 100,
		width: '70%',
		padding: 45,
		elevation: 40,
		borderRadius: 50,
		position: 'absolute',
		backgroundColor: '#046A38'
	},
	overlay: {
		top: 0,
		left: 0,
		opacity: 0.5,
		width: '100%',
		height: '100%',
		position: 'absolute',
		backgroundColor: 'black'
	}
})