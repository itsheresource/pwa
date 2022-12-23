// Utils
import axios from 'axios';

export async function reCreateRoute() {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_CUSTOMER_API_BACKEND_URL_BASE}api/pwa/recreate-pending-route`
    );
    return res;
  } catch (err) {
    console.warn(err);
  }
}
