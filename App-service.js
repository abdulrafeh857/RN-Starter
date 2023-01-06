import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import Preferences from 'Config/preferences';

const preferences = new Preferences();

const handleAppOpen = (remoteMessage) => {
  if (remoteMessage?.data) {
    console.log('Notification caused app to open:', remoteMessage?.data);
    if (remoteMessage?.data?.url) {
      console.log(
        'Rating reminder Notification Received:',
        remoteMessage?.data,
      );
      preferences.setNotification(remoteMessage);
    }
  }
};

const useAppService = () => {
  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) =>
      handleAppOpen(remoteMessage),
    );

    return () => unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        handleAppOpen(remoteMessage);
      });

    return () => unsubscribe;
  }, []);

  return;
};

export default useAppService;
