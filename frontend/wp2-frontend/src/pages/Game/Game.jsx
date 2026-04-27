import { useState, useEffect, use } from 'react';
import { useParams } from 'react-router-dom';
import { getOneGame } from '../../services/game.service.js';
import styles from './Game.module.css'
import Avatar from '../../components/Avatar/Avatar.jsx';
import Popup from '../../components/Popup/Popup.jsx';
import { getReviewsOnGame } from '../../services/review.service.js';
import Review from '../../components/Review/Review.jsx';

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
    <div className='container my-5'> 
    
    {/* General game infos */}
    <div className='row bg-white p-5 rounded-4 border shadow-sm mb-4 g-5'>
        <div className='col-md-4 d-flex flex-column align-items-center gap-4'>
            <Avatar imageLink={ILLUSTRATION_URL + game.illustration} owner={game.name} size='300px'/>
            {canReview && (
                <>
                    <button className='btn btn-primary w-100 py-3 fw-bold text-uppercase shadow-sm' onClick={() => setIsOpen(true)}>
                        Add to list
                    </button>
                    <Popup isOpen={isOpen} onClose={() => setIsOpen(false)} game={game} user={user}/>
                </>
            )}
        </div>

        <div className="col-md-8">
            <h1 className='display-4 fw-bold text-dark mb-3'>{game.name}</h1>
            <p className='lead text-secondary mb-4'>{game.synopsis}</p>
            <hr className="my-4 opacity-50" />
            <div className="d-flex flex-wrap gap-4">
                <h3 className='h6 text-muted'><strong className="text-primary">Studio:</strong> {game.studio}</h3>
                <h3 className='h6 text-muted'><strong className="text-primary">Duration:</strong> {game.averageTimeToFinish}h</h3>
                <h3 className='h6 text-muted'><strong className="text-primary">Engine:</strong> {game.engine}</h3>
            </div>
        </div>
    </div>

    {/* Genres and Reviews */}
    <div className='row g-4'>
        {/* Genres on the left */}
        <div className='col-lg-4'>
            <div className='bg-white p-4 rounded-4 border shadow-sm h-100'>
                <h2 className='h4 mb-3 border-bottom pb-2'>Genres</h2>
                <div className='d-flex flex-wrap gap-2'>
                    {game.genres.map((genre, index) => (
                        <span key={index} className='badge bg-secondary p-2'>{genre}</span>
                    ))}
                </div>
            </div>
        </div>

        {/* Reviews on the right */}
        <div className='col-lg-8'>
            <div className='bg-white p-4 rounded-4 border shadow-sm'>
                <h2 className='h4 mb-4 border-bottom pb-2'>Community Reviews</h2>
                {reviews != null && reviews.length > 0 ? (
                    reviews.map(r => (
                        <Review 
                            key={r.id} 
                            comment={r.comment} 
                            grade={r.grade} 
                            author={r.author.username} 
                            author_avatar={AVATAR_URL + r.author.profilPicture}
                        />
                    ))
                ) : (
                    <p className="text-muted italic">No reviews yet. Be the first to review!</p>
                )}
            </div>
        </div>
    </div>
</div>
    

    
);
}

export default Game;