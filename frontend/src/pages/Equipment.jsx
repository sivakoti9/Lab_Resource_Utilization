import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Swal from "sweetalert2";

import {
    getAllEquipment,
    deleteEquipment
} from "../services/equipmentService";

function Equipment() {

    const role = localStorage.getItem("role");

    const [equipmentList, setEquipmentList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchEquipment();
    }, []);

    const fetchEquipment = async () => {

        try {

            const data = await getAllEquipment();

            setEquipmentList(data);

        } catch (err) {

            console.error(err);

            setError("Unable to load equipment.");

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        const result = await Swal.fire({
            title: "Delete Equipment?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete"
        });

        if (!result.isConfirmed) return;

        try {

            await deleteEquipment(id);

            await Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Equipment deleted successfully.",
                timer: 1500,
                showConfirmButton: false
            });

            fetchEquipment();

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Delete Failed",
                text: "Unable to delete equipment."
            });

        }

    };

    const filteredEquipment = equipmentList.filter((equipment) =>

        equipment.equipmentName?.toLowerCase().includes(search.toLowerCase()) ||
        equipment.category?.toLowerCase().includes(search.toLowerCase()) ||
        equipment.manufacturer?.toLowerCase().includes(search.toLowerCase())

    );

    const getStatusBadge = (status) => {

        switch (status) {

            case "AVAILABLE":
                return "bg-success";

            case "IN_USE":
                return "bg-primary";

            case "UNDER_MAINTENANCE":
                return "bg-warning text-dark";

            case "OUT_OF_SERVICE":
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
                        Equipment Management
                    </h2>

                    {(role === "ADMIN" ||
                        role === "LAB_MANAGER" ||
                        role === "LAB_TECHNICIAN") && (

                        <Link
                            to="/equipment/add"
                            className="btn btn-primary"
                        >
                            <i className="bi bi-plus-circle me-2"></i>
                            Add Equipment
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
                                placeholder="Search by Name, Category or Manufacturer..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </div>

                    </div>

                </div>

                {loading && (

                    <div className="alert alert-info">

                        Loading Equipment...

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
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Manufacturer</th>
                                            <th>Model</th>
                                            <th>Serial No</th>
                                            <th>Purchase Date</th>
                                            <th>Location</th>
                                            <th>Quantity</th>
                                            <th>Status</th>
                                            <th>Actions</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {filteredEquipment.length === 0 ? (

                                            <tr>

                                                <td
                                                    colSpan="11"
                                                    className="text-center py-4"
                                                >

                                                    No Equipment Found

                                                </td>

                                            </tr>

                                        ) : (

                                            filteredEquipment.map((equipment) => (

                                                <tr key={equipment.equipmentId}>

                                                    <td>{equipment.equipmentId}</td>

                                                    <td>{equipment.equipmentName}</td>

                                                    <td>{equipment.category}</td>

                                                    <td>{equipment.manufacturer}</td>

                                                    <td>{equipment.modelNumber}</td>

                                                    <td>{equipment.serialNumber}</td>

                                                    <td>{equipment.purchaseDate}</td>

                                                    <td>{equipment.location}</td>

                                                    <td>{equipment.quantity}</td>

                                                    <td>

                                                        <span className={`badge ${getStatusBadge(equipment.status)}`}>

                                                            {equipment.status}

                                                        </span>

                                                    </td>

                                                    <td>

                                                        {(role === "ADMIN" ||
                                                            role === "LAB_MANAGER" ||
                                                            role === "LAB_TECHNICIAN") && (

                                                            <Link
                                                                to={`/equipment/edit/${equipment.equipmentId}`}
                                                                className="btn btn-warning btn-sm me-2"
                                                            >
                                                                <i className="bi bi-pencil-square me-1"></i>
                                                                Edit
                                                            </Link>

                                                        )}

                                                        {(role === "ADMIN" ||
                                                            role === "LAB_MANAGER") && (

                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => handleDelete(equipment.equipmentId)}
                                                            >
                                                                <i className="bi bi-trash me-1"></i>
                                                                Delete
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

export default Equipment;