import api from '@Api/api_base';

const getDriverDetailsService = async id => {
  let route = 'api/public-genset/';
  if (id) {
    route += `${id}/`;
    console.debug('\n\n\n\n\n  route getDriverDetailsService ', route);
    try {
      const response = await api.get(route);
      return response;
    } catch (err) {
      console.debug('\n\n\n ERROR FROM getDriverDetailsService ', err);
      console.debug(err?.message || err);
      return err?.response;
    }
  }
};
export default getDriverDetailsService;
