import ReactDOM from 'react-dom';
import styles from './Popup.module.css';

function Popup({isOpen, onClose, children}){
    if(!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={`${styles.modaloverlay}`} onClick={onClose}>
            <div className={`${styles.modalcontent}`} onClick={e => e.stopPropagation()}>
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>,
        document.body
    );
}

export default Popup;