import  { Link } from 'react-router-dom';
import styles from './Navbar.module.css'
function Navbar() {
    const isLogin = localStorage.getItem("token");
    let user = null;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login"
    }
    if (isLogin){
        const userData = localStorage.getItem("user");
        user = JSON.parse(userData);
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
                            <li className='nav-item dropdown'>
                                <button type='button' 
                                className='nav-link dropdown-toggle btn btn-secondary text-light border-0' 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false">
                                    {user.username}
                                </button>
                                <ul className='dropdown-menu dropdown-menu-end shadow'>
                                    <li><Link className={`dropdown-item ${styles.links}`} to={`/profile/${user.username}`}>My profile</Link></li>
                                    <li><Link className={`dropdown-item ${styles.links}`} to="/settings">Settings</Link></li>
                                    <li><button className='dropdown-item text-danger'
                                        onClick={handleLogout}
                                        >Logout</button></li>
                                        
                                </ul>
                            </li>
                    </>
                )}
                
            </ul>
        </div>
    </div>
</nav>
);
}

export default Navbar;
