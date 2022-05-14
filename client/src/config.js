import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://my-story-uz.herokuapp.com/api"
});