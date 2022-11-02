import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { navigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    function handleLogout(e) {
        localStorage.removeItem("token");
        navigate('/login')
    }
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Clarkk</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blog">Blog</Link>
                        </li>
                    </ul>
                    <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
