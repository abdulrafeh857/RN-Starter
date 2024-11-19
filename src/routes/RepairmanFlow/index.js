import { RepairmanProfile, AcceptedOrders, RepairmanPro } from '../../screens';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomeDrawar from '../Drawer';
import { responsiveWidth } from 'react-native-responsive-dimensions';
const Drawer = createDrawerNavigator();
const RepairmanApp = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'slide',
        swipeEnabled: true,
        drawerStyle: {
          backgroundColor: '#fff',
          width: responsiveWidth(75)
        }
      }}
      drawerContent={props => <CustomeDrawar {...props} />}
      initialRouteName="RepairmanProfile">
      <Drawer.Screen name={'RepairmanProfile'} component={RepairmanProfile} />
      <Drawer.Screen name={'AcceptedOrders'} component={AcceptedOrders} />
      <Drawer.Screen name={'RepairmanPro'} component={RepairmanPro} />
    </Drawer.Navigator>
  );
};
export default RepairmanApp;
