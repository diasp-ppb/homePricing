import React, { Component } from 'react'
import { Image, View, AsyncStorage } from 'react-native'
import { connect } from 'react-redux';

import { Col, Row, Grid } from 'react-native-easy-grid'
import { Container, Header, Body, Content,
    Title, Left, Right,
    Icon, Text, Button,
    Form, Item, Input } from 'native-base'

import { Images } from '../Themes'
import { WARN_MISSING, ToastWarning } from '../Services/LogToasts'
import { loginAPI } from '../Services/Api'
import { login } from '../Redux/LoginRedux'
import styles from './Styles/LoginScreenStyles'

class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Login',
  });


  constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        this.setState({password : ''});
        this.setState({email : ''});
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.email == '' || this.state.password == '') {
            ToastWarning(WARN_MISSING);
        } else {
            this.setState({password : ''});
            loginAPI(this.state.email, this.state.password, this.props);
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
                            <Item style={{ backgroundColor: 'white', marginBottom: 10 }} regular>
                                <Input
                                    keyboardType='email-address'
                                    placeholder="E-mail"
                                    onChangeText={(email) => this.setState({ email })}
                                    value={this.state.email}
                                />
                            </Item>
                            <Item style={{ backgroundColor: 'white', marginBottom: 10 }} regular>
                                <Input
                                    secureTextEntry={true}
                                    placeholder="Palavra-passe"
                                    onChangeText={(password) => this.setState({ password })}
                                    value={this.state.password}
                                />
                            </Item>
                            <Button primary block style={styles.button} onPress={this.handleSubmit}>
                                <Text>Login</Text>
                            </Button>
                        </Form>
                        <Text style={styles.signUp}>Não tem uma conta? <Text style={styles.link} onPress={() => navigate('Register')}>Registe-se!</Text></Text>
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

function mapDispatchToProps(dispatch) {
    return {
      login: (user,token) => dispatch(login(user,token))
    };
}

const connectedRegister = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export { connectedRegister as LoginScreen };
