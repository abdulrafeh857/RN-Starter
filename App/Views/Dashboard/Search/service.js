// Imports
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import getVendors from '../../../Store/Actions/Vendors';
import api from 'Services/api';
import Preferences from 'Config/preferences';

const preferences = new Preferences();

// Main functional component
const Search = (props) => {
  const results = props.route.params?.data?.results;
  const [data, setData] = useState(null);
  const [searchString, setSearchString] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (results !== undefined || results?.length > 0) {
      const name = props.route.params?.name;
      setSearchString(name);
      setData(results);
    }
  }, [results]);

  useEffect(() => {
    dispatch(getVendors());
  }, [dispatch]);

  const filterData = (text) => {
    setSearchString(text);
    preferences
      .getSelectedAddress()
      .then((address) => {
        if (address) {
          const location = address.location;
          api
            .get(
              'partners/?lat=' +
                location.latitude +
                '&lng=' +
                location.longitude +
                '&search=' +
                text,
            )
            .then((response) => {
              console.log(response.data.results);
              setData(response.data.results);
            })
            .catch(() => {
              setData([]);
            });
        }
      })
      .catch(() => {
        setData([]);
      });
  };

  const onFetchData = ({results, name}) => {
    setSearchString(name);
    setData(results);
  };

  return {
    data,
    searchString,
    filterData,
    setData,
    onFetchData,
  };
};

// Export
export default Search;
