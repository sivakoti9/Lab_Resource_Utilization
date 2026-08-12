import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { toast } from "react-toastify";
import { getNotifications } from "../services/notificationService";

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications = async () => {

        try {

            const response = await getNotifications();

            setNotifications(response.data);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load notifications.");

        }

    };

    const getBadgeColor = (type) => {

        switch (type) {

            case "BOOKING":
                return "bg-primary";

            case "MAINTENANCE":
                return "bg-warning text-dark";

            case "CALIBRATION":
                return "bg-success";

            default:
                return "bg-secondary";

        }

    };

    return (

        <MainLayout>

            <div className="container-fluid mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h3 className="fw-bold">

                        Notifications & Alerts

                    </h3>

                </div>

                <div className="card shadow">

                    <div className="card-header bg-dark text-white">

                        <h5 className="mb-0">

                            System Notifications

                        </h5>

                    </div>

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-hover table-bordered">

                                <thead className="table-dark">

                                    <tr>

                                        <th>Type</th>

                                        <th>Title</th>

                                        <th>Message</th>

                                        <th>Due Date</th>

                                    </tr>

                                </thead>

                                <tbody>
                                                                        {notifications.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="text-center"
                                            >

                                                No notifications available.

                                            </td>

                                        </tr>

                                    ) : (

                                        notifications.map((notification, index) => (

                                            <tr key={index}>

                                                <td>

                                                    <span
                                                        className={`badge ${getBadgeColor(
                                                            notification.type
                                                        )}`}
                                                    >

                                                        {notification.type}

                                                    </span>

                                                </td>

                                                <td>

                                                    <strong>

                                                        {notification.title}

                                                    </strong>

                                                </td>

                                                <td>

                                                    {notification.message}

                                                </td>

                                                <td>

                                                    {notification.dueDate}

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

export default Notifications;