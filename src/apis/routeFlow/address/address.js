import axios from 'axios';

export async function updateAddress(body) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL_2}/pwa/update-route-addresses`,
      body
    );
    return res.data;
  } catch (err) {
    console.warn(err);
  }
}

export async function finalizeAddress(body) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL_2}/web-order/finalize-route-addresses`,
      body
    );
    return res.data;
  } catch (err) {
    console.warn(err);
  }
}
