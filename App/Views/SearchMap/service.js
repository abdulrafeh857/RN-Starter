// Imports
import {useState} from 'react';
import searchLocationService from 'Services/SearchLocation';

const useService = (props) => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function confirmAddress(item) {
    console.debug('Location selected =>', item.address);
    console.debug('Navigate to Map.');

    props.navigation.navigate('Map', {
      region: {
        latitude: item.location.latitude,
        longitude: item.location.longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      },
    });
  }

  function searchLocation(text) {
    setIsLoading(true);
    text = text.trim();
    searchLocationService(text)
      .then((response) => {
        if (response.length > 0) setLocations(response);
        else setLocations([]);
        setIsLoading(false);
      })
      .catch(() => {
        setLocations([]);
        setIsLoading(false);
      });
  }

  return {locations, isLoading, confirmAddress, searchLocation};
};

// Export
export default useService;
