import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Images } from '../Themes'

import { Col, Row, Grid } from 'react-native-easy-grid'
import { Container, Header, Body, Content, 
    Title, Left, Right,     
    Icon, Text, Button, 
    Form, Item, Input } from 'native-base'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Styles
import styles from './Styles/LogScreenStyles'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                                    <Input placeholder="Nome de utilizador" />
                                </Item>

                                <Item style={styles.inputText} regular>
                                    <Input secureTextEntry={true} placeholder="Palavra-passe" />
                                </Item>

                                <Button primary block style={styles.btn}>
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
