import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import {
    addCalibration,
    updateCalibration
} from "../services/calibrationService";

function CalibrationForm({

    calibration,
    onClose

}) {

    const token = localStorage.getItem("token");

    const [equipmentList, setEquipmentList] = useState([]);

    const [formData, setFormData] = useState({

        equipment: {
            equipmentId: ""
        },

        calibrationDate: "",

        nextCalibrationDate: "",

        certificateNumber: "",

        performedBy: "",

        status: "VALID"

    });

    useEffect(() => {

        loadEquipment();

        if (calibration) {

            setFormData({

                equipment: {
                    equipmentId:
                        calibration.equipment?.equipmentId || ""
                },

                calibrationDate:
                    calibration.calibrationDate || "",

                nextCalibrationDate:
                    calibration.nextCalibrationDate || "",

                certificateNumber:
                    calibration.certificateNumber || "",

                performedBy:
                    calibration.performedBy || "",

                status:
                    calibration.status || "VALID"

            });

        }

    }, [calibration]);

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

            console.error(error);

            toast.error("Unable to load equipment.");

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

            if (calibration) {

                await updateCalibration(

                    calibration.calibrationId,

                    formData

                );

                toast.success(
                    "Calibration updated successfully."
                );

            }

            else {

                await addCalibration(formData);

                toast.success(
                    "Calibration added successfully."
                );

            }

            onClose();

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to save calibration."
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

                            {calibration
                                ? "Update Calibration"
                                : "Add Calibration"}

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

                            {/* Calibration Date */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Calibration Date

                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="calibrationDate"
                                    value={formData.calibrationDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            {/* Next Calibration Date */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Next Calibration Date

                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="nextCalibrationDate"
                                    value={formData.nextCalibrationDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            {/* Certificate Number */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Certificate Number

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="certificateNumber"
                                    value={formData.certificateNumber}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            {/* Performed By */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Performed By

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="performedBy"
                                    value={formData.performedBy}
                                    onChange={handleChange}
                                    required
                                />

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

                                    <option value="VALID">
                                        VALID
                                    </option>

                                    <option value="EXPIRED">
                                        EXPIRED
                                    </option>

                                    <option value="PENDING">
                                        PENDING
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

                                {calibration
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

export default CalibrationForm;