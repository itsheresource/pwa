import axios from "axios";

export async function placeCurrentRouteInPool(orderId) {
    try {
        const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL_2}/place-order/placeinpool`, { orderId });
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}

export async function setAdditionalInfos({ routeId, addresses }) {
    try {
        const body = {
            _id: routeId,
            addresses,
        };
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL_2}/web-order/set-route-additionalinfo`, body);
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}

export async function setSkip(routeId) {
    try {
        const body = {
            id: routeId,
        };
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL_2}/web-order/additional-info/force-complete`, body);
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}

export async function checkIfRouteComplete(routeId) {
    try {
        const body = {
            id: routeId,
        };
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL_2}/web-order/additional-info/check-complete`, body);
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}

export async function cancelPlaceInOrderPool(routeId) {
    try {
        const body = {
            routeId,
        };
        const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL_2}/place-order/cancel-route-pool`, body);
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}

export async function cancelRoute(routeId) {
    try {
        const body = {
            _id: routeId,
        };
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL_2}/web-order/cancel-bda-route`, body);
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}