import axios from 'axios';

export async function getRouteId(id) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL_2}/web-order/get-route`,
      { params: { id } }
    );
    return res?.data;
  } catch (err) {
    console.warn(err);
  }
}
