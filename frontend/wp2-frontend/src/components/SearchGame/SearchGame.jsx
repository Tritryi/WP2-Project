import { use, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGamesByName } from '../../services/game.service';
import styles from './Searchgame.module.css'
import SearchResult from '../SearchResult/SearchResult';

function SearchGame(){
    const [searchTerm, setSearchTerm] = useState("");
    const [games, setGames] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await getGamesByName(searchTerm);
        setGames(response);
    }

    return(
        <div className="w-100 mb-4">
            <div className="input-group shadow-sm">
                
                <input 
                    type="text" 
                    className={`form-control bg-secondary text-light border-dark shadow-none ${styles.placeholder}`}
                    placeholder="Search for a legendary game..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <button 
                    className="btn btn-primary px-4 fw-bold" 
                    type="button"
                    onClick={handleSearch}
                >
                    SEARCH  🔍
                </button>
            </div>
            <div>
                {games && (
                    <div className='d-flex flex-column'>
                        {games.map(game =>  (
                            <SearchResult name={game.name} imageLink="/images/jour8.webp" id={game.id}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchGame;