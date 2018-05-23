import React from 'react'
import { View } from 'react-native'

import { StackNavigator, DrawerNavigator } from 'react-navigation'
import ControlPanel from '../Containers/ControlPanel/ControlPanel'


// Import all screens
import { LaunchScreen } from '../Containers/LaunchScreen'
import SearchResults from '../Containers/SearchResults'
import { RegisterScreen } from '../Containers/RegisterScreen'
import { LoginScreen } from '../Containers/LoginScreen'
import HouseInfScreen from '../Containers/HouseInfScreen'
import HouseSearch from '../Containers/HouseSearch'
import GpsScreen from '../Containers/GpsScreen'
import CameraScreen from '../Containers/CameraScreen'
import { UserPreferences } from '../Containers/UserPreferences'
import { FavoritesScreen } from '../Containers/FavoritesScreen'
import HelpScreen from '../Containers/HelpScreen'
import { HistoricScreen } from '../Containers/HistoricScreen'
import PreferenceScreen from '../Containers/PreferenceScreen'
import UserSettingsScreen from '../Containers/UserSettingsScreen'

import Colors from '../Themes/Colors'

// Styles
import styles from './Styles/NavigationStyles'

const navigationOptions = ({ navigation }) => ({
  headerStyle: { backgroundColor: '#1a1a1a' },
  headerTitleStyle: { alignSelf: 'center' },
  headerRight: (<View />),
  headerTintColor: '#f2f2f2',
  fontSize: 6,
  textAlignVertical: 'center'
});

// Manifest of possible screens
const visitorStack = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  SearchResults: { screen: SearchResults },
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  HouseSearch: { screen: HouseSearch},
  HouseInformation: { screen: HouseInfScreen },
  Gps: { screen: GpsScreen},
  Camera : {screen: CameraScreen},
  UserPreferences: { screen: UserPreferences},
  Favorites: {screen: FavoritesScreen},
  HelpScreen: { screen: HelpScreen },
  PreferenceScreen: { screen: PreferenceScreen},
  HistoricScreen: { screen: HistoricScreen},
  UserSettings: { screen: UserSettingsScreen }
}, {
  // Default config for all screens
  headerMode: 'float',
  navigationOptions,
  initialRouteName: 'LaunchScreen'
});

export default visitorStack;
