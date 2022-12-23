import * as C from 'scss/colors';

const DARK_GREEN = [
  'order-start',
  'order-delivered',
  'email-verified',
  'order-accept',
  'phone-verified',
  'profile-active',
];
const LIGHT_GREEN = [
  'order-arrivedropoff',
  'order-arrivepickup',
  'order-dropoff-delivered',
  'order-picked',
  'order-restoredropoff ',
  'order-restorepickup',
  'order-startdropoff',
  'order-startpickup',
];
const LIGHT_BLUE = [
  'admin-message',
  'order-bda-refund',
  'order-dar-refund',
  'order-dar-refund-driver',
  'order-delivery-in-an-hour',
  'order-dropoff',
  'order-new',
  'order-new-selected',
  'order-overnightdelivery',
  'order-overnightdeliverydriver',
  'radius-plan-remove',
  'radius-plan-request',
  'radius-plan-request-business',
  'radius-plan-update',
  'registration',
];
const RED = [
  'order-delay-failed',
  'order-delay-failed-driver',
  'order-failed',
  'order-reject',
  'profile-reject',
];
const ORANGE = [
  'forget-password',
  'order-faileddropoff',
  'order-failedpickup',
  'order-partial-bda-refund',
  'order-partial-dar-refund-driver',
  'profile-suspend',
  'resend-email-otp',
  'resend-phone-otp',
  'reset-password',
];

export const notificationColors = (type) => {
  switch (true) {
    case DARK_GREEN.includes(type):
      return C.DarkGreenN;

    case LIGHT_GREEN.includes(type):
      return C.LightGreenN;

    case LIGHT_BLUE.includes(type):
      return C.LightBlueN;

    case RED.includes(type):
      return C.RedN;

    case ORANGE.includes(type):
      return C.OrangeN;

    default:
      break;
  }
};
