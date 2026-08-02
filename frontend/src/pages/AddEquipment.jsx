import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MainLayout from "../layout/MainLayout";
import { addEquipment } from "../services/equipmentService";

function AddEquipment() {

    const navigate = useNavigate();

    const [equipment, setEquipment] = useState({
        equipmentName: "",
        category: "",
        manufacturer: "",
        modelNumber: "",
        serialNumber: "",
        purchaseDate: "",
        location: "",
        quantity: "",
        status: "AVAILABLE"
    });

    const handleChange = (e) => {
        setEquipment({
            ...equipment,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await addEquipment(equipment);

            toast.success("Equipment Added Successfully");

            navigate("/equipment");

        } catch (error) {

            console.error(error);

            toast.error("Failed to Add Equipment");

        }

    };

    return (

        <MainLayout>

            <div className="container py-4">

                <div className="card shadow-lg border-0">

                    <div className="card-header bg-primary text-white">

                        <h3 className="mb-0">Add New Equipment</h3>

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Equipment Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="equipmentName"
                                        value={equipment.equipmentName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Category
                                    </label>

                                    <select
                                        className="form-select"
                                        name="category"
                                        value={equipment.category}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">Select Category</option>
                                        <option value="Microscope">Microscope</option>
                                        <option value="Computer">Computer</option>
                                        <option value="Printer">Printer</option>
                                        <option value="Networking">Networking</option>
                                        <option value="Laboratory Instrument">Laboratory Instrument</option>
                                        <option value="Sensor">Sensor</option>
                                        <option value="Other">Other</option>

                                    </select>

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Manufacturer
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="manufacturer"
                                        value={equipment.manufacturer}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Model Number
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="modelNumber"
                                        value={equipment.modelNumber}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Serial Number
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="serialNumber"
                                        value={equipment.serialNumber}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Purchase Date
                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        name="purchaseDate"
                                        value={equipment.purchaseDate}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="location"
                                        value={equipment.location}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Quantity
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="quantity"
                                        value={equipment.quantity}
                                        onChange={handleChange}
                                        min="1"
                                    />

                                </div>

                                <div className="col-md-6 mb-4">

                                    <label className="form-label">
                                        Status
                                    </label>

                                    <select
                                        className="form-select"
                                        name="status"
                                        value={equipment.status}
                                        onChange={handleChange}
                                    >

                                        <option value="AVAILABLE">AVAILABLE</option>
                                        <option value="IN_USE">IN_USE</option>
                                        <option value="UNDER_MAINTENANCE">UNDER_MAINTENANCE</option>
                                        <option value="OUT_OF_SERVICE">OUT_OF_SERVICE</option>

                                    </select>

                                </div>

                            </div>

                            <div className="d-flex justify-content-end">

                                <button
                                    type="button"
                                    className="btn btn-secondary me-2"
                                    onClick={() => navigate("/equipment")}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Save Equipment
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default AddEquipment;