import axios from "axios";
import Config from "./config/config";

export default axios.create({
    baseURL: Config.baseUrl,
    headers: {
        "Content-type" : "application/json"
    }
});