import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../layout/MainLayout";

import { getAllUsers } from "../services/userService";
import { getAllEquipment } from "../services/equipmentService";

import {
    getBookingById,
    updateBooking
} from "../services/bookingService";

function EditBooking() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [equipment, setEquipment] = useState([]);

    const [formData, setFormData] = useState({
        userId: "",
        equipmentId: "",
        bookingDate: "",
        returnDate: "",
        status: ""
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const usersData = await getAllUsers();
            const equipmentData = await getAllEquipment();
            const booking = await getBookingById(id);

            setUsers(usersData);
            setEquipment(equipmentData);

            setFormData({
                userId: booking.user.userId,
                equipmentId: booking.equipment.equipmentId,
                bookingDate: booking.bookingDate,
                returnDate: booking.returnDate,
                status: booking.status
            });

        } catch (error) {

            console.error(error);

            Swal.fire(
                "Error",
                "Unable to load booking.",
                "error"
            );

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const booking = {

            user: {
                userId: Number(formData.userId)
            },

            equipment: {
                equipmentId: Number(formData.equipmentId)
            },

            bookingDate: formData.bookingDate,

            returnDate: formData.returnDate,

            status: formData.status

        };

        try {

            await updateBooking(id, booking);

            Swal.fire(
                "Success",
                "Booking updated successfully.",
                "success"
            );

            navigate("/bookings");

        } catch (error) {

            console.error(error);

            Swal.fire(
                "Error",
                "Unable to update booking.",
                "error"
            );

        }

    };

    return (

        <MainLayout>

            <div className="container">

                <div className="card shadow">

                    <div className="card-header bg-warning">

                        <h3>Edit Booking</h3>

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label>User</label>

                                <select
                                    className="form-select"
                                    name="userId"
                                    value={formData.userId}
                                    onChange={handleChange}
                                >

                                    {users.map(user => (

                                        <option
                                            key={user.userId}
                                            value={user.userId}
                                        >

                                            {user.firstName} {user.lastName}

                                        </option>

                                    ))}

                                </select>

                            </div>

                            <div className="mb-3">

                                <label>Equipment</label>

                                <select
                                    className="form-select"
                                    name="equipmentId"
                                    value={formData.equipmentId}
                                    onChange={handleChange}
                                >

                                    {equipment.map(item => (

                                        <option
                                            key={item.equipmentId}
                                            value={item.equipmentId}
                                        >

                                            {item.equipmentName}

                                        </option>

                                    ))}

                                </select>

                            </div>

                            <div className="mb-3">

                                <label>Booking Date</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="bookingDate"
                                    value={formData.bookingDate}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Return Date</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="returnDate"
                                    value={formData.returnDate}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-4">

                                <label>Status</label>

                                <select
                                    className="form-select"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >

                                    <option value="BOOKED">
                                        BOOKED
                                    </option>

                                    <option value="WAITING">
                                        WAITING
                                    </option>

                                    <option value="RETURNED">
                                        RETURNED
                                    </option>

                                    <option value="CANCELLED">
                                        CANCELLED
                                    </option>

                                </select>

                            </div>

                            <button
                                className="btn btn-warning"
                                type="submit"
                            >

                                Update Booking

                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary ms-2"
                                onClick={() => navigate("/bookings")}
                            >

                                Cancel

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default EditBooking;