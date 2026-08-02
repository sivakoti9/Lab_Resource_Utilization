import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { getEquipmentUtilization } from "../services/equipmentService";

import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

function EquipmentUtilization() {

    const [utilization, setUtilization] = useState([]);

    useEffect(() => {
        loadUtilization();
    }, []);

    const loadUtilization = async () => {

        try {

            const data = await getEquipmentUtilization();

            setUtilization(data);

        } catch (error) {

            console.error(error);

        }

    };

    const totalQuantity = utilization.reduce(
        (sum, item) => sum + item.totalQuantity,
        0
    );

    const bookedQuantity = utilization.reduce(
        (sum, item) => sum + item.bookedQuantity,
        0
    );

    const availableQuantity = utilization.reduce(
        (sum, item) => sum + item.availableQuantity,
        0
    );

    const doughnutData = {

        labels: ["Booked", "Available"],

        datasets: [

            {

                data: [
                    bookedQuantity,
                    availableQuantity
                ],

                backgroundColor: [
                    "#0d6efd",
                    "#198754"
                ]

            }

        ]

    };

    const barData = {

        labels: utilization.map(
            item => item.equipmentName
        ),

        datasets: [

            {

                label: "Utilization %",

                data: utilization.map(
                    item => item.utilizationPercentage
                ),

                backgroundColor: "#0d6efd"

            }

        ]

    };

    return (

        <MainLayout>

            <div className="container-fluid">

                <h2 className="fw-bold mb-4">
                    Equipment Utilization Analytics
                </h2>

                <div className="row mb-4">

                    <div className="col-md-4">

                        <div className="card shadow border-0 bg-primary text-white">

                            <div className="card-body text-center">

                                <h5>Total Quantity</h5>

                                <h2>{totalQuantity}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card shadow border-0 bg-success text-white">

                            <div className="card-body text-center">

                                <h5>Available</h5>

                                <h2>{availableQuantity}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card shadow border-0 bg-danger text-white">

                            <div className="card-body text-center">

                                <h5>Booked</h5>

                                <h2>{bookedQuantity}</h2>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="row">

                    <div className="col-lg-5">

                        <div className="card shadow mb-4">

                            <div className="card-header">

                                <h5 className="mb-0">

                                    Overall Utilization

                                </h5>

                            </div>

                            <div className="card-body">

                                <Doughnut data={doughnutData} />

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-7">

                        <div className="card shadow mb-4">

                            <div className="card-header">

                                <h5 className="mb-0">

                                    Equipment Utilization %

                                </h5>

                            </div>

                            <div className="card-body">

                                <Bar
                                    data={barData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                display: false
                                            }
                                        },
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                max: 100
                                            }
                                        }
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card shadow">

                    <div className="card-header bg-dark text-white">

                        <h5 className="mb-0">

                            Equipment Utilization Details

                        </h5>

                    </div>

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-bordered table-hover align-middle">

                                <thead className="table-light">

                                    <tr>

                                        <th>ID</th>
                                        <th>Equipment</th>
                                        <th>Category</th>
                                        <th>Total</th>
                                        <th>Booked</th>
                                        <th>Available</th>
                                        <th>Utilization</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {utilization.map((item) => (

                                        <tr key={item.equipmentId}>

                                            <td>{item.equipmentId}</td>

                                            <td>{item.equipmentName}</td>

                                            <td>{item.category}</td>

                                            <td>{item.totalQuantity}</td>

                                            <td>{item.bookedQuantity}</td>

                                            <td>{item.availableQuantity}</td>

                                            <td style={{ width: "250px" }}>

                                                <div className="progress">

                                                    <div
                                                        className={`progress-bar ${
                                                            item.utilizationPercentage >= 90
                                                                ? "bg-danger"
                                                                : item.utilizationPercentage >= 60
                                                                ? "bg-warning"
                                                                : "bg-success"
                                                        }`}
                                                        role="progressbar"
                                                        style={{
                                                            width: `${item.utilizationPercentage}%`
                                                        }}
                                                    >

                                                        {item.utilizationPercentage}%

                                                    </div>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default EquipmentUtilization;