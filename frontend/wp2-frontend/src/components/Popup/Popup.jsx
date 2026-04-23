import ReactDOM from 'react-dom';
import styles from './Popup.module.css';
import Avatar from '../Avatar/';
import { useState } from 'react';
import { addReview } from '../../services/review.service';

function Popup({isOpen, onClose, game, user}){
    if(!isOpen) return null;

    const THUMBNAIL_URL = "http://localhost:8080/uploads/gameIllus/";
    const [grade, setGrade] = useState(0);
    const [status, setStatus] = useState("");
    const [review, setReview] = useState("");

    const handleReview = async (e) => {
        e.preventDefault();
        
        /* TODO : SEND THE REQUEST WITH A FORMDATA */
        const formData = new FormData();
        formData.append("author_id", user.id);
        formData.append("game_id", game.id);
        formData.append("status", status);
        formData.append("grade", grade);
        formData.append("review", review);

        const response = await addReview(formData);
        if(response.ok){
            alert("Game reviewed");
            window.location.href = `/game/${game.id}`;
        }else{
            alert("Game review failed");
        }
    }
    
    

    return ReactDOM.createPortal(
        <div className={`${styles.modaloverlay}`} onClick={onClose}>
            <div className={`${styles.modalcontent} position-relative`} onClick={e => e.stopPropagation()}>
                
                <div className='d-flex gap-3'>
                    <h2>Review <strong>{game.name}</strong></h2>
                <button onClick={onClose} className='btn position-absolute top-0 end-0'>
                    <span aria-hidden="true" className='text-lg' style={{fontSize: "25px"}}>&times;</span>
                </button>
                <Avatar imageLink={THUMBNAIL_URL+game.illustration} owner={game.name} size='5em'/>
                </div>
                

                <form className="d-flex flex-column gap-3"
                onSubmit={handleReview}>
                
                <div className='d-flex gap-2'>
                    {/* Grade */}
                    <div className="d-flex flex-column">
                        <label htmlFor="grade" className="form-label small fw-bold">Grading</label>
                        <input 
                            type="number" 
                            id="grade" 
                            placeholder="0"
                            min="0"
                            max="10"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            className="form-control border-secondary-subtle"
                        />
                    </div>

                    {/* Status */}
                    <div className="d-flex flex-column">
                        <label htmlFor="status" className="form-label small fw-bold">Status</label>
                        <select name="status" 
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="form-select">
                            <option value="" selected="true">Select a status</option>
                            <option value="PLAYING">Playing</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="DROPPED">Dropped</option>
                            <option value="REGULARLY_PLAY">Regularly play</option>
                        </select>
                    </div>
                </div>
                

                {/* Review */}
                <div className="d-flex flex-column">
                    <label htmlFor="review" className="form-label small fw-bold">Review</label>
                    <textarea name="review" 
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="form-control border-secondary-subtle"
                    />
                </div>
                <div className='d-flex justify-content-end'>
                    <button type="submit" className="btn btn-primary w-50 mt-3 py-2 fw-bold text-uppercase">
                        Save
                    </button>
                </div>
                
            </form>
            </div>
        </div>,
        document.body
    );
}

export default Popup;