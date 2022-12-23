import axios from 'axios';

export async function getRoutes(status, page) {
  try {
    let body = {
      status,
      page,
      size: 10,
    };
    if (status === 'Schedule')
      body = { ...body, sortBy: 'dates.orderDateTime', sortOrder: 1 };
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL_2}/web-order/get-routes`,
      { params: body }
    );
    return res;
  } catch (err) {
    console.error(err);
  }
}

export async function routesCount() {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_CUSTOMER_API_BACKEND_URL_BASE}api/pwa/route-count-per-state`
    );
    return res?.data?.data;
  } catch (err) {
    console.warn(err);
  }
}
