import { Link, Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Главная страница</h1>
      <ul>
        <li>
          <Link to="/page1">Страница 1</Link>
        </li>
        <li>
          <Link to="/page2">Страница 2</Link>
        </li>
      </ul>
      {/* Outlet для вложенных маршрутов */}
      <Outlet />
    </div>
  );
}
