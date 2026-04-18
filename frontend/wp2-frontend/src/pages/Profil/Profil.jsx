import styles from './Profil.module.css';
import { getUserByName } from '../../services/user.service';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '../../components/Avatar/Avatar';
import Gamecard from '../../components/Gamecard/Gamecard';

function Profil(){
    // const userString = localStorage.getItem("user");
    // const user = userString ? JSON.parse(userString) : null;
    const { username } = useParams();
    const [user, setUser]= useState(null);
    const AVATAR_URL = "http://localhost:8080/uploads/";

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
        avatar = AVATAR_URL+user.profilPicture;
    }
    return(
        <div className="container d-flex gap-5">
            <div className='d-flex flex-column gap-5'>
                <div className='d-flex align-items-end gap-5'>
                    <Avatar imageLink={user.profilPicture ? avatar : AVATAR_URL+"noavatar.png"} owner={user.username} />
                    <h1 className=''>{user.username}</h1>
                </div>
                <div className='bg-dark text-light border border-sm rounded p-2 shadow-sm '>
                    <p>{user.bio}</p>
                </div>
                <div className='bg-dark text-light border border-sm rounded p-2 shadow-sm '>
                    <p>
                        Computer Specs : <br /> <br />
                        {user.computerSpecs}
                    </p>
                </div>
            </div>
            <div className='m-5 d-flex flex-column gap-5 '>
                <div className='bg-dark text-light border border-sm rounded p-2 shadow-sm'>
                    <h2 className='pb-3'>Favorite Games</h2>
                </div>
                <div className='bg-dark text-light border border-sm rounded p-2 shadow-sm'>
                    <h2 className='pb-3'>Favorite Games</h2>
                    <div className='d-flex gap-2 justify-content-around'>
                        {user.favoriteGames.map(game => (
                        <Gamecard key={game.id} game_id={game.id} width='40%'/>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profil;