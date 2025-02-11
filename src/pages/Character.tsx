import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DataSingle from '../Interfaces/Api-result';
import axios from 'axios';
import LoadingComponent from '../components/Loading';

export default function Character() {
  const [error, setError] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState(Array<DataSingle>());
  const { id } = useParams();
  const navigate = useNavigate();
  const clickOutside = useCallback(
    (event: React.MouseEvent): void => {
      if (event.target === event.currentTarget) {
        navigate('/', { replace: true });
      }
    },
    [navigate]
  );
  useEffect(() => {
    const fetchData = async () => {
      setIsloading(false);
      try {
        await axios
          .get(`https://rickandmortyapi.com/api/character/${id}`)
          .then((response) => {
            const charac = response.data;
            setData(charac);
            setIsloading(true);
          });
      } catch {
        setError(true);
        setIsloading(false);
      }
    };
    fetchData();
  }, [id]);
  if (error) {
    throw new Error('I have crashed!');
  }
  return (
    <>
      {!isloading ? (
        <LoadingComponent />
      ) : (
        data && (
          <div onClick={clickOutside}>
            <button>Close</button>
            <h2> {data.name}</h2>
            <img className="img" src={data?.image} alt={data.name} />
            <p>{data.gender}</p>
          </div>
        )
      )}
    </>
  );
}
