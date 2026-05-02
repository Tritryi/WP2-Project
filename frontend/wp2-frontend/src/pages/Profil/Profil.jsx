import styles from './Profil.module.css';
import { getUserByName, getFriendList } from '../../services/user.service';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '../../components/Avatar/Avatar';
import Gamecard from '../../components/Gamecard/Gamecard';

import Popup from '../../components/Popup';

import { getUserReviews } from '../../services/game.service';
import GameList from '../../components/GameList/GameList';
import ReviewProfile from '../../components/ReviewProfile/ReviewProfile';

import { addFriend } from '../../services/user.service';
import Friend from '../../components/Friend/';


function Profil(){
    // const userString = localStorage.getItem("user");
    // const user = userString ? JSON.parse(userString) : null;
    const { username } = useParams();
    const [user, setUser]= useState(null);
    const AVATAR_URL = "http://localhost:8080/uploads/avatars/";

    const [tabToShow, setTabToShow] = useState("profile");

    const [userReviews, setUserReviews] = useState([]);
    const [userFollowing, setUserFollowing] = useState([]);

    const localData = localStorage.getItem("user");
    const localUser = JSON.parse(localData);


    useEffect(() => {
        getUserByName(username).then(data => {
            setUser(data);
            console.log(data);

            if (data && data.id){
                document.title = data.username;
                getUserReviews(data.id).then(reviews => {
                    setUserReviews(reviews);
                });
                getFriendList(data.id).then(followings => {
                    setUserFollowing(followings);
                })
            }
        });
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
    }

    // async function loadGameList(){
    //     const data = await getUserReviews(user.id);
    //     setUserReviews(data);
        
    // }

    const totalGames = userReviews.length;
    const totalReviews = userReviews.filter(r => r.comment && r.comment.trim() !== "").length;


    const handleAddFriend = async () => {
        const addFriendData = {
            "userId" : localUser.id,
            "friendId" : user.id
        }

        const response = await addFriend(addFriendData);
        if (response.ok){
            alert(`You are now following ${user.username}!`);
        }else{
            alert("an error occured");
        }
    }
    return(
        <div className="container-fluid d-flex gap-5 justify-content-center">
            <div className='d-flex flex-column gap-5'>
                <div className='d-flex align-items-end gap-5'>
                    <Avatar imageLink={user.profilPicture ? avatar : AVATAR_URL+"noavatar.png"} owner={user.username} />
                    <h1 className='border border-primary bg-secondary px-4 py-1 rounded shadow-lg text-light'>{user.username}</h1>
                </div>
                {
                    localUser && localUser.id != user.id && (
                        <button className='btn btn-primary w-25' onClick={handleAddFriend}>
                            Follow +
                        </button>
                    )
                }
                

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
            <div className=' d-flex flex-column gap-5 '>
                <div className='bg-dark text-light border border-sm rounded p-2 shadow-sm d-flex justify-content-around'>
                    <button 
                        type='button' 
                        onClick={() => handleShowTab("profile")}
                        className={`btn btn-link text-decoration-none fw-bold ${tabToShow === "profile" ? "text-primary" : "text-light"} ${styles.sublink}`}
                    >
                        Profile
                    </button>

                    <button 
                        type='button' 
                        onClick={() => handleShowTab("games")}
                        className={`btn btn-link text-decoration-none fw-bold ${tabToShow === "games" ? "text-primary" : "text-light"} ${styles.sublink}`}
                    >
                        Game List
                    </button>

                    <button 
                        type='button' 
                        onClick={() => handleShowTab("reviews")}
                        className={`btn btn-link text-decoration-none fw-bold ${tabToShow === "reviews" ? "text-primary" : "text-light"} ${styles.sublink}`}
                    >
                        Reviews
                    </button>

                    <button 
                        type='button' 
                        onClick={() => handleShowTab("followings")}
                        className={`btn btn-link text-decoration-none fw-bold ${tabToShow === "followings" ? "text-primary" : "text-light"} ${styles.sublink    }`}
                    >
                        Followings
                    </button>
                </div>
                
                {
                    /* Displaying profile statistics */
                    tabToShow == "profile" && (
                    <div className='bg-dark text-light border border-sm rounded p-2 shadow-sm'>
                        <h2 className='pb-3'>Statistics</h2>
                        <div className='d-flex gap-2 justify-content-around'>
                            <div className='d-flex flex-column align-items-center'>
                                <h2>{totalGames}</h2>
                                <span>Total games</span>
                            </div>
                            <div className='d-flex flex-column align-items-center'>
                                <h2>{totalReviews}</h2>
                                <span>Game reviewed</span>
                            </div>
                        </div>
                </div>
                    )
                }

                {
                    /* Dsplaying Game list */
                    tabToShow == "games" && (
                    <div className='bg-dark text-light border border-sm rounded p-2 shadow-sm'>
                        <h2 className='pb-3'>GameList</h2>
                        <div className='d-flex gap-2 justify-content-around flex-wrap'>
                        {
                            userReviews.map(r => (
                                <GameList key={r.id} gameName={r.game.name} gameImage={r.game.illustration} gameId={r.game.id} grade={r.grade} status={r.status}/>
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
                        <div className='d-flex gap-2 justify-content-around flex-wrap'>
                        {
                            userReviews.map(r => (
                                r.comment != "" && (
                                    <ReviewProfile key={r.id} image={r.game.illustration} grade={r.grade} comment={r.comment}/>
                                )
                            ))
                        }

                        </div>
                    </div>
                    )
                }

                {
                    /* Dsplaying Follow list */
                    tabToShow == "followings" && (
                    <div className='bg-dark text-light border border-sm rounded p-2 shadow-sm'>
                        <h2 className='pb-3'>Followings</h2>
                        <div className='d-flex gap-2 justify-content-around flex-wrap'>
                        {
                            userFollowing.map(f => (
                                <Friend key={f.id} userId={f.id} username={f.username} userPfp={AVATAR_URL+f.profilPicture}/>
                            ))
                        }

                        </div>
                    </div>
                    )
                }
                
                
                

                <div className='bg-dark text-light border border-sm rounded p-2 shadow-sm'>
                    <h2 className='pb-3'>Favorite Games</h2>
                    <div className='d-flex gap-3 justify-content-around flex-wrap p-3'>
                        {user.favoriteGames.map(game => (
                        <Gamecard key={game.id} game_id={game.id} width='250px'/>
                    ))}
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default Profil;