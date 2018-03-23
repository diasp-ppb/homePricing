import { StackNavigator } from 'react-navigation';

import UserStack from './UserNavigation';

const PrimaryNav = StackNavigator({
    userStack: { screen: UserStack },
}, {
    headerMode: 'none',
    initialRouteName: 'UserStack',
});

export default PrimaryNav;
