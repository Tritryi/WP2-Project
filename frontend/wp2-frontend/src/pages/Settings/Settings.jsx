import { useState } from "react";
import { Link } from 'react-router-dom';
import { updateUser } from "../../services/user.service";

function Settings(){
    const [user, setUser] = useState(null);
    
    const userData = localStorage.getItem("user");
    const userLocal = JSON.parse(userData);

    if(!userLocal){
        alert("You need to login");
        window.location.href = "/login";
    }
    document.title = "User settings"

    const [username, setUsername] = useState(userLocal.username);
    const [bio, setBio] = useState(userLocal.bio);
    const [compSpec, setCompSpec] = useState(userLocal.computerSpecs);

    const handleChanges = async (e) => {
        e.preventDefault();
        const newSettings = {
            id : userLocal.id,
            username : username,
            bio: bio,
            computerSpecs : compSpec
        }

        const response = await updateUser(newSettings);
        if(response.ok){
            const newData = await response.json();
            localStorage.setItem("user", JSON.stringify(newData));
            alert("Changes successful");
            window.location.href = "/settings"
        }else{
            alert("Failed");
        }
    }


    return(
        <div className="container flex-grow-1 d-flex justify-content-center align-items-center py-5">
        
        <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "400px" }}>
            
            <h2 className="text-center mb-4 fw-bold">Settings</h2>

            <form className="d-flex flex-column gap-3"
            onSubmit={handleChanges}>
                
                {/* Email */}
                <div className="d-flex flex-column">
                    <label htmlFor="username" className="form-label small fw-bold">Username</label>
                    <input 
                        type="text" 
                        id="text"
                        value={username}
                        placeholder={userLocal.username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control border-secondary-subtle"
                    />
                </div>

                <div className="d-flex flex-column">
                    <label htmlFor="bio" className="form-label small fw-bold">Bio</label>
                    <textarea 
                        id="bio"
                        value={bio}
                        placeholder={userLocal.bio ? userLocal.bio : "Your bio..."}
                        onChange={(e) => setBio(e.target.value)}
                        className="form-control border-secondary-subtle"
                    />
                </div>

                <div className="d-flex flex-column">
                    <label htmlFor="compSpec" className="form-label small fw-bold">Computer Specs</label>
                    <textarea 
                        id="compSpec"
                        value={compSpec}
                        placeholder={userLocal.computerSpecs ? userLocal.computerSpecs : "Your computer specs...(flex!)"}
                        onChange={(e) => setCompSpec(e.target.value)}
                        className="form-control border-secondary-subtle"
                    />
                </div>
                
                <button type="submit" className="btn btn-primary w-50 mt-3 py-2 fw-bold text-uppercase">
                    Change
                </button>
            </form>
        </div>
    </div>
    )
}


export default Settings;