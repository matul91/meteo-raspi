import axios from "axios";
import * as localStorageKeys from "config/constants/localStorage";

export default () => {
    const token = localStorage.getItem(localStorageKeys.TOKEN);
    const headers = token ? { Authorization: `Bearer ${token}` } : null;
    return axios.create({
        headers,
    });
};
