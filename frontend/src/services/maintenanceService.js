import axios from "axios";

const API_URL = "http://localhost:8080/api/maintenance";

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

// =====================================================
// GET ALL
// =====================================================

export const getAllMaintenance = () => {
    return axios.get(API_URL, getAuthHeaders());
};

// =====================================================
// GET BY ID
// =====================================================

export const getMaintenanceById = (id) => {
    return axios.get(`${API_URL}/${id}`, getAuthHeaders());
};

// =====================================================
// ADD
// =====================================================

export const addMaintenance = (maintenance) => {
    return axios.post(API_URL, maintenance, getAuthHeaders());
};

// =====================================================
// UPDATE
// =====================================================

export const updateMaintenance = (id, maintenance) => {
    return axios.put(`${API_URL}/${id}`, maintenance, getAuthHeaders());
};

// =====================================================
// DELETE
// =====================================================

export const deleteMaintenance = (id) => {
    return axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};