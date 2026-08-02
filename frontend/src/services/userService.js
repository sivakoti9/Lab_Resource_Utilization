import api from "./api";

// ==========================
// Get All Users
// ==========================

export const getAllUsers = async () => {

    const response = await api.get("/users");

    return response.data;

};

// ==========================
// Get User By ID
// ==========================

export const getUserById = async (id) => {

    const response = await api.get(`/users/${id}`);

    return response.data;

};

// ==========================
// Create User
// ==========================

export const createUser = async (user) => {

    const response = await api.post("/users", user);

    return response.data;

};

// ==========================
// Update User
// ==========================

export const updateUser = async (id, user) => {

    const response = await api.put(`/users/${id}`, user);

    return response.data;

};

// ==========================
// Delete User
// ==========================

export const deleteUser = async (id) => {

    const response = await api.delete(`/users/${id}`);

    return response.data;

};

// ==========================
// Search By First Name
// ==========================

export const searchByFirstName = async (name) => {

    const response = await api.get(`/users/search/firstname/${name}`);

    return response.data;

};

// ==========================
// Search By Last Name
// ==========================

export const searchByLastName = async (name) => {

    const response = await api.get(`/users/search/lastname/${name}`);

    return response.data;

};

// ==========================
// Filter Users By Role
// ==========================

export const getUsersByRole = async (role) => {

    const response = await api.get(`/users/role/${role}`);

    return response.data;

};

// ==========================
// Dashboard Statistics
// ==========================

export const getTotalUsers = async () => {

    const response = await api.get("/users/count");

    return response.data;

};

export const getRoleCount = async (role) => {

    const response = await api.get(`/users/count/${role}`);

    return response.data;

};