import { useState } from 'react';
import Country from '../Interfaces/Interface';
import { useGetCountriesQuery } from '../Redux/api';
import SearchComponent from '../Components/Search';
import { useNavigate } from 'react-router-dom';
import CountryCard from '../Components/Card';
function NoneOptimization() {
  const { data, isLoading } = useGetCountriesQuery({});
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name_ascending');
  const navigate = useNavigate();
  const searchValue = (searchTerm: string) => {
    setSearch(searchTerm);
  };
  let filteredCountries = [];
  if (data) {
    filteredCountries = data.filter((country: Country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
  }
  const sortedCountries = filteredCountries.sort((a: Country, b: Country) => {
    if (sortBy === 'name_ascending') {
      return a.name.common.localeCompare(b.name.common);
    } else if (sortBy === 'population_ascending') {
      return b.population - a.population;
    } else if (sortBy === 'name_descending') {
      return b.name.common.localeCompare(a.name.common);
    } else if (sortBy === 'population_descending') {
      return a.population - b.population;
    }
    return 0;
  });
  return (
    <>
      <div>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Вернуться на главную
        </button>
        <SearchComponent searchValue={searchValue} />
        <label>Сортировать по: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name_ascending">Название по алфавиту</option>
          <option value="name_descending">Название в обратном порядке</option>
          <option value="population_ascending">Население по убыванию</option>
          <option value="population_descending">
            Население по возрастанию
          </option>
        </select>
      </div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="country-flex">
          {sortedCountries.map((country: Country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </>
  );
}

export default NoneOptimization;
