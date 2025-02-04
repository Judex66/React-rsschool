import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingComponent from '../components/Loading';
import Pagination from '../components/Pagination';
import SearchComponent from '../components/SearchComponent';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MainPage() {
  interface Data {
    name: string;
    id: number;
    status: string;
    gender: string;
    image: string;
    origin: Origin;
  }
  interface Origin {
    name: string;
  }

  const [filters, setFilters] = useState('');
  const [data, setData] = useState(Array<Data>());

  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const [searchResalt, setSearchResult] = useState(Array<Data>());

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();
  const fetchData = async () => {
    const searchValue: string = filters;
    await axios
      .get(
        `https://rickandmortyapi.com/api/character/?name=${searchValue}&page=${currentPage}`
      )
      .then((response) => {
        const posts = response.data;
        setData(posts.results);
        setIsloading(true);
        console.log(data);
      });
  };
  const searchValue = (search: string) => {
    setFilters(search);
    console.log(search);
  };
  useEffect(() => {
    fetchData();
  }, [isloading, filters]);
  const paginate = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <div>
        <SearchComponent searchValue={searchValue} />
        <div className="cardFlex">
          {!isloading ? (
            <LoadingComponent />
          ) : (
            data.map((characters) => (
              <div className="card" key={characters.id}>
                <h2> {characters.name}</h2>
                <img
                  className="img"
                  src={characters?.image}
                  alt={characters.name}
                />
              </div>
            ))
          )}
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={data.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}
