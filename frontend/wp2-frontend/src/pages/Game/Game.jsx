import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneGame } from '../../services/game.service.js';
import styles from './Game.module.css'

function Game(){
    const [game, setGame] = useState(null);
    const { id } = useParams();

        useEffect (() => {
            getOneGame(id).then(data => {
                setGame(data);
            });
        }, [id]);

        useEffect(() => {
            if(game){
                document.title = game.name;
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
            <img 
                src="/images/jour8.webp" 
                alt={game.name} 
                className={`${styles.img} img-fluid rounded-4 shadow-lg`} 
            />
            <button className='btn btn-primary w-25 py-3 fw-bold text-uppercase shadow-sm'>
                Add to list
            </button>
        </div>

        <div className="flex-grow-1">
            <h1 className='display-4 fw-black text-dark mb-3'>{game.name}</h1>
            
            <p className='lead text-secondary mb-4 lh-base'>{game.synopsis}</p>
            
            <hr className="my-4 opacity-50" />
            
            <h3 className='h6 text-muted mb-2'>
                <strong className="text-primary">Studio:</strong> {game.studio}
            </h3>
            <h3 className='h6 text-muted mb-2'>
                <strong className="text-primary">Duration:</strong> {game.averageTimeToFinish} hours
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
    </div>
    

    
);
}

export default Game;