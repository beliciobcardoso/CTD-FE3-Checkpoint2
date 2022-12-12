import { useTheme } from '../../hooks/useTheme';
import { useState } from 'react';
import { apiUrl } from '../../util/urlApi';
import styles from './Form.module.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { theme } = useTheme();
  // const [authToken, setAuthToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    e.preventDefault();
    //enviar os dados do formulário e enviá-los no corpo da requisição
    //para a rota da api que faz o login /auth
    //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    //no localstorage para ser usado em chamadas futuras
    //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
    const userData = {
      username: username,
      password: password,
    };

    const requestHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const requestConfig = {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(userData),
    };
    fetch(`${apiUrl}/auth`, requestConfig).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          localStorage.setItem('authToken', data.token);
          navigate('/home');
          // setAuthToken(data.token);
          alert('Login realizado com Sucesso!');
        });
      } else {
        alert('senha errada');
      }
    });
  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center card container ${styles.card} ${
          theme === 'dark' ? styles.cardDark : 'btn-primary'
        }  `}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder='Login'
              name='login'
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder='Password'
              name='password'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className={`btn ${
                theme === 'dark' ? 'btn-dark' : 'btn-primary'
              } type='submit'`}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
