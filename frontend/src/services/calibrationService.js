import axios from "axios";

const API_URL = "http://localhost:8080/api/calibrations";
const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

// ==========================================
// GET ALL
// ==========================================

export const getAllCalibration = () =>
    axios.get(API_URL, getHeaders());

// ==========================================
// GET BY ID
// ==========================================

export const getCalibrationById = (id) =>
    axios.get(`${API_URL}/${id}`, getHeaders());

// ==========================================
// CREATE
// ==========================================

export const addCalibration = (data) =>
    axios.post(API_URL, data, getHeaders());

// ==========================================
// UPDATE
// ==========================================

export const updateCalibration = (id, data) =>
    axios.put(`${API_URL}/${id}`, data, getHeaders());

// ==========================================
// DELETE
// ==========================================

export const deleteCalibration = (id) =>
    axios.delete(`${API_URL}/${id}`, getHeaders());