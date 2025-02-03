import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingComponent from '../components/Loading';
import Pagination from '../components/Pagination';
import SearchComponent from '../components/SearchComponent';

export default function MainPage() {
  interface Data {
    name: string;
    sprites: Sprites;
  }
  interface Sprites {
    other: Other;
  }
  interface Other {
    home: Home;
  }
  interface Home {
    front_default: string;
  }

  const [filters, setFilters] = useState('');
  const [data, setData] = useState(Array<Data>());

  const [isloading, setIsloading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(false);
  const [searchResalt, setSearchResult] = useState(Array<Data>());

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const fetchData = async () => {
    const pokemonsData = [];
    try {
      for (let i = 1; i <= 50; i++) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
        pokemonsData.push(res);
      }
      const results = await Promise.all(pokemonsData);
      setData(results.map((response) => response.data));
      setSearchResult(data);
      setIsloading(true);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  const searchValue = (search: string) => {
    setFilters(search);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const paginate = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
    console.log(currentPosts);
  };
  return (
    <>
      <div>
        <SearchComponent searchValue={searchValue} />
        <div className="cardFlex">
          {!isloading ? (
            <LoadingComponent />
          ) : (
            currentPosts.map((pokemon) => (
              <div className="card" key={pokemon.name}>
                <h2> {pokemon.name}</h2>
                <img
                  className="img"
                  src={pokemon?.sprites.other.home.front_default}
                  alt={pokemon.name}
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
