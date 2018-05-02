import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button, Container, Content, Picker, Icon, Input, Item } from 'native-base'
import Metrics from '../Themes/Metrics'

// Styles
import Colors from '../Themes/Colors'
import styles from './Styles/UserPreferencesStyles'

const Goal = [
    { value: 'alugar', label: 'Alugar' },
    { value: 'comprar', label: 'Comprar' }
]

const PropertyType = [
    { value: 'casa', label: 'Casa' },
    { value: 'apartamento', label: 'Apartamento' }
]

const Tipology = [
    { value: 't0', label: 'T0' },
    { value: 't1', label: 'T1' },
    { value: 't2', label: 'T2' },
    { value: 't3', label: 'T3' },
    { value: 't4', label: 'T4' },
    { value: 't5', label: 'T5' },
    { value: 't5+', label: 'T5+' }
]

export default class UserPreferences extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Preferências de utilizador',
      });
    
    constructor (props) {
        super(props)
        this.state = {
            goal: undefined,
            propertyType: undefined,
            tipology: undefined,
            minArea: undefined,
            maxArea: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            hospitalDist: undefined,
            hospitalQtn: undefined,
            schoolDist: undefined,
            schoolQtn: undefined,
            workPlace: undefined,
            workDistance: undefined
        }
    }

    addPickerItems = (items) => {
        return items.map((item, key) => {
          return (
            <Picker.Item key={key} label={item.label} value={item.value} />
          )
        })
    }

    render () {
        return (
            <Container>
                <Content>
                    <View style={styles.root}>
                        <Text style={styles.mainTitle}>Preferências de casa</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: Metrics.baseMargin}}>
                            <View style={{flex:.4, marginLeft: Metrics.baseMargin}}>
                                <Text style={styles.title}>Finalidade: </Text>
                            </View>
                            <View style={[styles.pickerBackground, {marginLeft: Metrics.baseMargin, marginRight: Metrics.baseMargin, flex: .6}]}>
                            <Picker
                                    mode='dropdown'
                                    iosIcon={<Icon name='ios-arrow-down-outline' />}
                                    placeholder='Finalidade'
                                    selectedValue={this.state.goal}
                                    onValueChange={(value) => this.setState({goal: value})}
                                >
                                    {this.addPickerItems(Goal)}
                                </Picker>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: Metrics.baseMargin}}>
                            <View style={{flex:.4, marginLeft: Metrics.baseMargin}}>
                                <Text style={styles.title}>Tipo: </Text>
                            </View>
                            <View style={[styles.pickerBackground, {marginLeft: Metrics.baseMargin, marginRight: Metrics.baseMargin, flex: .6}]}>
                            <Picker
                                    mode='dropdown'
                                    iosIcon={<Icon name='ios-arrow-down-outline' />}
                                    placeholder='Tipo de propriedade'
                                    selectedValue={this.state.propertyType}
                                    onValueChange={(value) => this.setState({propertyType: value})}
                                >
                                    {this.addPickerItems(PropertyType)}
                                </Picker>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: Metrics.baseMargin}}>
                            <View style={{flex:.4, marginLeft: Metrics.baseMargin}}>
                                <Text style={styles.title}>Tipologia: </Text>
                            </View>
                            <View style={[styles.pickerBackground, {marginLeft: Metrics.baseMargin, marginRight: Metrics.baseMargin, flex: .6}]}>
                                <Picker
                                    mode='dropdown'
                                    iosIcon={<Icon name='ios-arrow-down-outline' />}
                                    placeholder='Tipologia'
                                    selectedValue={this.state.tipology}
                                    onValueChange={(value) => this.setState({tipology: value})}
                                >
                                    {this.addPickerItems(Tipology)}
                                </Picker>
                            </View>
                        </View>

                        <View style={[styles.SideBySide, {marginTop: Metrics.baseMargin} ]}>
                            <View style={{flex:.4, marginLeft: Metrics.baseMargin}}>
                                <Text style={styles.title}>Área Útil (m2): </Text>
                            </View>
                            <View style={{marginLeft: Metrics.baseMargin, marginRight: Metrics.baseMargin, flex: .6}}>
                                <View style={styles.SideBySide}>
                                        <Input
                                            style={[styles.input]} 
                                            placeholder='Mínimo' 
                                            keyboardType='numeric'
                                            onChangeText={(value) => this.setState({minArea: value})}
                                            />
                                        <Input 
                                            style={[styles.input, {marginLeft: Metrics.baseMargin}]} 
                                            placeholder='Máximo' 
                                            keyboardType='numeric'
                                            onChangeText={(value) => this.setState({maxArea: value})}
                                        />
                                </View>
                            </View>
                        </View>

                        <View style={[styles.SideBySide, {marginTop: Metrics.baseMargin} ]}>
                            <View style={{flex:.4, marginLeft: Metrics.baseMargin}}>
                                <Text style={styles.title}>Preço: </Text>
                            </View>
                            <View style={{marginLeft: Metrics.baseMargin, marginRight: Metrics.baseMargin, flex: .6}}>
                                <View style={styles.SideBySide}>
                                        <Input 
                                            style={styles.input} 
                                            placeholder='Mínimo' 
                                            keyboardType='numeric'
                                            onChangeText={(value) => this.setState({minPrice: value})}
                                        />
                                        <Input 
                                            style={[styles.input, {marginLeft: Metrics.baseMargin}]}
                                            placeholder='Máximo'
                                            keyboardType='numeric'
                                            onChangeText={(value) => this.setState({maxPrice: value})}
                                        />
                                </View>
                            </View>
                        </View>                     

                        <View style={styles.separator} />

                        <Text style={styles.mainTitle}>Serviços úteis</Text>

                        <View style={[styles.SideBySide, {marginTop: Metrics.baseMargin}]}>
                            <View style={{marginLeft: Metrics.baseMargin, flex: 0.3}}>
                                <Text style={styles.title}>Hospital: </Text>
                            </View>

                            <View style={[styles.SideBySide, {flex: 0.7, marginTop: Metrics.baseMargin, marginLeft: Metrics.baseMargin, marginRight: Metrics.baseMargin}]}>
                                <View style={[styles.input,{flex: 0.3}]}>
                                    <Input 
                                        placeholder='Distância' 
                                        keyboardType='numeric'
                                        onChangeText={(value) => this.setState({hospitalDist: value})}
                                    />
                                </View>

                                <View style={{flex: 0.1}}>
                                    <Text>km</Text>
                                </View>

                                <View style={[styles.input, {flex: 0.3}]}>
                                    <Input
                                        placeholder='n/a'
                                        keyboardType='numeric'
                                        onChangeText={(value) => this.setState({hospitalQtn: value})}
                                    />
                                </View>

                                <View style={{flex: 0.3}}>
                                    <Text>na área da propriedade</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.SideBySide, {marginTop: Metrics.baseMargin}]}>
                            <View style={{marginLeft: Metrics.baseMargin, flex: 0.3}}>
                                <Text style={styles.title}>Escola: </Text>
                            </View>

                            <View style={[styles.SideBySide, {flex: 0.7, marginTop: Metrics.baseMargin, marginLeft: Metrics.baseMargin, marginRight: Metrics.baseMargin}]}>
                                <View style={[styles.input,{flex: 0.3}]}>
                                    <Input 
                                        placeholder='Distância' 
                                        keyboardType='numeric'
                                        onChangeText={(value) => this.setState({schoolDist: value})}
                                    />
                                </View>

                                <View style={{flex: 0.1}}>
                                    <Text>km</Text>
                                </View>

                                <View style={[styles.input, {flex: 0.3}]}>
                                    <Input
                                        placeholder='n/a'
                                        keyboardType='numeric'
                                        onChangeText={(value) => this.setState({schoolQtn: value})}
                                    />
                                </View>

                                <View style={{flex: 0.3}}>
                                    <Text>na área da propriedade</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.separator} />

                        <Text style={styles.mainTitle}>As minhas preferências</Text>

                        <View style={[styles.SideBySide, {marginTop: Metrics.baseMargin}]}>
                            <View style={{marginLeft: Metrics.baseMargin, flex: 0.4}}>
                                <Text style={styles.title}>Local de trabalho: </Text>
                            </View>

                            <View style={[styles.SideBySide, styles.input, {flex: 0.7, marginTop: Metrics.baseMargin, marginLeft: Metrics.baseMargin, marginRight: Metrics.baseMargin}]}>
                                <Input
                                        placeholder='Morada do local de trabalho'
                                        onChangeText={(value) => this.setState({workPlace: value})}
                                />                            
                            </View>
                        </View>

                        <View style={[styles.SideBySide, {marginTop: Metrics.baseMargin}]}>
                            <View style={{marginLeft: Metrics.baseMargin, flex: 0.4}}>
                                <Text style={styles.title}>Distância ideal: </Text>
                            </View>

                            <View style={[styles.SideBySide, {flex: 0.7, marginTop: Metrics.baseMargin, marginLeft: Metrics.baseMargin, marginRight: Metrics.baseMargin}]}>
                                <Input
                                        style={styles.input}
                                        placeholder='Distância'
                                        keyboardType='numeric'
                                        onChangeText={(value) => this.setState({workDistance: value})}
                                />
                                <Text>km</Text>                            
                            </View>
                        </View>

                        <View style={{margin: Metrics.doubleBaseMargin}}>
                            <Button style={[styles.serviceButtonSelected, {alignSelf: 'center', width: Metrics.screenWidth * 0.5, height: 50}]} onPress={() => this.submitSearch()}>
                            <Text style={[styles.serviceButtonTextSelected, {fontSize: 15}]}>Alterar preferências</Text>
                            </Button>
                        </View>

                    </View>
                </Content>
            </Container>
        )
    }
}