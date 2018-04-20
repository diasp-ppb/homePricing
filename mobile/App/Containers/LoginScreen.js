import React, { Component } from 'react'
import { Image, View, AsyncStorage } from 'react-native'

import { Col, Row, Grid } from 'react-native-easy-grid'
import { Container, Header, Body, Content, 
    Title, Left, Right,     
    Icon, Text, Button, 
    Form, Item, Input } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Images } from '../Themes'
import { SUCCESS_LOGIN, 
    ERROR_INVALID_EMAIL, ERROR_INVALID_PARAM_LOGIN, 
    WARN_MISSING } from '../Services/LogToasts'
import { ToastSuccess, ToastError, ToastWarning } from '../Services/LogToasts'
import { addUser } from '../Redux/LoginState'

import styles from './Styles/LogScreenStyles'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    checkResponse(responseJson) {
        this.setState({password : ''})
        
        if (responseJson.code == '400') {
            ToastError(ERROR_INVALID_EMAIL);
        } else if (responseJson.code == '401') {
            ToastError(ERROR_INVALID_PARAM_LOGIN);
        } else {
            const { navigate } = this.props.navigation;
            this.setState({email : ''});
            navigate('Launch');
            ToastSuccess(SUCCESS_LOGIN);
        }
    }

    loginAPI(email, password) {
        fetch("http://172.30.29.238:3000/v1/auth/login", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
        .then(
          (response) => response.json()
        )
        .then(
          (responseJson) => this.checkResponse(responseJson)
        )
        .catch((error) => {
            console.error(error);
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.email == '' || this.state.password == '') {
            ToastWarning(WARN_MISSING);
        } else {
            this.loginAPI(this.state.email, this.state.password);
        }
    }
    
    render () {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAwareScrollView>
                <Container>
                    <Header>
                        <Left>
                            <Icon
                                name="arrow-back"
                                onPress={() => navigate('Launch')}
                                style={styles.icon}
                            />
                        </Left>

                        <Body>
                            <Title>Login</Title>
                        </Body>

                        <Right />
                    </Header>
                    
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
