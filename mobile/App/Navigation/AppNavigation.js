import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  Launch: { screen: LaunchScreen },
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  UserProfileScreen: {screen: UserProfileScreen}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
