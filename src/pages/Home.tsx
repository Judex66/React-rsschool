import { Link, Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Главная страница</h1>
      <ul>
        <li>
          <Link to="/componentUsusal">componentUsusal</Link>
        </li>
        <li>
          <Link to="/componentRHF">componentRHF</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
