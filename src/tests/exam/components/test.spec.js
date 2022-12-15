import { render, screen } from "../../test-utils"
import Login from '../../../Routes/Login';
import Navbar from "../../../Components/Navbar";
import ScheduleForm from "../../../Components/ScheduleForm";
import Home from "../../../Routes/Home";

test('Renderizado a tela login form', () => {
  render(<Login />)
  expect(screen.getByText('Login')).toBeInTheDocument();
});

test('Renderizado a tela Navbar', () => {
  render(<Navbar />)
  expect(screen.getByText('DH Odonto')).toBeInTheDocument();
});

test('Teste do componente ScheduleForm', () => {
  render(<ScheduleForm />)
  expect(screen.getByText('Dentistas')).toBeInTheDocument();
});

test('Teste do componente Home', () => {
  render(<Home />)
  expect(screen.getByText('Home')).toBeInTheDocument();
});




