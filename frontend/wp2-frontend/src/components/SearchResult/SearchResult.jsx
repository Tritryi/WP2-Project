import { Link } from "react-router-dom";
import styles from './Searchresults.module.css'

function SearchResult({name, imageLink, id}){
    return(
        <Link className={styles.links} to={`/game/${id}`}>
        <div className="btn btn-light d-flex align-items-center gap-3 p-2 text-dark border border-secondary rounded shadow-sm mb-2 w-25">
            <img 
                src={imageLink} 
                alt={name} 
                className="rounded shadow-sm"
                style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
            />
            
            <h6 className="mb-0 fw-bold">{name}</h6>
            
        </div>
        </Link>
    )
}

export default SearchResult;