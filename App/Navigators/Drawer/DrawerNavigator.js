import React from 'react';
import {useSelector} from 'react-redux';
import {Dimensions} from 'react-native';
// Import Drawer Navigator
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Drawer Navigator Options
import DrawerNavigatorOptions from './DrawerNavigatorOptions';

// Import Screens
import HomeScreen from 'Views/Dashboard/_Dashboard';

// Declare Drawer Navigator Object
const Drawer = createDrawerNavigator();

const {width} = Dimensions.get('window');
const DrawerNavigator = () => {
  const {users} = useSelector((state) => state.Users);

  const drawerContent = (props) => {
    if (users)
      return (
        <DrawerNavigatorOptions.drawerContentExisting {...props} user={users} />
      );
    else return <DrawerNavigatorOptions.drawerContentNew {...props} />;
  };

  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerStyle={{width: width * 0.75}}
      drawerContent={(props) => drawerContent(props)}
      initialRouteName={'Home'}>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
