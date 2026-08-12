import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Swal from "sweetalert2";

import { createBooking } from "../services/bookingService";
import { getAllEquipment } from "../services/equipmentService";

function AddBooking() {

    const navigate = useNavigate();

    const [equipmentList, setEquipmentList] = useState([]);

    const [formData, setFormData] = useState({

    equipmentId: "",
    bookingDate: "",
    returnDate: ""

});

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {


            const equipmentData = await getAllEquipment();


            setEquipmentList(equipmentData);

        } catch (err) {

            console.error(err);

            Swal.fire(
                "Error",
                "Unable to load users or equipment.",
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

        if (
    !formData.equipmentId ||
    !formData.bookingDate ||
    !formData.returnDate
) {

            Swal.fire(
                "Validation",
                "Please fill all fields.",
                "warning"
            );

            return;

        }

        if (formData.returnDate < formData.bookingDate) {

            Swal.fire(
                "Validation",
                "Return date cannot be before booking date.",
                "warning"
            );

            return;

        }

        const booking = {

            user: {
    userId: Number(localStorage.getItem("userId"))
},

            equipment: {
                equipmentId: Number(formData.equipmentId)
            },

            bookingDate: formData.bookingDate,

            returnDate: formData.returnDate

        };

        try {

            const response = await createBooking(booking);

            Swal.fire({

                icon: "success",

                title:
                    response.status === "WAITING"
                        ? "Added to Waiting Queue"
                        : "Booking Approved",

                text:
                    response.status === "WAITING"
                        ? `Queue Position : ${response.queuePosition}`
                        : "Equipment booked successfully.",

                timer: 2000,

                showConfirmButton: false

            });

            navigate("/bookings");

        } catch (err) {

            console.error(err);

            Swal.fire(
                "Error",
                "Unable to create booking.",
                "error"
            );

        }

    };

    return (

        <MainLayout>

            <div className="container">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        <h3 className="mb-0">

                            Add Booking

                        </h3>

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            

                            <div className="mb-3">

                                <label className="form-label">

                                    Equipment

                                </label>

                                <select
                                    className="form-select"
                                    name="equipmentId"
                                    value={formData.equipmentId}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Equipment
                                    </option>

                                    {equipmentList.map((equipment) => (

                                        <option
                                            key={equipment.equipmentId}
                                            value={equipment.equipmentId}
                                        >

                                            {equipment.equipmentName}
                                            {" "}
                                            ({equipment.status})

                                        </option>

                                    ))}

                                </select>

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Booking Date

                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="bookingDate"
                                    value={formData.bookingDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-4">

                                <label className="form-label">

                                    Return Date

                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="returnDate"
                                    value={formData.returnDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary me-2"
                            >

                                <i className="bi bi-save me-2"></i>

                                Save Booking

                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
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

export default AddBooking;