import  { Link } from 'react-router-dom';
import styles from './Navbar.module.css'
function Navbar() {
    const isLogin = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login"
    }
    return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">ViGameList</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNa  v">
            <ul className="navbar-nav ms-auto align-items-center gap-4">
                <Link className={`nav-item text-light ${styles.links}`} to="/game/1">Game test</Link>
                {!isLogin ? (
                    <>
                    <Link className={`nav-item text-light ${styles.links}`} to="/login">Login</Link>
                    <Link className='nav-item btn btn-light' to="/register">Register</Link>
                    </>
                ): (
                    <>
                        <span className='text-light '>Hello</span>
                        <button className='nav-item btn btn-outline-danger btn-sm'
                        onClick={handleLogout}
                        >Logout</button>
                    </>
                )}
                
            </ul>
        </div>
    </div>
</nav>
  );
}

export default Navbar;
