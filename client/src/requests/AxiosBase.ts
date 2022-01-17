import Axios from "axios";

export const AxiosLocalApi = Axios.create({
    baseURL: "http://192.168.1.91:4000/api"
})