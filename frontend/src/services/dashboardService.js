import { getTotalUsers } from "./userService";

import {
    getTotalBookings,
    getBookedCount,
    getReturnedCount,
    getWaitingCount,
    getActiveBookingsCount,
    getMyTotalBookings,
    getMyBookedCount,
    getMyReturnedCount,
    getMyWaitingCount,
    getMyActiveBookingsCount
} from "./bookingService";

import {
    getAllEquipment
} from "./equipmentService";


export const getDashboardData = async () => {

    const role = localStorage.getItem("role");

    // =========================================
    // STUDENT / RESEARCHER DASHBOARD
    // =========================================

    if (
        role === "STUDENT" ||
        role === "RESEARCHER"
    ) {

        const [
            equipment,
            totalBookings,
            bookedBookings,
            returnedBookings,
            waitingBookings,
            activeBookings
        ] = await Promise.all([

            getAllEquipment(),

            getMyTotalBookings(),

            getMyBookedCount(),

            getMyReturnedCount(),

            getMyWaitingCount(),

            getMyActiveBookingsCount()

        ]);

        return {

            equipment,

            totalUsers: 0,

            totalBookings,

            bookedBookings,

            returnedBookings,

            waitingBookings,

            activeBookings

        };

    }


    // =========================================
    // ADMIN / LAB MANAGER / DEPARTMENT HEAD
    // =========================================

    const [
        equipment,
        totalUsers,
        totalBookings,
        bookedBookings,
        returnedBookings,
        waitingBookings,
        activeBookings
    ] = await Promise.all([

        getAllEquipment(),

        getTotalUsers(),

        getTotalBookings(),

        getBookedCount(),

        getReturnedCount(),

        getWaitingCount(),

        getActiveBookingsCount()

    ]);

    return {

        equipment,

        totalUsers,

        totalBookings,

        bookedBookings,

        returnedBookings,

        waitingBookings,

        activeBookings

    };

};