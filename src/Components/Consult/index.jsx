import { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../util/urlApi';
import { convertDate } from '../../hooks/convertDate';
import { convertTime } from '../../hooks/convertTime';

const Consult = () => {
  const { theme } = useTheme();
  const { matricula } = useParams();

  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/consulta?matricula=${matricula}`).then((response) => {
      response.json().then((data) => setConsultas(data));
    });
  }, [matricula]);

  return (
    <>
      <div className={`${theme}`}>
        <table className={`table table-striped table-${theme}`}>
          <thead>
            <tr>
              <th scope='col'>Paciente</th>
              <th scope='col'>Data</th>
              <th scope='col'>Horas</th>
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
