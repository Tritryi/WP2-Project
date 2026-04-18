import { useState } from "react";
import { Link } from 'react-router-dom';
import { updateUser } from "../../services/user.service";
import SearchGame from '../../components/SearchGame';
import SearchResult from "../../components/SearchResult";

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
    const [avatar, setAvatar] = useState(null);
    const [favorites, setFavorites] = useState(userLocal.favoriteGames || []);

    const handleChanges = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("id", userLocal.id);
        formData.append("username", username);
        formData.append("bio", bio);
        formData.append("computerSpecs", compSpec);
        favorites.forEach(game => {
            formData.append("favoriteGamesIds", game.id)
        });

        if(avatar){
            formData.append("avatar", avatar);
        }

        const response = await updateUser(formData);
        if(response.ok){
            const newData = await response.json();
            localStorage.setItem("user", JSON.stringify(newData));
            alert("Changes successful");
            window.location.href = "/settings"
        }else{
            alert("Failed");
        }
    }

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0]);
    }

    const handleFavorite = (game) => {
        if(favorites.length >3){
            alert("Maximum of favorite games reached");
            return;
        }
        console.log(favorites);

        setFavorites([...favorites, game]);
    }

    const handleDelete = (() => {
        alert("Test");
    })

    console.log(userLocal.favoriteGames);


    return(
        <div className="container flex-grow-1 d-flex justify-content-center align-items-center py-5">
        
        <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "400px" }}>
            
            <h2 className="text-center mb-4 fw-bold">Settings</h2>

            <form className="d-flex flex-column gap-3"
            onSubmit={handleChanges}>
                {/* Avatar */}
                <div className="d-flex flex-column">
                    <label htmlFor="avatar" className="form-label small fw-bold">Profil picture</label>
                    <input 
                        type="file" 
                        id="avatar"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="form-control border-secondary-subtle"
                    />
                    <div className="form-text small text-muted">Format: JPG, PNG (Max 2MB)</div>
                </div>
                
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

                <h4>Favorite games</h4>
                <h6>Current favorites</h6>
                <div>
                    {favorites.length > 0 && (
                        userLocal.favoriteGames.map(game => (
                            <div className="">

                            </div>
                            
                        ))
                    )}
                </div>
                <SearchGame onItemClick={handleFavorite}/>
                
                <button type="submit" className="btn btn-primary w-50 mt-3 py-2 fw-bold text-uppercase">
                    Change
                </button>
            </form>
        </div>
    </div>
    )
}


export default Settings;