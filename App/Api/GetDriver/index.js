import api from '@Api/api_base';

const getDriverdata = async id => {
  let route = `api/public_drivers/${id}/`;

  console.debug('\n\n\n\n\n  route getDriverdata ', route);

  try {
    const response = await api.get(route);

    return response;
  } catch (err) {
    console.debug('\n\n\n ERROR FROM getDriverdata ', err);
    console.debug(err?.message || err);
    return err?.response;
  }
};

export default getDriverdata;
