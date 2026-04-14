import { useEffect, useState } from 'react';
import styles from './Gamecard.module.css';
import { getOneGame } from '../../services/game.service';

function Gamecard({game_id, width = '100%'}){
    const [game, setGame] = useState(null);

    useEffect (() => {
        getOneGame(game_id).then(data => {
            setGame(data);
        });
    }, [game_id]);

    if (!game){
        return <div className="text-primary">No game found</div>;
    }

    return (
        <div className="d-flex flex-column align-items-center text-center">
                    <img className={`${styles.gameImage} rounded mb-2`} 
                    src='/images/jour8.webp' 
                    alt="Game Image"
                    style={{width : width}}/>
                    <h4>{game.name}</h4>
        </div>
    )
}

export default Gamecard;