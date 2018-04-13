import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import HouseInfScreen from '../Containers/HouseInfScreen'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  HouseInfScreen: { screen: HouseInfScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'HouseInfScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
