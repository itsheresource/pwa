import axios from "axios";

export async function otpMatch({ email, code, source }) {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/users/otpMatch`,
            {
                email,
                otp: code,
            },
            { cancelToken: source.token, }
        );
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}

export async function forgotPassword({ email, source }) {
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/forgotPassword`, { email }, { cancelToken: source.token });
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}

export async function resetPassword({ email, password, otp, source }) {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/users/resetPassword`,
            {
                email,
                password,
                otp,
            },
            { cancelToken: source.token }
        );
        return res.data;
    }
    catch (err) {
        console.warn(err);
    }
}