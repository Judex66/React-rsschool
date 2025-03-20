import { useState } from "react";
import Country from "../Interfaces/Interface";
import { useGetCountriesQuery } from "../Redux/api";
type SortableField = 'name' | 'population';
function NoneOptimization() {
  const { data, isLoading } = useGetCountriesQuery({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortableField>('name');
  const filteredCountries = data.filter((country: Country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedCountries = filteredCountries.sort((a: Country, b: Country) => {
    if (sortBy === 'name') {
      return a.name.common.localeCompare(b.name.common);
    } else if (sortBy === 'population') {
      return b.population - a.population;
    }
    return 0;
  });
  return <>
   <div>
        <label>Сортировать по: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortableField)}>
          <option value="name">Название</option>
          <option value="population">Население</option>
        </select>
      </div>
  {isLoading ?(
    <div>Loading</div>
  ):(
    <div className='country-flex'>
        {sortedCountries.slice(0, 50).map((country: Country) => (
          <div className='country-flex__country' key={country.cca3}>
            <h2>{country.name.common}</h2>
            <p>Население: {country.population}</p>
            <p>Регион: {country.region}</p>
            <img src={country.flags.png} alt={country.name.common} width="100" />
          </div>
        ))}
      </div>
  )}
  
  </>;
}

export default NoneOptimization;
