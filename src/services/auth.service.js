import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/auth/';   // 提交作业中的server后端整合的是这个, 即前端访问本地服务器接口
const API_URL = 'https://blog-apis.aruoxi.top/api/auth/'; // 只运行client前端会访问 已部署于阿里云服务器的后端api接口

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();
