import axios from "axios";

export default axios.create({
    // baseURL: "http://localhost:8080/api",    // 提交作业中的server后端整合的是这个, 即前端访问本地服务器接口
    baseURL: "http://www.blog.aruoxi.top/api",  // 只运行client前端会访问 已部署于阿里云服务器的后端api接口
    headers: {
        "Content-type": "application/json"
    }
});
