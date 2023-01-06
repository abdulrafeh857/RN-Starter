import {useState, useEffect} from 'react';
import Preferences from 'Config/preferences';

const preferences = new Preferences();

const useAddress = () => {
  const [get, setAddressData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    preferences
      .getSelectedAddress()
      .then((address) => {
        if (address) setAddressData(address);
        else setAddressData(undefined);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const set = (tokenData) => {
    preferences.setSelectedAddress(tokenData);
  };

  const reset = () => {
    preferences.removeSelectedAddress();
  };

  return {get, set, reset, isLoading};
};

export default useAddress;
