import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    addMaintenance,
    updateMaintenance
} from "../services/maintenanceService";

import axios from "axios";

function MaintenanceForm({

    maintenance,
    onClose

}) {

    const token = localStorage.getItem("token");

    const [equipmentList, setEquipmentList] = useState([]);

    const [formData, setFormData] = useState({

        equipment: {
            equipmentId: ""
        },

        maintenanceDate: "",

        nextMaintenanceDate: "",

        completionDate: "",

        technician: "",

        description: "",

        status: "SCHEDULED"

    });

    useEffect(() => {

        loadEquipment();

        if (maintenance) {

            setFormData({

                equipment: {
                    equipmentId:
                        maintenance.equipment?.equipmentId || ""
                },

                maintenanceDate:
                    maintenance.maintenanceDate || "",

                nextMaintenanceDate:
                    maintenance.nextMaintenanceDate || "",

                completionDate:
                    maintenance.completionDate || "",

                technician:
                    maintenance.technician || "",

                description:
                    maintenance.description || "",

                status:
                    maintenance.status || "SCHEDULED"

            });

        }

    }, [maintenance]);

    // ============================================
    // LOAD EQUIPMENT
    // ============================================

    const loadEquipment = async () => {

        try {

            const response = await axios.get(

                "http://localhost:8080/api/equipment",

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            setEquipmentList(response.data);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load equipment.");

        }

    };

    // ============================================
    // HANDLE CHANGE
    // ============================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "equipmentId") {

            setFormData({

                ...formData,

                equipment: {

                    equipmentId: value

                }

            });

        }

        else {

            setFormData({

                ...formData,

                [name]: value

            });

        }

    };

    // ============================================
    // SAVE
    // ============================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (maintenance) {

                await updateMaintenance(

                    maintenance.maintenanceId,

                    formData

                );

                toast.success(

                    "Maintenance updated successfully."

                );

            }

            else {

                await addMaintenance(

                    formData

                );

                toast.success(

                    "Maintenance scheduled successfully."

                );

            }

            onClose();

        }

        catch (error) {

            console.error(error);

            toast.error(

                "Unable to save maintenance."

            );

        }

    };

        return (

        <div
            className="modal d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">

                            {maintenance
                                ? "Update Maintenance"
                                : "Schedule Maintenance"}

                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            {/* Equipment */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Equipment

                                </label>

                                <select
                                    className="form-select"
                                    name="equipmentId"
                                    value={formData.equipment.equipmentId}
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

                                        </option>

                                    ))}

                                </select>

                            </div>

                            {/* Maintenance Date */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Maintenance Date

                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="maintenanceDate"
                                    value={formData.maintenanceDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            {/* Next Maintenance */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Next Maintenance Date

                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="nextMaintenanceDate"
                                    value={formData.nextMaintenanceDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            {/* Completion Date */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Completion Date

                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="completionDate"
                                    value={formData.completionDate}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* Technician */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Technician

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="technician"
                                    value={formData.technician}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            {/* Description */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Description

                                </label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                ></textarea>

                            </div>

                            {/* Status */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Status

                                </label>

                                <select
                                    className="form-select"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >

                                    <option value="SCHEDULED">
                                        SCHEDULED
                                    </option>

                                    <option value="IN_PROGRESS">
                                        IN_PROGRESS
                                    </option>

                                    <option value="COMPLETED">
                                        COMPLETED
                                    </option>

                                </select>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >

                                Cancel

                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >

                                {maintenance
                                    ? "Update"
                                    : "Save"}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default MaintenanceForm;