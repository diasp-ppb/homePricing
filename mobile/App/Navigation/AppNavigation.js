import { StackNavigator } from 'react-navigation'

// Import all screens
import LaunchScreen from '../Containers/LaunchScreen'
import SearchResults from '../Containers/SearchResults'
import { RegisterScreen } from '../Containers/RegisterScreen'
import { UserProfileScreen} from '../Containers/UserProfileScreen'
import { LoginScreen } from '../Containers/LoginScreen'
import HouseInfScreen from '../Containers/HouseInfScreen'
import HouseSearch from '../Containers/HouseSearch'
import GpsScreen from '../Containers/GpsScreen'
import CameraScreen from '../Containers/CameraScreen'
import { UserPreferences } from '../Containers/UserPreferences'
import Favorites from '../Containers/FavoritesScreen'
import HelpScreen from '../Containers/HelpScreen'

import Colors from '../Themes/Colors'

// Styles
import styles from './Styles/NavigationStyles'

const navigationOptions = ({ navigation }) => ({
  headerStyle: { backgroundColor: Colors.blue4 },
  headerTintColor: 'white',
  headerBackTitle: null,
});

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  SearchResults: { screen: SearchResults },
  UserProfile: {screen: UserProfileScreen},
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  HouseSearch: { screen: HouseSearch},
  HouseInformation: { screen: HouseInfScreen },
  Gps: { screen: GpsScreen},
  Camera : {screen: CameraScreen},
  UserPreferences: { screen: UserPreferences},
  Favorites: {screen: Favorites},
  HelpScreen: { screen: HelpScreen }
}, {
  // Default config for all screens
  headerMode: 'float',
  navigationOptions,
  initialRouteName: 'HelpScreen'
})

export default PrimaryNav

