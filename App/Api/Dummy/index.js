/* eslint-disable prettier/prettier */
import axios from 'axios';
const dummy = async () => {
  let response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response;
};
export default dummy;
