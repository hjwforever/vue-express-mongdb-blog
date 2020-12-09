import axios from "axios";

export default axios.create({
    // baseURL: "http://localhost:8080/api",
    baseURL: "http://www.blog.aruoxi.top/api",
    headers: {
        "Content-type": "application/json"
    }
});
