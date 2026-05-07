import  { Link } from 'react-router-dom';
import styles from './Navbar.module.css'
import Avatar from '../Avatar/Avatar';
function Navbar() {
    const isLogin = localStorage.getItem("token");
    let user = null;
    const AVATAR_URL = "http://localhost:8080/uploads/avatars/"

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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">ViGameList</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-start align-items-lg-center gap-4 pt-4">                
                <Link className={`nav-item text-light d-flex align-items-center gap-2 ${styles.links}`} to="/discover">
                    Discover 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 1 1 11 0"/>
                    </svg>
                </Link>
                {isLogin && user.role == "ADMIN" && (
                    <Link className={`nav-item text-light ${styles.links}`} to="/addGame">Game Administration</Link>
                )}
                {!isLogin ? (
                    <>
                    <Link className={`nav-item text-light ${styles.links}`} to="/login">Login</Link>
                    <Link className='nav-item btn btn-light' to="/register">Register</Link>
                    </>
                ): (
                    <>
                            <Avatar imageLink={user.profilPicture ? AVATAR_URL+user.profilPicture : AVATAR_URL+"noavatar.png"} owner={user.username} size='40px'/>
                            <li className='nav-item dropdown'>
                                <button type='button' 
                                className='nav-link dropdown-toggle btn btn-secondary text-light border-0 ' 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false">
                                    <strong>{user.username}</strong>
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
