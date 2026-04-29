
import styles from './GameList.module.css'
function GameList({gameName, gameImage, gameId, grade, status}){
    const ILLUSTRATION_URL = "http://localhost:8080/uploads/gameIllus/";
    
    return(
        <div className="card border-0 rounded-3 overflow-hidden position-relative shadow-sm" 
            style={{ width: '140px', height: '220px' }}>
            
            <img 
                src={ILLUSTRATION_URL + gameImage} 
                alt={gameName} 
                className="w-100 h-100 object-fit-cover"
            />

            <div className="position-absolute bottom-0 start-0 w-100 p-2 d-flex flex-column justify-content-end"
                style={{ 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)',
                    minHeight: '40%' 
                }}>
                
                <a href={`/game/${gameId}`} className={`text-decoration-none ${styles.linkToGame}`}>
                    <h6 className="text-white m-0 text-truncate " style={{ fontSize: '0.9rem' }}>
                        <strong>{gameName}</strong>
                    </h6>
                </a>

                
                
                <small style={{ color: '#f568db', fontWeight: 'bold' }}>
                    {grade} / 10
                </small>
            </div>
            <span className="position-absolute top-0 end-0 m-2 badge rounded-pill bg-dark shadow-sm" 
                style={{ border: '1px solid #f568db', fontSize: '0.7rem' }}>
                {status}
            </span>

        </div>
    )
}

export default GameList;