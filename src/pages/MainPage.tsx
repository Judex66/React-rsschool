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
  const [page, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const charQuery = searchParams.get('character') || '';
  const pageQuery = searchParams.get('page') || 1;
  const searchValue = (search: string) => {
    setSearchInput(search);
    setSearchParams({ character: searchInput, page: page.toString() });
  };
  const {
    data = [Array<Data>()],
    error,
    isLoading,
  } = useGetCharactersQuery({ pageQuery, charQuery });
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  const paginate = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
    setSearchParams({ character: searchInput, page: page.toString() });
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
