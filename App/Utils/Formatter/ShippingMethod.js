const ShippingMethodFormatter = {
  getShippingMethod: (_) => {
    return {
      code: _.code,
      name: _.name,
      description: _.description,
      isDiscounted: _.is_discounted,
      discount: _.discount,
      price: {
        currency: parseFloat(_.price.currency).toFixed(2),
        tax: parseFloat(_.price.tax).toFixed(2),
        exTax: parseFloat(_.price.excl_tax).toFixed(2),
        inTax: parseFloat(_.price.incl_tax).toFixed(2),
      },
    };
  },
};

// Export
export default ShippingMethodFormatter;
