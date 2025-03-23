import React from 'react';
import Country from '../Interfaces/Interface';

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <div className="country-flex__country" key={country.cca3}>
      <h2>{country.name.common}</h2>
      <p>Население: {country.population}</p>
      <p>Регион: {country.region}</p>
      <img src={country.flags.png} alt={country.name.common} width="100" />
    </div>
  );
};

export default CountryCard;
