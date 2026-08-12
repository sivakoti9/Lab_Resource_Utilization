import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");
    const firstName = localStorage.getItem("firstName");

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    const menuStyle = ({ isActive }) => ({
        color: "white",
        textDecoration: "none",
        padding: "12px 20px",
        display: "block",
        borderRadius: "8px",
        marginBottom: "8px",
        backgroundColor: isActive ? "#2563eb" : "transparent",
        transition: "0.3s"
    });

    return (

        <div
            className="text-white d-flex flex-column"
            style={{
                width: "250px",
                minHeight: "100vh",
                background: "#1e293b"
            }}
        >

            <div className="text-center py-4 border-bottom">

                <h4 className="fw-bold mb-1">
                    🧪 Lab Resource
                </h4>

                <small className="text-light">
                    Welcome {firstName}
                </small>

                <br />

                <small className="badge bg-primary mt-2">
                    {role}
                </small>

            </div>

            <div className="p-3 flex-grow-1">

                {/* Dashboard */}

                <NavLink
                    to="/dashboard"
                    style={menuStyle}
                >
                    📊 Dashboard
                </NavLink>

                {/* Equipment */}

                {(role === "ADMIN" ||
                    role === "LAB_MANAGER" ||
                    role === "LAB_TECHNICIAN") && (

                    <NavLink
                        to="/equipment"
                        style={menuStyle}
                    >
                        📦 Equipment
                    </NavLink>

                )}

                {/* Users */}

                {(role === "ADMIN" ||
                    role === "LAB_MANAGER") && (

                    <NavLink
                        to="/users"
                        style={menuStyle}
                    >
                        👥 Users
                    </NavLink>

                )}

                {/* Bookings */}

                {(role === "ADMIN" ||
                    role === "LAB_MANAGER" ||
                    role === "LAB_TECHNICIAN" ||
                    role === "RESEARCHER" ||
                    role === "STUDENT") && (

                    <NavLink
                        to="/bookings"
                        style={menuStyle}
                    >
                        📅 Bookings
                    </NavLink>

                )}

                {/* Maintenance */}

                {(role === "ADMIN" ||
                    role === "LAB_MANAGER" ||
                    role === "LAB_TECHNICIAN") && (

                    <NavLink
                        to="/maintenance"
                        style={menuStyle}
                    >
                        🛠️ Maintenance
                    </NavLink>

                )}

                {/* Calibration */}

                {(role === "ADMIN" ||
                    role === "LAB_MANAGER" ||
                    role === "LAB_TECHNICIAN") && (

                    <NavLink
                        to="/calibrations"
                        style={menuStyle}
                    >
                        🧪 Calibration
                    </NavLink>

                )}

                {/* Cost Tracking */}

                {(role === "ADMIN" ||
                    role === "LAB_MANAGER") && (

                    <NavLink
                        to="/costs"
                        style={menuStyle}
                    >
                        💰 Cost Tracking
                    </NavLink>

                )}
                {/* Reports */}

{(role === "ADMIN" ||
    role === "LAB_MANAGER" ||
    role === "DEPARTMENT_HEAD") && (

    <NavLink
        to="/reports"
        style={menuStyle}
    >
        📑 Reports
    </NavLink>

)}
{/* Notifications */}

<NavLink
    to="/notifications"
    style={menuStyle}
>
    🔔 Notifications
</NavLink>

                {/* Equipment Utilization */}

                {(role === "ADMIN" ||
                    role === "LAB_MANAGER" ||
                    role === "DEPARTMENT_HEAD") && (

                    <NavLink
                        to="/dashboard/utilization"
                        style={menuStyle}
                    >
                        📈 Equipment Utilization
                    </NavLink>

                )}

            </div>

            <div className="p-3">

                <button
                    className="btn btn-danger w-100"
                    onClick={logout}
                >
                    🚪 Logout
                </button>

            </div>

        </div>

    );

}

export default Sidebar;