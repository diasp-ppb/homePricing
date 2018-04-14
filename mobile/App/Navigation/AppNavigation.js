import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import UserProfileScreen from '../Containers/UserProfileScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  UserProfileScreen: {screen: UserProfileScreen}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'UserProfileScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
