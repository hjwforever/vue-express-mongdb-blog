import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://localhost:8080/api/test/';   // 提交作业中的server后端整合的是这个, 即前端访问本地服务器接口
const API_URL = 'http://www.blog.aruoxi.top/api/test/'; // 只运行client前端会访问 已部署于阿里云服务器的后端api接口

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();
