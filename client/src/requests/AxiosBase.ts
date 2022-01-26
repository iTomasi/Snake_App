import Axios from "axios";

export const AxiosLocalApi = Axios.create({
    baseURL: "http://localhost:4000/api"
})

export const AxiosCloudinary = Axios.create({
    baseURL: "https://api.cloudinary.com/v1_1/itomasi"
})