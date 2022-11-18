// import React from 'react';
// import { RootNavigator } from '@Navigation';

// import { Provider as ReduxProvider } from 'react-redux';
// import { store } from '@Redux';

// import { Provider as PaperProvider } from 'react-native-paper';
// import { theme } from '@Theme';
// import { NativeModules } from 'react-native';

// const App: React.FC = () => {
//   NativeModules.Device.getDeviceName((err: any, name: string) =>
//     console.log('\n\n\n\n\n . err, name', err, name)
//   );
//   return (
//     <ReduxProvider store={store}>
//       <PaperProvider theme={theme}>
//         <RootNavigator />
//       </PaperProvider>
//     </ReduxProvider>
//   );
// };

// export default App;
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  NativeModules,
  Button,
  StyleSheet
} from 'react-native';

const App = () => {
  // our custom method
  const { ReactOneCustomMethod } = NativeModules;
  NativeModules.Device.getDeviceName((err: any, name: string) =>
    console.log('\n\n\n\n\n getDeviceName . err, name ====== .  ', err, name)
  );
  const [id, setId] = useState('Press the button to get The ID');

  const getId = () => {
    ReactOneCustomMethod.getPhoneID()
      .then((res: string) => {
        setId('ID: ' + res);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.id}>{id}</Text>
      <Button title="Get Id" onPress={getId} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  id: {
    textAlign: 'center',
    marginBottom: 20
  }
});

export default App;
