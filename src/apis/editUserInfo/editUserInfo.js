import axios from 'axios';

import { getCustomerDetails } from '../getCustomerDetails/getCustomerDetails';

export async function editUserInfo(formData) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/drivers/customerinfoupdate`,
      formData
    );
    getCustomerDetails();
  } catch (err) {
    console.error(err);
  }
}
