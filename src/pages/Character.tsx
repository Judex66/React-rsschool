import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../components/Loading';
import { useGetCharacterQuery } from '../Redux';
import axios from 'axios';

export default function Character() {
  // const [error, setError] = useState(false);
  // const [isLoading, setIsloading] = useState(true);
  // const [data, setData] = useState(Array<Data>());
  const { id } = useParams();
  const { data = [], error, isLoading } = useGetCharacterQuery(id);
  const navigate = useNavigate();
  const clickOutside = useCallback(
    (event: React.MouseEvent): void => {
      if (event.target === event.currentTarget) {
        navigate('/', { replace: true });
      }
    },
    [navigate]
  );
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsloading(false);
  //     try {
  //       await axios
  //         .get(`https://rickandmortyapi.com/api/character/${id}`)
  //         .then((response) => {
  //           const charac = response.data;
  //           setData(charac);
  //           setIsloading(true);
  //         });
  //     } catch {
  //       setError(true);
  //       setIsloading(false);
  //     }
  //   };
  //   fetchData();
  // }, [id]);
  if (error) {
    throw new Error('I have crashed!');
  }
  return (
    <>
      {!isLoading ? (
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
