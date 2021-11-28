/**
 * the whole logic of the user login module is that once the user successfully login,
 * the app stores user's information into the local storage,
 * so no mater what pages the user is currently in, we can read the local storage to retrieve the login history
 */


import http from "../http-common";

class UserServices {

    /**
     * user login function, once the user successfully login, the local storage stores the token,
     * otherwise, the previous login information will be deleted from the local storage
     * @param username
     * @param password
     */
    login(username, password) {
        let loginForm = {
            username : username,
            password : password
        }
        http.post("/user/login", loginForm)
            .then((res) => {
                if (res.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                }
                return res.data;
            })
            .catch((error) => {
                localStorage.removeItem("user");
                return error.response;
            });
    }

    /**
     * logout, just delete the user information from the local storage
     */
    logout() {
        if (localStorage.getItem("user")) console.log("tes");
    }

    /**
     * register a new user
     * @param username
     * @param password
     * @returns {Promise<AxiosResponse<any>>}
     */
    signup(username, password) {
        return http.post("/user/signup", {
            username, password
        });
    }

    /**
     * get the current user
     * @returns {any}
     */
    getCurrUser() {
        return JSON.parse(localStorage.getItem("user"));
    }


}

export default new UserServices();