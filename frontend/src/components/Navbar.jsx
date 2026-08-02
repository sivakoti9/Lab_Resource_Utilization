function Navbar() {

    const firstName = localStorage.getItem("firstName");
    const role = localStorage.getItem("role");

    return (

        <nav className="navbar navbar-light bg-white shadow-sm">

            <div className="container-fluid">

                <h4 className="mb-0">
                    Lab Resource Platform
                </h4>

                <div>

                    <span className="fw-semibold">

                        Welcome {firstName} 👋

                    </span>

                    <span className="badge bg-primary ms-3">

                        {role}

                    </span>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;