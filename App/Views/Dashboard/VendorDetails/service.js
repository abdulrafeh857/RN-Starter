// Imports
import {useEffect, useState, useCallback} from 'react';
import getBasket from '../../../Store/Actions/Basket';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import getVendorCatalogue from 'Services/VendorCatalogue';
import getVendorCatalogueSearch from 'Services/VendorCatalogueSearch';

// Main functional component
const useService = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const {item} = props.route.params;

  const {basket} = useSelector((state) => state.Basket);

  useFocusEffect(
    useCallback(() => {
      console.debug('Fetch basket on focus.');
      dispatch(getBasket());
    }, []),
  );

  const fetchVendorCatalogue = () => {
    console.debug('Get Vendor catalogue.');
    getVendorCatalogue(item.uid).then((catalogue) => {
      setData(catalogue);
      setIsLoading(false);
      console.debug('Vendor catalogue received.');
    });
  };

  const searchCatalogue = (search) => {
    setIsLoading(true);

    getVendorCatalogueSearch(item.uid, search).then((catalogue) => {
      setData(catalogue);
      setIsLoading(false);
      console.debug('Vendor catalogue received against Search.');
    });
  };

  useEffect(() => {
    fetchVendorCatalogue();
  }, []);

  return {
    data,
    isLoading,
    basket,
    item,
    searchCatalogue,
  };
};

// Export
export default useService;
