import React, { Component } from 'react'
import { Image, View, AsyncStorage } from 'react-native'
import { connect } from 'react-redux';

import { Col, Row, Grid } from 'react-native-easy-grid'
import { Container, Header, Body, Content,
    Title, Left, Right,
    Icon, Text, Button,
    Form, Item, Input } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Images } from '../Themes'
import { WARN_MISSING, ToastWarning } from '../Services/LogToasts'
import { loginAPI } from '../Services/Api'
import { login } from '../Redux/LoginRedux'
import styles from './Styles/LogScreenStyles'



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
        console.log("handle login");

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
            <KeyboardAwareScrollView>
                <Container>
                    <View style={styles.content}>
                        <View style={styles.logoBox}>
                            <Image source={Images.logo} style={styles.logo} />
                        </View>
                        <View style={styles.loginBox}>
                            <View style={styles.spaceBox}></View>

                            <Form style={styles.inputBox}>
                                <Item style={styles.inputText} regular>

                                    <Input
                                        keyboardType = 'email-address'
                                        placeholder="E-mail"
                                        onChangeText={(email) => this.setState({email})}
                                        value={this.state.email}
                                    />

                                </Item>

                                <Item style={styles.inputText} regular>

                                    <Input
                                        secureTextEntry={true}
                                        placeholder="Palavra-passe"
                                        onChangeText={(password) => this.setState({password})}
                                        value={this.state.password}
                                    />

                                </Item>

                                <Button primary block
                                    style={styles.btn}
                                    onPress = {this.handleSubmit}
                                >
                                    <Text>Login</Text>
                                </Button>
                            </Form>

                            <View style={styles.spaceBox}></View>
                        </View>

                        <View style={styles.linkBox}>
                            <Text
                                style={styles.linkStyle}
                                onPress={() => navigate('Register')}
                            >
                                Registar{"\n"}
                            </Text>
                            <Text style={styles.linkStyle}
                                onPress={() => Linking.openURL('http://google.com')}>
                                Recuperar palavra-passe
                            </Text>
                        </View>
                    </View>
                </Container>
            </KeyboardAwareScrollView>
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
