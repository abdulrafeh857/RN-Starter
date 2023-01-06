const BasketFormatter = {
  getBasket: (_) => {
    return {
      id: _.id,
      currency: _.currency,
      owner: _.owner,
      partner: _.partner,
      status: _.status,
      isTaxKnown: _.is_tax_known,
      offerDiscounts: _.offer_discounts,
      totalExTax: parseFloat(_.total_excl_tax).toFixed(2),
      totalExTaxExDiscounts: parseFloat(
        _.total_excl_tax_excl_discounts,
      ).toFixed(2),
      totalInTax: parseFloat(_.total_incl_tax).toFixed(2),
      totalInTaxExDiscounts: parseFloat(
        _.total_incl_tax_excl_discounts,
      ).toFixed(2),
      totalTax: parseFloat(_.total_tax).toFixed(2),
      surcharges: _.surcharges,
      url: _.url,
      voucherDiscounts: _.voucher_discounts,
      lines: _.lines.map((line) => {
        return {
          url: line.url,
          modifiers: line.modifiers,
          quantity: line.quantity,
          attributes: line.attributes,
          priceCurrency: line.price_currency,
          priceExTax: parseFloat(line.price_excl_tax).toFixed(2),
          priceInTax: parseFloat(line.price_incl_tax).toFixed(2),
          priceInTaxExDiscounts: parseFloat(
            line.price_incl_tax_excl_discounts,
          ).toFixed(2),
          priceExTaxExDiscounts: parseFloat(
            line.price_excl_tax_excl_discounts,
          ).toFixed(2),
          isTaxKnown: line.is_tax_known,
          warning: line.warning,
          basket: line.basket,
          stockRecord: line.stockrecord,
          dateCreated: line.date_created,
          dateUpdated: line.date_updated,
          product: {
            id: line.product.id,
            url: line.product.url,
            upc: line.product.upc,
            title: line.product.title,
            description: line.product.description,
            categories: line.product.categories,
            structure: line.product.structure,
            recommendedProducts: line.product.recommended_products,
            children: line.product.children,
            attributes: line.product.attributes,
            options: line.product.options,
            price: parseFloat(line.product.price).toFixed(2),
            available: line.product.availabile,
            images: line.product.images.map((image) => {
              return {
                id: image?.id,
                original: image.original,
                caption: image.caption,
                displayOrder: image.display_order,
                dateCreated: image.date_created,
              };
            }),
            partner: line.product.partner,
          },
        };
      }),
    };
  },
};

// Export
export default BasketFormatter;
