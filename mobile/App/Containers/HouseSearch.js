import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'

// Styles
import styles from './Styles/HouseS'
import FullButton from "../Components/FullButton";

export default class LaunchScreen extends Component {
  render () {
    return (
      <View >
        <ScrollView >
          <div>
            <Title style={styles.text}> Finalidade </Title>

            <FullButton/>
          </div>
        </ScrollView>
      </View>
    )
  }
}
s
