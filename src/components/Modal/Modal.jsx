import styles from './Modal.module.css';

const Modal = ({ modalImg, clsModal }) => {
  return (
    <div className={styles.Overlay} onClick={clsModal}>
      <img className={styles.Modal} src={modalImg} alt="" />
    </div>
  );
};
export default Modal;
