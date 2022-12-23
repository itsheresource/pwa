import axios from 'axios';

export const handleSendSupportMessage = async ({
  firstName,
  lastName,
  phone,
  email,
  // eslint-disable-next-line camelcase
  orderNumber: order_number,
  message,
}) => {
  try {
    const body = {
      firstName,
      lastName,
      phone,
      email,
      // eslint-disable-next-line camelcase
      order_number,
      message,
    };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/drivers/saveSupportMessages`,
      body
    );
    return res?.data;
  } catch (err) {
    console.warn('Error sending support message: ', err);
  }
};
