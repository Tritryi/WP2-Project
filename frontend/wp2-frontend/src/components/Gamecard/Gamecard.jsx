import { useEffect, useState } from 'react';
import styles from './Gamecard.module.css';
import { getOneGame } from '../../services/game.service';

function Gamecard({game_id, width = '100%'}){
    const [game, setGame] = useState(null);
    const ILLUSTRATION_URL = "http://localhost:8080/uploads/gameIllus/";


    useEffect (() => {
        getOneGame(game_id).then(data => {
            setGame(data);
        });
    }, [game_id]);

    if (!game){
        return <div className="text-primary">No game found</div>;
    }

    return (
        <div className="d-flex flex-column align-items-center text-center h-100">
            <img 
                className={`${styles.gameImage} rounded mb-2`} 
                src={ILLUSTRATION_URL + game.illustration}
                alt="Game Image"
                style={{
                    width: width, 
                    aspectRatio: '1 / 1',
                    objectFit: 'cover'    
                }}
            />
            <h4 style={{ fontSize: '1rem', marginTop: 'auto' }}>{game.name}</h4>
        </div>
    )
}

export default Gamecard;