import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { getEquipmentUtilization } from "../services/equipmentService";
import { getDashboardData } from "../services/dashboardService";

function Dashboard() {

    const role = localStorage.getItem("role");

    const canViewUsers =
        role === "ADMIN" ||
        role === "LAB_MANAGER" ||
        role === "DEPARTMENT_HEAD";

    const canViewUtilization =
        role === "ADMIN" ||
        role === "LAB_MANAGER" ||
        role === "DEPARTMENT_HEAD";

    const [equipment, setEquipment] = useState([]);
    const [utilization, setUtilization] = useState([]);

    const [totalUsers, setTotalUsers] = useState(0);
    const [totalBookings, setTotalBookings] = useState(0);
    const [activeBookings, setActiveBookings] = useState(0);
    const [waitingBookings, setWaitingBookings] = useState(0);
    const [returnedBookings, setReturnedBookings] = useState(0);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const dashboard = await getDashboardData();

            setEquipment(dashboard.equipment);

            setTotalUsers(dashboard.totalUsers);
            setTotalBookings(dashboard.totalBookings);
            setActiveBookings(dashboard.activeBookings);
            setWaitingBookings(dashboard.waitingBookings);
            setReturnedBookings(dashboard.returnedBookings);

            if (canViewUtilization) {

                const utilizationData =
                    await getEquipmentUtilization();

                setUtilization(utilizationData);

            }

        } catch (error) {

            console.error("Dashboard Error:", error);

        }

    };

    const totalEquipment = equipment.length;

    const availableEquipment = equipment.filter(
        item => item.status === "AVAILABLE"
    ).length;

    const unavailableEquipment = equipment.filter(
        item => item.status === "UNAVAILABLE"
    ).length;

    const maintenanceEquipment = equipment.filter(
        item => item.status === "UNDER_MAINTENANCE"
    ).length;
    return (

        <MainLayout>

            <div className="container-fluid">

                <h2 className="fw-bold mb-4">
                    Dashboard
                </h2>

                {/* EQUIPMENT STATISTICS */}

                <div className="row g-4">

                    <div className="col-lg-3 col-md-6">

                        <div className="card bg-primary text-white shadow">

                            <div className="card-body text-center">

                                <h6>Total Equipment</h6>

                                <h2>{totalEquipment}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="card bg-success text-white shadow">

                            <div className="card-body text-center">

                                <h6>Available</h6>

                                <h2>{availableEquipment}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="card bg-danger text-white shadow">

                            <div className="card-body text-center">

                                <h6>Unavailable</h6>

                                <h2>{unavailableEquipment}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="card bg-warning shadow">

                            <div className="card-body text-center">

                                <h6>Maintenance</h6>

                                <h2>{maintenanceEquipment}</h2>

                            </div>

                        </div>

                    </div>

                </div>
                {/* BOOKING STATISTICS */}

                <div className="row g-4 mt-2">

                    {canViewUsers && (

                        <div className="col-lg-3 col-md-6">

                            <div className="card bg-info text-white shadow">

                                <div className="card-body text-center">

                                    <h6>Total Users</h6>

                                    <h2>{totalUsers}</h2>

                                </div>

                            </div>

                        </div>

                    )}

                    <div className="col-lg-3 col-md-6">

                        <div className="card bg-secondary text-white shadow">

                            <div className="card-body text-center">

                                <h6>Total Bookings</h6>

                                <h2>{totalBookings}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-2 col-md-4">

                        <div className="card bg-success text-white shadow">

                            <div className="card-body text-center">

                                <h6>Active</h6>

                                <h2>{activeBookings}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-2 col-md-4">

                        <div className="card bg-warning shadow">

                            <div className="card-body text-center">

                                <h6>Waiting</h6>

                                <h2>{waitingBookings}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-2 col-md-4">

                        <div className="card bg-dark text-white shadow">

                            <div className="card-body text-center">

                                <h6>Returned</h6>

                                <h2>{returnedBookings}</h2>

                            </div>

                        </div>

                    </div>

                </div>
                {/* EQUIPMENT UTILIZATION */}

                {canViewUtilization && (

                    <div className="card shadow mt-5">

                        <div className="card-header bg-dark text-white">

                            <h5 className="mb-0">
                                Equipment Utilization
                            </h5>

                        </div>

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover">

                                    <thead className="table-dark">

                                        <tr>

                                            <th>ID</th>
                                            <th>Equipment</th>
                                            <th>Total</th>
                                            <th>Booked</th>
                                            <th>Available</th>
                                            <th>Utilization</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {utilization.map((item) => (

                                            <tr key={item.equipmentId}>

                                                <td>
                                                    {item.equipmentId}
                                                </td>

                                                <td>
                                                    {item.equipmentName}
                                                </td>

                                                <td>
                                                    {item.totalQuantity}
                                                </td>

                                                <td>
                                                    {item.bookedQuantity}
                                                </td>

                                                <td>
                                                    {item.availableQuantity}
                                                </td>

                                                <td>

                                                    <div className="progress">

                                                        <div
                                                            className={
                                                                item.utilizationPercentage >= 90
                                                                    ? "progress-bar bg-danger"
                                                                    : item.utilizationPercentage >= 60
                                                                    ? "progress-bar bg-warning"
                                                                    : "progress-bar bg-success"
                                                            }
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

                )}

            </div>

        </MainLayout>

    );

}

export default Dashboard;
