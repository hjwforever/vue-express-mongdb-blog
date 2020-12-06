import http from "../http"

class PostDataService {
    getAll(params) {
        return http.get("/posts", { params });
    }

    get(id) {
        return http.get(`/posts/${id}`);
    }

    create(data) {
        return http.post("/posts", data);
    }

    update(id, data) {
        return http.put(`/posts/${id}`, data);
    }

    delete(id) {
        return http.delete(`/posts/${id}`);
    }

    deleteAll() {
        return http.delete(`/posts`);
    }

    findByTitleOrAuthor(search) {
        return http.get(`/posts?title=${search}&author=${search}`);
    }

    like(data) {
        return http.put(`/post/like`,data);
    }
}

export default new PostDataService();

