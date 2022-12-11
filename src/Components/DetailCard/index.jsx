import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import ScheduleFormModal from '../ScheduleFormModal';
import styles from './DetailCard.module.css';

const DetailCard = () => {
  const { theme } = useTheme();
  const { matricula } = useParams();
  const [dentista, setDentista] = useState([]);

  const apiUrl = 'https://dhodonto.ctdprojetos.com.br';

  useEffect(() => {
    fetch(`${apiUrl}/dentista?matricula=${matricula}`).then((response) => {
      response.json().then((data) => setDentista(data));
    });
    //Nesse useEffect, você vai fazer um fetch na api passando o
    //id do dentista que está vindo do react-router e carregar os dados em algum estado
  }, [matricula]);
  return (
    //As instruções que estão com {''} precisam ser
    //substituídas com as informações que vem da api
    <>
      <h1>Detail about Dentist {dentista.nome} </h1>
      <section
        className={`card col-sm-12 col-lg-6 container ${
          theme === 'dark' ? styles.cardDark : ''
        }`}
      >
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <div className={`card-body row `}>
          <div className='col-sm-12 col-lg-6'>
            <img
              className='card-img-top'
              src='/images/doctor.jpg'
              alt='doctor placeholder'
            />
          </div>
          <div className='col-sm-12 col-lg-6'>
            <ul className='list-group'>
              <li className='list-group-item'>Nome: {dentista.nome}</li>
              <li className='list-group-item'>
                Sobrenome: {dentista.sobrenome}
              </li>
              <li className='list-group-item'>
                {/* {console.log(dentista)} */}
                Usuário: {'dentista.usuario.username'}
              </li>
            </ul>
            <div className='text-center'>
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
              <button
                data-bs-toggle='modal'
                data-bs-target='#exampleModal'
                className={`btn btn-${theme} ${styles.button}`}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
