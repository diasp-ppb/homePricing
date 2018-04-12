import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Header, Body, Left, Right, Title, Button, Icon} from 'native-base'
import styles from './Styles'

class Topbar extends Component {

  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string
  }

  render () {
    return (
      <Header style={styles.headerBar}>
        <Left>
          <Button transparent >
            <Icon name='menu' style={styles.menuIcon} />
          </Button>
        </Left>
        <Body style={styles.body}>
          <Title style={styles.text}> {this.props.text} </Title>
        </Body>
        <Right>
          <Title> HP </Title>
        </Right>
      </Header>
    )
  }
}

export default Topbar
