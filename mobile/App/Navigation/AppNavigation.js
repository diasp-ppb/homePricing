import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import HomeInformation from '../Containers/HomeInformation'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  HomeInformation: { screen: HomeInformation }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'HomeInformation',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
