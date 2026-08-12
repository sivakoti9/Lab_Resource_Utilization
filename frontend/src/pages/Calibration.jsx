import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { toast } from "react-toastify";

import {
    getAllCalibration,
    deleteCalibration
} from "../services/calibrationService";

import CalibrationForm from "../components/CalibrationForm";

function Calibration() {

    const [calibrations, setCalibrations] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [selectedCalibration, setSelectedCalibration] =
        useState(null);

    const role = localStorage.getItem("role");

    useEffect(() => {

        loadCalibrations();

    }, []);

    const loadCalibrations = async () => {

        try {

            const response =
                await getAllCalibration();

            setCalibrations(response.data);

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to load calibration records."
            );

        }

    };

    const handleAdd = () => {

        setSelectedCalibration(null);

        setShowForm(true);

    };

    const handleEdit = (calibration) => {

        setSelectedCalibration(calibration);

        setShowForm(true);

    };

    const handleDelete = async (id) => {

        if (
            !window.confirm(
                "Delete this calibration record?"
            )
        ) {
            return;
        }

        try {

            await deleteCalibration(id);

            toast.success(
                "Calibration deleted successfully."
            );

            loadCalibrations();

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to delete calibration."
            );

        }

    };

    return (

        <MainLayout>

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <h3>

                        Calibration Management

                    </h3>

                    {(role === "ADMIN" ||
                        role === "LAB_MANAGER" ||
                        role === "LAB_TECHNICIAN") && (

                        <button
                            className="btn btn-primary"
                            onClick={handleAdd}
                        >

                            Add Calibration

                        </button>

                    )}

                </div>

                <div className="table-responsive">

                    <table className="table table-bordered table-striped">

                        <thead className="table-dark">

                            <tr>

                                <th>ID</th>

                                <th>Equipment</th>

                                <th>Calibration Date</th>

                                <th>Next Calibration</th>

                                <th>Certificate No.</th>

                                <th>Performed By</th>

                                <th>Status</th>

                                {(role === "ADMIN" ||
                                    role === "LAB_MANAGER" ||
                                    role === "LAB_TECHNICIAN") && (

                                    <th>Actions</th>

                                )}

                            </tr>

                        </thead>

                        <tbody>
                                                        {calibrations.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="text-center"
                                    >

                                        No calibration records found.

                                    </td>

                                </tr>

                            ) : (

                                calibrations.map((calibration) => (

                                    <tr key={calibration.calibrationId}>

                                        <td>

                                            {calibration.calibrationId}

                                        </td>

                                        <td>

                                            {calibration.equipment?.equipmentName}

                                        </td>

                                        <td>

                                            {calibration.calibrationDate}

                                        </td>

                                        <td>

                                            {calibration.nextCalibrationDate}

                                        </td>

                                        <td>

                                            {calibration.certificateNumber}

                                        </td>

                                        <td>

                                            {calibration.performedBy}

                                        </td>

                                        <td>

                                            {calibration.status}

                                        </td>

                                        {(role === "ADMIN" ||
                                            role === "LAB_MANAGER" ||
                                            role === "LAB_TECHNICIAN") && (

                                            <td>

                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() =>
                                                        handleEdit(calibration)
                                                    }
                                                >

                                                    Edit

                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        handleDelete(
                                                            calibration.calibrationId
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

                    <CalibrationForm

                        calibration={selectedCalibration}

                        onClose={() => {

                            setShowForm(false);

                            loadCalibrations();

                        }}

                    />

                )}

            </div>

        </MainLayout>

    );

}

export default Calibration;