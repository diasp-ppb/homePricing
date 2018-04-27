import { Images } from '../Themes';
import React, { Component } from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';


// Native Base
import { Container, Header, Left, Right, Body, Content, Button, Text, Icon, Item, Input, Segment, Card, CardItem } from 'native-base';

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
      markers: [],
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
    fetch(`${baseURL}/v1/houses`)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.setState({ houses: responseJson });
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
    const markers = [];
    for (let i = 0; i < this.state.houses.lengt; i++) {
      const marker = {
        latlong: {
          latitude: 41.1743668,
          longitude: -8.58457610000005,
        },
        amount: 40000,
        moreInfo: false,
      };
      markers.push(marker);
    }

    this.setState({ markers });
  }

  addMoreMarkers() {}

  moreInfo(marker) {
    const markers = this.state.markers;
    markers[marker].moreInfo = !markers[marker].moreInfo;
    this.setState({
      markers,
    });
  }


  renderTab() {

    const { navigate } = this.props.navigation;

    const tab = this.state.map ? (
      <Container style={{flex: 1, flexWrap: 'wrap'}}>
        <GPSMap
          region={this.state.region}
          showsUserLocation={false}
          addMoreMarkers={this.addMoreMarkers}
          markers={this.state.markers}
          navigate={navigate}
          moreInfo={this.moreInfo}
        />
      </Container>
    ) : (
      <View style={{ marginBottom: 20 }}>
        {
          this.state.houses.map((item, index) => {
            return (
              <Card key={index}>
                <CardItem button onPress={() => navigate('HouseInformation', { id: item.id })}>
                  <Left>
                    <Body>
                    <Text>{item.description}</Text>
                    <Text style={styles.address}>
                      <Icon ios="ios-pin" android="md-pin" style={styles.address} /> {item.address}
                    </Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image source={{ uri: item.imageURL }}
                         style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <CardItem>
                  <Left>
                    <Text style={styles.info}>
                      <Icon ios="ios-cash" android="md-cash" style={styles.info} /> {item.price}
                    </Text>
                  </Left>
                  <Right>
                    <Text style={styles.info}>
                      <Icon ios="ios-chatbubbles" android="md-chatbubbles" style={styles.info} /> {item.numComm}
                    </Text>
                  </Right>
                </CardItem>
              </Card>
            );
          })
        }
      </View>
    );

    return tab;
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
            active={!this.state.map}
            onPress={() => this.setState({ map: false })}
          >
            <Text>Lista</Text>
          </Button>
          <Button
            last
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
