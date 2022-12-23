import axios from 'axios';

export async function getNote({ currentRouteId, orderId }) {
  try {
    const res = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL_2}/pickupinfo/get-notes?orderId=${currentRouteId}&notesTypeId=${orderId}`);
    return res.data;
  }
  catch (err) {
    console.error('Error: ', err);
  }
}

export async function sendNote({ routeId, orderId, userId, orderType, message, uploadedImages }) {
  try {
    const formData = new FormData();
    formData.append('orderId', routeId);
    formData.append('notesTypeId', orderId);
    formData.append('userType', 'customer');
    formData.append('userId', userId);
    formData.append('notesType', orderType === 'pickup' ? 'pickup' : 'dropoff');
    if (message) formData.append('message', message);
    uploadedImages?.forEach((image) => formData.append('image', image));

    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL_2}/pickupinfo/add-note`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' }, }
    );
    return res.data;
  }
  catch (err) {
    console.error('Error: ', err);
  }
}