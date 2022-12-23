import axios from 'axios';

export async function timeWindowApi(_id, addresses) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL_2}/web-order/set-route-timespan`,
      {
        _id,
        addresses,
      }
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.error('Error updating timespan: ', err);
  }
}
