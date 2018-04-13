import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import HouseSearch from '../Containers/HouseSearch'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  HouseSearch: {screen: HouseSearch}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'HouseSearch',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
