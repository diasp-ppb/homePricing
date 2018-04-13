import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Images } from '../Themes'

import { Col, Row, Grid } from 'react-native-easy-grid'
import { Container, Header, Body, Title, Content, Left, Right, Text, Icon, Button, Form, Item, Input } from 'native-base'

// Styles
import styles from './Styles/LoginScreenStyles'

export default class LoginScreen extends Component {
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
                        <Title>Login</Title>
                    </Body>

                    <Right />
                </Header>
                
                <Content contentContainerStyle={{flex: 1}}>
                    <Grid style={{alignItems: 'center'}}>
                        <Col size={10} />
                        <Col size={60}>
                            <Image source={Images.logo} style={styles.logo} />
                            <Form>
                                <Item style={styles.inputText}>
                                <Input placeholder="Nome de utilizador" />
                                </Item>

                                <Item style={styles.inputText}>
                                <Input secureTextEntry={true} placeholder="Palavra-passe" />
                                </Item>

                                <Button primary block style={styles.btn}>
                                    <Text>Login</Text>
                                </Button>
                            </Form>
                            
                            <Text style={{color: 'blue', textAlign: 'center', marginTop: 60}}
                                onPress={() => Linking.openURL('http://google.com')}>
                                Registar{"\n"}
                            </Text>
                            <Text style={{color: 'blue', textAlign: 'center'}}
                                onPress={() => Linking.openURL('http://google.com')}>
                            Recuperar palavra-passe
                            </Text>
                                
                        </Col>
                        <Col size={10} />
                    </Grid>
                </Content>
            </Container>
        );
    }
}