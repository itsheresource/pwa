import axios from "axios";

export async function setVehicleCalculations({ date, routeId, time, }) {
    try {
        const body = {
            date,
            orderId: routeId,
            time,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL_2}/web-order/vehicle-calculations`, body);
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}

export async function setRouteUrgency({ date, timeZone, routeId, time, urgencyId, vehicleId, onlySetDateTime = false }) {
    try {
        const body = {
            date,
            time,
            timeZone,
            onlySetDateTime,
            _id: routeId,
        };
        
        if(urgencyId) body.urgencyId = urgencyId;
        if(vehicleId) body.vehicleId = vehicleId;

        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL_2}/web-order/set-route-urgency`, body);
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}