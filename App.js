import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {RootNavigator} from 'Navigators';
import store from 'Store';
import {ThemeContext, getTheme} from 'react-native-material-ui';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import {Provider as PaperProvider} from 'react-native-paper';
import {materialTheme, paperTheme} from './App-utils';
import useAppService from './App-service';
import {StripeProvider} from '@stripe/stripe-react-native';
import {STRIPE_API_KEY} from './keys';
import SplashScreen from 'react-native-splash-screen';

import { Text, View } from 'react-native';

const App = () => {
  // useAppService();
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <Provider store={store}>
      <StripeProvider
        merchantIdentifier="merchant.com.drop.online.co.uk"
        publishableKey={STRIPE_API_KEY}>
        <PaperProvider theme={paperTheme}>
          <ThemeContext.Provider value={getTheme(materialTheme)}>
            <InternetConnectionAlert
              payload={{}}
              tapToCloseEnabled={true}
              updateStatusBar={false}
              errorColor="#ff646a">
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </InternetConnectionAlert>
          </ThemeContext.Provider>
        </PaperProvider>
      </StripeProvider>
    </Provider>

  );
};

export default App;
