import { useState } from 'react';
import { Link } from 'react-router-dom'
import { loginUser } from '../../services/user.service';

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const [successMsg, setSucces] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password
        };

        const response = await loginUser(user);
        if(response.ok){
            const data = await response.json();

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            
            setSucces("Login successful, redirecting...")

            setTimeout(function(){
                window.location.href = "/";
            }, 2000);

        }else{
            alert("A problem occured");
        }
    }


    return (
    <div className="container flex-grow-1 d-flex justify-content-center align-items-center py-5">
        
        <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "400px" }}>
            
            <h2 className="text-center mb-4 fw-bold">Login</h2>

            <div className='text-success text-lg-center fw-bold animate__animated animate__fadeIn'>{successMsg}</div>

            <form className="d-flex flex-column gap-3"
            onSubmit={handleLogin}>
                
                {/* Email */}
                <div className="d-flex flex-column">
                    <label htmlFor="email" className="form-label small fw-bold">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control border-secondary-subtle"
                    />
                </div>

                {/* Password */}
                <div className="d-flex flex-column">
                    <label htmlFor="pwd" className="form-label small fw-bold">Password</label>
                    <input 
                        type="password" 
                        id="pwd"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control border-secondary-subtle"
                    />
                </div>
                
                <button type="submit" className="btn btn-primary w-100 mt-3 py-2 fw-bold text-uppercase">
                    Sign In
                </button>

                {/* Petit bonus visuel pour la navigation */}
                <p className="text-center mt-3 small text-muted">
                    Don't have an account? <Link className='text-primary' to="/register">Register</Link>
                </p>
            </form>
        </div>
    </div>
);
}

export default Login