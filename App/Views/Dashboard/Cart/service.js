import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import removeFromBasketService from 'Services/RemoveFromBasket';
import getBasket from '../../../Store/Actions/Basket';
import {Feedback} from '@Atoms';
import {useFocusEffect} from '@react-navigation/native';
import getShippingMethod from '../../../Store/Actions/ShippingMethod';
import {RefreshControl} from 'react-native';
import showAlert from '../../../Store/Actions/ShowAlert';

const useService = (props) => {
  const {basket} = useSelector((state) => state.Basket);
  const {shippingMethod} = useSelector((state) => state.ShippingMethod);
  const ssm = useSelector((state) => state.SelectedShippingMethod);
  const [refreshing, setRefreshing] = useState(false);
  const {vendors} = useSelector((state) => state.Vendors);
  const {users} = useSelector((state) => state.Users);

  const [deliveryTime, setDeliveryTime] = useState({});
  const [vendorActive, setVendorActive] = useState(true);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      console.debug('Fetch Basket, Shipping Method on focus.');
      dispatch(getBasket());
      dispatch(getShippingMethod());
    }, []),
  );

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={() => refreshData()} />
  );
  const refreshData = () => {
    console.debug('Refreshing..');
    setRefreshing(true);
    dispatch(getShippingMethod()).then(() => {
      console.debug('Refreshed Shipping Methods.');
      dispatch(getBasket()).then(() => {
        console.debug('Refreshed Basket.');
        setRefreshing(false);
      });
    });
  };

  useEffect(() => {
    if (vendors && vendors?.results?.length > 0) {
      const vendor = vendors.results.filter(
        (vendor) => vendor.id === basket?.partner,
      )[0];
      setVendorActive(vendor?.isActive || vendor?.is_active);
    }
  }, [vendors]);

  useEffect(() => {
    if (ssm.selectedShippingMethod === 'Delivery') {
      const del = shippingMethod?.filter((sm) => sm.code === 'standard')[0];
      setSelectedShippingMethod(del);
    } else if (ssm.selectedShippingMethod === 'Collection') {
      const col = shippingMethod?.filter((sm) => sm.code === 'collection')[0];
      setSelectedShippingMethod(col);
    }
  }, [shippingMethod]);

  function removeFromBasket(item) {
    removeFromBasketService(item.url)
      .then(() => {
        console.debug('Item Removed.');
        console.debug('Fetch Basket.');
        dispatch(showAlert(null));
        dispatch(getBasket());
      })
      .catch((err) => {
        console.log(err.config);
        Feedback.error(
          'Oops! An error occurred while trying to remove item from Basket',
          'OK',
        );
      });
  }

  const onDelete = (item) => {
    console.debug('User wants to remove Item.', item.product.title);
    dispatch(
      showAlert({
        title: 'Remove from basket',
        body: `Are you sure you want to remove "${item?.product?.title}" from your Basket? `,
        buttons: [
          {
            name: 'No',
            onPress: () => {
              console.debug('Remove Item cancelled.');
              dispatch(showAlert(null));
            },
          },
          {
            name: 'REMOVE',
            onPress: () => {
              console.debug('Remove Item.');
              removeFromBasket(item);
            },
          },
        ],
      }),
    );
  };

  const onEdit = (item) => {
    console.debug('User wants to edit Item.');
    console.debug('Navigate User to Product Detail.');
    props.navigation.navigate('ProductDetails', {
      fetchURL: item.product.url,
      removeURL: item.url,
      edit: true,
      modifiers: item.modifiers,
    });
  };

  useEffect(() => {
    const time = vendors.results.filter((v) => v.id === basket.partner)[0];
    setDeliveryTime(time);
  }, []);

  return {
    users,
    basket,
    deliveryTime,
    selectedShippingMethod,
    refreshControl,
    onDelete,
    onEdit,
    vendorActive,
  };
};

// Export
export default useService;
