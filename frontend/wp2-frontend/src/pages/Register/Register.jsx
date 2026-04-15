import { useState } from "react";
import { createUser } from '../../services/user.service'

function Register(){
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPwd, setConfirmPwd] = useState("");
    const [confirmPwdError, setConfirmPwdError] = useState("");

    const validateUsername = () => {
        if(username == ""){
            setUsernameError("Name Required");
        }else{
            setUsernameError("");
        }
    };

    const validateEmail = () => {
        if(email == ""){
            setEmailError("Email is required");
        }else{
            setEmailError("");
        }
    };

    const validatePwds = () => {
        if(confirmPwd == ""){
            setConfirmPwdError("Validation password required");
        }else if(confirmPwd != password){
            setConfirmPwdError("Passwords don't match");
        }else{
            setConfirmPwdError("");
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            email: email,
            password: password
        };

        const response = await createUser(newUser);
        if(response.ok){
            alert("Account created successfully");
        }else{
            alert("Account creation failed")
        }

    }
    return(
        <>
        <div className="container flex-grow-1 d-flex justify-content-center align-items-center py-5">
    
        <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "400px" }}>
        
        <h2 className="text-center mb-4 fw-bold">Create Account</h2>

        <form className="d-flex flex-column gap-3" onSubmit={handleRegister}>
            
            {/* Username */}
            <div className="d-flex flex-column">
                <label htmlFor="username" className="form-label small fw-bold">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className={`form-control ${usernameError ? "border-danger" : "border-secondary-subtle"}`}
                    onBlur={validateUsername}
                />
                {usernameError && <span className="text-danger small mt-1">{usernameError}</span>}
            </div>

            {/* Email address */}
            <div className="d-flex flex-column">
                <label htmlFor="email" className="form-label small fw-bold">Email address</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={validateEmail}
                    className={`form-control ${emailError ? "border-danger" : "border-secondary-subtle"}`}
                />
                {emailError && <span className="text-danger small mt-1">{emailError}</span>}
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
                    placeholder="••••••••"
                />
            </div>

            {/* Confirm password */}
            <div className="d-flex flex-column">
                <label htmlFor="pwd_confirm" className="form-label small fw-bold">Confirm password</label>
                <input 
                    type="password" 
                    id="pwd_confirm"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    onBlur={validatePwds}
                    className={`form-control ${confirmPwdError ? "border-danger" : "border-secondary-subtle"}`}
                    placeholder="••••••••"
                />
                {confirmPwdError && <span className="text-danger small mt-1">{confirmPwdError}</span>}
            </div>
            
            <button type="submit" className="btn btn-primary w-100 mt-3 py-2 fw-bold text-uppercase">
                Register
            </button>
        </form>
    </div>
</div>
        </>
    );
}

export default Register;