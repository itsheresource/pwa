// Utils
import axios from 'axios';

export async function getCurrentRouteInvoice(currentRouteId) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL_2}/web-order/route-invoice`,
      {
        params: {
          id: currentRouteId,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.warn(err);
  }
}

export async function initiatePayment(body) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_ROUTE_PLANNER_API}/payment-init-request`,
      body
    );
    return res.data;
  } catch (err) {
    console.warn(err);
  }
}

export async function applyDiscount({ routeId, discountCode }) {
  try {
    const body = {
      routeId,
      discountCode,
    };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL_2}/web-order/apply-discount`,
      body
    );
    return res;
  } catch (err) {
    console.warn(err);
  }
}

export async function removeDiscount({ routeId }) {
  try {
    const body = { routeId };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL_2}/web-order/remove-discount`,
      body
    );
    return res;
  } catch (err) {
    console.warn(err);
  }
}

export async function paymentFinalResult(orderId) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_ROUTE_PLANNER_API}/payment-final-result?orderId=${orderId}`
    );
    return res.data;
  } catch (err) {
    console.warn(err);
  }
}

export async function paymentDoneZero(routeId) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_ROUTE_PLANNER_API}/payment-done-zero`,
      { routeId }
    );
    return res.data;
  } catch (err) {
    console.warn(err);
  }
}
