import { useEffect, useState } from 'react';
import LoadingComponent from '../components/Loading';
import Pagination from '../components/Pagination';
import SearchComponent from '../components/SearchComponent';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
import { useGetCharactersQuery } from '../Redux';
import Data from '../Interfaces/Api-result';
import Results from '../Interfaces/Api-result';
import { useTheme } from '../theme-context/ThemeProvider';
export default function MainPage() {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const charQuery = searchParams.get('character') || '';
  // const pageQuery = searchParams.get('page') || 1;
  // const [paginationData, setPaginationData] = useState(5);
  // const initialSearch = charQuery ? String(charQuery) : '';
  // const [searchPar, setSearchPar] = useState(initialSearch);
  // const initialPage = pageQuery ? Number(pageQuery) : 1;
  // const [page, setPage] = useState(initialPage);
  // const {
  //   data = [Array<Data>()],
  //   error,
  //   isLoading,
  // } = useGetCharactersQuery({ pageQuery: page, charQuery });
  // const searchValue = (search: string) => {
  //   setSearchPar(search);
  //   setSearchParams({ page: '1', character: searchPar });
  //   setPage(1);
  //   console.log(search);
  //   console.log(charQuery);
  // };
  // const paginate = (pageNumber: React.SetStateAction<number>) => {
  //   setSearchParams({ pageQuery: pageNumber.toString(), charQuery: charQuery });
  // };

  const { theme, toggleTheme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [charValue, setCharValue] = useState('');
  // Получаем параметры из URL
  const charQuery = searchParams.get('search')
    ? searchParams.get('search')
    : charValue;
  const pageParam = searchParams.get('page') ? searchParams.get('page') : '1';
  const initialPage = pageParam ? Number(pageParam) : 1;
  const [paginationData, setPaginationData] = useState(5);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data, isLoading, error } = useGetCharactersQuery({
    pageQuery: pageParam,
    charQuery: charValue,
  });

  const searchValue = (newSearchTerm: string) => {
    if (newSearchTerm !== charValue) {
      setCharValue(newSearchTerm);
      setSearchParams({ search: charValue, page: '1' });
      setCurrentPage(1);
    }
  };

  const paginate = (newPage: number) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      setSearchParams({ search: charValue, page: String(newPage) });
    }
  };
  useEffect(() => {
    if (!isLoading) {
      setPaginationData(data.info.pages);
    }
  }, [isLoading, data]);
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
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
        <h3>Текущая тема: {theme}</h3>
        <button onClick={toggleTheme}>Переключить тему</button>
        <SearchComponent searchValue={searchValue} />
        <Pagination pagination={paginationData} paginate={paginate} />
        <div className="mainFlex">
          <div className="cardFlex">
            {isLoading ? (
              <LoadingComponent />
            ) : (
              data.results.map((characters: Results) => (
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
