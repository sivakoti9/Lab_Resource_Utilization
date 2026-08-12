import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Equipment from "./pages/Equipment";
import AddEquipment from "./pages/AddEquipment";
import EditEquipment from "./pages/EditEquipment";
import EquipmentUtilization from "./pages/EquipmentUtilization";
import AddUser from "./pages/AddUser";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";

import Bookings from "./pages/Bookings";
import AddBooking from "./pages/AddBooking";
import EditBooking from "./pages/EditBooking";
import Maintenance from "./pages/Maintenance";
import Calibration from "./pages/Calibration";
import CostTracking from "./pages/CostTracking";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Public Routes */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Dashboard */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Equipment Utilization */}

                <Route
                    path="/dashboard/utilization"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "ADMIN",
                                "LAB_MANAGER",
                                "DEPARTMENT_HEAD"
                            ]}
                        >
                            <EquipmentUtilization />
                        </ProtectedRoute>
                    }
                />

                {/* Equipment */}

                <Route
                    path="/equipment"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "ADMIN",
                                "LAB_MANAGER",
                                "LAB_TECHNICIAN"
                            ]}
                        >
                            <Equipment />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/equipment/add"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "ADMIN",
                                "LAB_MANAGER",
                                "LAB_TECHNICIAN"
                            ]}
                        >
                            <AddEquipment />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/equipment/edit/:id"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "ADMIN",
                                "LAB_MANAGER",
                                "LAB_TECHNICIAN"
                            ]}
                        >
                            <EditEquipment />
                        </ProtectedRoute>
                    }
                />

                {/* Users */}

                <Route
                    path="/users"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "ADMIN",
                                "LAB_MANAGER"
                            ]}
                        >
                            <Users />
                        </ProtectedRoute>
                    }
                />
                <Route
    path="/users/add"
    element={
        <ProtectedRoute
            allowedRoles={[
                "ADMIN",
                "LAB_MANAGER"
            ]}
        >
            <AddUser />
        </ProtectedRoute>
    }
/>
                <Route
                    path="/users/edit/:id"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "ADMIN",
                                "LAB_MANAGER"
                            ]}
                        >
                            <EditUser />
                        </ProtectedRoute>
                    }
                />

                {/* Bookings */}

                <Route
    path="/bookings"
    element={
        <ProtectedRoute
            allowedRoles={[
                "ADMIN",
                "LAB_MANAGER",
                "LAB_TECHNICIAN",
                "RESEARCHER",
                "STUDENT"
            ]}
        >
            <Bookings />
        </ProtectedRoute>
    }
/>

<Route
    path="/bookings/add"
    element={
        <ProtectedRoute
            allowedRoles={[
                "ADMIN",
                "LAB_MANAGER",
                "LAB_TECHNICIAN",
                "RESEARCHER",
                "STUDENT"
            ]}
        >
            <AddBooking />
        </ProtectedRoute>
    }
/>

<Route
    path="/bookings/edit/:id"
    element={
        <ProtectedRoute
            allowedRoles={[
                "ADMIN",
                "LAB_MANAGER",
                "LAB_TECHNICIAN"
            ]}
        >
            <EditBooking />
        </ProtectedRoute>
    }
/>
{/* Maintenance */}

<Route
    path="/maintenance"
    element={
        <ProtectedRoute
            allowedRoles={[
                "ADMIN",
                "LAB_MANAGER",
                "LAB_TECHNICIAN"
            ]}
        >
            <Maintenance />
        </ProtectedRoute>
    }
/>
<Route
    path="/calibrations"
    element={
        <ProtectedRoute
            allowedRoles={[
                "ADMIN",
                "LAB_MANAGER",
                "LAB_TECHNICIAN"
            ]}
        >
            <Calibration />
        </ProtectedRoute>
    }
/>
{/* Cost Tracking */}

<Route
    path="/costs"
    element={
        <ProtectedRoute
            allowedRoles={[
                "ADMIN",
                "LAB_MANAGER"
            ]}
        >
            <CostTracking />
        </ProtectedRoute>
    }
/>
<Route
    path="/reports"
    element={
        <ProtectedRoute
            allowedRoles={[
                "ADMIN",
                "LAB_MANAGER",
                "DEPARTMENT_HEAD"
            ]}
        >
            <Reports />
        </ProtectedRoute>
    }
/>
<Route
    path="/notifications"
    element={
        <ProtectedRoute>
            <Notifications />
        </ProtectedRoute>
    }
/>

                {/* 404 */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={3000}
            />

        </BrowserRouter>

    );

}

export default App;