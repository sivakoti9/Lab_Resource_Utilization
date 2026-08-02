import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Swal from "sweetalert2";


import {
    getAllBookings,
    deleteBooking,
    returnEquipment,
    approveBooking,
    rejectBooking,
    getWaitingQueue
} from "../services/bookingService";

function Bookings() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const role = localStorage.getItem("role");
    useEffect(() => {

        fetchBookings();

    }, []);
    const showWaitingQueue = async (equipmentId) => {

    try {

        const queue = await getWaitingQueue(equipmentId);

        if (queue.length === 0) {

            Swal.fire(
                "Waiting Queue",
                "No users are waiting.",
                "info"
            );

            return;
        }

        let html = `
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>User</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
        `;

        queue.forEach((booking) => {

            html += `
                <tr>
                    <td>${booking.queuePosition}</td>
                    <td>${booking.user.firstName} ${booking.user.lastName}</td>
                    <td>${booking.status}</td>
                </tr>
            `;

        });

        html += `
                </tbody>
            </table>
        `;

        Swal.fire({
            title: "Waiting Queue",
            html,
            width: 700
        });

    } catch (err) {

        console.error(err);

        Swal.fire(
            "Error",
            "Unable to load waiting queue.",
            "error"
        );

    }

};

    const fetchBookings = async () => {

        try {

            setLoading(true);

            const data = await getAllBookings();

            setBookings(data);

            setError("");

        } catch (err) {

            console.error(err);

            setError("Unable to load bookings.");

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        const result = await Swal.fire({

            title: "Delete Booking?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#d33",

            cancelButtonColor: "#3085d6",

            confirmButtonText: "Delete"

        });

        if (!result.isConfirmed) return;

        try {

            await deleteBooking(id);

            Swal.fire({

                icon: "success",

                title: "Deleted",

                text: "Booking deleted successfully",

                timer: 1500,

                showConfirmButton: false

            });

            fetchBookings();

        } catch (err) {

            console.error(err);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "Unable to delete booking."

            });

        }

    };

    const handleReturn = async (id) => {

        const result = await Swal.fire({

            title: "Return Equipment?",

            text: "Mark this booking as returned?",

            icon: "question",

            showCancelButton: true,

            confirmButtonText: "Return"

        });

        if (!result.isConfirmed) return;

        try {

            await returnEquipment(id);

            Swal.fire({

                icon: "success",

                title: "Returned",

                text: "Equipment returned successfully",

                timer: 1500,

                showConfirmButton: false

            });

            fetchBookings();

        }

        catch (err) {

            console.error(err);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "Unable to return equipment."

            });

        }

    };
    const handleApprove = async (id) => {

    const result = await Swal.fire({
        title: "Approve Booking?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Approve"
    });

    if (!result.isConfirmed) return;

    try {

        await approveBooking(id);

        Swal.fire({
            icon: "success",
            title: "Approved",
            timer: 1500,
            showConfirmButton: false
        });

        fetchBookings();

    } catch (err) {

        console.error(err);

        Swal.fire(
            "Error",
            "Unable to approve booking.",
            "error"
        );

    }

};

const handleReject = async (id) => {

    const result = await Swal.fire({
        title: "Reject Booking?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Reject"
    });

    if (!result.isConfirmed) return;

    try {

        await rejectBooking(id);

        Swal.fire({
            icon: "success",
            title: "Rejected",
            timer: 1500,
            showConfirmButton: false
        });

        fetchBookings();

    } catch (err) {

        console.error(err);

        Swal.fire(
            "Error",
            "Unable to reject booking.",
            "error"
        );

    }

};

    const filteredBookings = bookings.filter((booking) => {

        const userName = `${booking.user?.firstName || ""} ${booking.user?.lastName || ""}`;

        return (

            userName.toLowerCase().includes(search.toLowerCase()) ||

            booking.equipment?.equipmentName
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            booking.status
                ?.toLowerCase()
                .includes(search.toLowerCase())

        );

    });

    const getBadge = (status) => {

    switch (status) {

        case "BOOKED":
            return "bg-success";

        case "WAITING":
            return "bg-warning text-dark";

        case "RETURNED":
            return "bg-primary";

        case "REJECTED":
            return "bg-danger";

        default:
            return "bg-secondary";
    }
};
        return (

        <MainLayout>

            <div className="container-fluid">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="fw-bold">
                        Booking Management
                    </h2>

                    {role !== "DEPARTMENT_HEAD" && (

    <Link
        to="/bookings/add"
        className="btn btn-primary"
    >
        <i className="bi bi-plus-circle me-2"></i>
        Add Booking
    </Link>

)}

                </div>

                <div className="row mb-4">

                    <div className="col-md-5">

                        <div className="input-group shadow-sm">

                            <span className="input-group-text bg-white">

                                <i className="bi bi-search"></i>

                            </span>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by User, Equipment or Status..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </div>

                    </div>

                </div>

                {loading && (

                    <div className="alert alert-info">

                        Loading bookings...

                    </div>

                )}

                {error && (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )}

                {!loading && !error && (

                    <div className="card shadow">

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table table-hover align-middle">

                                    <thead className="table-dark">

                                    <tr>

                                        <th>ID</th>
                                        <th>User</th>
                                        <th>Equipment</th>
                                        <th>Booking Date</th>
                                        <th>Return Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>

                                    </tr>

                                    </thead>

                                    <tbody>

                                    {filteredBookings.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                className="text-center py-4"
                                            >

                                                No Bookings Found

                                            </td>

                                        </tr>

                                    ) : (

                                        filteredBookings.map((booking) => (

                                            <tr key={booking.bookingId}>

                                                <td>{booking.bookingId}</td>

                                                <td>

                                                    {booking.user?.firstName} {booking.user?.lastName}

                                                </td>

                                                <td>

                                                    {booking.equipment?.equipmentName}

                                                </td>

                                                <td>{booking.bookingDate}</td>

                                                <td>{booking.returnDate}</td>

                                                <td>

                                                    <span className={`badge ${getBadge(booking.status)}`}>

                                                        {booking.status}

                                                    </span>

                                                </td>

                                               <td>

    {(role === "ADMIN" || role === "LAB_MANAGER") && (

        <Link
            to={`/bookings/edit/${booking.bookingId}`}
            className="btn btn-warning btn-sm me-2"
        >
            <i className="bi bi-pencil-square"></i>
        </Link>

    )}

    {(role === "ADMIN" ||
      role === "LAB_MANAGER" ||
      role === "LAB_TECHNICIAN") &&
      booking.status === "BOOKED" && (

        <button
            className="btn btn-success btn-sm me-2"
            onClick={() => handleReturn(booking.bookingId)}
        >
            <i className="bi bi-arrow-return-left"></i>
        </button>

    )}

    {(role === "ADMIN" ||
      role === "LAB_MANAGER") &&
      booking.status === "WAITING" && (

        <>
            <button
                className="btn btn-primary btn-sm me-2"
                onClick={() => handleApprove(booking.bookingId)}
            >
                <i className="bi bi-check-circle"></i>
            </button>

            <button
                className="btn btn-danger btn-sm me-2"
                onClick={() => handleReject(booking.bookingId)}
            >
                <i className="bi bi-x-circle"></i>
            </button>
        </>

    )}

    {(role === "ADMIN" ||
      role === "LAB_MANAGER" ||
      role === "LAB_TECHNICIAN" ||
      role === "DEPARTMENT_HEAD") &&
      booking.status === "WAITING" && (

        <button
            className="btn btn-info btn-sm me-2"
            onClick={() => showWaitingQueue(booking.equipment.equipmentId)}
            title="Waiting Queue"
        >
            <i className="bi bi-list-ol"></i>
        </button>

    )}

    {(role === "ADMIN" ||
      role === "LAB_MANAGER") && (

        <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(booking.bookingId)}
        >
            <i className="bi bi-trash"></i>
        </button>

    )}

</td>

                                            </tr>

                                        ))

                                    )}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </MainLayout>

    );

}

export default Bookings;