export const changeSingleOrder = (order) => {
  return {
    id: order.addressId,
    info: {
      lng:
        order.pickup_geometry?.coordinates[0] ||
        order.drop_geometry?.coordinates[0],
      lat:
        order.pickup_geometry?.coordinates[1] ||
        order.drop_geometry?.coordinates[1],
      fullAddress: order.address,
      streetAddress: order.addressComponents.streetAddress,
      zipCode: order.addressComponents.zipCode,
      city: order.addressComponents.city,
      state: order.addressComponents.state,
      country: order.addressComponents.country,
      unitNo: order.additionalInfo.unitNo,
      type: order.type,
      customer: {
        firstName: order.customer?.customer.firstName,
        lastName: order.customer?.customer.lastName,
      },
    },
  };
};
