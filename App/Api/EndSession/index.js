import api from '@Api/api_base';

const endSession = async (id, data) => {
  let route = 'api/public_drivers/';
  route = route + id + '/logout/';
  console.debug('\n\n\n\n\n  route endSession ', route, data);

  try {
    const response = await api.post(route, data);

    return response;
  } catch (err) {
    console.debug('\n\n\n ERROR FROM endSession ', err);
    console.debug(err?.message || err);
    return err?.response;
  }
};

export default endSession;
