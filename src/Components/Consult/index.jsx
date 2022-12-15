import { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { apiUrl } from '../../util/urlApi';
import { convertDate } from '../../hooks/convertDate';
import { convertTime } from '../../hooks/convertTime';
// import styles from './consultModal.module.css';

const Consult = () => {
  const { theme } = useTheme();

  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    fetch(
      `${apiUrl}/consulta?matricula=71c070b6-406b-4d16-9eed-b04a798c16eb`
    ).then((response) => {
      response.json().then((data) => setConsultas(data));
    });
  }, []);

  return (
    <>
      <div className={`${theme}`}>
        <table>
          <thead>
            <tr key=''>
              <td>Paciente</td>
              <td>Data</td>
              <td>Horas</td>
            </tr>
          </thead>
          <tbody>
            {consultas.map((consulta) => (
              <tr>
                <td>{consulta.paciente.nome}</td>
                <td>{convertDate(new Date(consulta.dataHoraAgendamento))}</td>
                <td>{convertTime(consulta.dataHoraAgendamento)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Consult;
