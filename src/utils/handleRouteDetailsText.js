export const dropDetailsText = (data) => {
  let dropTextArray = [];
  data?.signatureRequired && dropTextArray.push('Signature Required');
  data?.driverHelp && dropTextArray.push('Driver Help');
  data?.extraHelp && dropTextArray.push('Extra Help');
  data?.whiteGlove && dropTextArray.push('White Glove');
  return dropTextArray;
};

export const handleStatusText = (order) => {
  if (order.pickup_status || order.drop_status) return 'completed';
  if (order.cancel_status) return 'canceled';
  if (order.fail_status) return 'failed';
  if (order.pickup_status === 0) return 'Not picked up';
  if (order.drop_status === 0) return 'Not completed';
};

export const renderDropOffType = (t) => {
  switch (t) {
    case 'Front':
      return 'Front Door';
    case 'Back':
      return 'Back Door';
    case 'Concierge':
      return 'Concierge';
    case 'WhiteGloveService':
      return 'White-Glove Service';
    case 'RoomOfService':
      return 'Room Of Choice';
    default:
      return 'Front Door';
  }
};
