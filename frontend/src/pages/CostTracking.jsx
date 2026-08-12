import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { toast } from "react-toastify";

import {
    getAllCosts,
    deleteCost
} from "../services/costTrackingService";

import CostTrackingForm from "../components/CostTrackingForm";

function CostTracking() {

    const [costs, setCosts] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [selectedCost, setSelectedCost] =
        useState(null);

    const role = localStorage.getItem("role");

    useEffect(() => {

        loadCosts();

    }, []);

    const loadCosts = async () => {

        try {

            const response =
                await getAllCosts();

            setCosts(response.data);

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to load cost records."
            );

        }

    };

    const handleAdd = () => {

        setSelectedCost(null);

        setShowForm(true);

    };

    const handleEdit = (cost) => {

        setSelectedCost(cost);

        setShowForm(true);

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this cost record?")) {

            return;

        }

        try {

            await deleteCost(id);

            toast.success(
                "Cost record deleted successfully."
            );

            loadCosts();

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to delete cost record."
            );

        }

    };

    return (

        <MainLayout>

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <h3>

                        Cost Tracking

                    </h3>

                    {(role === "ADMIN" ||
                        role === "LAB_MANAGER") && (

                        <button
                            className="btn btn-primary"
                            onClick={handleAdd}
                        >

                            Add Cost

                        </button>

                    )}

                </div>

                <div className="table-responsive">

                    <table className="table table-bordered table-striped">

                        <thead className="table-dark">

                            <tr>

                                <th>ID</th>

                                <th>Equipment</th>

                                <th>Maintenance</th>

                                <th>Cost Type</th>

                                <th>Amount</th>

                                <th>Expense Date</th>

                                <th>Description</th>

                                {(role === "ADMIN" ||
                                    role === "LAB_MANAGER") && (

                                    <th>Actions</th>

                                )}

                            </tr>

                        </thead>

                        <tbody>
                                                        {costs.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="text-center"
                                    >

                                        No cost records found.

                                    </td>

                                </tr>

                            ) : (

                                costs.map((cost) => (

                                    <tr key={cost.costId}>

                                        <td>

                                            {cost.costId}

                                        </td>

                                        <td>

                                            {cost.equipment?.equipmentName}

                                        </td>

                                        <td>

                                            {cost.maintenance
                                                ? cost.maintenance.maintenanceId
                                                : "-"}

                                        </td>

                                        <td>

                                            {cost.costType}

                                        </td>

                                        <td>

                                            ₹ {cost.amount}

                                        </td>

                                        <td>

                                            {cost.expenseDate}

                                        </td>

                                        <td>

                                            {cost.description}

                                        </td>

                                        {(role === "ADMIN" ||
                                            role === "LAB_MANAGER") && (

                                            <td>

                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() =>
                                                        handleEdit(cost)
                                                    }
                                                >

                                                    Edit

                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        handleDelete(cost.costId)
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

                    <CostTrackingForm

                        cost={selectedCost}

                        onClose={() => {

                            setShowForm(false);

                            loadCosts();

                        }}

                    />

                )}

            </div>

        </MainLayout>

    );

}

export default CostTracking;