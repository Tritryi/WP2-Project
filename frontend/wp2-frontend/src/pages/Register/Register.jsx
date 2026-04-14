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
        <div className="container"> 
            <form className="d-flex flex-column w-25 align-items-center justify-content-center gap-4"
            onSubmit={handleRegister}>
            <label htmlFor="username" >Username
                <input type="text" 
                id="username" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className={`form-control ${usernameError ? "border-danger" : "border-secondary"}`}
                onBlur={validateUsername}/>
                {usernameError && <span className="text-danger small">{usernameError}</span>}
            </label>

            <label htmlFor="email"> Email address
                <input type="email" 
                id="email" 
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                className={`form-control ${emailError ? "border-danger": "border-secondary"}`}/>
                {emailError && <span className="text-danger small">{emailError}</span>}
            </label>

            <label htmlFor="pwd">Password
                <input type="password" 
                id="pwd"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control border-secondary"/>
            </label>

            <label htmlFor="pwd_confirm">Confirm password
                <input type="password" 
                id="pwd_confirm"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                onBlur={validatePwds}
                className={`form-control ${confirmPwdError ? "border-danger ":"border-secondary"}`}
                />
                {confirmPwdError && <span className="text-danger small">{confirmPwdError}</span>}

            </label>
            
            <button type="submit"
            className="btn btn-primary"
            >Register</button>
        </form>
        </div>
        </>
    );
}

export default Register;