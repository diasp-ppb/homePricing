import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	section: {
		margin: 15,
		alignItems: 'center',
		justifyContent: 'center'
	},
	profilePic: {
		width: 200,
		height: 200,
		borderRadius: 200
	},
	icon: {
		padding: 15,
		marginTop: -60,
		marginLeft: 150,
		borderRadius: 40,
		color: 'white',
		backgroundColor: '#046A38'
	},
	label: {
		marginBottom: 10
	},
	input: {
		marginBottom: 10,
		backgroundColor: 'white'
	},
	btn: {
		opacity: 0.92,
		borderRadius: 20,
		alignSelf: 'center',
		backgroundColor: '#046A38'
	},
	backgroundImage: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	}
})
