import React, { Component } from 'react'
import { Image } from 'react-native'
import { Images } from '../Themes'

// Native Base
import { Container, Content, View, Text, Input, Item, Button, Icon } from 'native-base'

// Styles
import styles from './Styles/UserSettingsStyles'

// Component
export default class UserSettingsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Configurações de conta',
    });

	render() {
		const { navigate } = this.props.navigation;
		return (
			<Container>
				<Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
				<View style={[styles.section, { paddingVertical: 15 }]}>
					<Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlMNPszBzrblPa1wEIpULUqm9W2tDJpDL6lcz5cr6yZSpBjiVhTw' }} style={styles.profilePic} resizeMode='contain' />
					<Icon ios={'ios-create'} android={'md-create'} style={styles.icon} onPress={() => {}} />
				</View>
				<Content padder style={{ paddingTop: 0, backgroundColor: '#e3e3eb' }}>
					<View style={styles.section}>
						<Text style={styles.label}>E-mail</Text>
						<Item regular style={styles.input}>
							<Input
								keyboardType='email-address'
								placeholder="Novo e-mail"
							/>
						</Item>
						<Button primary style={styles.btn} onPress={() => {}}>
							<Text>Atualizar e-mail</Text>
						</Button>
					</View>
					<View style={styles.section}>
						<Text style={styles.label}>Password</Text>
						<Item regular style={styles.input}>
							<Input
								secureTextEntry={true}
								placeholder="Palavra-passe antiga"
							/>
						</Item>
						<Item regular style={styles.input}>
							<Input
								secureTextEntry={true}
								placeholder="Nova palavra-passe"
							/>
						</Item>
						<Item regular style={styles.input}>
							<Input
								secureTextEntry={true}
								placeholder="Confirmar nova palavra-passe"
							/>
						</Item>
						<Button primary style={styles.btn} onPress={() => { }}>
							<Text>Atualizar palavra-passe</Text>
						</Button>
					</View>
				</Content>
			</Container>
		)
	}
}
