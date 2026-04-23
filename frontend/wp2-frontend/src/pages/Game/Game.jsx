import { useState, useEffect, use } from 'react';
import { useParams } from 'react-router-dom';
import { getOneGame } from '../../services/game.service.js';
import styles from './Game.module.css'
import Avatar from '../../components/Avatar/Avatar.jsx';
import Popup from '../../components/Popup/Popup.jsx';
import { getReviewsOnGame } from '../../services/review.service.js';

function Game(){
    const [game, setGame] = useState(null);
    const { id } = useParams();
    const ILLUSTRATION_URL = "http://localhost:8080/uploads/gameIllus/";
    const AVATAR_URL = "http://localhost:8080/uploads/avatars/";
    const [isOpen, setIsOpen] = useState(false);

    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    const [reviews, setReviews] = useState([]);

    const canReview = user !== null;
    

        useEffect (() => {
            getOneGame(id).then(data => {
                setGame(data);
            });
        }, [id]);

        useEffect(() => {
            getReviewsOnGame(id).then(data => {
                setReviews(data);
                console.log(data);
            })
        }, [id]);

        useEffect(() => {
            if(game){
                document.title = game.name+" • ViGameList";
            }

            return () => {
                document.title = "ViGameList";
            };
        }, [game]);
    
        if (!game){
            return <div className="text-primary">No game found</div>;
        }

    return (
    <div className='container rounded-4 border border-1 border-dark mt-3'>
        <div className='container mt-5 d-flex align-items-start gap-5 mb-5 p-5 bg-white '>
        
        <div className='d-flex flex-column align-items-center gap-4' style={{ minWidth: '300px' }}>
            <Avatar imageLink={ILLUSTRATION_URL+game.illustration} owner={game.name} size='300px'/>
            
            {canReview &&(
                <>
            <button className='btn btn-primary w-50 py-3 fw-bold text-uppercase shadow-sm' onClick={() => setIsOpen(true)}>
                Add to list
            </button>
            <Popup isOpen={isOpen} onClose={() => setIsOpen(false)} game={game} user={user}/>

                </>
            )}
                
            
        </div>

        <div className="flex-grow-1">
            <h1 className='display-4 fw-black text-dark mb-3'>{game.name}</h1>
            
            <p className='lead text-secondary mb-4 lh-base'>{game.synopsis}</p>
            
            <hr className="my-4 opacity-50" />
            
            <h3 className='h6 text-muted mb-2'>
                <strong className="text-primary">Studio:</strong> {game.studio}
            </h3>
            <h3 className='h6 text-muted mb-2'>
                <strong className="text-primary">Average duration:</strong> {game.averageTimeToFinish} hours
            </h3>
            <h3 className='h6 text-muted mb-0'>
                <strong className="text-primary">Engine:</strong> {game.engine}
            </h3>
        </div>
        
    </div>

    <div className='container mt-5 d-flex align-items-start gap-5 mb-5 p-5 bg-white'>
        <div>
            <h1>Genres</h1>
            <div className='d-flex flex-column'>
                <ul className='list-group'>
                {
                    game.genres.map(genre => (
                        <li className='list-group-item list-group-item-secondary'>{genre}</li>
                    ))
                }
                </ul>
            </div>
        </div>
    </div>

    <div>
        {
            reviews != null && reviews.length > 0 && (
                reviews.map(r => (
                    
                    <p>{r.comment}{r.author.username}</p>
                ))
            )
        }
    </div>
    </div>
    

    
);
}

export default Game;