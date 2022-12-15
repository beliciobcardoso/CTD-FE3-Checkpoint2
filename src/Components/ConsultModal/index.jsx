import { useTheme } from '../../hooks/useTheme';
import Consult from '../Consult';
import styles from './ConsultModal.module.css';

const ConsultModal = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`modal fade`}
      id='consultModal'
      tabIndex='-1'
      aria-labelledby='consultModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div
          className={`modal-content ${
            theme === 'dark' ? styles.DarkModal : ''
          }`}
        >
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='consultModalLabel'>
              Lista de Consultas
            </h1>
            <button
              type='button'
              className={`btn-close ${
                theme === 'dark' ? styles.closeButtonDark : ''
              }`}
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <Consult />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultModal;
