import api from '@Api/api_base';
const getDashboardDetailsService = async id => {
  console.debug('\n\n\n\n\n  id getDashboardDetailsService:: ', id);
  if (id) {
    let route = '/api/public-feature/?genset_id=' + id;
    console.debug('\n\n\n\n\n  route getDashboardDetailsService:: ', route);
    try {
      const response = await api.get(route);
      console.debug('\n\n\n\n\n  response getDashboardDetailsService ', response?.data);
      return response;
    } catch (err) {
      console.debug('\n\n\n ERROR FROM getDashboardDetailsService ', err);
      console.debug(err?.message || err);
      return err?.response;
    }
  }
};
export default getDashboardDetailsService;
