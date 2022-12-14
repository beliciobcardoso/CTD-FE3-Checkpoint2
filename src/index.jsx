import React from 'react';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';
import App from './App';
import Login from './Routes/Login';
import Home from './Routes/Home';
import Detail from './Routes/Detail';
import { ThemeProvider } from './hooks/useTheme';
import { TokenProvider } from './hooks/useToken';

const root = ReactDOM.createRoot(document.getElementById('root'));
//Lembre-se de configurar suas rotas e seu contexto aqui
const appRouter = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      { path: '*', loader: () => redirect('/home') },
      { path: '', element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'Detail/:matricula', element: <Detail /> },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <TokenProvider>
        <RouterProvider router={appRouter} />
      </TokenProvider>
    </ThemeProvider>
  </React.StrictMode>
);
