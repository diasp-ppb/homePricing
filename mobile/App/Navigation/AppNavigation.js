import { StackNavigator } from 'react-navigation'

// Import all screens
import LaunchScreen from '../Containers/LaunchScreen'
import SearchResults from '../Containers/SearchResults'
import { RegisterScreen } from '../Containers/RegisterScreen'
import { UserProfileScreen} from '../Containers/UserProfileScreen'
import { LoginScreen } from '../Containers/LoginScreen'
import  HouseInfScreen from '../Containers/HouseInfScreen'
import HouseSearch from '../Containers/HouseSearch'
import HistoricScreen from '../Containers/HistoricScreen'
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
  HouseInfScreen: { screen: HouseInfScreen },
  HouseSearch: { screen: HouseSearch},
  HistoricScreen: { screen: HistoricScreen},
}, {
  // Default config for all screens
  headerMode: 'float',
  navigationOptions,
  initialRouteName: 'UserProfile'
})

export default PrimaryNav

