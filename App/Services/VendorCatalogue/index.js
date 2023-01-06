import api from 'Services/api';

const getVendorCatalogue = (id) => {
  return api
    .get(`/partners/${id}/categories/`)
    .then((response) => {
      if (response.status === 200) {
        const formattedResponse = response.data.results.map((category) => {
          return {
            title: category.name,
            data: category.products,
            description: category.description,
          };
        });
        return formattedResponse;
      }
    })
    .catch((error) => {
      console.error(
        'Error: * User wanted to fetch vendor catalogue (product) but failed *',
        'Response: ',
        error.response,
        'Message: ',
        error.message,
        'Error: ',
        error,
      );
    });
};

export default getVendorCatalogue;
