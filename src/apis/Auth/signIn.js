import axios from 'axios';
import {
  initializeFirebase,
  askForPermissionToReceiveNotifications,
  getMessages,
} from '../../push';

export async function login({ email, password }) {
  let deviceToken;
  try {
    initializeFirebase();
    deviceToken = await askForPermissionToReceiveNotifications();
    getMessages();
  } catch (err) {
    console.warn(err);
  }
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      {
        email,
        password,
        devicetype: 'web',
        deviceToken,
      }
    );
    return res.data;
  } catch (err) {
    console.warn(err);
  }
}
