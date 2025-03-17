import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';

export default function Home() {
  const formData = useSelector((state: RootState) => state.form);
  console.log(formData[0]?.picture);
  return (
    <div>
      <h1>Главная страница</h1>
      <div>
        <Link to="/componentUsusal">componentUsusal</Link>
      </div>
      <div>
        <Link to="/componentRHF">componentRHF</Link>
      </div>
      <div>
        <h2>Сохраненные данные</h2>
        {formData.length === 0 ? (
          <p>Нет данных</p>
        ) : (
          formData.map((data, index) => (
            <div key={index}>
              <p>
                <b>Name:</b> {data.name}
              </p>
              <p>
                <b>Age:</b> {data.age}
              </p>
              <p>
                <b>Email:</b> {data.email}
              </p>
              <p>
                <b>Gender:</b> {data.gender}
              </p>
              {data.picture && (
                <img src={data.picture} alt="Uploaded" width={100} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
