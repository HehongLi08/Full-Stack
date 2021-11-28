/**
 * All returned functions are a Promise, should use then to process them
 */

import http from "../http-common";

class PostServices {


    createPost(formData) {
        return http.post("/post/create", formData, {});
    }

    getPostsByTitle(title) {
        let query = "";
        if (title !== "") query += "?title=" + title;
        return http.get("/post/get/title" + query);
    }

    getPostById(id) {
        return http.get("/post/get/id/" + id);
    }


    updatePost(id, formData) {
        return http.post("/post/update/" + id, formData);
    }


    deletePostById(id) {
        return http.delete("/post/delete/" + id);
    }
}



export default new PostServices();