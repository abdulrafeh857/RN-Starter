import React, { useEffect, useState } from 'react';
import { RootNavigator } from './App/Navigation';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './App/Store/Redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './App/Theme';
// import InternetConnectionAlert from 'react-native-internet-connection-alert';
import Toast from 'react-native-toast-notifications';
import { ToastProvider } from 'react-native-toast-notifications';
import FlashMessage from 'react-native-flash-message';
import VersionCheck from 'react-native-version-check';
import ReactNativeModal from 'react-native-modal';
import { Linking, Text, View } from 'react-native';
import { FlashMessage as FlMessage } from './App/Components/Molecules';
import ModalAppUpdate from './App/Components/Molecules/ModalAppUpdate';
import ErrorBoundary from './App/Components/ErrorBoundary';
const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [storeUrl, setStoreUrl] = useState('');

  useEffect(() => {
    // checkVersion();
  }, []);
  const checkVersion = async () => {
    try {
      // Get current version from the app store
      const latestVersion = await VersionCheck.getLatestVersion();
      const currentVersion = VersionCheck.getCurrentVersion();

      // Check if the current version is the same as the latest version
      if (latestVersion !== currentVersion) {
        console.log('Versions do not match');
        // Set to false if versions don't match
        setModalVisible(true); // Show the modal to inform the user
      } else {
        console.log('\n\n\n latestVersion', latestVersion, currentVersion);
        console.log('Versions match');
      }
    } catch (error) {
      console.error('Version check failed:', error);
    }
  };

  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <PaperProvider theme={theme}>
          {/* <InternetConnectionAlert
            title={'No Internet Connection...'}
            message={'You are offline. Please check your internet connection.'}
            onChange={connectionState => {
              // console.log('\n\n  INTERNET Connection State: ', connectionState);
            }}> */}
            <FlashMessage position="top" />
            <ToastProvider>
              <RootNavigator />

              <Toast ref={ref => (global['toast'] = ref)} />
            </ToastProvider>
          {/* </InternetConnectionAlert> */}
        </PaperProvider>
      </ReduxProvider>
      <ModalAppUpdate
          onBackdropPress={() => {}}
          onBackButtonPress={() => {}} // removed because user close modal by cancel button
          onUpdatePress={async() => {
            console.log('Update Pressed');
            let isNeededUpdate = await VersionCheck.needUpdate();
            // const storeUrl = VersionCheck.getStoreUrl();
            console.log('storeUrl', isNeededUpdate?.storeUrl);
            Linking.canOpenURL(isNeededUpdate?.storeUrl).then(supported => {
              if (supported) {
                Linking.openURL(isNeededUpdate?.storeUrl);
              } 
              else {
                FlMessage({
                  message: 'Error',
                  description: 'Unable to open store url',
                  type: 'danger'
                });
              }
            });
           
            // setModalVisible(false);
            // const storeUrl = VersionCheck.getStoreUrl();  // Get the app store URL for the app
            // Linking.openURL(storeUrl);
            //   } else {
            //     FlashMessage({
            //       message: 'Error',
            //       description: 'Unable to open store url',
            //       type: 'danger'
            //     });
            //   }
            // });
          }}
          onCancelPress={() => setModalVisible(false)}
          isVisible={modalVisible}></ModalAppUpdate>
    </ErrorBoundary>
  );
};

export default App;

// "react-native-dropdownalert": "^5.2.0",
   
// "react-native-internet-connection-alert": "^0.1.9",
