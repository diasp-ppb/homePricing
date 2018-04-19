import React, { Component } from 'react'
import { Image, View, Alert } from 'react-native'
import { Images } from '../Themes'

import { Col, Row, Grid } from 'react-native-easy-grid'
import { Container, Header, Body, Content, 
    Title, Left, Right,     
    Icon, Text, Button, 
    Form, Item, Input,
    Toast } from 'native-base'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Styles
import styles from './Styles/LogScreenStyles'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    checkResponse(responseJson) {
        this.setState({password : ''})

        if (responseJson.code == '400') {
            Toast.show({
                text: 'E-mail inválido!',
                buttonText: 'Ok!',
                duration: 10000,
                type: "danger",
            });
        } else if (responseJson.code == '401') {
            Toast.show({
                text: 'E-mail ou palavra-passe incorreto(s)!',
                buttonText: 'Ok!',
                duration: 10000,
                type: "danger",
            });
        } else {
            const { navigate } = this.props.navigation;

            this.setState({email : ''});
            navigate('Launch');

            Toast.show({
                text: 'Login bem-sucedido :)',
                buttonText: 'Ok!',
                duration: 5000,
                type: "success",
            });
        }
    }

    handleSubmit(event) {
        if (this.state.email == '' || this.state.password == '') {
            Toast.show({
                text: 'Preencha os campos em falta!',
                buttonText: 'Ok!',
                duration: 10000,
                type: "warning",
            });
        } else {
            fetch("http://172.30.29.238:3000/v1/auth/login", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                }),
            })
            .then((response) => response.json())
            .then(
                (responseJson) => this.checkResponse(responseJson)
            )
            .catch((error) => {
                console.error(error);
            });
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
