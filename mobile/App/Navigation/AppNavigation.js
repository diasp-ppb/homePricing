import { StackNavigator } from 'react-navigation'

// Import all screens
import LaunchScreen from '../Containers/LaunchScreen'
import { SearchResults } from '../Containers/SearchResults'
import { RegisterScreen } from '../Containers/RegisterScreen'
import { UserProfileScreen} from '../Containers/UserProfileScreen'
import { LoginScreen } from '../Containers/LoginScreen'
import HouseInfScreen from '../Containers/HouseInfScreen'
import HouseSearch from '../Containers/HouseSearch'
import { HistoricScreen2 } from '../Containers/HistoricScreen2'
import GpsScreen from '../Containers/GpsScreen'
import CameraScreen from '../Containers/CameraScreen'
import { UserPreferences } from '../Containers/UserPreferences'
import Favorites from '../Containers/FavoritesScreen'
import HelpScreen from '../Containers/HelpScreen'
import PreferenceScreen from '../Containers/PreferenceScreen'

import Colors from '../Themes/Colors'

// Styles
import styles from './Styles/NavigationStyles'

const navigationOptions = ({ navigation }) => ({
  headerStyle: { backgroundColor: '#1a1a1a' },
  headerTintColor: '#f2f2f2',
  fontSize: 6,
  textAlignVertical: 'center',
  headerTitleStyle: {
    fontSize: 12,
  }
});

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  SearchResults: { screen: SearchResults },
  UserProfile: {screen: UserProfileScreen},
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  HouseSearch: { screen: HouseSearch},
  HistoricScreen: { screen: HistoricScreen2},
  HouseInformation: { screen: HouseInfScreen },
  Gps: { screen: GpsScreen},
  Camera : {screen: CameraScreen},
  UserPreferences: { screen: UserPreferences},
  Favorites: {screen: Favorites},
  HelpScreen: { screen: HelpScreen },
  PreferenceScreen: { screen: PreferenceScreen},
}, {
  // Default config for all screens
  headerMode: 'float',
  navigationOptions,
  initialRouteName: 'LaunchScreen'
});

export default PrimaryNav

