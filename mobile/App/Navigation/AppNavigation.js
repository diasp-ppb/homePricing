import { StackNavigator } from 'react-navigation'
import { LaunchScreen } from '../Containers/LaunchScreen'
import { LoginScreen } from '../Containers/LoginScreen'
import { RegisterScreen } from '../Containers/RegisterScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  Launch: { screen: LaunchScreen },
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Launch',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
