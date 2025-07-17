import api from '@Api/api_base';

const getServiceDealer = async id => {
  let route = 'api/public-service-dealers/';

  console.debug('\n\n\n\n\n  route getServiceDealer ', route);

  try {
    const response = await api.get(route);

    return response;
  } catch (err) {
    console.debug('\n\n\n ERROR FROM getServiceDealer ', err);
    console.debug(err?.message || err);
    return err?.response;
  }
};

export default getServiceDealer;
