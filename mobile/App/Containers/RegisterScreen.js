import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { connect } from 'react-redux';

import { Container, Text, Button,
    Form, Item, Input } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Images } from '../Themes'
import { WARN_MISSING, ToastWarning } from '../Services/LogToasts'
import { registerAPI } from '../Services/Api'

import styles from './Styles/LogScreenStyles'

class RegisterScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Registo',
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
            <KeyboardAwareScrollView>
                <Container>
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

function mapStateToProps(state) {
    return {
        user: state.login
    };
}

const connectedRegister = connect(mapStateToProps)(RegisterScreen);
export { connectedRegister as RegisterScreen };
