import styles from './Profil.module.css';
import { getUserByName } from '../../services/user.service';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '../../components/Avatar/Avatar';
import Gamecard from '../../components/Gamecard/Gamecard';

import Popup from '../../components/Popup';

import { getUserReviews } from '../../services/game.service';
import GameList from '../../components/GameList/GameList';
import ReviewProfile from '../../components/ReviewProfile/ReviewProfile';

function Profil(){
    // const userString = localStorage.getItem("user");
    // const user = userString ? JSON.parse(userString) : null;
    const { username } = useParams();
    const [user, setUser]= useState(null);
    const AVATAR_URL = "http://localhost:8080/uploads/avatars/";

    const [tabToShow, setTabToShow] = useState("profile");

    const [userReviews, setUserReviews] = useState([]);


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


    const handleShowTab = (tab) => {
        setTabToShow(tab);
        if(tab == "games" || tab == "reviews") loadGameList();
    }

    async function loadGameList(){
        const data = await getUserReviews(user.id);
        setUserReviews(data);
    }

    return(
        <div className="container d-flex gap-5">
            <div className='d-flex flex-column gap-5'>
                <div className='d-flex align-items-end gap-5'>
                    <Avatar imageLink={user.profilPicture ? avatar : AVATAR_URL+"noavatar.png"} owner={user.username} />
                    <h1 className='border border-primary bg-secondary px-4 py-1 rounded shadow-lg text-light'>{user.username}</h1>
                </div>
                <div className='bg-dark text-light border border-sm rounded p-2 shadow-sm '>
                    <p>{user.bio && user.bio != "null" ? user.bio : "Not specified"}</p>
                </div>
                <div className='bg-dark text-light border border-sm rounded p-2 shadow-sm '>
                    <p>
                        Computer Specs : <br /> <br />
                        {user.computerSpecs && user.computerSpecs != "null" ? user.computerSpecs : "Not specified"}
                    </p>
                </div>
            </div>
            <div className='m-5 d-flex flex-column gap-5 '>
                <div className='bg-dark text-light border border-sm rounded p-2 shadow-sm d-flex justify-content-around'>
                    <button 
                        type='button' 
                        onClick={() => handleShowTab("profile")}
                        className={`btn btn-link text-decoration-none fw-bold ${tabToShow === "profile" ? "text-primary" : "text-light"}`}
                    >
                        Profile
                    </button>

                    <button 
                        type='button' 
                        onClick={() => handleShowTab("games")}
                        className={`btn btn-link text-decoration-none fw-bold ${tabToShow === "games" ? "text-primary" : "text-light"}`}
                    >
                        Game List
                    </button>

                    <button 
                        type='button' 
                        onClick={() => handleShowTab("reviews")}
                        className={`btn btn-link text-decoration-none fw-bold ${tabToShow === "reviews" ? "text-primary" : "text-light"}`}
                    >
                        Reviews
                    </button>
                </div>
                
                {
                    /* Displaying profile statistics */
                    tabToShow == "profile" && (
                    <div className='bg-dark text-light border border-sm rounded p-2 shadow-sm'>
                        <h2 className='pb-3'>Statistics</h2>
                        <div className='d-flex gap-2 justify-content-around'>

                        </div>
                </div>
                    )
                }

                {
                    /* Dsplaying Game list */
                    tabToShow == "games" && (
                    <div className='bg-dark text-light border border-sm rounded p-2 shadow-sm'>
                        <h2 className='pb-3'>GameList</h2>
                        <div className='d-flex gap-2 justify-content-around'>
                        {
                            userReviews.map(r => (
                                <GameList key={r.id} gameName={r.game.name} gameImage={r.game.illustration} gameId={r.game.id} grade={r.grade}/>
                            ))
                        }

                        </div>
                    </div>
                    )
                }

                {
                    /* Dsplaying Reviews list */
                    tabToShow == "reviews" && (
                    <div className='bg-dark text-light border border-sm rounded p-2 shadow-sm'>
                        <h2 className='pb-3'>Reviews</h2>
                        <div className='d-flex gap-2 justify-content-around'>
                        {
                            userReviews.map(r => (
                                <ReviewProfile key={r.id} image={r.game.illustration} grade={r.grade} comment={r.comment}/>
                            ))
                        }

                        </div>
                    </div>
                    )
                }
                
                
                

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