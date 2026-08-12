import axios from "axios";

const API_URL = "http://localhost:8080/api/notifications";

const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getNotifications = () =>
    axios.get(API_URL, getHeaders());