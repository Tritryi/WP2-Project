import { useState } from 'react';
import SearchGame from '../../components/SearchGame'

function Discover(){
    const suggestions = ["RPG", "Souls-like", "Indie", "FPS", "Open World", "Survival"];

    return(
        <div className='container-md py-5'>
            <div className='bg-dark text-light border border-secondary rounded p-4 shadow-lg'>
                
                <div className='d-flex align-items-center gap-3 mb-4'>
                    <div className='bg-primary rounded' style={{ width: '5px', height: '35px' }}></div>
                    <h2 className='m-0 fw-bold'>Discover New Games</h2>
                </div>

                <p className='text-secondary mb-4'>
                    Search through the database to find new titles, or look for specific games to add to your reviews.
                </p>

                {/* Zone de recherche */}
                <div className='p-3 rounded mb-3' style={{ backgroundColor: '#1a1d20' }}>
                    <SearchGame />
                </div>

                {/* Retour des badges de suggestions */}
                <div className='d-flex align-items-center gap-2 flex-wrap mb-2'>
                    <small className='text-secondary me-1'>Try searching for:</small>
                    {suggestions.map(tag => (
                        <button 
                            key={tag}
                            className='btn btn-outline-secondary btn-sm rounded-pill px-3 border-secondary'
                            value={tag}
                            style={{ 
                                fontSize: '0.75rem', 
                                color: '#adb5bd',
                                backgroundColor: 'transparent',
                                cursor : "default"
                            }}
                            onMouseOver={(e) => e.target.style.color = '#fff'}
                            onMouseOut={(e) => e.target.style.color = '#adb5bd'}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Discover;