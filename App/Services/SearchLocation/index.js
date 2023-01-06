import axios from 'axios';

const searchLocationService = (text) => {
  return axios
    .get(
      // `https://maps.googleapis.com/maps/api/geocode/json?address=${text}&key=AIzaSyBRdO5-DVb-dFUwk9ZOivuJpUkzLioZPzU`,
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${text}&region=gb&key=AIzaSyBRdO5-DVb-dFUwk9ZOivuJpUkzLioZPzU`,
    )
    .then((response) => {
      if (response.data.results.length > 0) {
        const data = response.data.results.map((result) => {
          let formattedAddress = result.name + ' ' + result.formatted_address;
          let placeId = result.place_id;

          return {
            address: formattedAddress,
            placeId: placeId,
            location: {
              latitude: result.geometry.location.lat,
              longitude: result.geometry.location.lng,
            },
          };
        });
        return data;
      } else {
        return [];
      }
    });
};

export default searchLocationService;
