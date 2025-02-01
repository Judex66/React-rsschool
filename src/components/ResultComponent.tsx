import React from 'react';
import axios from 'axios';
import LoadingComponent from './Loading';
import SearchComponent from './SearchComponent';
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
class ResultComponent extends React.Component {
  state = {
    filters: '',
    data: Array<Data>(),
    isloading: false,
    error: false,
  };

  async componentDidMount() {
    const pokemonsData = [];
    try {
      for (let i = 1; i <= 10; i++) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
        pokemonsData.push(res);
      }
      const results = await Promise.all(pokemonsData);
      const data = results.map((response) => response.data);
      this.setState({ error: false });
      this.setState({ data: data, isloading: true });
    } catch (error) {
      console.log(`error==${error}`);
      this.setState({ error: true });
    }
  }
  searchResult = (search: string) => {
    this.setState({ filters: search });
    console.log(search);
  };
  callError = () => {
    this.setState({ error: true });
  };
  render(): React.ReactNode {
    const { filters, data, isloading, error } = this.state;
    const filteredData = data.filter((pokemonName) => {
      return pokemonName.name.toLowerCase().includes(filters.toLowerCase());
    });
    if (error) {
      throw new Error('I have crashed!');
    }
    return (
      <div>
        <button onClick={this.callError}>Call ERROR FOR ERROR!!!!!!!</button>
        <SearchComponent searchResult={this.searchResult} />
        <div className="cardFlex">
          {!isloading ? (
            <LoadingComponent />
          ) : (
            filteredData.map((pokemon) => (
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
      </div>
    );
  }
}

export default ResultComponent;
