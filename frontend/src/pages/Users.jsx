import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import {
    getAllUsers,
    deleteUser
} from "../services/userService";
import Swal from "sweetalert2";

function Users() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // Logged in user id
    const loggedInUserId = Number(localStorage.getItem("userId"));

    useEffect(() => {

        fetchUsers();

    }, []);

    useEffect(() => {

        const result = users.filter(user =>

            user.firstName.toLowerCase().includes(search.toLowerCase()) ||

            user.lastName.toLowerCase().includes(search.toLowerCase()) ||

            user.email.toLowerCase().includes(search.toLowerCase()) ||

            user.role?.roleName.toLowerCase().includes(search.toLowerCase())

        );

        setFilteredUsers(result);

    }, [search, users]);

    const fetchUsers = async () => {

        try {

            const data = await getAllUsers();

            setUsers(data);

            setFilteredUsers(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        const result = await Swal.fire({

            title: "Delete User?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Delete"

        });

        if (!result.isConfirmed) return;

        try {

            await deleteUser(id);

            await Swal.fire({

                icon: "success",
                title: "Deleted!",
                text: "User deleted successfully.",
                timer: 1500,
                showConfirmButton: false

            });

            fetchUsers();

        } catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",
                title: "Delete Failed",
                text: "Unable to delete user."

            });

        }

    };

    return (

        <MainLayout>

            <div className="container-fluid">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="fw-bold">

                        User Management

                    </h2>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/users/add")}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Add User
                    </button>

                </div>

                <div className="card shadow">

                    <div className="card-body">

                        <div className="row mb-3">

                            <div className="col-md-4">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search users..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />

                            </div>

                        </div>

                        {

                            loading ?

                                (

                                    <div className="alert alert-info">

                                        Loading Users...

                                    </div>

                                )

                                :

                                (

                                    <div className="table-responsive">

                                        <table className="table table-hover align-middle">

                                            <thead className="table-dark">

                                            <tr>

                                                <th>ID</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Role</th>
                                                <th width="220">
                                                    Actions
                                                </th>

                                            </tr>

                                            </thead>

                                            <tbody>

                                            {

                                                filteredUsers.length === 0 ?

                                                    (

                                                        <tr>

                                                            <td
                                                                colSpan="7"
                                                                className="text-center py-4"
                                                            >

                                                                No Users Found

                                                            </td>

                                                        </tr>

                                                    )

                                                    :

                                                    (

                                                        filteredUsers.map(user => (

                                                            <tr key={user.userId}>

                                                                <td>
                                                                    {user.userId}
                                                                </td>

                                                                <td>
                                                                    {user.firstName}
                                                                </td>

                                                                <td>
                                                                    {user.lastName}
                                                                </td>

                                                                <td>
                                                                    {user.email}
                                                                </td>

                                                                <td>
                                                                    {user.phone}
                                                                </td>

                                                                <td>

                                                                    <span className="badge bg-primary">

                                                                        {user.role?.roleName}

                                                                    </span>

                                                                </td>

                                                                <td>

                                                                    <button

                                                                        className="btn btn-warning btn-sm me-2"

                                                                        onClick={() =>
                                                                            navigate(`/users/edit/${user.userId}`)
                                                                        }

                                                                    >

                                                                        <i className="bi bi-pencil-square me-1"></i>

                                                                        Edit

                                                                    </button>

                                                                    <button

                                                                        className="btn btn-danger btn-sm"

                                                                        disabled={loggedInUserId === user.userId}

                                                                        onClick={() =>
                                                                            handleDelete(user.userId)
                                                                        }

                                                                    >

                                                                        <i className="bi bi-trash me-1"></i>

                                                                        Delete

                                                                    </button>

                                                                </td>

                                                            </tr>

                                                        ))

                                                    )

                                            }

                                            </tbody>

                                        </table>

                                    </div>

                                )

                        }

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default Users;