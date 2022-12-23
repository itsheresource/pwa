import axios from "axios";

export async function getCurrentRoute() {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL_2}/pwa/pending-route`);
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}

export async function setCurrentRoutePhase({ id, routePhase }) {
    try {
        const body = {
            id,
            routePhase,
        };
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL_2}/web-order/set-route-phase`, body);
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}