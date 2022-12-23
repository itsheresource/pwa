import axios from 'axios';

export async function logout() {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/logout`
    );
    return res.data;
  } catch (err) {
    console.warn(err);
  }
}
