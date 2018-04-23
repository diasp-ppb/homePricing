import { StackNavigator } from 'react-navigation'
import { LaunchScreen } from '../Containers/LaunchScreen'
import { LoginScreen } from '../Containers/LoginScreen'
import { RegisterScreen } from '../Containers/RegisterScreen'
import { UserProfileScreen} from '../Containers/UserProfileScreen'
import HouseSearch from '../Containers/HouseSearch'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  Launch:      { screen: LaunchScreen },
  UserProfile: { screen: UserProfileScreen},
  Login:       { screen: LoginScreen },
  Register:    { screen: RegisterScreen },
  HouseSearch: { screen: HouseSearch},
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Launch',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav

