import {
  CREATE_ROUTE,
  UPDATE_ROUTE,
  UPDATE_ROUTE_STATUS,
  SIGN_OUT,
  UPDATE_VEHICLE_ID,
} from './types';

/* eslint-disable camelcase */
const initialState = {
  createdAt: null,
  deliveryName: 'Furniture & Appliances',
  deliveryNum: null,
  deliveryType: '5b8ff105047cc20efd9d1db0',
  failRestoreDate: '',
  failrestored: false,
  isReviewable: false,
  orderId: null,
  orderName: 'PWA Customer Route',
  orderStatus: '',
  orders: null,
  paymentStatus: '',
  restoreDate: '',
  restored: false,
  reviewInfo: {},
  routePhase: '',
  suborder: {
    pickup: [
      {
        additionalInfo: {
          addressId: '',
          notes: '',
          quantity: 0,
          unitNo: '',
          volume: 0,
          weight: 0,
          _id: '',
        },
        address: '',
        addressComponents: {
          city: '',
          country: '',
          state: '',
          streetAddress: '',
          zipCode: '',
          _id: '',
        },
        addressId: '',
        arrive_status: 0,
        cancel_status: 0,
        courier: [],
        customer: {
          addressId: '',
          customer: { firstName: '', lastName: '' },
          index: 1,
          _id: '',
        },
        delivery_status: 0,
        dropDetails: {},
        pickup_geometry: {
          coordinates: [0, 0],
          type: 'Point',
        },
        pickup_point: '',
        pickup_status: 0,
        fail_status: 0,
        furniture: [],
        priority: 1,
        restoreOrderPool: false,
        start_status: 0,
        type: 'pickup',
        work_order: 1,
        _id: '',
      },
    ],
    drop_location: [
      {
        additionalInfo: {
          addressId: '',
          notes: '',
          quantity: 0,
          unitNo: '',
          volume: 0,
          weight: 0,
          _id: '',
        },
        address: '',
        addressComponents: {
          city: '',
          country: '',
          state: '',
          streetAddress: '',
          zipCode: '',
          _id: '',
        },
        addressId: '',
        arrive_status: 0,
        cancel_status: 0,
        courier: [],
        customer: {
          addressId: '',
          customer: { firstName: '', lastName: '' },
          index: 1,
          _id: '',
        },
        delivery_status: 0,
        dropDetails: {},
        drop_geometry: {
          coordinates: [0, 0],
          type: 'Point',
        },
        drop_point: '0, 0',
        drop_status: 0,
        fail_status: 0,
        furniture: [],
        priority: 1,
        restoreOrderPool: false,
        start_status: 0,
        type: 'drop',
        work_order: 1,
        _id: '',
      },
    ],
  },
  timeZone: '',
  totalCharge: 0,
  updatedAt: '',
  urgencyNum: null,
  _id: '',
};

function currentRouteReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROUTE:
      return { ...action.payload };
    case UPDATE_ROUTE:
      return { ...state, ...action.payload };
    case UPDATE_ROUTE_STATUS:
      return { ...state, orderStatus: action.payload };
    case UPDATE_VEHICLE_ID:
      return {
        ...state,
        vehicleType: action._id,
      };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}

export default currentRouteReducer;
