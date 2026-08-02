import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/authService";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        localStorage.clear();

        try {

            const response = await loginUser({
                email,
                password
            });

            const data = response.data;

            console.log("Login Response:", data);

            // ==========================
            // Store Logged-in User Details
            // ==========================

            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);     // <-- Added
            localStorage.setItem("role", data.role);
            localStorage.setItem("email", data.email);
            localStorage.setItem("firstName", data.firstName);

            toast.success("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            if (error.response) {

                toast.error(
                    error.response.data.message ||
                    error.response.data.error ||
                    "Login Failed"
                );

            } else {

                toast.error("Unable to connect to server.");

            }

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h2>Lab Resource Platform</h2>

                <p className="subtitle">
                    Sign in to continue
                </p>

                <form onSubmit={handleLogin}>

                    <div className="mb-3">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;