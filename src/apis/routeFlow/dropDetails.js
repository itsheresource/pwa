import axios from "axios";

export async function setDropDetails({
    addressId,
    dropLocationType,
    extraHelp,
    id,
}) {
    try {
        const body = {
            addresses: [{ addressId, dropLocationType, signatureRequired: false, }],
            extraHelp,
            _id: id
        };
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL_2}/web-order/set-route-pickdrop-details`, body);
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}