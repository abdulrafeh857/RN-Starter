// Imports
import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import getOrders from '../../../Store/Actions/Orders';
import {useFocusEffect} from '@react-navigation/native';
import {RefreshControl, BackHandler} from 'react-native';
import {loadMore} from 'Services/Orders';

const useService = (props) => {
  const dispatch = useDispatch();

  const {orders, loadingOrders} = useSelector((state) => state.Orders);

  const [orderData, setOrderData] = useState(orders?.results);
  const [next, setNext] = useState(orders?.next);

  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setOrderData(orders?.results);
  }, [orders]);

  const loadMoreOrders = () => {
    console.debug('Loading more Orders.');
    if (next) {
      loadMore(next).then((response) => {
        setOrderData(orderData.concat(response.results));
        setNext(response.next);
      });
    } else {
      console.debug('End of data');
    }
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'ongoing', title: 'Pending'},
    {key: 'completed', title: 'Completed'},
    {key: 'cancelled', title: 'Cancelled'},
  ]);

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.navigate('Home');
      return true;
    });
    return () => handler.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(getOrders());
      console.debug('Fetching Orders on focus.');
    }, []),
  );

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={() => refreshData()} />
  );
  const refreshData = () => {
    console.debug('Refreshing..');
    setRefreshing(true);
    dispatch(getOrders()).then(() => {
      console.debug('Refreshed Orders.');
      setRefreshing(false);
    });
  };

  useEffect(() => {
    if (orderData?.length > 0) {
      const _completed = orderData.filter(
        (order) => order.status === 'Completed',
      );
      const _ongoing = orderData.filter(
        (order) =>
          order.status === 'Pending' ||
          order.status === 'Vendor Confirmed' ||
          order.status === 'Ready For Delivery' ||
          order.status === 'Ready For Collection' ||
          order.status === 'Delivery Confirmed' ||
          order.status === 'Driver Enroute' ||
          order.status === 'Driver Arrived',
      );
      const _cancelled = orderData.filter(
        (order) =>
          order.status === 'Timed Out' ||
          order.status === 'Vendor Cancelled' ||
          order.status === 'Cancelled' ||
          order.status === 'Payment Failed' ||
          order.status === 'Delivery Cancelled',
      );
      setCancelled(_cancelled);
      setOngoing(_ongoing);
      setCompleted(_completed);
    }
  }, [orderData]);

  return {
    ongoing,
    completed,
    cancelled,
    routes,
    index,
    loadingOrders,
    refreshControl,
    next,
    loadMoreOrders,
    setIndex,
  };
};

// Export
export default useService;
