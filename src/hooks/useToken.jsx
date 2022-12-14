import { useState, createContext, useContext } from 'react';

const TokenContext = createContext();

export function TokenProvider(props) {
  const TokenLocalStorage = localStorage.getItem('token');

  const [token, setToken] = useState(
    TokenLocalStorage === null ? '' : TokenLocalStorage
  );

  function changeToken(TokenRecieved) {
    if (TokenRecieved !== token) {
      setToken(TokenRecieved);
      localStorage.setItem('token', TokenRecieved);
    }
  }

  return (
    <TokenContext.Provider value={{ token, changeToken }}>
      {props.children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const context = useContext(TokenContext);
  return context;
}
