import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Images } from '../Themes'

// Native Base
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Body, Title, Content, Text, Button, Fab, Icon, ActionSheet } from 'native-base'

// Styles
import styles from './Styles/LaunchScreenStyles'

// TODO: Fill in ActionSheet
let OPTIONS = [];
let CANCEL_INDEX = 10;
let DESTRUCTIVE_INDEX = 11;

for (let i = 0; i < 10; i++) {
  OPTIONS[i] = 'Localização #' + i;
}
OPTIONS[CANCEL_INDEX] = 'Cancel'
OPTIONS[DESTRUCTIVE_INDEX] = 'Delete'

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header>
          <Body>
            <Title>Home Pricing</Title>
          </Body>
        </Header>
        <View>
          {/* <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' /> */}
          <Image source={Images.logo} style={styles.logo} />
          <Grid>
            <Col size={20} />
            <Col size={60}>
              <Button primary block onPress={() =>
                ActionSheet.show(
                  {
                    options: OPTIONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                    title: "Localizações Disponíveis"
                  },
                  buttonIndex => {
                    this.setState({ clicked: OPTIONS[buttonIndex] });
                  }
                )}>
                <Text>Pesquisar</Text>
              </Button>
              <Row style={{ marginTop: 8 }}>
                <Col size={48}>
                  <Button primary block onPress={() =>
                    navigate('Login')
                  }>
                    <Text>Login</Text>
                  </Button>
                </Col>
                <Col size={4} />
                <Col size={48}>
                  <Button primary block>
                    <Text>GPS</Text>
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col size={20} />
          </Grid>
        </View>
        <Fab><Icon name="camera" /></Fab>
      </Container>
    )
  }
}
