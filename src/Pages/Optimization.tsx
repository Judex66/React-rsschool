import Country from "../Interfaces/Interface";
import { useGetCountriesQuery } from "../Redux/api";

function Optimization() {
  const { data, isLoading } = useGetCountriesQuery({

  });
  return <>
  {isLoading ?(
    <div>Loading</div>
  ):(
    <div className='country-flex'>
        {data.slice(0, 5).map((country: Country) => (
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

export default Optimization;
