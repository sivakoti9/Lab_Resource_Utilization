import {
    getTotalUsers
} from "./userService";

import {
    getTotalBookings,
    getBookedCount,
    getReturnedCount,
    getWaitingCount,
    getActiveBookingsCount
} from "./bookingService";

import {
    getAllEquipment
} from "./equipmentService";

export const getDashboardData = async () => {

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