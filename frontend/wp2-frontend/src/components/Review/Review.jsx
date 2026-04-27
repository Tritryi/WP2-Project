import Avatar from "../Avatar";

function Review({ comment, grade, author, author_avatar }) {
    return (
        <div className="card shadow-sm mb-3 border-0" style={{backgroundColor: "#ccc8c8"}}>
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center gap-2">
                        <Avatar 
                            imageLink={author_avatar} 
                            owner={author} 
                            size="45px" 
                            className="rounded-circle border border-2 border-white shadow-sm"
                        />
                        <h5 className="mb-0 fw-bold text-dark">{author}</h5>
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