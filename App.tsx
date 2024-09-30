import React from 'react';
import { RootNavigator } from '@Navigation';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@Redux';
import { PaperProvider } from 'react-native-paper';
import { theme } from './App/Theme';

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme as any}>
        <RootNavigator />
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
