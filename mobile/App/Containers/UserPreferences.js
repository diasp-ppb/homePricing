import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button, Container, Content, Picker, Icon, Input, Form } from 'native-base'
import { connect } from 'react-redux';

import Metrics from '../Themes/Metrics'
import { createBodyUserPreferences } from '../Services/Api'
import { updateUserPreferences, getUserPreferences } from '../Services/Api'
import { validateArea, validatePrices, validateServices } from "../Services/Api";

// Styles
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

class UserPreferences extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Preferências de utilizador',
      });

    constructor (props) {
        super(props)
        this.state = {
            getData: true,
            goal: undefined,
            propertyType: undefined,
            tipology: undefined,
            minArea: "",
            maxArea: "",
            minPrice: "",
            maxPrice: "",
            hospitalDist: "",
            hospitalQtn: "",
            schoolDist: "",
            schoolQtn: "",
            workPlace: undefined,
            workDistance: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        getUserPreferences(this);
    }

    addPickerItems = (items) => {
        return items.map((item, key) => {
          return (
            <Picker.Item key={key} label={item.label} value={item.value} />
          )
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        var validAreas = validateArea(this.state.minArea, this.state.maxArea);
        var validPrices = validatePrices(this.state.minPrice, this.state.maxPrice);
        var validServices = validateServices(this.state.hospitalDist, this.state.hospitalQtn,
            this.state.schoolDist, this.state.schoolQtn,
            this.state.workDistance);

        if(validAreas && validPrices && validServices) {
            var body = createBodyUserPreferences(this.state.goal, this.state.propertyType, this.state.tipology,
                this.state.minArea, this.state.maxArea,
                this.state.minPrice, this.state.maxPrice,
                this.state.hospitalDist, this.state.hospitalQtn,
                this.state.schoolDist, this.state.schoolQtn,
                this.state.workPlace, this.state.workDistance);

            updateUserPreferences(body, this.props);
        }
    }

    render () {
        return (
            <Container>
                <Content>
                    <View>
                        <Text style={styles.mainTitle}>Preferências de casa</Text>

                        <View style={styles.alignInput}>
                            <View style={styles.labelFlex1}>
                                <Text style={styles.label}>Finalidade: </Text>
                            </View>
                            <View style={styles.pickerFlex}>
                                <Form>
                                    <Picker
                                        mode='dropdown'
                                        iosIcon={<Icon name='ios-arrow-down-outline' />}
                                        placeholder='Finalidade'
                                        onValueChange={(value) => this.setState({goal: value})}
                                        selectedValue={this.state.goal}
                                    >
                                        <Picker.Item value='undefined' label='Finalidade' />
                                        {this.addPickerItems(Goal)}
                                    </Picker>
                                </Form>
                            </View>
                        </View>

                        <View style={styles.alignInput}>
                            <View style={styles.labelFlex1}>
                                <Text style={styles.label}>Tipo: </Text>
                            </View>
                            <View style={styles.pickerFlex}>
                                <Form>
                                    <Picker
                                        mode='dropdown'
                                        iosIcon={<Icon name='ios-arrow-down-outline' />}
                                        placeholder='Tipo de propriedade'
                                        selectedValue={this.state.propertyType}
                                        onValueChange={(value) => this.setState({propertyType: value})}
                                    >
                                        <Picker.Item value='' label='Tipo de propriedade' />
                                        {this.addPickerItems(PropertyType)}
                                    </Picker>
                                </Form>
                            </View>
                        </View>

                        <View style={styles.alignInput}>
                            <View style={styles.labelFlex1}>
                                <Text style={styles.label}>Tipologia: </Text>
                            </View>
                            <View style={styles.pickerFlex}>
                                <Picker
                                    mode='dropdown'
                                    iosIcon={<Icon name='ios-arrow-down-outline' />}
                                    placeholder='Tipologia'
                                    selectedValue={this.state.tipology}
                                    onValueChange={(value) => this.setState({tipology: value})}
                                >
                                    <Picker.Item value='undefined' label='Tipologia' />
                                    {this.addPickerItems(Tipology)}
                                </Picker>
                            </View>
                        </View>

                       <View style={styles.alignInput}>
                            <View style={styles.labelFlex1}>
                                <Text style={styles.label}>Área Útil (m2): </Text>
                            </View>
                            <View style={{marginLeft: Metrics.baseMargin, marginRight: Metrics.baseMargin, flex: .6}}>
                                <View style={styles.SideBySide}>
                                        <Input
                                            style={[styles.input]}
                                            placeholder='Mínimo'
                                            keyboardType='numeric'
                                            onChangeText={(value) => this.setState({minArea: value})}
                                            value={`${this.state.minArea}`}
                                            />
                                        <Input
                                            style={[styles.input, {marginLeft: Metrics.baseMargin}]}
                                            placeholder='Máximo'
                                            keyboardType='numeric'
                                            onChangeText={(value) => this.setState({maxArea: value})}
                                            value={`${this.state.maxArea}`}
                                        />
                                </View>
                            </View>
                        </View>

                        <View style={styles.alignInput}>
                            <View style={styles.labelFlex1}>
                                <Text style={styles.label}>Preço: </Text>
                            </View>
                            <View style={{marginLeft: Metrics.baseMargin, marginRight: Metrics.baseMargin, flex: .6}}>
                                <View style={styles.SideBySide}>
                                        <Input
                                            style={styles.input}
                                            placeholder='Mínimo'
                                            keyboardType='numeric'
                                            onChangeText={(value) => this.setState({minPrice: value})}
                                            value={`${this.state.minPrice}`}
                                        />
                                        <Input
                                            style={[styles.input, {marginLeft: Metrics.baseMargin}]}
                                            placeholder='Máximo'
                                            keyboardType='numeric'
                                            onChangeText={(value) => this.setState({maxPrice: value})}
                                            value={`${this.state.maxPrice}`}
                                        />
                                </View>
                            </View>
                        </View>

                        <View style={styles.separator} />

                        <Text style={styles.mainTitle}>Serviços úteis</Text>

                        <View style={styles.alignInput}>
                            <View style={styles.labelFlex2}>
                                <Text style={styles.label}>Hospital: </Text>
                            </View>

                            <View style={[styles.SideBySide, styles.serviceFlex]}>
                                <View style={[styles.input,{flex: 0.3}]}>
                                    <Input
                                        placeholder='Distância'
                                        keyboardType='numeric'
                                        onChangeText={(value) => this.setState({hospitalDist: value})}
                                        value={`${this.state.hospitalDist}`}
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
                                        value={`${this.state.hospitalQtn}`}
                                    />
                                </View>

                                <View style={{flex: 0.3}}>
                                    <Text>na área da propriedade</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.alignInput}>
                            <View style={styles.labelFlex2}>
                                <Text style={styles.label}>Escola: </Text>
                            </View>

                            <View style={[styles.SideBySide, styles.serviceFlex]}>
                                <View style={[styles.input, {flex: 0.3}]}>
                                    <Input
                                        placeholder='Distância'
                                        keyboardType='numeric'
                                        onChangeText={(value) => this.setState({schoolDist: value})}
                                        value={`${this.state.schoolDist}`}
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
                                        value={`${this.state.schoolQtn}`}
                                    />
                                </View>

                                <View style={{flex: 0.3}}>
                                    <Text>na área da propriedade</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.separator} />

                        <Text style={styles.mainTitle}>As minhas preferências</Text>

                        <View style={styles.alignInput}>
                            <View style={styles.labelFlex1}>
                                <Text style={styles.label}>Local de trabalho: </Text>
                            </View>

                            <View style={[styles.SideBySide, styles.pickerFlex]}>
                                <Input
                                        placeholder='Morada do local de trabalho'
                                        onChangeText={(value) => this.setState({workPlace: value})}
                                        value={this.state.workPlace}
                                />
                            </View>
                        </View>

                        <View style={styles.alignInput}>
                            <View style={styles.labelFlex1}>
                                <Text style={styles.label}>Distância ideal: </Text>
                            </View>

                            <View style={[styles.SideBySide, styles.workDistFlex]}>
                                <Input
                                        style={styles.input}
                                        placeholder='Distância'
                                        keyboardType='numeric'
                                        onChangeText={(value) => this.setState({workDistance: value})}
                                        value={`${this.state.workDistance}`}
                                />
                                <Text>km</Text>
                            </View>
                        </View>

                        <View style={{margin: Metrics.doubleBaseMargin}}>
                            <Button style={styles.buttonStyle} onPress = {this.handleSubmit}>
                                <Text style={styles.buttonTextStyle}>Alterar preferências</Text>
                            </Button>
                        </View>

                    </View>
                </Content>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.login
    };
}

  const connectedRegister = connect(mapStateToProps)(UserPreferences);
  export { connectedRegister as UserPreferences};
