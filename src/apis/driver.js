import axios from 'axios';

export async function getDriverInfo(id) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/getDriverInfo`,
      { params: { id } }
    );
    return res.data;
  } catch (err) {
    console.warn(err);
  }
}

export async function getDriverReviews(driverId) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL_2}/web-order/order-reviews/?driverId=${driverId}&count=10`
    );
    return res?.data;
  } catch (err) {
    console.warn(err);
  }
}

export async function getDriverRating(driverId) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/getDriverShortInfo?id=${driverId}`
    );
    return res?.data?.data?.avgRating;
  } catch (err) {
    console.warn(err);
  }
}
