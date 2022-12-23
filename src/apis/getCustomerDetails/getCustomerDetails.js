import axios from 'axios';
import store from 'redux/store';
//Redux
import { addUserInfo } from 'components/Auth/_ducks/actions';

export async function getCustomerDetails() {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/getcustomerdetails`
    );
    store.dispatch(
      addUserInfo({
        ...res?.data?.data,
        unreadNotificationCount: res?.data?.unreadNotificationCount,
      })
    );
  } catch (err) {
    console.error(err);
  }
}
