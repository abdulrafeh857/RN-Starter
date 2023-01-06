const UserAddressesFormatter = {
  getUserAddresses: (_) => {
    return {
      next: _.next,
      previous: _.previous,
      count: _.count,
      limit: _.limit,
      results: _.results.map((res) => {
        return {
          id: res.id,
          url: res.url,
          country: res.country,
          place: res.place,
          place_id: res.place_id,
          nickname: res.nickname,
          location: res.location,
          title: res.title,
          firstName: res.first_name,
          lastName: res.last_name,
          line1: res.line1,
          line2: res.line2,
          line3: res.line3,
          line4: res.line4,
          state: res.state,
          postcode: res.postcode,
          searchText: res.search_text,
          phoneNumber: res.phone_number,
          notes: res.notes,
          isDefaultForShipping: res.is_default_for_shipping,
          isDefaultForBilling: res.is_default_for_billing,
          numOrdersAsShippingAddress: res.num_orders_as_shipping_address,
          numOrdersAsBillingAddress: res.num_orders_as_billing_address,
          hash: res.hash,
          dateCreated: res.date_created,
          user: res.user,
        };
      }),
    };
  },
};

// Export
export default UserAddressesFormatter;
