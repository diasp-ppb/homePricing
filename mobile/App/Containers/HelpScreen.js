import React, { Component } from 'react'
import { View } from 'react-native'

// Native Base
import { Container, Content, H3, Text, Icon, Picker } from 'native-base'

// Styles
import styles from './Styles/HelpScreenStyles'

// Component
export default class LaunchScreen extends Component {
	// Navigator's options
	static navigationOptions = ({ navigation }) => ({
		title: 'Ajuda'
	})

	// Component's constructor
	constructor (props) {
		super(props)
		this.state = {
			general: [],
			security: [],
			selectedGeneral: 'key0',
			selectedSecurity: 'key0'
		}
	}

	// Fetch data
	componentWillMount () {
		let tempGen = [
			{ label: 'Item #1', value: 'key0' },
			{ label: 'Item #2', value: 'key1' },
			{ label: 'Item #3', value: 'key2' },
			{ label: 'Item #4', value: 'key3' },
			{ label: 'Item #5', value: 'key4' }
		]

		let tempSec = [
			{ label: 'Item #1', value: 'key0' },
			{ label: 'Item #2', value: 'key1' },
			{ label: 'Item #3', value: 'key2' },
			{ label: 'Item #4', value: 'key3' },
			{ label: 'Item #5', value: 'key4' }
		]

		this.setState({ general: tempGen })
		this.setState({ security: tempSec })
	}

	// Delete data
	componentWillUnmount () {
		this.setState({ general: [] })
		this.setState({ security: [] })
	}

	// Component's renderer
	render () {
		return (
			<Container>
				<Content padder>
					<View style={styles.container}>
						<View style={styles.h1}>
							<H3>Podemos ajudar?</H3>
						</View>
						<View style={styles.row}>
							<View style={styles.label}>
								<Text>Geral</Text>
							</View>
							<View style={styles.picker}>
								<Picker
									mode="dropdown"
									style={{ width: undefined }}
									iosIcon={<Icon name="ios-arrow-down-outline" />}
									selectedValue={this.state.selectedGeneral}
									onValueChange={(value) => this.setState({ selectedGeneral: value })}
								>
									{
										this.state.general.map((item, index) => {
											return (
												<Picker.Item key={index} label={item.label} value={item.value} />
											)
										})
									}
								</Picker>
							</View>
						</View>
						<View style={styles.row}>
							<View style={styles.label}>
								<Text>Segurança</Text>
							</View>
							<View style={styles.picker}>
								<Picker
									mode="dropdown"
									style={{ width: undefined }}
									iosIcon={<Icon name="ios-arrow-down-outline" />}
									selectedValue={this.state.selectedSecurity}
									onValueChange={(value) => this.setState({ selectedSecurity: value })}
								>
									{
										this.state.security.map((item, index) => {
											return (
												<Picker.Item key={index} label={item.label} value={item.value} />
											)
										})
									}
								</Picker>
							</View>
						</View>
						<View style={styles.row}></View>
					</View>
				</Content>
			</Container>
		)
	}
}
