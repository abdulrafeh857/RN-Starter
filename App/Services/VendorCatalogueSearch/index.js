import api from 'Services/api';

const getVendorCatalogueSearch = (id, search) => {
  return api
    .get(`/partners/${id}/categories/?search=${search}`)
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
    .catch((err) => {
      console.log(
        'Search catalogue for vendor failed. ',
        err.response || err.message,
      );
    });
};

export default getVendorCatalogueSearch;
