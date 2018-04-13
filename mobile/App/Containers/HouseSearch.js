import React, {Component} from 'react'
import {Text, View} from 'react-native'
import {Button, Container, Content, Picker, Icon, Input, Item, Title} from 'native-base'
import Metrics from '../Themes/Metrics'
// Styles
import styles from './Styles/HouseSearchStyles'
import Colors from '../Themes/Colors'

const Area = [
  { value: 0, label: '0' },
  { value: 50, label: '50' },
  { value: 100, label: '1 00' },
  { value: 500, label: '5 00' },
  { value: 1000, label: '1 000' },
  { value: 2000, label: '2 000' },
  { value: 5000, label: '5 000' },
  { value: 10000, label: '10 000' },
  { value: 20000, label: '20 000' }
]

export default class HouseSearch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rent: false,
      buy: false,
      propertyType: undefined,
      minArea: undefined,
      maxArea: undefined,
      minPrice: undefined,
      maxPrice: undefined
    }
  }

  addPickerItems = (items) => {
    return items.map((item, key) => {
      return (
        <Picker.Item key={key} label={item.label} value={item.value} />
      )
    })
  }

  onValueChange2(value) {
    this.setState({
      selected2: value
    })
  }

  render () {
    return (
      <Container>
        <Content>

          <View style={styles.root}>
            <Text style={styles.title}>Finalidade</Text>

            <View style={styles.obectivePanel}>
              <Button style={styles.objectiveButton} onPress={() =>
                this.setState(previousState => {
                  return { rent: !previousState.rent }
                })} active={this.state.rent}
              >
                <Text style={[styles.text, styles.buttonText]} > Alugar </Text>
              </Button>

              <Button style={styles.objectiveButton} onPress={() =>
                this.setState(previousState => {
                  return { buy: !previousState.buy }
                })} active={this.state.buy}
              >
                <Text style={styles.text}> Comprar </Text>
              </Button>
            </View>

            <View>
              <Picker
                mode='dropdown'
                iosIcon={<Icon name='ios-arrow-down-outline' />}
                placeholder='Tipo de propridade'
                placeholderStyle={{ color: Colors.white,}}
                placeholderIconColor={Colors.black}
                style={{marginLeft: Metrics.baseMargin, color: Colors.blue6}}
                selectedValue={this.state.maxPrice}
                onValueChange={this.onValueChange2.bind(this)}
              >
                {this.addPickerItems(Area)}
              </Picker>

              <Picker
                mode='dropdown'
                iosIcon={<Icon name='ios-arrow-down-outline' />}
                placeholder='Tipologia'
                placeholderStyle={{ color: Colors.white}}
                placeholderIconColor={Colors.black}
                style={{marginLeft: Metrics.baseMargin, color: Colors.blue6}}
                selectedValue={this.state.maxPrice}
                onValueChange={(value) => this.setState({maxPrice: value})}
              >
                {this.addPickerItems(Area)}
              </Picker>

            </View>
          </View>

          <View style={styles.root}>
            <Text style={styles.title}>  Área Útil (m2) </Text>

            <View style={styles.SideBySide}>
              <Input style={styles.input} placeholder='Mínimo' keyboardType='numeric' />
              <Input style={styles.input} placeholder='Máximo' keyboardType='numeric' />
            </View>
          </View>

          <View>
            <Text style={styles.title}> Preço € </Text>

            <View style={styles.SideBySide}>
              <Picker
                mode='dropdown'
                iosIcon={<Icon name='ios-arrow-down-outline' />}
                placeholder='Mínimo'
                placeholderStyle={{ color: '#bfc6ea', width: 200}}
                style={{width: Metrics.screenWidth * 0.3}}
                placeholderIconColor='#007aff'
                selectedValue={this.state.minPrice}
                onValueChange={(value) => this.setState({minPrice: value})}
              >
                {this.addPickerItems(Area)}
              </Picker>

              <Picker
                mode='dropdown'
                iosIcon={<Icon name='ios-arrow-down-outline' />}
                placeholder='Máximo'
                placeholderStyle={{ color: Colors.white, width: 250}}
                placeholderIconColor={Colors.black}
                style={{width: Metrics.screenWidth * 0.3, marginLeft: Metrics.baseMargin, color: Colors.blue6}}
                selectedValue={this.state.maxPrice}
                onValueChange={(value) => this.setState({maxPrice: value})}
              >
                {this.addPickerItems(Area)}
              </Picker>
            </View>

          </View>

          <View>
            <Text style={styles.title}> Serviçoes úteis </Text>

            <View style={styles.servicesPanel}>
              <Button style={styles.serviceButton}>
                <Icon ios={'ios-heart-outline'} android={'md-heart-outline'} style={styles.icon} />
                <Text> Hospital </Text>
              </Button>

              <Button style={styles.serviceButton}>
                <Icon ios={'ios-book-outline'} android={'md-book'} style={styles.icon} />
                <Text> Escolas </Text>
              </Button >

              <Button style={styles.serviceButton}>
                <Icon ios={'ios-basket-outline'} android={'md-basket'} style={styles.icon} />
                <Text> Shopping </Text>
              </Button>

              <Button style={styles.serviceButton}>
                <Icon ios={'ios-car'} android={'md-car'} style={styles.icon} />
                <Text> Transportes </Text>
              </Button>
            </View>

          </View>

          <View>
            <Text style={styles.title}> Qual o seu local de trabalho? </Text>
            <Item regular style={{marginLeft: Metrics.baseMargin, marginRight: Metrics.baseMargin}}>
              <Input placeholder='Morada' />
            </Item>
            <View style={styles.SideBySide}>
              <Input placeholder='Máximo de' keyboardType='numeric'/>
              <Text style={{width: 120}}> Distância ideal </Text>
            </View>
          </View>

        </Content>
      </Container>
    )
  }
}
