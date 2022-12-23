import axios from "axios";

export async function getFurniture() {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/getfurniturebycategory`);
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}

export async function setFurniture(body) {
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL_2}/web-order/set-route-items`, body);
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}