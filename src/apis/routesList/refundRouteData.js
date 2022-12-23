import axios from 'axios';

export async function refundRouteData(_id) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL_2}/web-order/get-dar-refund-amount`,
      {
        params: { _id },
      }
    );
    const { totalAmount, refundAmount, explanationForRefundAmount } =
      res?.data?.data;
    return { totalAmount, refundAmount, explanationForRefundAmount };
  } catch (err) {
    if (err?.response?.status === 400)
      console.log(err?.response?.data?.message);
    return err;
  }
}

export async function refundCancelApi(_id) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL_2}/web-order/cancel-dar-route`,
      { _id }
    );
    return res;
  } catch (err) {
    const errorMessage = 'Error while getting refund DAR full';
    console.error(errorMessage);
  }
}
