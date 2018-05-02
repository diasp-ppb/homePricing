import { StackNavigator } from 'react-navigation'

// Import all screens
import LaunchScreen from '../Containers/LaunchScreen'
import SearchResults from '../Containers/SearchResults'
import { RegisterScreen } from '../Containers/RegisterScreen'
import { UserProfileScreen} from '../Containers/UserProfileScreen'
import { LoginScreen } from '../Containers/LoginScreen'
import  HouseInfScreen from '../Containers/HouseInfScreen'
import HouseSearch from '../Containers/HouseSearch'
import HistoricScreen2 from '../Containers/HistoricScreen2'
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
  HouseInfScreen: { screen: HouseInfScreen },
  HouseSearch: { screen: HouseSearch},
  HistoricScreen2: { screen: HistoricScreen2},
}, {
  // Default config for all screens
  headerMode: 'float',
  navigationOptions,
  initialRouteName: 'HistoricScreen2'
})

export default PrimaryNav

