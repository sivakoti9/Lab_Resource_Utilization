import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { toast } from "react-toastify";
import { getReports } from "../services/reportService";

function Reports() {

    const [reports, setReports] = useState([]);

    useEffect(() => {

        loadReports();

    }, []);

    const loadReports = async () => {

        try {

            const response = await getReports();

            setReports(response.data);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load reports.");

        }

    };

    return (

        <MainLayout>

            <div className="container-fluid mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h3 className="fw-bold">

                        Utilization & Cost Report

                    </h3>

                </div>

                <div className="card shadow">

                    <div className="card-header bg-dark text-white">

                        <h5 className="mb-0">

                            Equipment Utilization Report

                        </h5>

                    </div>

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-bordered table-hover">

                                <thead className="table-dark">

                                    <tr>

                                        <th>Equipment</th>

                                        <th>Total Qty</th>

                                        <th>Booked</th>

                                        <th>Available</th>

                                        <th>Utilization</th>

                                        <th>Maintenance Cost</th>

                                    </tr>

                                </thead>

                                <tbody>
                                                                        {reports.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="text-center"
                                            >

                                                No report data available.

                                            </td>

                                        </tr>

                                    ) : (

                                        reports.map((report, index) => (

                                            <tr key={index}>

                                                <td>

                                                    {report.equipmentName}

                                                </td>

                                                <td>

                                                    {report.totalQuantity}

                                                </td>

                                                <td>

                                                    {report.bookedQuantity}

                                                </td>

                                                <td>

                                                    {report.availableQuantity}

                                                </td>

                                                <td>

                                                    <div className="progress">

                                                        <div
                                                            className={`progress-bar ${
                                                                report.utilizationPercentage >= 90
                                                                    ? "bg-danger"
                                                                    : report.utilizationPercentage >= 60
                                                                    ? "bg-warning"
                                                                    : "bg-success"
                                                            }`}
                                                            style={{
                                                                width: `${report.utilizationPercentage}%`
                                                            }}
                                                        >

                                                            {report.utilizationPercentage.toFixed(1)}%

                                                        </div>

                                                    </div>

                                                </td>

                                                <td>

                                                    ₹ {report.totalMaintenanceCost.toLocaleString()}

                                                </td>

                                            </tr>

                                        ))

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default Reports;