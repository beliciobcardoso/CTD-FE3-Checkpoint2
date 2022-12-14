import { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import styles from './ScheduleForm.module.css';
import { apiUrl } from '../../util/urlApi';

const ScheduleForm = () => {
  const token = localStorage.getItem('authToken');

  const { theme } = useTheme();
  const [pacientes, setPacientes] = useState([]);
  const [dentistas, setDentistas] = useState([]);
  const [authToken, setAuthToken] = useState('');
  const [matriculaDentista, setMatriculaDentista] = useState('');
  const [matriculaPaciente, setMatriculaPaciente] = useState('');
  const [dateConsulta, setDateConsulta] = useState('');

  function listaDentista() {
    fetch(`${apiUrl}/dentista`).then((response) => {
      response.json().then((data) => setDentistas(data));
    });
  }

  function listaPaciente() {
    fetch(`${apiUrl}/paciente`).then((response) => {
      response.json().then((data) => setPacientes(data.body));
    });
  }
  useEffect(() => {
    setAuthToken(token);
    listaDentista();
    listaPaciente();
  }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(matriculaDentista);

    const consultData = {
      paciente: {
        matricula: matriculaPaciente,
      },
      dentista: {
        matricula: matriculaDentista,
      },
      dataHoraAgendamento: dateConsulta,
    };

    if (authToken !== null) {
      const requestHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      };

      const requestConfig = {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(consultData),
      };

      fetch(`${apiUrl}/consulta`, requestConfig).then((response) => {
        if (response.ok) {
          alert('Consulta agendada com sucesso!!!');
        } else {
          response.text().then((dataErro) => {
            alert(dataErro);
          });
        }
      });
    } else {
      alert('Nescessario realizar o login');
    }
  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div className={`text-center container`}>
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className='col-sm-12 col-lg-6'>
              <label htmlFor='dentist' className='form-label'>
                Dentistas
              </label>
              <select
                className='form-select'
                name='dentist'
                id='dentist'
                onChange={(event) => setMatriculaDentista(event.target.value)}
              >
                {/*Aqui deve ser feito um map para listar todos os dentistas*/}
                {dentistas.map((dentista) => (
                  <option key={dentista.matricula} value={dentista.matricula}>
                    {dentista.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-sm-12 col-lg-6'>
              <label htmlFor='patient' className='form-label'>
                Pacientes
              </label>
              <select
                className='form-select'
                name='patient'
                id='patient'
                onChange={(event) => setMatriculaPaciente(event.target.value)}
              >
                {/*Aqui deve ser feito um map para listar todos os pacientes*/}
                {pacientes.map((paciente) => (
                  <option key={paciente.matricula} value={paciente.matricula}>
                    {paciente.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className='col-12'>
              <label htmlFor='appointmentDate' className='form-label'>
                Date
              </label>
              <input
                className='form-control'
                id='appointmentDate'
                name='appointmentDate'
                type='datetime-local'
                onChange={(e) => setDateConsulta(e.target.value)}
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button
              data-bs-toggle='modal'
              data-bs-target='#exampleModal'
              className={`btn btn-${theme} ${styles.button}`}
              type='submit'
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
