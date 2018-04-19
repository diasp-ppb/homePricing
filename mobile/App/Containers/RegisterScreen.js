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
            name: '',
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    checkResponse(responseJson) {
        this.setState({password : ''})

        if (responseJson.code == '400') {
            Toast.show({
                text: 'Parâmetro(s) inválido(s)!',
                buttonText: 'Ok!',
                duration: 10000,
                type: "danger",
            });
        } else if (responseJson.code == '409') {
            Toast.show({
                text: 'E-mail já existe!',
                buttonText: 'Ok!',
                duration: 10000,
                type: "danger",
            });
        } else {
            const { navigate } = this.props.navigation;

            this.setState({name : ''});
            this.setState({email : ''});

            navigate('Login');
            Toast.show({
                text: 'Registo bem-sucedido :)',
                buttonText: 'Ok!',
                duration: 5000,
                type: "success",
            });
        }
    }

    handleSubmit(event) {
        if (this.state.name == '' || this.state.email == '' || this.state.password == '') {
            Toast.show({
                text: 'Preencha os campos em falta!',
                buttonText: 'Ok!',
                duration: 10000,
                type: "warning",
            });
        } else {
            fetch("http://172.30.29.238:3000/v1/auth/register", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    name: this.state.name,
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
                            <Title>Registar</Title>
                        </Body>

                        <Right />
                    </Header>

                    <View style={styles.content}>
                        <View style={styles.logoBox}>    
                            <Image source={Images.logo} style={styles.logo} />
                        </View>
                        <View style={styles.registerBox}>
                            <View style={styles.spaceBox}></View>

                            <Form style={styles.inputRegisterBox}>
                                <Item style={styles.inputText} regular>
                                    
                                    <Input
                                        placeholder="Nome de utilizador"
                                        onChangeText={(name) => this.setState({name})}
                                        value={this.state.name}
                                    />
                                
                                </Item>

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
                                    <Text>Registar</Text>
                                </Button>
                            </Form>

                            <View style={styles.spaceBox}></View>
                        </View>
                    </View>
                </Container>
            </KeyboardAwareScrollView>
        );
    }
}
