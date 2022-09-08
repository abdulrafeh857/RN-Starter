/* eslint-disable prettier/prettier */
const dummy = () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch('https://jsonplaceholder.typicode.com/todos/1', requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};
export default dummy;
