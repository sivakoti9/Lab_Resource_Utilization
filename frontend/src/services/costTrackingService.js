import axios from "axios";

const API_URL = "http://localhost:8080/api/costs";

const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

// =====================================
// GET ALL
// =====================================

export const getAllCosts = () =>
    axios.get(API_URL, getHeaders());

// =====================================
// GET BY ID
// =====================================

export const getCostById = (id) =>
    axios.get(`${API_URL}/${id}`, getHeaders());

// =====================================
// CREATE
// =====================================

export const addCost = (data) =>
    axios.post(API_URL, data, getHeaders());

// =====================================
// UPDATE
// =====================================

export const updateCost = (id, data) =>
    axios.put(`${API_URL}/${id}`, data, getHeaders());

// =====================================
// DELETE
// =====================================

export const deleteCost = (id) =>
    axios.delete(`${API_URL}/${id}`, getHeaders());