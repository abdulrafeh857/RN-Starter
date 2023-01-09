// Imports
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import getVendors from '../../../Store/Actions/Vendors';
import messaging from '@react-native-firebase/messaging';
import sendFCMTokenService from 'Services/FCMToken';
import { RefreshControl } from 'react-native';
import { loadMore } from 'Services/Vendors';
import showAlert from '../../../Store/Actions/ShowAlert';
import { requestNotifications } from 'react-native-permissions';
import Preferences from 'Config/preferences';

const preferences = new Preferences();

const useService = () => {
  const dispatch = useDispatch();

  const [vendorData, setVendorData] = useState(vendors?.results);
  const [ongoing, setOngoing] = useState(0);

  const [refreshing, setRefreshing] = useState(false);
  const [next, setNext] = useState(vendors?.next);
  const [notification, setNotification] = useState(null);

  const { vendors, loadingVendors } = useSelector(state => state.Vendors);
  const { orders, loadingOrders } = useSelector(state => state.Orders);

  // Fetch Vendors on Focus
  useFocusEffect(
    useCallback(() => {
      console.debug('Fetch vendors on focus.');
      dispatch(getVendors());
    }, [])
  );

  // Fetch Vendors on Interval
  useEffect(() => {
    const intervalId = setInterval(function () {
      // console.debug('Fetch vendors on interval.');
      dispatch(getVendors());
      fetchOngoingOrders();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Vendor Data Setter
  useEffect(() => {
    if (vendors?.results?.length > 0) setVendorData(vendors?.results);
  }, [vendors]);

  // Check Rating Notification on Focus
  useFocusEffect(
    useCallback(() => {
      preferences.getNotification().then(not => setNotification(not));
    }, [])
  );

  // Handle notifications if app already open
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.debug(
        'Notification handled in the foreground.',
        remoteMessage.notification
      );
      dispatch(
        showAlert({
          type: 'success',
          autoDismiss: false,
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          buttons: [
            {
              name: 'Okay',
              onPress: () => {
                dispatch(showAlert(null));
              }
            }
          ]
        })
      );
    });

    return () => unsubscribe;
  }, []);

  // Filter Ongoing Orders
  useFocusEffect(
    useCallback(() => {
      fetchOngoingOrders();
    }, [loadingOrders])
  );

  function fetchOngoingOrders() {
    // console.debug('Fetching ongoing orders.');
    if (!loadingOrders && orders?.results?.length > 0) {
      const _ongoing = orders.results.filter(
        order =>
          order.status === 'Pending' ||
          order.status === 'Vendor Confirmed' ||
          order.status === 'Ready For Delivery' ||
          order.status === 'Delivery Confirmed' ||
          order.status === 'Driver Arrived' ||
          order.status === 'Driver Enroute'
      );

      setOngoing(_ongoing.length);
    } else {
      setOngoing(0);
    }
  }

  // Fetch Payment Methods and set the first as default
  useEffect(() => {
    preferences.setPaymentDefault(true);
  }, []);

  // Load More Pagination for Orders
  const loadMoreVendors = () => {
    console.debug('Loading more Vendors.');
    if (next) {
      loadMore(next).then(response => {
        setVendorData(vendorData.concat(response.results));
        setNext(response.next);
      });
    } else {
      console.debug('End of data');
    }
  };

  // Send FCM Token to API
  function sendToken(token) {
    sendFCMTokenService({ registration_id: token });
  }

  // Pull down to Refresh logic
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={() => refreshData()} />
  );
  const refreshData = () => {
    console.debug('Refreshing...');
    setRefreshing(true);
    fetchOngoingOrders();
    dispatch(getVendors()).then(() => {
      console.debug('Refreshed Vendors.');
      setRefreshing(false);
    });
  };

  const getToken = () => {
    console.debug('\n\n\n getToken Token: ');

    messaging()
      .getToken()
      .then(token => {
        console.debug('FCM Token: ', token);
        sendToken(token);
      })
      .catch(err => {
        console.debug('FCM Token Error: ', err);
      });
  };

  // Get FCM Token and Send to API
  useEffect(() => {
    requestNotifications(['alert', 'badge', 'sound']).then(({ status }) => {
      if (status === 'granted') {
        getToken();
      }
    });

    return messaging().onTokenRefresh(token => {
      console.debug('FCM Token Refreshed: ', token);
      sendToken(token);
    });
  }, []);

  return {
    vendorData,
    loadingVendors,
    next,
    ongoing,
    notification,
    refreshControl,
    loadMoreVendors
  };
};

// Export
export default useService;
