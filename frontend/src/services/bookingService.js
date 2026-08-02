import api from "./api";

// ===================================
// Get All Bookings
// ===================================

export const getAllBookings = async () => {
    const response = await api.get("/bookings");
    return response.data;
};

// ===================================
// Get Booking By ID
// ===================================

export const getBookingById = async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
};

// ===================================
// Create Booking
// ===================================

export const createBooking = async (booking) => {
    const response = await api.post("/bookings", booking);
    return response.data;
};

// ===================================
// Update Booking
// ===================================

export const updateBooking = async (id, booking) => {
    const response = await api.put(`/bookings/${id}`, booking);
    return response.data;
};

// ===================================
// Delete Booking
// ===================================

export const deleteBooking = async (id) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
};

// ===================================
// Return Equipment
// ===================================

export const returnEquipment = async (id) => {
    const response = await api.put(`/bookings/${id}/return`);
    return response.data;
};

// ===================================
// Waiting Queue
// ===================================

export const getWaitingQueue = async (equipmentId) => {
    const response = await api.get(`/bookings/queue/${equipmentId}`);
    return response.data;
};

// ===================================
// Approve Booking
// ===================================

export const approveBooking = async (id) => {
    const response = await api.put(`/bookings/${id}/approve`);
    return response.data;
};

// ===================================
// Reject Booking
// ===================================

export const rejectBooking = async (id) => {
    const response = await api.put(`/bookings/${id}/reject`);
    return response.data;
};

// ===================================
// Dashboard Statistics
// ===================================

export const getTotalBookings = async () => {
    const response = await api.get("/bookings/count");
    return response.data;
};

export const getBookedCount = async () => {
    const response = await api.get("/bookings/count/booked");
    return response.data;
};

export const getReturnedCount = async () => {
    const response = await api.get("/bookings/count/returned");
    return response.data;
};

export const getWaitingCount = async () => {
    const response = await api.get("/bookings/count/waiting");
    return response.data;
};

export const getActiveBookingsCount = async () => {
    const response = await api.get("/bookings/count/active");
    return response.data;
};

// ===================================
// Reports
// ===================================

export const getBookingsByStatus = async (status) => {
    const response = await api.get(`/bookings/status/${status}`);
    return response.data;
};

export const getActiveBookings = async () => {
    const response = await api.get("/bookings/active");
    return response.data;
};

export const getLatestBookings = async () => {
    const response = await api.get("/bookings/latest");
    return response.data;
};

export const getBookingsBetweenDates = async (startDate, endDate) => {
    const response = await api.get("/bookings/between", {
        params: {
            startDate,
            endDate,
        },
    });
    return response.data;
};

export const getReturnsBetweenDates = async (startDate, endDate) => {
    const response = await api.get("/bookings/returns", {
        params: {
            startDate,
            endDate,
        },
    });
    return response.data;
};