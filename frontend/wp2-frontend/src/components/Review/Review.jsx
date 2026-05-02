import Avatar from "../Avatar";
import { Link } from "react-router-dom";

function Review({ comment, grade, author, author_avatar, author_id }) {
    return (
        <div className="card shadow-sm mb-3 border-0" style={{backgroundColor: "#ccc8c8"}}>
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                        <Link 
                            to={`/profile/${author}`} // Petit tips : lien dynamique si besoin
                            style={{ textDecoration: "none" }} 
                            className="d-flex align-items-center gap-2 text-reset link-hover-effect"
                            >
                            <Avatar 
                                imageLink={author_avatar} 
                                owner={author} 
                                size="45px" 
                                className="rounded-circle border border-2 border-white shadow-sm"
                            />
                            {/* Le m-0 est crucial pour éviter que le h5 ne décale tout vers le bas */}
                            <h5 className="m-0 fw-bold">{author}</h5>
                        </Link>
                    </div>
                    
                    <span className="badge bg-primary rounded-pill px-3 py-2 shadow-sm">
                        <strong>{grade}</strong> / 10
                    </span>
                </div>

                <hr className="my-2 opacity-25" />

                <div className="mt-3">
                    {/* <p className="card-text text-secondary lh-base italic">
                        "{comment}"
                    </p> */}
                    <div className="p-2 border-secondary-subtle rounded bg-light w-75 text-secondary shadow-sm italic">
                        {comment}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Review;