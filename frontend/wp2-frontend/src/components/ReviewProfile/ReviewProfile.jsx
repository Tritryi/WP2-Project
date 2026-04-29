function ReviewProfile({ image, grade, comment }) {
    const ILLUSTRATION_URL = "http://localhost:8080/uploads/gameIllus/";

    return (
        <div className="card bg-dark text-light shadow-sm mb-2 overflow-hidden" 
            style={{ width: '280px', height: '80px', border: '1px solid #444' }}>
            <div className="row g-0 h-100">
                <div className="col-4 h-100">
                    <img 
                        src={ILLUSTRATION_URL + image} 
                        className="h-100 w-100" 
                        alt="Game"
                        style={{ objectFit: 'cover' }} 
                    />
                </div>

                <div className="col-8 d-flex flex-column p-2 justify-content-center">
                    <div className="mb-1">
                        <span className="badge bg-primary" style={{ fontSize: '0.7rem' }}>
                            {grade} / 10
                        </span>
                    </div>

                    <div className="flex-grow-1 overflow-hidden">
                        <p className="m-0 text-light" 
                        style={{ 
                            fontSize: '0.75rem', 
                            lineHeight: '1.2',
                            display: '-webkit-box',
                            WebkitLineClamp: '2', // Limite à 2 lignes maximum
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {comment}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ReviewProfile;