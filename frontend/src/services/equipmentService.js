import api from "./api";

// =======================
// Get all equipment
// =======================
export const getAllEquipment = async () => {

    const response = await api.get("/equipment");

    return response.data;
};

// =======================
// Get equipment by ID
// =======================
export const getEquipmentById = async (id) => {

    const response = await api.get(`/equipment/${id}`);

    return response.data;
};

// =======================
// Add new equipment
// =======================
export const addEquipment = async (equipment) => {

    const response = await api.post("/equipment", equipment);

    return response.data;
};

// =======================
// Update equipment
// =======================
export const updateEquipment = async (id, equipment) => {

    const response = await api.put(`/equipment/${id}`, equipment);

    return response.data;
};

// =======================
// Delete equipment
// =======================
export const deleteEquipment = async (id) => {

    const response = await api.delete(`/equipment/${id}`);

    return response.data;
};

// =======================
// Equipment Utilization Analytics
// =======================
export const getEquipmentUtilization = async () => {

    const response = await api.get("/equipment/utilization");

    return response.data;
};