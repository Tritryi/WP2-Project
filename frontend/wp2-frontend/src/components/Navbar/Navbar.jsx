import  { Link } from 'react-router-dom';
import styles from './Navbar.module.css'
function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">ViGameList</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNa  v">
            <ul className="navbar-nav ms-auto align-items-center gap-2">
                <Link className={`nav-item text-light ${styles.links}`} to="/game/1">Game test</Link>
                <Link className='nav-item btn btn-light' to="/register">Register</Link>
            </ul>
        </div>
    </div>
</nav>
  );
}

export default Navbar;
