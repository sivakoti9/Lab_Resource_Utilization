import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import {
    addCost,
    updateCost
} from "../services/costTrackingService";

function CostTrackingForm({

    cost,
    onClose

}) {

    const token = localStorage.getItem("token");

    const [equipmentList, setEquipmentList] = useState([]);
    const [maintenanceList, setMaintenanceList] = useState([]);

    const [formData, setFormData] = useState({

        equipment: {
            equipmentId: ""
        },

        maintenance: {
            maintenanceId: ""
        },

        costType: "",

        amount: "",

        expenseDate: "",

        description: ""

    });

    useEffect(() => {

        loadEquipment();
        loadMaintenance();

        if (cost) {

            setFormData({

                equipment: {
                    equipmentId:
                        cost.equipment?.equipmentId || ""
                },

                maintenance: {
                    maintenanceId:
                        cost.maintenance?.maintenanceId || ""
                },

                costType:
                    cost.costType || "",

                amount:
                    cost.amount || "",

                expenseDate:
                    cost.expenseDate || "",

                description:
                    cost.description || ""

            });

        }

    }, [cost]);

    // ====================================
    // LOAD EQUIPMENT
    // ====================================

    const loadEquipment = async () => {

        try {

            const response = await axios.get(

                "http://localhost:8080/api/equipment",

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );

            setEquipmentList(response.data);

        }

        catch (error) {

            toast.error("Unable to load equipment.");

        }

    };

    // ====================================
    // LOAD MAINTENANCE
    // ====================================

    const loadMaintenance = async () => {

        try {

            const response = await axios.get(

                "http://localhost:8080/api/maintenance",

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );

            setMaintenanceList(response.data);

        }

        catch (error) {

            toast.error("Unable to load maintenance.");

        }

    };

    // ====================================
    // HANDLE CHANGE
    // ====================================

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

        else if (name === "maintenanceId") {

            setFormData({

                ...formData,

                maintenance: {

                    maintenanceId: value

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

    // ====================================
    // SAVE
    // ====================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (cost) {

                await updateCost(

                    cost.costId,

                    formData

                );

                toast.success(
                    "Cost updated successfully."
                );

            }

            else {

                await addCost(formData);

                toast.success(
                    "Cost added successfully."
                );

            }

            onClose();

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to save cost."
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

                            {cost
                                ? "Update Cost"
                                : "Add Cost"}

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

                            {/* Maintenance */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Maintenance

                                </label>

                                <select
                                    className="form-select"
                                    name="maintenanceId"
                                    value={formData.maintenance.maintenanceId}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Maintenance
                                    </option>

                                    {maintenanceList.map((maintenance) => (

                                        <option
                                            key={maintenance.maintenanceId}
                                            value={maintenance.maintenanceId}
                                        >

                                            #{maintenance.maintenanceId} - {maintenance.equipment?.equipmentName}

                                        </option>

                                    ))}

                                </select>

                            </div>

                            {/* Cost Type */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Cost Type

                                </label>

                                <select
                                    className="form-select"
                                    name="costType"
                                    value={formData.costType}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Cost Type
                                    </option>

                                    <option value="MAINTENANCE">
                                        MAINTENANCE
                                    </option>

                                    <option value="CALIBRATION">
                                        CALIBRATION
                                    </option>

                                    <option value="REPAIR">
                                        REPAIR
                                    </option>

                                    <option value="PURCHASE">
                                        PURCHASE
                                    </option>

                                    <option value="OTHER">
                                        OTHER
                                    </option>

                                </select>

                            </div>

                            {/* Amount */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Amount

                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            {/* Expense Date */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Expense Date

                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="expenseDate"
                                    value={formData.expenseDate}
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
                                />

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

                                {cost
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

export default CostTrackingForm;