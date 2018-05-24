import React, { Component } from 'react'
import { Image, ActivityIndicator } from 'react-native'
import { Button, Container, Content, Picker, Icon, Input, Item, Form, Text, View } from 'native-base'
import Metrics from '../Themes/Metrics'
import Images from '../Themes/Images'

// Styles
import activityStyle from './Styles/ActivityIndicatorStyle'
import styles from './Styles/HouseSearchStyles'
import Colors from '../Themes/Colors'

import { getUserPreferences } from "../Services/Api"
import { connect } from 'react-redux'

import { MinPrice, MaxPrice } from '@datatypes/Price'
import { District } from '@datatypes/District'
import { PropertyType } from '@datatypes/PropertyType'
import { Tipology } from '@datatypes/Tipology'

class HouseSearch extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: styles.headerStyle
  });

  constructor(props) {
    super(props);
    this.state = {
      getData: true,
      loaded: false,
      city: 'Aveiro',
      rent: false,
      buy: false,
      propertyType: null,
      minArea: "",
      maxArea: "",
      minPrice: null,
      maxPrice: null,
      hospital: false,
      school: false,
      shopping: false,
      transport: false,
      workDistance: ""
    };

    if(this.props.user.loggedIn) {
      getUserPreferences(this, false);
    } else {
      this.state.getData = false;
    }

  }

  addPickerItems(items) {
    return items.map((item, key) => {
      return (
        <Picker.Item key={key} label={item.label} value={item.value} />
      )
    })
  }

  submitSearch() {
    const { navigate } = this.props.navigation;

    
    const form = {
      rent: this.state.rent,
      buy: this.state.buy,
      tipology: (this.state.tipology == null) ? (null) : this.state.tipology,
      propertyType: (this.state.propertyType == null) ? (null) : this.state.propertyType,
      minArea: (this.state.minArea == "") ? (null) : parseInt(this.state.minArea),
      maxArea: (this.state.maxArea == "") ? (null) : parseInt(this.state.maxArea),
      minPrice: (this.state.minPrice == "") ? (null) : this.state.minPrice,
      maxPrice: (this.state.maxPrice == "") ? (null) : this.state.maxPrice,
      hospital: this.state.hospital,
      school: this.state.school,
      shopping: this.state.shopping,
      transport: this.state.transport,
      city: this.state.city,
      workDistance: (this.state.workDistance == "") ? (null) : parseInt(this.state.workDistance),
      workLocation: (this.state.workLocation == null) ? (null) : this.state.workLocation,
      bathrooms: null
    }

    navigate('SearchResults', { form: form })
  }

  render() {
    if(this.state.loaded && this.state.getData || !this.state.getData) {
      return (
        <Container>
          <Image source={Images.backgroundBlur} style={styles.backgroundImage} resizeMode='stretch' />
          <Content padder style={{ paddingTop: 25 }}>
            <View style={{ paddingBottom: 25 }}>
              <Text style={styles.title}>Distrito</Text>
              <View style={styles.pkr}>
                <Picker
                  mode='dropdown'
                  iosIcon={<Icon name='ios-arrow-down-outline' />}
                  placeholder='Distrito'
                  placeholderStyle={{ color: Colors.white }}
                  placeholderIconColor={Colors.black}
                  selectedValue={this.state.city}
                  onValueChange={(value) => this.setState({ city: value })}
                >
                  {this.addPickerItems(District)}
                </Picker>
              </View>
              <Text style={styles.title}>Finalidade</Text>
              <View style={styles.btnGrp}>
                <View style={[styles.halfBtn, { marginRight: 2.5 }]}>
                  <Button primary block style={(this.state.rent === false) ? styles.btn : styles.btnSlct} onPress={() => this.setState(previousState => { return { rent: !previousState.rent } })}>
                    <Text>Alugar</Text>
                  </Button>
                </View>
                <View style={[styles.halfBtn, { marginLeft: 2.5 }]}>
                  <Button primary block style={(this.state.buy === false) ? styles.btn : styles.btnSlct} onPress={() => this.setState(previousState => { return { buy: !previousState.buy } })}>
                    <Text>Comprar</Text>
                  </Button>
                </View>
              </View>
              <Text style={styles.title}>Tipo de Propriedade</Text>
              <View style={styles.pkr}>
                <Picker
                  mode='dropdown'
                  iosIcon={<Icon name='ios-arrow-down-outline' />}
                  placeholder='Tipo de propriedade'
                  placeholderStyle={{ color: Colors.white }}
                  placeholderIconColor={Colors.black}
                  selectedValue={this.state.propertyType}
                  onValueChange={(value) => this.setState({ propertyType: value })}
                >
                  {this.addPickerItems(PropertyType)}
                </Picker>
              </View>
              <Text style={styles.title}>Tipologia</Text>
              <View style={styles.pkr}>
                <Picker
                  mode='dropdown'
                  iosIcon={<Icon name='ios-arrow-down-outline' />}
                  placeholder='Tipologia'
                  placeholderStyle={{ color: Colors.white }}
                  placeholderIconColor={Colors.black}
                  selectedValue={this.state.tipology}
                  onValueChange={(value) => this.setState({ tipology: value })}
                >
                  {this.addPickerItems(Tipology)}
                </Picker>
              </View>
              <Text style={styles.title}>Área Útil (m2)</Text>
              <View style={styles.iptGrp}>
                <View style={[styles.halfIpt, { marginRight: 2.5 }]}>
                  <Input
                    placeholder='Mínimo'
                    keyboardType='numeric'
                    onChangeText={(value) => this.setState({ minArea: value })}
                    value={`${this.state.minArea}`} />
                </View>
                <View style={[styles.halfIpt, { marginLeft: 2.5 }]}>
                  <Input
                    placeholder='Máximo'
                    keyboardType='numeric'
                    onChangeText={(value) => this.setState({ maxArea: value })}
                    value={`${this.state.maxArea}`} />
                </View>
              </View>
              <Text style={styles.title}>Preço (€)</Text>
              <View style={styles.pkrGrp}>
                <View style={[styles.halfPkr, { marginRight: 2.5 }]}>
                  <Picker
                    mode='dropdown'
                    iosIcon={<Icon name='ios-arrow-down-outline' />}
                    placeholder='Mínimo'
                    placeholderIconColor='#007aff'
                    selectedValue={this.state.minPrice}
                    onValueChange={(value) => this.setState({ minPrice: value })}
                  >
                    {this.addPickerItems(MinPrice)}
                  </Picker>
                </View>
                <View style={[styles.halfPkr, { marginLeft: 2.5 }]}>
                  <Picker
                    mode='dropdown'
                    iosIcon={<Icon name='ios-arrow-down-outline' />}
                    placeholder='Máximo'
                    placeholderIconColor='#007aff'
                    selectedValue={this.state.maxPrice}
                    onValueChange={(value) => this.setState({ maxPrice: value })}
                  >
                    {this.addPickerItems(MaxPrice)}
                  </Picker>
                </View>
              </View>
              <Text style={styles.title}>Serviços Úteis</Text>
              <View style={styles.chcGrp}>
                <View style={styles.chcRow}>
                  <View style={[styles.qrtChc, { marginRight: 2.5, marginBottom: 2.5 }]}>
                    <Button block style={(this.state.hospital === false) ? styles.chc : styles.chcSlct} onPress={() => this.setState({ hospital: !this.state.hospital })}>
                      <Icon ios={'ios-heart-outline'} android={'md-heart-outline'} />
                      <Text style={styles.chcLbl}>Hospitais</Text>
                    </Button>
                  </View>
                  <View style={[styles.qrtChc, { marginLeft: 2.5, marginBottom: 2.5 }]}>
                    <Button block style={(this.state.school === false) ? styles.chc : styles.chcSlct} onPress={() => this.setState({ school: !this.state.school })}>
                      <Icon ios={'ios-book'} android={'md-book'} />
                      <Text style={styles.chcLbl}>Escolas</Text>
                    </Button>
                  </View>
                </View>
                <View style={styles.chcRow}>
                  <View style={[styles.qrtChc, { marginRight: 2.5, marginTop: 2.5 }]}>
                    <Button block style={(this.state.shopping === false) ? styles.chc : styles.chcSlct} onPress={() => this.setState({ shopping: !this.state.shopping })}>
                      <Icon ios={'ios-cart'} android={'md-cart'} />
                      <Text style={styles.chcLbl}>Shoppings</Text>
                    </Button>
                  </View>
                  <View style={[styles.qrtChc, { marginLeft: 2.5, marginTop: 2.5 }]}>
                    <Button block style={(this.state.transport === false) ? styles.chc : styles.chcSlct} onPress={() => this.setState({ transport: !this.state.transport })}>
                      <Icon ios={'ios-car'} android={'md-car'} />
                      <Text style={styles.chcLbl}>Transportes</Text>
                    </Button>
                  </View>
                </View>
              </View>
              <Text style={styles.title}>Local de Trabalho</Text>
              <View style={styles.ipt}>
                <Input
                  placeholder='Morada'
                  onChangeText={(value) => this.setState({ workLocation: value })}
                  value={this.state.workLocation} />
              </View>
              <Text note style={{ color: 'white', marginLeft: 15 }}>Distância Ideal</Text>
              <View style={styles.ipt}>
                <Input
                  placeholder='Máximo de (KM)'
                  keyboardType='numeric'
                  onChangeText={(value) => this.setState({ workDistance: value })}
                  value={`${this.state.workDistance}`} />
              </View>
              <Button style={[styles.btn, styles.done]} onPress={() => this.submitSearch()}>
                <Text>Mostrar Resultados</Text>
              </Button>
            </View>
          </Content>
        </Container>
      )
    } else {
      return (
        <View style={[activityStyle.container, activityStyle.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.login
  };
}


const connectedRegister = connect(mapStateToProps)(HouseSearch);
export { connectedRegister as HouseSearch };
