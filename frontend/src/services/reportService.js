import axios from "axios";

const API_URL = "http://localhost:8080/api/reports";

const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getReports = () =>
    axios.get(API_URL, getHeaders());