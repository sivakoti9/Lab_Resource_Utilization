import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import api from "../services/api";
import { getUserById, updateUser } from "../services/userService";
import Swal from "sweetalert2";

function EditUser() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [roles, setRoles] = useState([]);

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        role: {
            roleId: ""
        }
    });

    useEffect(() => {

        loadUser();
        loadRoles();

    }, []);

    const loadUser = async () => {

        try {

            const data = await getUserById(id);

            data.password = "";

            setUser(data);

        } catch (error) {

            console.error(error);

        }

    };

    const loadRoles = async () => {

        try {

            const response = await api.get("/roles");

            setRoles(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "roleId") {

            setUser({
                ...user,
                role: {
                    roleId: value
                }
            });

        } else {

            setUser({
                ...user,
                [name]: value
            });

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateUser(id, user);

            Swal.fire(
                "Success",
                "User Updated Successfully",
                "success"
            );

            navigate("/users");

        } catch (error) {

            console.error(error);

            Swal.fire(
                "Error",
                "Unable to Update User",
                "error"
            );

        }

    };

    return (

        <MainLayout>

            <div className="container">

                <div className="card shadow">

                    <div className="card-header">

                        <h3>Edit User</h3>

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label className="form-label">

                                    First Name

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={user.firstName}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Last Name

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={user.lastName}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Email

                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Password

                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Leave blank to keep existing password"
                                    value={user.password}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Phone

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={user.phone}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Role

                                </label>

                                <select
                                    className="form-select"
                                    name="roleId"
                                    value={user.role?.roleId || ""}
                                    onChange={handleChange}
                                >

                                    <option value="">

                                        Select Role

                                    </option>

                                    {roles.map(role => (

                                        <option
                                            key={role.roleId}
                                            value={role.roleId}
                                        >

                                            {role.roleName}

                                        </option>

                                    ))}

                                </select>

                            </div>

                            <button
                                className="btn btn-primary"
                                type="submit"
                            >

                                Update User

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default EditUser;