import axios from "axios";

export default axios.create({
    baseURL: process.env.VUE_APP_BASEAPI,
    // baseURL: "http://domain/api",
    headers: {
        "Content-type": "application/json"
    }
});
