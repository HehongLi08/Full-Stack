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
        return http.post("/user/login", loginForm)
            .then((res) => {
                if (res.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                }
                return res.data;
            });
    }

    /**
     * logout, just delete the user information from the local storage
     */
    logout() {
        localStorage.removeItem("user");
    }

    /**
     * register a new user
     * @param username
     * @param password
     * @param token
     * @returns {Promise<AxiosResponse<any>>}
     */
    signup(username, password, token) {
        let signupForm = {
            username: username,
            password: password
        }
        let jwtHeader = {
            'x-access-token': token
        }
        return http.post("/user/signup/verify", signupForm, {headers: jwtHeader});
    }


    sendVeriCode(username) {
        let sendForm = {
            username: username,
        }
        return http.post("/user/signup/send", sendForm);
    }


    /**
     * get the current user
     * @returns {any}
     */
    getCurrUser() {
        return JSON.parse(localStorage.getItem("user"));
    }


    verifyUser(jwtHeader) {
        return http.post("/user/verify", {}, {headers: jwtHeader});
    }

}

export default new UserServices();