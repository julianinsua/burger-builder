import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-builder-4ffc3.firebaseio.com/"
});

export default instance;