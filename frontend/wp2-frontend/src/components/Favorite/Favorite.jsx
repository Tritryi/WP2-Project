function Favorite({name, imageLink, handleDelete}){

    return(
        <div className="d-flex justify-content-between bg-light d-flex align-items-center gap-3 p-2 text-dark border border-secondary rounded shadow-sm mb-2 w-100">
            <div className="d-flex align-items-center gap-2">
                <img 
                src={imageLink} 
                alt={name} 
                className="rounded shadow-sm"
                style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
            />
            
            <h6 className="mb-0 fw-bold">{name}</h6>
            </div>
        
            <button type="button" className="btn" onClick={handleDelete}>
                ❌
            </button>
            
        </div>
    )
}

export default Favorite;