import axios from "axios";

export async function signUp({ email, phone, password }) {
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/`, {
            email,
            phone,
            role: "BUSINESS",
            password,
            rpassword: password,
            agree: "1",
        });
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}

export async function phoneOtpMatch({ phone, phoneOtp }) {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/users/phoneOtpMatch`,
            {
                phone,
                phoneOtp,
            }
        );
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}

export async function phoneResendRegistration({ phone }) {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/users/phoneResendRegistration`, { phone });
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}