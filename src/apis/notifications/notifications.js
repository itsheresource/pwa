import axios from 'axios';

export async function loadAllNotificationsApi() {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/notifications?role=business`
    );
    return res?.data?.data;
  } catch (err) {
    console.warn(err);
  }
}

export async function setAllNotificationsToReadApi() {
  try {
    const res = axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/notifications/bulkupdate`,
      {
        status: 'read',
      }
    );
    return res;
  } catch (err) {
    console.warn(err);
  }
}
