import { Link, useParams } from 'react-router-dom';
import Gamecard from '../../components/Gamecard/Gamecard';
import styles from './Home.module.css'
import { use, useEffect, useState } from 'react';
import { getThreeGames } from '../../services/game.service';
import SearchGame from '../../components/SearchGame/SearchGame';

function Home(){
    const [gamesRPG, setGameRPG] = useState([]);
    const [gamesFPS, setGameFPS] = useState([]);
    const [gamesAdventure, setGameAdv] = useState([]);

    useEffect(() => {
        getThreeGames("RPG").then(data => {
            setGameRPG(data);
        });
    }, []);

    useEffect(() => {
        getThreeGames("FPS").then(data => {
            setGameFPS(data);
        });
    }, []);


    return(
        <>
        <main className="container">
            <div class="pb-3">
            <h1><strong>Welcome to ViGameList!</strong></h1>
            <h3 class="mr-5">Search for games, rate them, review them, look for informations you are struggling to find...
                Everything is here!
            </h3>
        </div>
        <Link className="btn btn-dark btn-lg mb-5" to="/">Discover</Link>

        
        <SearchGame />

        <hr />
        <div className="mb-5">
            <h1><strong>Most popular</strong></h1>
            <div class="d-flex flex-row gap-3">
                <Gamecard game_id={1} width='45%'/>
                <Gamecard game_id={2} width='45%'/>
                <Gamecard game_id={3} width='45%'/>
            </div>
        </div>
        <hr />
    <div className="mt-5">
    <h1 className="text-center"><strong>Recommendations</strong></h1>
    <h2 className="mb-4 text-secondary">RPG Games</h2>

    <div className="d-flex justify-content-center">
        <div className="d-flex flex-row justify-content-center gap-4 w-100">
            {
                gamesRPG.map(game => (
                    <Gamecard key={game.id} game_id={game.id} width='30%' />
                ))
            }
        </div>
    </div>

    <h2 className="mb-4 text-secondary">FPS Games</h2>
    <div className="d-flex justify-content-center">
        <div className="d-flex flex-row justify-content-around w-100">
            {
                gamesFPS.map(game => (
                    <Gamecard key={game.id} game_id={game.id} width='30%' />
                ))
            }
        </div>
    </div>
</div>

        </main>
        
        </>
    );
    
}

export default Home;