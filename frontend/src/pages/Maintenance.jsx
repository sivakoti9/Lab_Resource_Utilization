import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    getAllMaintenance,
    deleteMaintenance
} from "../services/maintenanceService";
import MaintenanceForm from "../components/MaintenanceForm";
import MainLayout from "../layout/MainLayout";

function Maintenance() {

    const [maintenanceList, setMaintenanceList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedMaintenance, setSelectedMaintenance] = useState(null);

    const role = localStorage.getItem("role");

    useEffect(() => {
        loadMaintenance();
    }, []);

    const loadMaintenance = async () => {

        try {

            const response = await getAllMaintenance();

            setMaintenanceList(response.data);

        } catch (error) {

            console.error(error);

            toast.error("Unable to load maintenance records.");

        }

    };

    const handleAdd = () => {

        setSelectedMaintenance(null);

        setShowForm(true);

    };

    const handleEdit = (maintenance) => {

        setSelectedMaintenance(maintenance);

        setShowForm(true);

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this maintenance record?")) {
            return;
        }

        try {

            await deleteMaintenance(id);

            toast.success("Maintenance deleted successfully.");

            loadMaintenance();

        } catch (error) {

            console.error(error);

            toast.error("Delete failed.");

        }

    };

    return (
        <MainLayout>

        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h3>Maintenance Management</h3>

                {(role === "ADMIN" || role === "LAB_MANAGER") && (

                    <button
                        className="btn btn-primary"
                        onClick={handleAdd}
                    >
                        Add Maintenance
                    </button>

                )}

            </div>

            <div className="table-responsive">

                <table className="table table-bordered table-striped">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Equipment</th>
                            <th>Maintenance Date</th>
                            <th>Next Maintenance</th>
                            <th>Completion Date</th>
                            <th>Technician</th>
                            <th>Status</th>
                            <th>Description</th>

                            {(role === "ADMIN" || role === "LAB_MANAGER") && (
                                <th>Actions</th>
                            )}

                        </tr>

                    </thead>

                    <tbody>

                        {maintenanceList.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="9"
                                    className="text-center"
                                >
                                    No maintenance records found.
                                </td>

                            </tr>

                        ) : (

                            maintenanceList.map((maintenance) => (

                                <tr key={maintenance.maintenanceId}>

                                    <td>{maintenance.maintenanceId}</td>

                                    <td>
                                        {maintenance.equipment?.equipmentName}
                                    </td>

                                    <td>{maintenance.maintenanceDate}</td>

                                    <td>{maintenance.nextMaintenanceDate}</td>

                                    <td>{maintenance.completionDate}</td>

                                    <td>{maintenance.technician}</td>

                                    <td>{maintenance.status}</td>

                                    <td>{maintenance.description}</td>

                                    {(role === "ADMIN" || role === "LAB_MANAGER") && (

                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() =>
                                                    handleEdit(maintenance)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    handleDelete(
                                                        maintenance.maintenanceId
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    )}

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

            {showForm && (

                <MaintenanceForm
                    maintenance={selectedMaintenance}
                    onClose={() => {
                        setShowForm(false);
                        loadMaintenance();
                    }}
                />

            )}

        </div>

    </MainLayout>
    );

}

export default Maintenance;