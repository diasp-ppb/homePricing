import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Images } from '../Themes'

import { Col, Row, Grid } from 'react-native-easy-grid'
import { Container, Header, Body, Content, 
    Title, Left, Right,     
    Icon, Text, Button, 
    Form, Item, Input } from 'native-base'

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
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() =>
                            navigate('LaunchScreen')
                        }>
                            <Icon name="arrow-back" />
                        </Button>
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
                                <Input placeholder="Nome de utilizador" />
                            </Item>

                            <Item style={styles.inputText} regular>
                                <Input placeholder="E-mail" />
                            </Item>

                            <Item style={styles.inputText} regular>
                                <Input secureTextEntry={true} placeholder="Palavra-passe" />
                            </Item>

                            <Button primary block style={styles.btn}>
                                <Text>Registar</Text>
                            </Button>
                        </Form>

                        <View style={styles.spaceBox}></View>
                    </View>
                </View>
            </Container>
        );
    }
}