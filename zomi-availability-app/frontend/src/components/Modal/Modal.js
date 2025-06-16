import classes from './Modal.module.css';

function Modal({ message, onClose }) {
    return (
        <div className={classes.backdrop} onClick={onClose}>
            <div className={classes.modal}>
                <p>{message}</p>
                <button onClick={onClose} className={classes.closeButton}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default Modal;