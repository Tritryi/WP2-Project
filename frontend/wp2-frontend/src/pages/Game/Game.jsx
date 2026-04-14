import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneGame } from '../../services/game.service.js';

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

    return(
        <div className='container mt-5'>
            <h1>{game.name}</h1>
        </div>
    )
}

export default Game;