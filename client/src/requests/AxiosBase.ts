import Axios from "axios";

const localApiUrl = process.env.NEXT_PUBLIC_API_LOCAL || "http://localhost:4000";

export const AxiosLocalApi = Axios.create({
    baseURL: `${localApiUrl}/api`
})

export const AxiosCloudinary = Axios.create({
    baseURL: "https://api.cloudinary.com/v1_1/itomasi"
})