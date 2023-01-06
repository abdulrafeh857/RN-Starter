const ProductsFormatter = {
  getProducts: (_) => {
    return {
      count: _.count,
      limit: _.limit,
      next: _.next,
      previous: _.previous,
      results: _.results.map((product) => {
        return {
          id: product.id,
          available: product.available,
          description: product.description,
          price: parseFloat(product.price).toFixed(2),
          structure: product.structure,
          title: product.title,
          upc: product.upc,
          url: product.url,
          modifierGroups: product.modifier_groups.map((group) => {
            return {
              name: group.name,
              modifiers: group.modifiers.map((modifier) => {
                return {
                  id: modifier.id,
                  name: modifier.name,
                  price: modifier.price,
                };
              }),
            };
          }),
          images: product.images.map((image) => {
            return {
              id: image.id,
              caption: image.caption,
              dateCreated: image.date_created,
              displayOrder: image.display_order,
              url: image.original,
            };
          }),
          categories: product.categories,
          attributes: product.attributes,
          children: product.children,
          options: product.options,
          recommendedProducts: product.recommended_products,
        };
      }),
    };
  },
};

// Export
export default ProductsFormatter;
