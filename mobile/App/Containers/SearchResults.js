import React, { Component } from 'react';
import { Image, ScrollView } from 'react-native';


// Native Base
import { Container, Header, Left, Body, Button, Text, Icon, Item, Input, Segment, Card, CardItem } from 'native-base';

// Styles
import styles from './Styles/SearchResultsStyles';
import { baseURL } from '../Services/Api';
import GPSMap from '../Components/GPSMap';


// Component
export default class LaunchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Pesquisa',
  });

  // This component's constructor
  constructor(props) {
    super(props);
    this.state = {
      houses: [],
      map: false,
      region: {
        latitude: 41.1743667,
        longitude: -8.58457610000005,
        latitudeDelta: 0.0050,
        longitudeDelta: 0.0025,
      },
    };

    this.addMoreMarkers = this.addMoreMarkers.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
  }

  // Fetch data here
  componentDidMount() {
    const { navigation } = this.props;
    const form = navigation.state.params.form;

    fetch(`${baseURL}/v1/houses/filter`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        return response.json();
      })
      .then((houses) => {
        this.setState({ houses });
        this.generateMarkers();
      })
      .catch((json) => {
        console.error(json);
      });
  }

  // Clear data here
  componentWillUnmount() {
    this.setState({ houses: [] });
  }

  generateMarkers() {

    let minLat = 1000;
    let maxLat = -1000;
    let minLong = 1000;
    let maxLong = -1000;

    const houses = this.state.houses;

    if (houses.length < 1) return;

    for (let i = 0; i < houses.length; i++) {
      const house = houses[i];
      const lat = parseFloat(house.coordinates[0]);
      const long = parseFloat(house.coordinates[1]);

      if (minLat > lat) {
        minLat = lat;
      }
      if (maxLat < lat) {
        maxLat = lat;
      }
      if (minLong > long) {
        minLong = long;
      }
      if (maxLong < long) {
        maxLong = long;
      }

      house.moreInfo = false;
    }

    const deltaLong = maxLong - minLong;
    const deltaLat = maxLat - minLat;

    const region = {...this.state.region};
    region.latitudeDelta = deltaLat;
    region.longitudeDelta = deltaLong;
    region.latitude = minLat + (deltaLat / 2);
    region.longitude = minLong + (deltaLong / 2);

    this.setState({region: region, houses: houses});
  }


  addMoreMarkers(region) {
    this.setState({ region });
  }

  moreInfo(house) {
    const houses = this.state.houses;
    houses[house].moreInfo = !houses[house].moreInfo;
    this.setState({ houses });
  }

  renderResultList() {
    return this.state.houses.length > 0 ? this.state.houses.map((item, index) => {
      return (
        <Card key={index} style={{ flex: 1 }}>
          <CardItem button onPress={() => navigate('HouseInformation', { house: item })}>
            <Left>
              <Body>
              <Text>{item.title}</Text>
              <Text style={styles.address}>
                <Icon ios="ios-pin" android="md-pin" style={styles.address} />
                {item.address.zipcode},
                {item.address.town},
                {item.address.county}
              </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{ uri: item.images[0] }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Text style={styles.info}>
                <Icon ios="ios-cash" android="md-cash" style={styles.info} /> {item.price} €
              </Text>
            </Left>
          </CardItem>
        </Card>
      )
    }) : (<Text> A sua pesquisa nao obteve resultados </Text>);
  }

  renderTab() {
    const { navigate } = this.props.navigation;

    return this.state.map === true ? (
      <Container style={{ flex: 1, flexWrap: 'wrap' }}>
        <GPSMap
          region={this.state.region}
          showsUserLocation={false}
          addMoreMarkers={this.addMoreMarkers}
          houses={this.state.houses}
          navigate={navigate}
          moreInfo={this.moreInfo}
        />
      </Container>
    ) : (
      <ScrollView style={{ marginBottom: 20, flex: 1 }}>
        {
          this.renderResultList()
        }
      </ScrollView>
    );
  }


  // Render the screen
  render() {
    return (
      <Container>
        <Header searchBar rounded hasSegment>
          <Item>
            <Icon ios="ios-search" android="md-search" />
            <Input placeholder="Pesquisar Anúncios" />
          </Item>
        </Header>
        <Segment>
          <Button
            first
            title={"Lista"}
            active={!this.state.map}
            onPress={() => this.setState({ map: false })}
          >
            <Text>Lista</Text>
          </Button>
          <Button
            last
            title={"Mapa"}
            active={this.state.map}
            onPress={() => this.setState({ map: true })}
          >
            <Text>Mapa</Text>
          </Button>
        </Segment>
        {this.renderTab()}
      </Container>
    );
  }
}
