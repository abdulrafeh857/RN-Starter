import React, { useEffect } from 'react';
import useStyles from './styles';
import { Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import { Drawer as CustomDrawer } from '@Templates';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from 'Components/Views/Dashboard';

// import AccountsTab from 'Navigation/Tab/AccountsTab';

const { width } = Dimensions.get('window');

const Drawer = createDrawerNavigator();
function Navigation(props: any) {
  const { headerHidden } = useStyles();

  // useEffect(() => {
  //   checkUserSession(props);
  // }, [props]);

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'back',
        drawerStyle: { width: width * 0.75 }
      }}
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName={'Home'}>
      {/* ACCOUNT SCREENS */}
      <Drawer.Screen name="Home" component={Dashboard} {...headerHidden} />
    </Drawer.Navigator>
  );
}

const App = props => {
  return <Navigation {...props} />;
};

export default App;
