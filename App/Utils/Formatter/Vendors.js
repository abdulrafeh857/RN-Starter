const VendorsFormatter = {
  getVendors: (_) => {
    return {
      count: _.count,
      limit: _.limit,
      next: _.next,
      previous: _.previous,
      results: _.results.map((vendor) => {
        return {
          address: {
            location: vendor.address.location,
            place: vendor.address.place,
            placeId: vendor.address.place_id,
            postcode: vendor.address.postcode,
          },
          reviews: vendor.partner_reviews,
          rating: vendor.total_score,
          totalRatings: vendor.total_votes,
          description: vendor.description,
          image: vendor.image,
          hygieneRating: vendor.hygiene_rating,
          hygieneDescription: vendor.hygiene_description,
          question: vendor.question,
          phone: vendor.phone,
          moreInfo: vendor.more_info,
          notes: vendor.notes,
          distanceFormatted: vendor.distance_formatted,
          distance: vendor.distance,
          id: vendor.id,
          uid: vendor.uid,
          name: vendor.name,
          closesIn: vendor.closes_in,
          fromTime: vendor.from_time,
          toTime: vendor.to_time,
          minTime: vendor.min_time,
          maxTime: vendor.max_time,
          avgTime: vendor.avg_time,
          tags: vendor.tags,
          opensIn: vendor.opens_in,
          isOpen: vendor.is_open,
          isActive: vendor.is_active,
          hours: vendor.opening_hours,
        };
      }),
    };
  },
};

// Export
export default VendorsFormatter;
