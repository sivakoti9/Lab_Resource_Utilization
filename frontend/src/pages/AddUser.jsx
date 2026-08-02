import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Swal from "sweetalert2";

import { createUser } from "../services/userService";

function AddUser() {

    const navigate = useNavigate();

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

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "roleId") {

            setUser({
                ...user,
                role: {
                    roleId: Number(value)
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

            await createUser(user);

            await Swal.fire({
                icon: "success",
                title: "Success",
                text: "User created successfully."
            });

            navigate("/users");

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    error.response?.data?.message ||
                    "Unable to create user."
            });

        }

    };

    return (

        <MainLayout>

            <div className="container">

                <div className="card shadow mt-4">

                    <div className="card-header bg-primary text-white">

                        <h4>Add User</h4>

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        value={user.firstName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        value={user.lastName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

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
                                    required
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
                                    value={user.password}
                                    onChange={handleChange}
                                    required
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
                                    required
                                />

                            </div>

                            <div className="mb-4">

                                <label className="form-label">
                                    Role
                                </label>

                                <select
    className="form-select"
    name="roleId"
    value={user.role.roleId}
    onChange={handleChange}
    required
>

    <option value="">
        Select Role
    </option>

    <option value="1">
        ADMIN
    </option>

    <option value="2">
        DEPARTMENT_HEAD
    </option>

    <option value="3">
        LAB_MANAGER
    </option>

    <option value="4">
        LAB_TECHNICIAN
    </option>

    <option value="5">
        RESEARCHER
    </option>

    <option value="6">
        STUDENT
    </option>

</select>

                            </div>

                            <button
                                type="submit"
                                className="btn btn-success me-2"
                            >
                                Save User
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate("/users")}
                            >
                                Cancel
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default AddUser;