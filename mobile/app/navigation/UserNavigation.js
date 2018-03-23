import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Mainpage from '@components/Mainpage';


const UserNavigationStack = StackNavigator(
    {
        Mainpage: {screen: Mainpage}
    },

    {
        headerMode: 'none',
    });


export default DrawerNavigator(
    {
        UserNavigationStack: {screen: UserNavigationStack},
    },
    {
        gesturesEnabled: false,
        contentComponent: Mainpage,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        headerMode: 'none',
        drawerWidth: 300,
        drawerPosition: 'left',

    }
    );