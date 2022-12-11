import { useState, useEffect } from 'react';
import Card from '../Components/Card';

const Home = () => {
  const [dentistas, setDentistas] = useState([]);

  const apiUrl = 'https://dhodonto.ctdprojetos.com.br';
  useEffect(() => {
    fetch(`${apiUrl}/dentista`).then((response) => {
      response.json().then((data) => setDentistas(data));
    });
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div className='card-grid container'>
        {dentistas.map((dentista) => (
          <Card key={dentista.matricula} dentista={dentista} />
        ))}
      </div>
    </>
  );
};

export default Home;
