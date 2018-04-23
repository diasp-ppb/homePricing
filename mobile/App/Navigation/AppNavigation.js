import { StackNavigator } from 'react-navigation'
import { LaunchScreen } from '../Containers/LaunchScreen'
import { LoginScreen } from '../Containers/LoginScreen'
import { RegisterScreen } from '../Containers/RegisterScreen'
import { UserProfileScreen} from '../Containers/UserProfileScreen'

import {HouseInfScreen} from '../Containers/HouseInfScreen'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  Launch: { screen: LaunchScreen },
  UserProfile: {screen: UserProfileScreen},
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  HouseInfScreen: { screen: HouseInfScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Launch'
})

export default PrimaryNav

