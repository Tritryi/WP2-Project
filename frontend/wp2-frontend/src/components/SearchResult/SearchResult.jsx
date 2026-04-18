import { Link } from "react-router-dom";
import styles from './Searchresults.module.css'

function SearchResult({name, imageLink, id, onSelect}){
    const handleClick = () => {
        if(onSelect && typeof onSelect === 'function'){
            onSelect({id, name, imageLink});
        }
    }
    const content = (
        <div className="btn btn-light d-flex align-items-center gap-3 p-2 text-dark border border-secondary rounded shadow-sm mb-2 w-100">
            <img 
                src={imageLink} 
                alt={name} 
                className="rounded shadow-sm"
                style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
            />
            
            <h6 className="mb-0 fw-bold">{name}</h6>
            
        </div>
    );

    if(onSelect){
        return (
            <div onClick={handleClick} style={{cursor: 'pointer'}}>
                {content}
            </div>
        )
    }
    return(
        <Link className={styles.links} to={`/game/${id}`}>
            {content}
        </Link>
    )
}

export default SearchResult;