import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import ImageSlider from 'react-native-image-slider';
import ImageZoom from 'react-native-image-pan-zoom';

import { Images } from '../Themes';
import { baseURL, createFavoriteAPI, deleteFavoriteAPI } from '../Services/Api';

// Native Base
import { Container, Content, Text, Button, Icon } from 'native-base';

import GPSMap from '../Components/GPSMap';

// Styles
import styles from './Styles/HouseInfScreenStyles';

class HouseInfScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Informação da casa',
  });

  constructor(props) {
    super(props);
    this.state = {
      currURL: '',
      showImg: false,
      favorite: false,
      showOnMap: false,
      infTabHeight: 0
    };

    this.changeFavorite = this.changeFavorite.bind(this);
    this.addMoreMarkers = this.addMoreMarkers.bind(this);
    this.moreInfo = this.moreInfo.bind(this);

  }

  componentDidMount() {
    let houseId = this.props.navigation.state.params.house._id;
    let house = this.props.navigation.state.params.house;
    house.moreInfo = false;

    this.setState({
      region: {
        latitude: house.coordinates[0],
        longitude: house.coordinates[1],
        latitudeDelta: 0.0050,
        longitudeDelta: 0.0025,
      },
      houses: [house],
    });

    if (houseId == undefined) {
      houseId = this.props.navigation.state.params.house.id;
    }

    if (this.props.user.loggedIn) {
      this.addHistory(houseId);
      this.isFavorite(this.props.user.user.id, this.props.user.token, houseId);
    }
  }

  addMoreMarkers(region) {
    this.setState({ region });
  }

  addHistory(houseId) {
    if (this.props.user.loggedIn) {
      fetch(`${baseURL}/v1/history`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ houseId, userId: this.props.user.user.id }),
      })
        .catch((json) => {
          console.error(json);
        });
    }
  }

  changeFavorite = () => {
    let houseId = this.props.navigation.state.params.house._id;

    if (houseId == undefined) {
      houseId = this.props.navigation.state.params.house.id;
    }

    let aux = false;
    if (this.state.favorite) {
      aux = false;
      deleteFavoriteAPI(this.props.user.user.id, houseId, this.props.user.token);
    } else {
      aux = true;
      createFavoriteAPI(this.props.user.user.id, houseId, this.props.user.token);
    }
    this.setState({ favorite: aux });
  }

  async isFavorite(id, token, houseId) {
    const auth = `Bearer ${token}`;
    try {
      const response = await fetch(`${baseURL}/v1/favorites`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: auth,
        },
        body: JSON.stringify({
          userId: id,
        }),
      });
      const responseJson = await response.json();

      for (let i = 0; i < responseJson.length; i++) {
        if (responseJson[i].houseId == houseId) {
          this.setState({ favorite: true });
          return;
        }
      }
      return;
    } catch (error) {
      console.error(error);
    }
  }

  moreInfo(house) {
    const houses = this.state.houses;
    houses[house].moreInfo = !houses[house].moreInfo;
    this.setState({ houses });
  }

  renderIf() {
    if (this.state.showImg) {
      return (
        <ImageZoom
          imageWidth={400}
          imageHeight={400}
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
        >
          <Image source={{ uri: this.state.currURL }} style={(this.state.showImg) ? styles.pressImg : null} />
        </ImageZoom>
      )
    }
  }

  render() {
    const {navigation} = this.props;
    const {navigate} = this.props.navigation;
    const house = this.props.navigation.state.params.house;
    const undefined = 'Não definido';
    const images = (house.images.length > 0) ? house.images : ['https://www.glassyconnections.com/images/no-image-available-lrg.jpg'];
    const star = (
      <TouchableOpacity onPress={() => this.changeFavorite()}>
        <Image source={this.state.favorite ? Images.greenStar : Images.greenStarLines} style={styles.star}/>
      </TouchableOpacity>
    );

    const houseDetails = (
      <Container>
        <ImageSlider images={images} onPress={(img) => {
          this.setState({ showImg: true })
          this.setState({ currURL: img.image })
        }} />

        <View style={[styles.infTab, { marginTop: this.state.infTabHeight }]} onLayout={(event) => {
          var h = event.nativeEvent.layout.height * -1
          this.setState({ infTabHeight: h })
        }}>
          <View style={styles.data}>
            <Text style={styles.priceText}> {house.price} € </Text>
            <Text style={styles.typeText}>.</Text>
          </View>
          {this.props.user.loggedIn ? star : <View />}
        </View>

        <View style={(this.state.showImg) ? styles.imgModal : null}>
          <Icon ios={'ios-close'} android={'md-close'} style={styles.closeImg} onPress={() => {
            this.setState({ currURL: '' })
            this.setState({ showImg: false })
          }} />
          {this.renderIf()}
        </View>

        <Content padder>
          <View style={styles.mainBox}>
            <View style={{ flex: 0.9 }}>
              <Text style={styles.title}>{house.title}</Text>
              <Text style={styles.streetText}>
                <Icon ios={'ios-pin'} android={'md-pin'} style={styles.streetText} />
                {' '}
                {house.address.zipcode}, {' '}
                {house.address.town}, {' '}
                {house.address.county}
              </Text>
            </View>
            <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }}>
              <Icon ios={'ios-map'} android={'md-map'} onPress={() => this.setState({ showOnMap: true })} />
            </View>
          </View>

          <View style={styles.box1}>
            <View style={{flex: 0.5}}>
              <Text style={styles.properties}>Área: </Text>
              <Text style={styles.properties}>WCs: </Text>
              <Text style={styles.properties}>Certificado Energia: </Text>
              <Text style={styles.properties}>Tipologia: </Text>
              <Text style={styles.properties}>Condições: </Text>
            </View>

            <View style={{flex: 0.5}}>
              <Text style={styles.data}>{house.area || undefined} </Text>
              <Text style={styles.data}>{house.bathrooms || undefined}</Text>
              <Text style={styles.data}>{house.energyCertificate || undefined}</Text>
              <Text style={styles.data}>{house.tipology || undefined}</Text>
              <Text style={styles.data}>{house.condition || undefined}</Text>
            </View>
          </View>

          <View style={styles.box2}>
            <View>
              <Text style={styles.descriptionTitle}> Descrição </Text>
              <Text style={styles.descriptionText}> {house.description.trim()} </Text>
            </View>
          </View>

          <View style={styles.box2}>
            <View>
              <Text style={styles.descriptionTitle}> Caraterísticas </Text>
              {house.characteristics.length != 0 && house.characteristics.map((item, index) => {
                return <Text key={index} style={styles.descriptionText}>&#9658; {item} </Text>;
              })}
              {house.characteristics.length == 0 && <Text style={styles.descriptionText}> {undefined} </Text>}
            </View>
          </View>

        </Content>
      </Container>);

    const mapDisplay = (
      <Container>
        <GPSMap
          region={this.state.region}
          showsUserLocation={false}
          addMoreMarkers={this.addMoreMarkers}
          houses={this.state.houses}
          navigate={navigate}
          moreInfo={this.moreInfo}
        />

        <Button primary full style={styles.btn} onPress={() => this.setState({showOnMap: false})}>
          <Text>Voltar para vista detalhada</Text>
        </Button>
      </Container>
    );

    const renderTab = this.state.showOnMap ? mapDisplay : houseDetails;

    return renderTab;
  }
}

function mapStateToProps(state) {
  return {
    user: state.login,
  };
}

const connectedRegister = connect(mapStateToProps)(HouseInfScreen);
export { connectedRegister as HouseInfScreen };
