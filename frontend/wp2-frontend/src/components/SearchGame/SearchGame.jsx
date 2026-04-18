import { use, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGamesByName } from '../../services/game.service';

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
                    className="form-control bg-secondary text-light border-dark shadow-none" 
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
                    <div>
                        {games.map(game =>  (
                            <h1>{game.name}</h1>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchGame;