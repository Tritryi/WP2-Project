import styles from './Profil.module.css';
import { getUserByName } from '../../services/user.service';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Profil(){
    // const userString = localStorage.getItem("user");
    // const user = userString ? JSON.parse(userString) : null;
    const { username } = useParams();
    const [user, setUser]= useState(null);
    const AVATAR_URL = "http://localhost:8080/uploads";


    useEffect(() => {
        getUserByName(username).then(data => {
            setUser(data);
        });
        if (user) document.title = user.username;
    }, [username]);
    
    if (!user){
        return (
            <span className="visually-hidden">Loading...</span>  
        );
    }
    let avatar = "";
    if(user.profilPicture != "" && user.profilPicture){
        avatar = AVATAR_URL+"/"+user.profilPicture;
    }
    return(
        <div className="container">
            <div>
                <img src={avatar}
                className={`${styles.profilpic} rounded`} 
                alt={user.username}/>
                <h1>{user.username}</h1>
            </div>
            <div>
                <span>Game List</span>
            </div>
        </div>
    )
}

export default Profil;