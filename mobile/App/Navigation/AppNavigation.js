import { StackNavigator } from 'react-navigation';

import UserStack from './UserNavigation';
import VisitorStack from './VisitorNavigation';

const PrimaryNav = StackNavigator({
  userStack: { screen: UserStack },
  visitorStack: { screen: VisitorStack },
}, {
  headerMode: 'none',
  initialRouteName: 'visitorStack'
});

export default PrimaryNav;

