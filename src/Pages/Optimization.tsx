import { useState, useMemo, useCallback } from 'react';
import Country from '../Interfaces/Interface';
import { useGetCountriesQuery } from '../Redux/api';
import SearchComponent from '../Components/Search';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import CountryCard from '../Components/Card';

function Optimization() {
  const { data, isLoading } = useGetCountriesQuery({});
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name_ascending');
  const navigate = useNavigate();
  const filteredCountries = useMemo(() => {
    if (!data) return [];
    return data.filter((country: Country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);
  const MemoSearchComponent = React.memo(SearchComponent);
  const MemoCountryCard = React.memo(CountryCard);
  const sortedCountries = useMemo(() => {
    return filteredCountries.sort((a: Country, b: Country) => {
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
  }, [filteredCountries, sortBy]);

  const searchValue = useCallback((newSearchTerm: string) => {
    setSearch(newSearchTerm);
  }, []);

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
      <MemoSearchComponent searchValue={searchValue} />
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="country-flex">
          {sortedCountries.map((country: Country) => (
            <MemoCountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </>
  );
}

export default Optimization;
