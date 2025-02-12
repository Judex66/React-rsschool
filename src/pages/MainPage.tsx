import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingComponent from '../components/Loading';
import Pagination from '../components/Pagination';
import SearchComponent from '../components/SearchComponent';
import Data from '../Interfaces/Api-result';
import { Link, Outlet, useSearchParams } from 'react-router-dom';

export default function MainPage() {
  const [data, setData] = useState(Array<Data>());
  const [paginationData, setPaginationData] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const charQuery = searchParams.get('character') || '';
  const searchValue = (search: string) => {
    setSearchParams({ character: search });
  };
  const { data, error, isLoading } = useGetCharactersQuery({
    currentPage,
    name: charQuery,
  });
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await axios
  //         .get(
  //           `https://rickandmortyapi.com/api/character/?name=${charQuery}&page=${currentPage}`
  //         )
  //         .then((response) => {
  //           const charac = response.data;
  //           setData(charac.results);
  //           setPaginationData(charac.info.pages);
  //           setIsloading(true);
  //         });
  //     } catch {
  //       setError(true);
  //     }
  //   };
  //   fetchData();
  // }, [isloading, charQuery, currentPage]);
  const paginate = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
    console.log(currentPage);
  };
  if (error) {
    return (
      <>
        <p>Ошибка подключения 404</p>
      </>
    );
  }
  return (
    <>
      <div>
        <SearchComponent searchValue={searchValue} />
        <Pagination pagination={paginationData} paginate={paginate} />
        <div className="mainFlex">
          <div className="cardFlex">
            {!isloading ? (
              <LoadingComponent />
            ) : (
              data
                .filter((data) => data.name.includes(charQuery))
                .map((characters) => (
                  <Link
                    to={`/character/${characters.id}`}
                    className="card"
                    key={characters.id}
                  >
                    <h2> {characters.name}</h2>
                    <img
                      className="img"
                      src={characters?.image}
                      alt={characters.name}
                    />
                  </Link>
                ))
            )}
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
