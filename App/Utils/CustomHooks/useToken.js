import {useState, useEffect} from 'react';
import Preferences from 'Config/preferences';

const preferences = new Preferences();

const useToken = () => {
  const [get, setTokenData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    preferences
      .getToken()
      .then((token) => {
        if (token) setTokenData(token);
        else setTokenData(undefined);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const set = (tokenData) => {
    preferences.setToken(tokenData);
  };

  const reset = () => {
    preferences.removeToken();
  };

  return {get, set, reset, isLoading};
};

export default useToken;
