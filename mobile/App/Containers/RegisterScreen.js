import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { connect } from 'react-redux';

import { Container, Text, Button, Form, Item, Input } from 'native-base'

import { Images } from '../Themes'
import { WARN_MISSING, ToastWarning } from '../Services/LogToasts'
import { registerAPI } from '../Services/Api'

import styles from './Styles/RegisterScreenStyles'

class RegisterScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Registo',
    headerStyle: styles.headerStyle
  });


  constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        this.setState({password : ''});
        this.setState({email : ''});
        this.setState({name : ''});
    }

    handleSubmit(event) {
        if (this.state.name == '' || this.state.email == '' || this.state.password == '') {
            ToastWarning(WARN_MISSING);
        } else {
            this.setState({password : ''});
            registerAPI(this.state.name, this.state.email, this.state.password, this.props);
        }
    }

    render () {
        const { navigate } = this.props.navigation;
        return (
            <Container>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
                <View style={styles.container}>
                    <View style={styles.topRow}>
                        <Image source={Images.logo1} style={styles.homePricing} resizeMode='contain' />
                    </View>
                    <View style={styles.bottomRow}>
                        <Form style={{ width: '70%' }}>
                            <Item style={{ backgroundColor: 'white', marginBottom: 15 }} regular>
                                <Input
                                    placeholder="Nome de utilizador"
                                    onChangeText={(name) => this.setState({ name })}
                                    value={this.state.name}
                                />
                            </Item>
                            <Item style={{ backgroundColor: 'white', marginBottom: 15 }} regular>
                                <Input
                                    keyboardType='email-address'
                                    placeholder="E-mail"
                                    onChangeText={(email) => this.setState({ email })}
                                    value={this.state.email}
                                />
                            </Item>
                            <Item style={{ backgroundColor: 'white', marginBottom: 15 }} regular>
                                <Input
                                    secureTextEntry={true}
                                    placeholder="Palavra-passe"
                                    onChangeText={(password) => this.setState({ password })}
                                    value={this.state.password}
                                />
                            </Item>
                            <Button primary block style={styles.button} onPress={this.handleSubmit}>
                                <Text style={{ fontSize: 12 }}>Registar</Text>
                            </Button>
                        </Form>
                    </View>
                </View>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.login
    };
}

const connectedRegister = connect(mapStateToProps)(RegisterScreen);
export { connectedRegister as RegisterScreen };
