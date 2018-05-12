import React, {Component} from 'react'
import {Text, View} from 'react-native'
import {Button, Container, Content, Picker, Icon, Input, Item, Form} from 'native-base'
import Metrics from '../Themes/Metrics'
// Styles
import styles from './Styles/HouseSearchStyles'
import Colors from '../Themes/Colors'


import {Price} from '@datatypes/Price'
import {PropertyType} from '@datatypes/PropertyType'
import {Tipology} from '@datatypes/Tipology'


export default class HouseSearch extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Pesquisa',
  });

  constructor (props) {
    super(props);
    this.state = {
      rent: false,
      buy: false,
      propertyType: undefined,
      minArea: undefined,
      maxArea: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      hospital: false,
      school: false,
      shopping: false,
      transport: false,
    };
  }

  addPickerItems(items)  {
    return items.map((item, key) => {
      return (
        <Picker.Item key={key} label={item.label} value={item.value} />
      )
    })
  }

  submitSearch() {
    const { navigate }  = this.props.navigation;

    const form = {
      rent: this.state.rent,
      buy: this.state.buy,
      propertyType: (this.state.propertyType === undefined) ? (null) : this.state.propertyType,
      minArea: (this.state.minArea === undefined) ? (null) : this.state.minArea,
      maxArea: (this.state.maxArea === undefined) ? (null) : this.state.maxArea,
      minPrice: (this.state.minPrice === undefined) ? (null) : this.state.minPrice,
      maxPrice: (this.state.maxPrice === undefined) ? (null) : this.state.maxPrice,
      hospital: this.state.hospital,
      school: this.state.school,
      shopping: this.state.shopping,
      transport: this.state.transport,
    }

    navigate('SearchResults', {form: form})
  }

  render () {


    return (
      <Container>
        <Content>

          <View style={styles.root}>
            <Text style={styles.title}>Finalidade</Text>

            <View style={styles.obectivePanel}>
              <Button style={(this.state.rent === false) ? [styles.objectiveButton, {marginRight: Metrics.baseMargin}] : [styles.objectiveButtonSelected, {marginRight: Metrics.baseMargin}]}
                      onPress={() =>
                        this.setState(previousState => {
                          return { rent: !previousState.rent }
                        })}
              >
                <Text style={(this.state.rent === false) ? styles.text : styles.objectiveButtonSelectedText} > Alugar </Text>
              </Button>

              <Button style={(this.state.buy === false) ? [styles.objectiveButton] : [styles.objectiveButtonSelected]}
                      onPress={() =>
                        this.setState(previousState => {
                          return { buy: !previousState.buy }
                        })}
              >
                <Text style={(this.state.buy === false) ? styles.text : styles.objectiveButtonSelectedText} > Comprar </Text>
              </Button>
            </View>

            <Text style={styles.title}> Tipo de Propriedade </Text>

            <View style={[styles.pickerBackground, {marginLeft: Metrics.baseMargin, marginRight: Metrics.baseMargin}]}>
              <Picker
                mode='dropdown'
                iosIcon={<Icon name='ios-arrow-down-outline' />}
                placeholderStyle={{ color: Colors.white}}
                placeholderIconColor={Colors.black}
                style={styles.pickerFinalidade}
                selectedValue={this.state.propertyType}
                onValueChange={(value) => this.setState({propertyType: value})}
              >
                <Picker.Item value='undefined' label='Tipo de Propriedade' />
                {this.addPickerItems(PropertyType)}

              </Picker>
            </View>

            <Text style={styles.title}> Tipologia </Text>
            <View style={[styles.pickerBackground, {marginLeft: Metrics.baseMargin, marginRight: Metrics.baseMargin}]}>
              <Picker
                mode='dropdown'
                iosIcon={<Icon name='ios-arrow-down-outline' />}
                placeholder='Tipologia'
                placeholderStyle={{ color: Colors.white}}
                placeholderIconColor={Colors.black}
                style={styles.pickerFinalidade}
                selectedValue={this.state.tipology}
                onValueChange={(value) => this.setState({tipology: value})}
              >
                <Picker.Item value='undefined' label='Tipologia' />
                {this.addPickerItems(Tipology)}
              </Picker>
            </View>

          </View>

          <View style={styles.root}>
            <Text style={styles.title}>  Área Útil (m2) </Text>

            <View style={[styles.SideBySide, {margin: Metrics.baseMargin} ]}>
              <Input style={[styles.input, {marginRight: Metrics.baseMargin}]} placeholder='Mínimo' keyboardType='numeric' />
              <Input style={styles.input} placeholder='Máximo' keyboardType='numeric' />
            </View>
          </View>

          <View>
            <Text style={styles.title}> Preço € </Text>

            <View style={styles.SideBySide}>

              <View style={[styles.pickerBackground, {marginRight: Metrics.baseMargin}]}>

                <Picker
                  mode='dropdown'
                  iosIcon={<Icon name='ios-arrow-down-outline' />}
                  placeholder='Mínimo'
                  style={{width: Metrics.screenWidth / 2 - 1.5 * Metrics.baseMargin, color: Colors.blue6}}
                  placeholderIconColor='#007aff'
                  selectedValue={this.state.minPrice}
                  onValueChange={(value) => this.setState({minPrice: value})}
                >
                  <Picker.Item value='undefined' label='Minimo' />
                  {this.addPickerItems(Price)}
                </Picker>

              </View>

              <View style={styles.pickerBackground}>
                <Picker
                  mode='dropdown'
                  iosIcon={<Icon name='ios-arrow-down-outline' />}
                  placeholder='Máximo'
                  style={{width: Metrics.screenWidth / 2 - 2 * Metrics.baseMargin, color: Colors.blue6}}
                  placeholderIconColor='#007aff'
                  selectedValue={this.state.maxPrice}
                  onValueChange={(value) => this.setState({maxPrice: value})}
                >
                  <Picker.Item value='undefined' label='Maximo' />
                  {this.addPickerItems(Price)}
                </Picker>
              </View>
            </View>

          </View>

          <Text style={styles.title}> Serviços úteis </Text>

          <View style={styles.servicesPanel}>
            <Button style={(this.state.hospital === false) ? styles.serviceButton : styles.serviceButtonSelected}
                    onPress={() => this.setState({hospital: !this.state.hospital})}>
              <Icon ios={'ios-heart-outline'} android={'md-heart-outline'} style={(this.state.hospital === false) ? styles.icon : styles.iconSelected} />
              <Text style={(this.state.hospital === false) ? styles.serviceButtonText : styles.serviceButtonTextSelected}> Hospital </Text>
            </Button>

            <Button style={(this.state.school === false) ? styles.serviceButton : styles.serviceButtonSelected}
                    onPress={() => this.setState({school: !this.state.school})} >
              <Icon ios={'ios-book-outline'} android={'md-book'} style={(this.state.school === false) ? styles.icon : styles.iconSelected} />
              <Text style={(this.state.school === false) ? styles.serviceButtonText : styles.serviceButtonTextSelected}> Escolas </Text>
            </Button >

            <Button style={(this.state.shopping === false) ? styles.serviceButton : styles.serviceButtonSelected}
                    onPress={() => this.setState({shopping: !this.state.shopping})}>
              <Icon ios={'ios-basket-outline'} android={'md-basket'} style={(this.state.shopping === false) ? styles.icon : styles.iconSelected} />
              <Text style={(this.state.shopping === false) ? styles.serviceButtonText : styles.serviceButtonTextSelected}> Shopping </Text>
            </Button>

            <Button style={(this.state.transport === false) ? styles.serviceButton : styles.serviceButtonSelected}
                    onPress={() => this.setState({transport: !this.state.transport})}>
              <Icon ios={'ios-car'} android={'md-car'} style={(this.state.transport === false) ? styles.icon : styles.iconSelected} />
              <Text style={(this.state.transport === false) ? styles.serviceButtonText : styles.serviceButtonTextSelected}> Transportes </Text>
            </Button>
          </View>

          <Text style={styles.title}> Qual o seu local de trabalho? </Text>

          <Item regular style={{marginLeft: Metrics.baseMargin, marginRight: Metrics.baseMargin}}>
            <Input placeholder='Morada' style={{backgroundColor: Colors.white, color: Colors.blue6}} />
          </Item>
          <Text style={{width: 120, marginTop: Metrics.baseMargin * 1.5, marginLeft: Metrics.baseMargin}}> Distância ideal </Text>

          <View style={[styles.SideBySide, {marginLeft: Metrics.baseMargin, marginRight: Metrics.baseMargin}]}>
            <Input placeholder='Máximo de' keyboardType='numeric' style={{flex: 1, backgroundColor: Colors.white, color: Colors.blue2}} />
            <Text style={{flex: 3, marginTop: Metrics.baseMargin * 1.5}}> km </Text>
          </View>

          <View style={{margin: Metrics.doubleBaseMargin}}>
            <Button style={[styles.serviceButtonSelected, {alignSelf: 'center', width: Metrics.screenWidth * 0.5, height: 50}]} onPress={() => this.submitSearch()}>
              <Text style={[styles.serviceButtonTextSelected, {fontSize: 15}]}> Mostrar  Resultados </Text>
            </Button>
          </View>

        </Content>
      </Container>
    )
  }
}
