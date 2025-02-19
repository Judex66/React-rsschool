import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../components/Loading';
import { useGetCharacterQuery } from '../Redux';

export default function Character() {
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
  if (error) {
    throw new Error('I have crashed!');
  }
  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        data && (
          <div onClick={clickOutside}>
            <button onClick={clickOutside}>Close</button>
            <h2> {data.name}</h2>
            <img className="img" src={data?.image} alt={data.name} />
            <p>{data.gender}</p>
          </div>
        )
      )}
    </>
  );
}
