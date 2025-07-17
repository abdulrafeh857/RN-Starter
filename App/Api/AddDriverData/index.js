import api from '@Api/api_base';

const addDriverdata = async data => {
  let route = 'api/public_drivers/';

  console.debug('\n\n\n\n\n  route addDriverdata ', route);

  try {
    const response = await api.post(route, data);

    return response;
  } catch (err) {
    console.debug('\n\n\n ERROR FROM addDriverdata ', err);
    console.debug(err?.message || err);
    return err?.response;
  }
};

export default addDriverdata;
