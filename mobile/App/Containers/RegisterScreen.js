import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { connect } from 'react-redux';

import { Container, Text, Button, Form, Item, Input } from 'native-base'

import { Images } from '../Themes'
import { WARN_MISSING, ToastWarning, ToastError } from '../Services/LogToasts'
import { registerAPI } from '../Services/Api'

import styles from './Styles/RegisterScreenStyles'
import {login} from "../Redux/LoginRedux";

class RegisterScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: styles.headerStyle
  });


  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.setState({email : ''});
    this.setState({password : ''});
    this.setState({confirmPassword : ''});
  }

  handleSubmit(event) {
    if (this.state.email === '' || this.state.password === '') {
      ToastWarning(WARN_MISSING);
      return;
    }

    if(this.state.password !== this.state.confirmPassword){
      ToastError("Palavras-passe não correspondem!");
      this.setState({password : ''});
      this.setState({confirmPassword : ''});
      return;
    } else {
      if(this.state.password.length < 6) {
        ToastError("Palavra-passe tem de ter mais de 6 caractéres!");
        this.setState({password : ''});
        this.setState({confirmPassword : ''});
        return;
      } else registerAPI(this.state.email, this.state.password, this);
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
              <Item style={{ backgroundColor: 'white', marginBottom: 15 }} regular>
                <Input
                  secureTextEntry={true}
                  placeholder="Confirmar palavra-passe"
                  onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                  value={this.state.confirmPassword}
                />
              </Item>
              <Button primary block style={styles.button} onPress={this.handleSubmit}>
                <Text>Registar</Text>
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

function mapDispatchToProps(dispatch) {
  return {
    login: (user,token) => dispatch(login(user,token))
  };
}

const connectedRegister = connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
export { connectedRegister as RegisterScreen };
